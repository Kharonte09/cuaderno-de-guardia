---
titulo: Defensas preventivas
subtitulo: true
---

# Defensas preventivas

Los controles que se despliegan antes del incidente, agrupados por dónde actúan: host, red, correo, físico y humano.

---

# Defensas de host

Protegen servidores y endpoints.

## HIDS y HIPS

| | Qué hace |
|---|---|
| **HIDS** — *Host Intrusion Detection System* | Detecta actividad sospechosa y **genera alertas** para que las analice una persona |
| **HIPS** — *Host Intrusion Prevention System* | Detecta y **actúa automáticamente**: bloquea conexiones, elimina ficheros, alerta |

La diferencia entre detección y prevención es quién decide. El HIPS es más rápido, pero un falso positivo suyo tira un servicio en producción.

## Antivirus

- **Basado en firmas** — detecta malware conocido comparando patrones. Solo reconoce lo que ya se ha visto antes.
- **Basado en comportamiento** — identifica actividad anómala respecto a la línea base del sistema. Puede pillar lo que no tiene firma.

Se implementa siempre en PCs, portátiles **y servidores**.

## Registro centralizado

Los endpoints envían sus logs al **SIEM** o a un servidor Syslog. Es lo que permite correlacionar eventos entre máquinas y generar alertas.

## EDR

Agentes instalados en los endpoints que **monitorizan, registran y reaccionan**. Permiten investigación forense y análisis de comportamiento de usuarios internos, y se integran con el SIEM y con las herramientas DFIR.

## Firewall local

Controla el tráfico entrante y saliente **por sistema**. Permite definir qué puertos están abiertos y bloquear conexiones no autorizadas.

Su valor real es frenar el **movimiento lateral**: sin él, una máquina comprometida habla libremente con todas las demás de su segmento.

## Políticas de grupo (GPO)

Objetos de política aplicados en Windows por orden de precedencia:

1. Políticas locales
2. Políticas de sitio
3. Políticas de dominio
4. Políticas de OU

**Usos típicos:** limitar privilegios (administrador local restringido), forzar contraseñas fuertes, desplegar software y parches, redirigir carpetas a almacenamiento centralizado.

| Ventajas | Debilidades |
|---|---|
| Administración sencilla | Se actualizan cada **90–120 minutos** |
| Control centralizado | En una emergencia hay que forzar reinicio u otra vía |
| Seguridad estandarizada | |

---

# Defensas de red

## NIDS y NIPS

| | Qué hace |
|---|---|
| **NIDS** | Detecta actividad sospechosa y genera alertas |
| **NIPS** | Detecta y **bloquea automáticamente** |

### Cómo se coloca el NIDS

- **En línea** — todo el tráfico pasa por él, así que se comporta como NIPS.
- **Interrupción de red** — conectado físicamente en el camino.
- **Pasivo (SPAN)** — recibe una **copia** del tráfico reflejada desde un switch. No puede bloquear, pero tampoco puede tirar la red.

**Productos:** **Snort**, **Suricata** y **Zeek/Bro**, que pueden funcionar como NIDS y como NIPS.

## Firewalls

| Tipo | Qué inspecciona |
|---|---|
| **Tradicional** | Reglas por IP, puerto y protocolo. Ejemplo: pfSense |
| **NGFW** | Hasta capa de aplicación: permite o restringe apps concretas |
| **WAF** | Proxy entre el usuario y la aplicación web; protege de escaneos y ataques a la app |

Su función es **separar redes y crear zonas**, controlando el tráfico en ambos sentidos.

## Monitorización de eventos

Los dispositivos de red generan logs que van al SIEM:

- **Proxy web** — sitios visitados, URLs maliciosas.
- **Firewall perimetral** — escaneo de puertos, DDoS.

## NAC — Network Access Control

- **Preadmisión** — verifica antivirus, parches y cumplimiento **antes** de dejar conectar.
- **Post-admisión** — controla el acceso por roles (RBAC) y restringe recursos.

