---
titulo: Qué es un SOC
subtitulo: true
---

# Qué es un SOC

Un **Security Operations Center** es el equipo (y el conjunto de procesos y tecnología) responsable de vigilar, detectar, analizar y responder a incidentes de seguridad de forma continua. Suele operar 24×7 en turnos.

Un SOC no es un SIEM: es personas, procesos y tecnología, en ese orden de importancia.

## Niveles y roles

| Nivel | Qué hace | Perfil |
|---|---|---|
| **L1 · Analista de triaje** | Recibe las alertas, aplica el playbook, descarta falsos positivos, escala lo dudoso | Puerta de entrada al sector |
| **L2 · Analista de investigación** | Investiga en profundidad lo escalado, correlaciona fuentes, determina el alcance | 2-4 años de experiencia |
| **L3 · Respuesta e ingeniería** | Incidentes graves, forense, caza de amenazas, escribe detecciones | Senior |
| **Threat Hunter** | Busca proactivamente lo que no ha generado alerta, partiendo de hipótesis | Senior |
| **Ingeniero de detección** | Crea y afina reglas, mide cobertura, reduce falsos positivos | Especialista |
| **Ingeniero de plataforma** | Mantiene SIEM, EDR, integraciones y recolección de logs | Perfil de sistemas |
| **Analista de CTI** | Produce inteligencia, alimenta detecciones y avisa de campañas | Especialista |
| **SOC Manager** | Turnos, métricas, escalado, relación con cliente y con dirección | Gestión |

> [!NOTE]
> En SOCs pequeños o de MSSP, una misma persona hace L1, L2 y a veces ingeniería. El modelo de tres niveles es una referencia, no una obligación. Hay una tendencia clara hacia SOCs "sin niveles" donde el analista lleva el caso de principio a fin y la automatización se come el trabajo de L1.

## Tipos de SOC

- **Interno**: la empresa lo monta y lo opera. Máximo conocimiento del negocio, coste alto (un 24×7 real requiere unas 8-10 personas mínimo).
- **MSSP / SOC gestionado**: se contrata a un proveedor que vigila a muchos clientes. Más barato, menos contexto del negocio.
- **MDR** (*Managed Detection and Response*): como el MSSP pero con capacidad de responder, no sólo avisar.
- **Híbrido**: el proveedor cubre noches y fines de semana; el equipo interno el horario laboral y la respuesta.
- **Virtual / bajo demanda**: sin turnos permanentes, con retenedor de respuesta a incidentes.

## Flujo de trabajo típico

```text
  FUENTES DE DATOS          DETECCIÓN              PERSONAS

 +---------------+       +--------------+     +--------------+
 | EDR / Sysmon  |------>|              |     |              |
 | Firewall      |------>|     SIEM     |---->|  L1  triaje  |
 | Proxy y DNS   |------>|   + reglas   |     |              |
 | AD/Identidad  |------>|              |     +------+-------+
 | Correo        |------>|              |            | escala
 | Cloud         |------>+------+-------+            v
 | Servidores    |              |             +--------------+
 +---------------+              | enriquece   |  L2 análisis |
                                v             +------+-------+
                        +---------------+            | incidente
                        |  SOAR  /  CTI |            v
                        +---------------+     +--------------+
                                              |  L3  /  IR   |
                                              +--------------+
```

## Métricas

| Métrica | Qué mide | Por qué importa |
|---|---|---|
| **MTTD** | Tiempo medio hasta detectar | Cuanto antes se detecta, menor es el impacto |
| **MTTA** | Tiempo medio hasta que alguien coge la alerta | Detecta problemas de dimensionamiento |
| **MTTR** | Tiempo medio hasta contener/resolver | Mide la eficacia de la respuesta |
| **Tasa de falsos positivos** | % de alertas sin valor | Por encima del 90 % el equipo se quema |
| **Cobertura ATT&CK** | Técnicas con detección | Muestra huecos reales |
| **Alertas por analista y turno** | Carga | Más de ~20-30 significativas por turno no es sostenible |
| **Escalados correctos** | Calidad del triaje de L1 | Mide formación, no castiga |

> [!WARNING]
> Medir el **número de alertas cerradas** incentiva cerrar rápido y mal. Mejor medir tiempo de detección y calidad de la investigación.

## Fatiga de alertas

Un SOC recibe miles de alertas al día y la mayoría no aportan nada. Qué funciona:

1. **Afinar en origen.** Cada falso positivo recurrente es una regla que hay que corregir.
2. **Automatizar el enriquecimiento.** Que la alerta llegue ya con reputación de la IP, contexto del usuario y hash consultado. Ahorra el 70 % del tiempo de triaje.
3. **Agrupar.** 300 alertas del mismo equipo son **un** incidente, no 300.
4. **Suprimir con criterio y con fecha.** Toda excepción debe tener dueño y caducidad, o el SIEM acaba ciego.
5. **Priorizar por activo, no sólo por severidad.** La misma alerta en el portátil de prácticas y en el controlador de dominio no son lo mismo.

## Casos de uso: por dónde empezar

Si hay que montar detección desde cero, este es un orden razonable por relación valor/esfuerzo:

1. Inicios de sesión fallidos masivos y *password spraying* (4625, 4771).
2. Inicio de sesión exitoso desde país/IP inusual, y viajes imposibles.
3. Creación de usuarios y cambios en grupos privilegiados (4720, 4728, 4732).
4. PowerShell codificado u ofuscado (`-enc`, `-w hidden`, `IEX`).
5. Procesos hijos anómalos de Office (Word/Excel → cmd/PowerShell/wscript).
6. Borrado de instantáneas de volumen y de logs (`vssadmin`, 1102).
7. Servicios y tareas programadas nuevas (7045, 4698).
8. Acceso a memoria de LSASS.
9. Conexiones salientes a dominios recién registrados o a IPs de C2 conocidas.
10. Detecciones del antivirus/EDR **no remediadas**.

> [!TIP]
> Las cinco primeras cubren la mayoría de intrusiones que empiezan por phishing o por credenciales robadas.

## Un turno realista

- **Relevo**: leer las notas del turno anterior, casos abiertos, cambios en curso, mantenimientos programados (evita investigar un "ataque" que era el equipo de sistemas).
- **Cola de alertas**: triar por prioridad, no por antigüedad.
- **Casos abiertos**: seguimiento de lo escalado.
- **Vigilancia**: avisos de CTI, boletines, vulnerabilidades críticas del día.
- **Mejora**: si sobra tiempo, afinar una regla o documentar un playbook.
- **Traspaso**: dejar por escrito lo que queda pendiente.
