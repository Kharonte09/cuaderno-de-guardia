---
titulo: MITRE ATT&CK
subtitulo: true
---

# MITRE ATT&CK

Guía completa de **tácticas y técnicas usadas por adversarios**, útil tanto para defensores como para equipos ofensivos.

**Para el defensor:** identificar en qué áreas tienes buena o mala visibilidad, mejorar la detección con alertas y reglas, y apoyar la caza proactiva dentro de la red.

**Para el ofensivo:** emular adversarios en pentest o Red Team, replicando las tácticas de actores conocidos para probar la capacidad de detección del equipo azul y encontrar los puntos ciegos.

MITRE mantiene además **[D3FEND](https://d3fend.mitre.org/)**, el catálogo equivalente pero de contramedidas defensivas.

> [!TIP]
> El uso más rentable del framework no es memorizarlo: es **pintar tu cobertura encima**. Marcas qué técnicas detectarías hoy y cuáles no, y el mapa que sale te dice dónde invertir. A eso se le llama *ATT&CK Navigator* y es una herramienta de MITRE.

## Vocabulario

| Nivel | Qué es | Ejemplo |
|---|---|---|
| **Táctica** | El *porqué*: el objetivo de la fase | Persistencia |
| **Técnica** | El *cómo* general | Ejecución automática al arranque |
| **Procedimiento** | La implementación concreta de un actor | Una clave `Run` que lanza un `.js` desde `%APPDATA%` |

---

## 1. Initial Access — TA0001

Cómo entra el adversario por primera vez en la red.

| Técnica | Descripción |
|---|---|
| **T1566** — Phishing | El método de acceso inicial **más usado**: correo y robo de credenciales |
| **T1133** — Servicios remotos externos | VPN, RDP o SSH, normalmente con cuentas válidas robadas |
| **T1091** — Medios extraíbles | Malware introducido por USB u otro dispositivo físico |

MITRE da para cada técnica sus **mitigaciones y recomendaciones de detección**.

## 2. Execution — TA0002

Cómo ejecuta el código malicioso una vez dentro.

| Técnica | Descripción |
|---|---|
| **T1047** — WMI | Ejecutar código en remoto aprovechando servicios legítimos de administración |
| **T1204** — Ejecución de usuario | Engañar al usuario para que abra el enlace o el fichero |

## 3. Persistence

Mantener el acceso de forma encubierta.

| Técnica | Descripción |
|---|---|
| **T1547** — Arranque o inicio de sesión automático | Claves del registro o carpetas de inicio que relanzan el malware |
| **T1133** — Servicios remotos externos | Reconectarse con credenciales válidas por RDP, SSH o VPN |

## 4. Privilege Escalation

Conseguir más permisos: de usuario estándar a administrador, o a administrador de dominio.

| Técnica | Descripción |
|---|---|
| **T1078** — Cuentas válidas | Credenciales privilegiadas obtenidas por phishing o reutilización de contraseñas |
| **T1068** — Explotación de vulnerabilidad | Ejecutar código con privilegios elevados: SYSTEM en Windows, root en Linux |

## 5. Defense Evasion

Evadir o desactivar las defensas —antivirus, EDR, firewalls, logging y analistas— para permanecer oculto el mayor tiempo posible.

| Técnica | Descripción |
|---|---|
| **T1562** — Impair Defenses | Debilitar o desactivar antivirus, firewalls y sistemas de registro |
| **T1070** — Indicator Removal | Borrar logs, ficheros, historial de comandos y marcas de tiempo |

> [!WARNING]
> T1070 es la razón por la que los logs se envían a un SIEM externo en vez de dejarlos solo en la máquina. Un atacante con privilegios borra el `Security.evtx` local; lo que ya salió de la máquina, no.

## 6. Credential Access

Robar usuarios y contraseñas para moverse por la red **sin levantar sospechas**, usando accesos legítimos.

| Técnica | Descripción |
|---|---|
| **T1003** — OS Credential Dumping | Extraer credenciales de la memoria de LSASS en Windows, o de `/etc/passwd` y `/etc/shadow` en Linux para crackearlas offline |
| **T1110** — Brute Force | Probar combinaciones hasta encontrar una válida |

## 7. Discovery

Recopilar información sobre la red, los sistemas y los usuarios, ya estando dentro.

| Técnica | Descripción |
|---|---|
| **T1087** — Account Discovery | Enumerar cuentas locales, de dominio, de correo y de nube |
| **T1046** — Network Service Scanning | Identificar equipos y servicios activos |
| **T1083** — File and Directory Discovery | Buscar ficheros valiosos: credenciales, documentos, diagramas de red |

## 8. Lateral Movement

Desplazarse entre sistemas para ampliar el control hasta alcanzar lo crítico.

| Técnica | Descripción |
|---|---|
| **T1021** — Remote Services | RDP, SSH, SMB, VNC o WinRM con credenciales válidas |
| **T1534** — Internal Spearphishing | Correos maliciosos enviados **desde cuentas internas ya comprometidas** |

T1534 es de lo más difícil de detectar: el remitente es real, el dominio es el tuyo y pasa toda la autenticación.

## 9. Collection

Identificar, recopilar y preparar la información valiosa antes de sacarla.

| Técnica | Descripción |
|---|---|
| **T1114** — Recopilación de correo | Robar correo local o de Exchange/M365, o crear **reglas de reenvío ocultas** |
| **T1123** — Captura de audio | Usando el micrófono del sistema |
| **T1113** — Captura de pantalla | Para espiar la actividad del usuario |
| **T1005** — Datos del sistema local | Buscar y preparar los ficheros de interés |

## 10. Command and Control

Mantener la comunicación con los sistemas comprometidos.

Para ocultarse usa **protocolos comunes** (HTTP, HTTPS, DNS), **servicios web legítimos** (GitHub, Pastebin) y puertos no estándar, todo con el fin de mezclarse con el tráfico normal.

**Mitigación:** NIDS/NIPS, proxies, firewalls y segmentación de red. Junto al análisis de flujos sospechosos, certificados anómalos y uso de puertos inusuales. **Suricata**, **Snort** o **Zeek** permiten detectar estos comportamientos y cortar la comunicación.

## 11. Exfiltration

Sacar los datos, normalmente **comprimidos, cifrados o codificados** antes de enviarlos.

Puede usar el propio **canal de C2** para pasar desapercibido, enviando los ficheros de forma continua o a intervalos programados para confundirse con el tráfico normal.

**Detección:** vigilar procesos que acceden a ficheros **y además** establecen conexiones de red inusuales, y conexiones con paquetes grandes.

**Mitigación:** NIDS/NIPS (Snort, Zeek) para alertar o bloquear, y análisis de frecuencias de conexión y patrones de tráfico.

## 12. Impact

Dañar la disponibilidad o la integridad de los sistemas.

- **Eliminación del acceso a cuentas** — borrar usuarios, bloquearlos o cambiar contraseñas.
- **Defacement** — desfigurar sistemas o webs con mensajes ofensivos o de chantaje.
- **Cifrado de datos** — ransomware, para paralizar la operativa o extorsionar.

> [!IMPORTANT]
> Impact es la última fase, y para cuando la ves ya han pasado por casi todas las anteriores. Si tu única detección salta aquí, el ataque llevaba semanas dentro.
