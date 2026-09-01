---
titulo: Triaje de alertas
subtitulo: true
---

# Triaje de alertas

El triaje consiste en pasar de una alerta a una conclusión documentada en el menor tiempo posible. Lo que marca el resultado es el método, no el número de herramientas.

## Las cinco preguntas

Ante cualquier alerta, en este orden:

1. **¿Qué ha detectado exactamente la regla?** Lee la lógica de la regla, no sólo el título. Muchos falsos positivos se resuelven aquí.
2. **¿Qué activo y qué usuario?** Un servidor de producción, un portátil de dirección o un equipo de becario no valen lo mismo.
3. **¿Es actividad esperada?** ¿Hay un cambio, un despliegue, un pentest en curso, un administrador trabajando a esa hora?
4. **¿Qué pasó antes y después?** Una alerta aislada casi nunca cuenta la historia. Mira ±30 minutos en ese equipo.
5. **¿Qué haría el atacante después?** Si esto fuera real, ¿qué otra evidencia debería existir? Búscala. Su ausencia también es información.

## Método de trabajo

### Paso 1 — Contexto antes que herramientas

Antes de pegar nada en VirusTotal, anota: hora (con zona horaria), equipo, usuario, proceso, IP origen y destino. La mitad de las investigaciones se descarrilan por confundir el sentido de una conexión.

### Paso 2 — Clasificar la alerta

| Veredicto | Significa | Qué se hace |
|---|---|---|
| **Verdadero positivo** | Actividad maliciosa real | Escalar / abrir incidente |
| **Falso positivo** | La regla se equivocó | Cerrar **y** proponer afinado |
| **Benigno verdadero** | Es real pero autorizado (admin, pentest, script de IT) | Cerrar documentando el porqué |
| **No concluyente** | Falta información | Escalar con lo que tengas, no cerrar |

> [!IMPORTANT]
> "Benigno verdadero" y "falso positivo" no son lo mismo, y confundirlos rompe las métricas. Si la regla detectó exactamente lo que debía y resulta que era el administrador, la regla funciona bien: no la toques, documenta la excepción.

### Paso 3 — Enriquecer

- **Hash** → VirusTotal, MalwareBazaar.
- **IP** → AbuseIPDB, GreyNoise (¿es ruido de internet?), ipinfo (¿qué ASN?).
- **Dominio** → whois (¿fecha de registro?), urlscan, VirusTotal.
- **Usuario** → ¿es de ese departamento? ¿está de vacaciones? ¿tiene privilegios?
- **Proceso** → ¿la ruta es la legítima? ¿está firmado? ¿quién es el padre?

### Paso 4 — Buscar alrededor

Consultas habituales:

```
# Todo lo del equipo en la ventana del incidente
host = EQUIPO01 AND _time > hace 1h

# ¿Ese hash está en más sitios?
file_hash = <sha256>

# ¿Alguien más ha hablado con esa IP?
dest_ip = 203.0.113.45

# ¿Qué hizo ese usuario antes?
user = jperez AND (logon OR process_creation)
```

### Paso 5 — Documentar

Un ticket bien cerrado contiene: qué alertó, qué se comprobó, **con qué evidencias**, cuál es la conclusión y qué se recomienda. El criterio: que otra persona pueda reconstruir el razonamiento seis meses después.

## Árbol de decisión rápido

```text
            ¿La alerta es técnicamente correcta?
                            |
              +-------------+-------------+
              NO                          SÍ
              |                           |
      FALSO POSITIVO           ¿La actividad está autorizada?
      -> proponer afinado                  |
                              +------------+------------+
                              SÍ                       NO
                              |                         |
                    BENIGNO VERDADERO      ¿Hay indicios de impacto
                    -> documentar           o de más equipos afectados?
                       la excepción                    |
                                           +-----------+-----------+
                                           NO                     SÍ
                                           |                       |
                                VERDADERO POSITIVO           INCIDENTE
                                contenido -> remediar        -> escalar ya
```

## Señales de alta fidelidad

Si aparece alguna de éstas, escala:

- `vssadmin delete shadows` o `wbadmin delete catalog`.
- Limpieza del log de seguridad (**Event ID 1102**).
- Acceso a la memoria de `lsass.exe` desde un proceso no habitual.
- `net user /add` + `net localgroup administradores /add` seguidos.
- PowerShell con `-enc`, `-w hidden` y descarga en la misma línea.
- Un binario de sistema ejecutándose desde una ruta que no es la suya (`svchost.exe` fuera de `System32`).
- Un servidor haciendo consultas DNS a un dominio registrado esta semana.
- Cuenta de servicio iniciando sesión interactiva.
- Herramienta de acceso remoto (AnyDesk, ScreenConnect) instalada fuera de proceso de IT.

## Falsos positivos frecuentes y su causa

| Alerta | Causa habitual benigna |
|---|---|
| PowerShell codificado | SCCM, scripts de despliegue, monitorización |
| Escaneo interno de puertos | Escáner de vulnerabilidades autorizado |
| Múltiples logins fallidos | Contraseña caducada en un servicio o móvil con credencial vieja |
| Conexión a IP "maliciosa" | CDN o rango cloud reutilizado |
| Acceso a LSASS | Antivirus, herramientas de backup o de EDR |
| Ejecución desde `%TEMP%` | Instaladores legítimos y actualizadores |
| Login desde otro país | VPN corporativa, teletrabajo, viaje |

> [!TIP]
> Antes de declarar falso positivo por "esto lo hace el antivirus", **verifica la ruta y la firma del binario**. Es exactamente el disfraz que usan los atacantes: llamarse como algo legítimo.

## Errores que se pagan caros

- **Cerrar por cansancio** al final del turno. Si no da tiempo, se traspasa; no se cierra.
- **Fiarse del nombre del proceso.** El nombre no es identidad: mira ruta, firma, padre y hash.
- **Investigar sólo la alerta.** El atacante hizo más cosas; la alerta es una de ellas, no todas.
- **Avisar al usuario demasiado pronto.** Si su equipo está comprometido, avisarle puede alertar al atacante que lee su correo.
- **Tocar el equipo antes de recoger evidencia.** Reiniciar borra la memoria, que es donde está la respuesta.
- **No dejar constancia de la hora en UTC.** Cruzar tres fuentes con tres zonas horarias distintas es la forma más rápida de llegar a una conclusión falsa.
