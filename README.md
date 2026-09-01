# Cuaderno de Guardia

Apuntes abiertos de **ciberseguridad defensiva**, en español.

Recogen tres cosas: los modelos que estructuran el oficio, cómo se organiza el trabajo en un SOC, y fichas de las herramientas que se usan a diario. Sirven como referencia rápida durante un turno y como guía ordenada para quien está entrando en el sector.

**125 fichas de herramientas · 13 notas de fundamentos y oficio · 4 cheatsheets.**

Todo son ficheros Markdown, así que se leen directamente desde aquí.

---

## Si acabas de llegar al sector

**[Por dónde empezar](contenido/por-donde-empezar.md)** — qué hace realmente un analista de SOC, qué base técnica hace falta antes de la seguridad, una ruta de estudio en cinco fases, dónde practicar, qué laboratorio montar en casa, qué certificaciones existen y qué preguntan en la entrevista de analista junior.

## Fundamentos

Los modelos que dan estructura al oficio. Se leen en este orden.

| Nota | De qué va |
|---|---|
| [Conceptos básicos](contenido/fundamentos/conceptos-basicos.md) | Tríada CIA, amenaza vs. vulnerabilidad vs. riesgo, IOC vs. IOA, TTP, tipos de malware, equipos rojo/azul/morado y el glosario de siglas |
| [Cyber Kill Chain](contenido/fundamentos/cyber-kill-chain.md) | Las siete fases de una intrusión, dónde romper la cadena y las limitaciones del modelo |
| [MITRE ATT&CK](contenido/fundamentos/mitre-attack.md) | Tácticas, técnicas y procedimientos; las 14 tácticas de Enterprise y un incidente de ransomware mapeado paso a paso |
| [Pirámide del Dolor](contenido/fundamentos/piramide-del-dolor.md) | Por qué unas detecciones caducan en días y otras duran años |
| [Modelo del Diamante](contenido/fundamentos/modelo-diamante.md) | Adversario, capacidad, infraestructura y víctima; cómo pivotar entre indicadores |
| [Inteligencia de amenazas](contenido/fundamentos/inteligencia-de-amenazas.md) | Ciclo de inteligencia, niveles, TLP, escala del Almirantazgo, STIX/TAXII y fuentes |
| [IA y ciberseguridad](contenido/fundamentos/ia-y-ciberseguridad.md) | La IA como herramienta del defensor, como herramienta del atacante, y como objetivo |

## El trabajo en el SOC

| Nota | De qué va |
|---|---|
| [Qué es un SOC](contenido/blue-team/que-es-un-soc.md) | Niveles L1/L2/L3, tipos de SOC, métricas, fatiga de alertas y por dónde empezar a montar detección |
| [Triaje de alertas](contenido/blue-team/triaje-de-alertas.md) | Método para pasar de una alerta a una conclusión documentada, señales de alta fidelidad y falsos positivos habituales |
| [Respuesta a incidentes](contenido/blue-team/respuesta-a-incidentes.md) | Las seis fases PICERL, playbooks de ransomware y de cuenta comprometida, y la bitácora del incidente |
| [Logs y telemetría](contenido/blue-team/logs-y-telemetria.md) | Event IDs de Windows, Sysmon, logs de Linux, y qué recoger cuando el presupuesto es limitado |
| [Detección y reglas](contenido/blue-team/deteccion-y-reglas.md) | Escribir reglas Sigma, YARA y Suricata, y cómo se plantea una caza de amenazas |
| [Soft skills](contenido/blue-team/soft-skills.md) | En qué se diferencian de las hard skills, cuáles pesan en un turno y cómo se evalúan |

## Herramientas

Cada ficha responde a tres cosas: **qué es**, **para qué sirve** y **cómo se usa lo básico**.

| Categoría | Fichas | Qué incluye |
|---|---|---|
| [Threat Intelligence](contenido/herramientas/threat-intelligence.md) | 28 | VirusTotal, Talos, AbuseIPDB, GreyNoise, abuse.ch, MISP, OpenCTI, sandboxes públicos, CVE y KEV |
| [OSINT](contenido/herramientas/osint.md) | 28 | Shodan, Censys, crt.sh, Amass, theHarvester, Google Dorks, urlscan, Maltego, ExifTool |
| [Phishing y correo](contenido/herramientas/phishing.md) | 17 | MXToolbox, PhishTool, urlscan, SPF/DKIM/DMARC, oletools, análisis de adjuntos |
| [Red y tráfico](contenido/herramientas/red-y-trafico.md) | 17 | Wireshark, tshark, tcpdump, Suricata, Zeek, Arkime, Nmap, Security Onion |
| [DFIR y forense](contenido/herramientas/dfir-y-forense.md) | 17 | FTK Imager, KAPE, Velociraptor, Volatility, herramientas de Zimmerman, Hayabusa, cadena de custodia |
| [Utilidades](contenido/herramientas/utilidades.md) | 18 | CyberChef, Regex101, JWT.io, hashes, ipinfo, gestores de contraseñas |

## Cheatsheets

Sólo tablas y comandos, sin explicaciones, para consultar con el incidente delante.

- [Event IDs de Windows](contenido/cheatsheets/event-ids-windows.md) — Security, System, PowerShell y Sysmon, con las combinaciones que merecen alerta
- [Wireshark y red](contenido/cheatsheets/wireshark-y-red.md) — filtros, tshark, tcpdump, nmap, dig y puertos de memoria
- [Comandos de triaje](contenido/cheatsheets/comandos-de-triaje.md) — PowerShell y Linux para revisar un equipo sospechoso, Volatility y KAPE
- [Análisis de phishing](contenido/cheatsheets/analisis-de-phishing.md) — checklist de ocho pasos, de la cabecera al cierre del ticket

---

## Aviso

Apuntes personales de estudio, orientados a **seguridad defensiva**. Pueden contener errores o quedarse desactualizados: ante una decisión importante, contrasta con la documentación oficial.

Muchas de las herramientas listadas son de **doble uso**. Usarlas contra sistemas que no son tuyos, sin autorización expresa y por escrito, es un delito. Aquí se recogen para entender cómo funciona un ataque y poder defenderse de él.

## Correcciones y aportaciones

Si encuentras un error o algo mal explicado, abre un *issue*. Si quieres escribir, las convenciones de formato están en [Cómo usar estos apuntes](contenido/como-usar.md): una nota es un fichero Markdown en `contenido/` más una línea en `contenido/nav.json`.

## Versión web

El repositorio incluye una interfaz para leer los apuntes con buscador, tema claro/oscuro e índice de página. No necesita compilarse; para verla en local:

```bash
node serve.js    # y abrir http://localhost:4321
```

Hace falta un servidor porque las notas se cargan con `fetch()`, y abrir `index.html` con doble clic lo bloquea el navegador.

## Licencia

Contenido bajo [CC BY-SA 4.0](LICENSE): puedes copiarlo y adaptarlo citando la fuente y manteniendo la misma licencia. El código del sitio, bajo MIT.