Especialmente útil en BYOD y redes de invitados.

## Proxy web

Intermediario entre el usuario e Internet. Bloquea el acceso a sitios maliciosos o restringidos, y puede alimentarse de **inteligencia de amenazas** para bloquear URLs conocidas de phishing o malware.

---

# Defensas de correo

## Autenticación

- **SPF** — qué servidores pueden enviar en nombre del dominio.
- **DKIM** — firma criptográfica que verifica integridad y remitente.
- **DMARC** — qué hacer si SPF o DKIM fallan: `none`, `quarantine`, `reject`.

## Marcado de correo externo

Etiquetar con **[EXTERNO]** en asunto o cuerpo. Aumenta la atención del usuario antes de abrir adjuntos o enlaces.

## Filtros de spam

**Gateway** (detrás del firewall, tipo Barracuda), **alojados** (en nube, tipo SpamTitan) y **de escritorio** (en el equipo del usuario).

## DLP

Detecta o bloquea el envío de información confidencial hacia fuera, apoyándose en palabras clave como "confidencial" o "propietario".

## Sandboxing de adjuntos

Ejecuta el adjunto en un entorno virtual aislado y observa su comportamiento **antes** de entregárselo al usuario.

## Restricciones de adjuntos

Bloquear solo los tipos de alto riesgo que usa el malware:

```text
.exe  .vbs  .js  .iso  .bat  .ps1  .htm  .html
```

## Concienciación

Formación rutinaria sobre phishing, campañas simuladas para medir la respuesta, y **reentrenamiento** para quien cae.

---

# Defensas físicas

## Disuasivos

- **Señales de advertencia** — avisan de que el acceso es ilegal.
- **Cercas** — ralentizan al intruso.
- **Perros guardianes** y **guardias de seguridad** — presencia disuasoria.
- **Iluminación** — elimina zonas oscuras y hace útiles las cámaras.

## Controles de acceso

- **Mantrap** — sala intermedia controlada antes del área protegida. Es lo que evita el *tailgating*: entrar detrás de alguien que sí tiene acceso.
- **Torniquetes y puertas con tarjeta**.
- **Puertas electrónicas** que limitan el acceso según el rol.
- **Guardias** que verifican identificación manualmente.

## Monitorización

- **CCTV** — cámaras interconectadas para vigilancia en tiempo real.
- **Guardias** que operan y responden a las alertas.
- **Detectores de intrusión** — movimiento, calor o sonido, que activan alarmas.

---

# Defensas humanas

El factor humano es el eslabón más débil, así que se trabaja con educación, políticas y participación.

## Formación en concienciación

Obligatoria al incorporarse y **anualmente**. Contenido: suplantación de identidad, políticas internas, buenas prácticas en redes sociales.

## Política de uso aceptable (AUP)

Define qué está permitido y qué no en los dispositivos y redes corporativas:

- No visitar determinados sitios.
- No instalar aplicaciones no autorizadas.
- **No compartir credenciales.**
- No sacar dispositivos sin permiso.

Con las consecuencias del incumplimiento escritas claramente.

## Incentivos

Programas de **"campeones de seguridad"** que reconocen comportamientos positivos: agradecimientos, vales, reconocimiento interno. Refuerzan la cultura mejor que las sanciones.

## Simulaciones de phishing

Cada **3–4 meses**. Se mide:

- Clics en enlaces falsos
- Correos denunciados
- Empleados reincidentes

Plataformas: Sophos Phish Threat, GoPhish, PhishingBox, Trend Micro.

> [!TIP]
> La métrica que de verdad importa no es cuántos pican, es **cuántos reportan**. Un empleado que pica y avisa en dos minutos te da margen de reacción; uno que pica y calla por vergüenza, no.

## Canal de denuncia

Permitir avisos **anónimos** sobre comportamientos sospechosos. Ayuda a detectar amenazas internas antes de que se materialicen.
