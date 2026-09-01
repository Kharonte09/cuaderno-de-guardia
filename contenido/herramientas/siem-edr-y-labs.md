---
titulo: SIEM, EDR y laboratorios
subtitulo: true
tarjetas: true
---

# SIEM, EDR y laboratorios

Las plataformas donde vive el trabajo diario de un SOC, y los entornos donde practicar sin romper nada.

## SIEM y gestión de logs

### Wazuh
`SIEM + HIDS` `Open source` [wazuh.com](https://wazuh.com/)

**Para qué sirve:** plataforma libre que junta HIDS, gestión de logs, monitorización de integridad de ficheros, detección de vulnerabilidades y cumplimiento normativa. Con agente en cada endpoint y consola central.

**Uso básico:** es el SIEM que se monta en un laboratorio casero para aprender: despliegas el manager, instalas agentes en un Windows y un Linux, y ya tienes alertas reales que triar. Sus decodificadores y reglas son legibles y editables.

### Elastic Stack (ELK) / Elastic Security
`SIEM` `Open source + comercial` [elastic.co/security](https://www.elastic.co/security)

**Para qué sirve:** Elasticsearch + Logstash/Beats + Kibana como base para almacenar y consultar cualquier volumen de logs. Elastic Security añade reglas de detección, casos y capacidades EDR.

**Uso básico:** el lenguaje es **KQL** en Kibana Discover:
```
event.code: "4625" and winlog.event_data.TargetUserName: "administrador"
process.name: "powershell.exe" and process.args: *EncodedCommand*
```

### Splunk
`SIEM` `De pago (Free hasta 500 MB/día)` [splunk.com](https://www.splunk.com/)

**Para qué sirve:** el SIEM comercial de referencia. Su valor está en SPL, un lenguaje de búsqueda muy expresivo, y en la enorme cantidad de apps de integración.

**SPL básico:**
```
index=windows EventCode=4625
| stats count by Account_Name, src_ip
| where count > 10
| sort - count
```

> [!TIP]
> Splunk Free permite indexar 500 MB al día sin coste: suficiente para un laboratorio en casa y para practicar SPL, que aparece en muchísimas ofertas de empleo.

### Microsoft Sentinel
`SIEM cloud` `De pago (consumo)` [learn.microsoft.com/azure/sentinel](https://learn.microsoft.com/en-us/azure/sentinel/)

**Para qué sirve:** SIEM/SOAR nativo de Azure, muy extendido en organizaciones con Microsoft 365. Se consulta con **KQL** (Kusto), que conviene aprender porque también sirve para Defender y Log Analytics.

```kusto
SecurityEvent
| where EventID == 4624 and LogonType == 10
| summarize Intentos = count() by Account, IpAddress
| where Intentos > 5
```

### Graylog
`Logs` `Open source` [graylog.org](https://graylog.org/)

**Para qué sirve:** gestión de logs centralizada, más ligera de operar que ELK, con buena gestión de streams, alertas y pipelines de normalización.

### Security Onion
`Distribución` `Open source` [securityonion.net](https://securityonion.net/)

**Para qué sirve:** todo en uno para monitorización de seguridad: Zeek, Suricata, Elastic, Kibana, CyberChef y herramientas de caso. La forma más rápida de tener un SOC de laboratorio completo.

## EDR / XDR

### Microsoft Defender for Endpoint
`EDR` `De pago (licencia M365)` [learn.microsoft.com/defender-endpoint](https://learn.microsoft.com/en-us/defender-endpoint/)

**Para qué sirve:** el EDR más habitual en parques Windows. Su *Advanced Hunting* con KQL da acceso a la telemetría cruda de todos los endpoints.

```kusto
DeviceProcessEvents
| where FileName == "powershell.exe"
| where ProcessCommandLine has_any ("-enc", "-w hidden", "DownloadString")
| project Timestamp, DeviceName, AccountName, ProcessCommandLine
```

### CrowdStrike Falcon / SentinelOne
`EDR` `De pago` [crowdstrike.com](https://www.crowdstrike.com/)

**Para qué sirve:** los EDR líderes del mercado. Aportan detección por comportamiento, contención de host en un clic y telemetría muy rica. Se citan porque son los nombres que verás en ofertas y en informes de incidentes.

### Velociraptor
`EDR ligero + DFIR` `Open source` [docs.velociraptor.app](https://docs.velociraptor.app/)

**Para qué sirve:** aunque es sobre todo forense, sus reglas de monitorización permiten usarlo como EDR abierto: detecta eventos en el endpoint y responde a hunts en toda la flota.

### osquery
`Consulta de endpoint` `Open source` [osquery.io](https://osquery.io/)

**Para qué sirve:** expone el sistema operativo como una **base de datos SQL**. Consultas procesos, puertos, usuarios o software instalado con `SELECT`, en Windows, Linux y macOS por igual.

```sql
SELECT name, path, pid FROM processes WHERE on_disk = 0;   -- procesos sin fichero en disco
SELECT * FROM startup_items;                                -- persistencia
```

### Sysmon
`Telemetría` `Gratis` [learn.microsoft.com/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon)

**Para qué sirve:** es lo que convierte un Windows normal en un endpoint monitorizable de verdad. Registra creación de procesos con hash y línea de comandos, conexiones de red por proceso, carga de drivers y cambios de registro.

**Uso básico:** no lo instales con la configuración por defecto. Usa una plantilla de la comunidad:
```powershell
sysmon64.exe -accepteula -i sysmonconfig-export.xml
```
Las dos configuraciones de referencia son la de **SwiftOnSecurity** (más sencilla) y la de **Olaf Hartong** (modular, mapeada a ATT&CK).

Ver [Logs y telemetría](#/blue-team/logs-y-telemetria) para los Event IDs concretos.

## SOAR y gestión de casos

### TheHive + Cortex
`Gestión de casos` `Open source` [strangebee.com](https://www.strangebee.com/)

**Para qué sirve:** TheHive gestiona casos y tareas del SOC; **Cortex** ejecuta analizadores automáticos sobre los observables (consulta VirusTotal, AbuseIPDB, etc. de una tacada). Se integra con MISP.

### Shuffle
`SOAR` `Open source` [shuffler.io](https://shuffler.io/)

**Para qué sirve:** automatizar flujos entre herramientas sin escribir código: "si llega una alerta de X, enriquece con VirusTotal, si supera umbral crea caso en TheHive y avisa por Teams".

### n8n
`Automatización` `Open source` [n8n.io](https://n8n.io/)

**Para qué sirve:** automatización general que funciona muy bien como SOAR de bajo coste, con centenares de integraciones ya hechas.

## Emulación de adversario

### Atomic Red Team
`Pruebas` `Open source` [github.com/redcanaryco/atomic-red-team](https://github.com/redcanaryco/atomic-red-team)

**Para qué sirve:** ejecutar pruebas atómicas asociadas a técnicas concretas de ATT&CK para **comprobar si tus detecciones funcionan**. Es la forma honesta de saber si esa regla que escribiste salta.

```powershell
Invoke-AtomicTest T1059.001 -ShowDetails      # ver qué hace antes de lanzarlo
Invoke-AtomicTest T1059.001                   # ejecutar
Invoke-AtomicTest T1059.001 -Cleanup          # limpiar
```

> [!WARNING]
> Ejecuta esto **sólo** en máquinas de laboratorio y avisando al equipo. Son técnicas de ataque reales; en producción generarás incidentes de verdad.

### Caldera
`Emulación` `Open source` [caldera.mitre.org](https://caldera.mitre.org/)

**Para qué sirve:** plataforma de MITRE para emular cadenas de ataque completas de forma automatizada, no técnicas sueltas. Sirve para ejercicios de Purple Team.

### MITRE ATT&CK Navigator
`Cobertura` `Gratis` [mitre-attack.github.io/attack-navigator](https://mitre-attack.github.io/attack-navigator/)

**Para qué sirve:** pintar la matriz ATT&CK con tu cobertura de detección: qué técnicas cubres, cuáles no y dónde están tus huecos. Es el entregable que se enseña a dirección.

## Laboratorios y práctica

### TryHackMe
`Formación` `Freemium` [tryhackme.com](https://tryhackme.com/)

**Para qué sirve:** aprender guiado. Sus rutas **SOC Level 1 y SOC Level 2** cubren casi exactamente lo que hay en estos apuntes, con máquinas ya montadas.

### Blue Team Labs Online
`Ejercicios` `Freemium` [blueteamlabs.online](https://blueteamlabs.online/)

**Para qué sirve:** retos exclusivamente defensivos: analizar un phishing, un PCAP, un volcado de memoria o un incidente completo. Muy parecido al trabajo real.

### LetsDefend
`Simulador SOC` `Freemium` [letsdefend.io](https://letsdefend.io/)

**Para qué sirve:** simula una consola de SOC con alertas reales que hay que triar, cerrar o escalar. Es lo más cercano a un turno de L1.

### CyberDefenders
`Retos DFIR` `Freemium` [cyberdefenders.org](https://cyberdefenders.org/)

**Para qué sirve:** retos tipo *blue CTF* con evidencias reales (PCAP, memoria, discos) y preguntas que guían la investigación.

### Malware-Traffic-Analysis.net
`PCAP reales` `Gratis` [malware-traffic-analysis.net](https://www.malware-traffic-analysis.net/)

**Para qué sirve:** archivo enorme de capturas de infecciones reales con ejercicios y soluciones. El mejor recurso gratuito que existe para aprender análisis de tráfico malicioso.

### DetectionLab / Ludus
`Laboratorio` `Open source` [github.com/clong/DetectionLab](https://github.com/clong/DetectionLab)

**Para qué sirve:** despliega automáticamente un dominio Windows con Splunk, Sysmon, Velociraptor y todo instrumentado, para practicar detección en un entorno realista.

> [!TIP]
> Si sólo puedes montar un laboratorio, monta este: un Domain Controller, dos clientes Windows con Sysmon, un Wazuh o Splunk recogiendo, y una Kali para atacar desde fuera. Con eso se aprende más que con veinte cursos.
