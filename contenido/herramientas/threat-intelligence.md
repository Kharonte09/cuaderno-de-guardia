---
titulo: Threat Intelligence
subtitulo: true
tarjetas: true
---

# Herramientas de Threat Intelligence

Todo lo que sirve para responder a la pregunta que más veces se hace en un SOC: **"esta IP / dominio / hash, ¿es malo?"**. Reputación, feeds de indicadores, sandboxes públicos y plataformas de intercambio.

> [!WARNING]
> Consultar es gratis, **subir no**. Cuando subes un fichero o una URL a un servicio público quedan registrados, y en muchos casos son visibles para terceros. Si el fichero puede contener datos del cliente (nóminas, contratos, un PDF interno), busca primero por hash y usa un sandbox privado.

## Multimotor y reputación general

### VirusTotal
`Multimotor` `Gratis + API` [virustotal.com](https://www.virustotal.com/)

**Para qué sirve:** analizar ficheros, hashes, URLs, dominios e IPs contra ~70 motores antivirus, y ver relaciones entre indicadores. Es la primera parada de casi cualquier análisis.

**Uso básico:**
1. Pega el **hash SHA256** antes de subir nada. Si ya está analizado, tienes el veredicto sin exponer el fichero.
2. Pestaña **Detections**: cuántos motores lo marcan. Ojo, 1/70 suele ser un falso positivo; 40/70 no.
3. Pestaña **Relations**: dominios contactados, IPs, ficheros que lo descargan. Aquí es donde se pivota.
4. Pestaña **Behavior**: resumen del sandbox (procesos, claves de registro, conexiones).
5. Pestaña **Community**: comentarios de analistas, a veces con el nombre de la familia.

> [!TIP]
> El nombre que da cada motor (`Trojan.GenericKD.12345`) es basura para clasificar. Fíjate mejor en los nombres de familias concretas de Kaspersky, ESET o Microsoft.

### Hybrid Analysis
`Sandbox` `Gratis con registro` [hybrid-analysis.com](https://www.hybrid-analysis.com/)

**Para qué sirve:** sandbox de Falcon (CrowdStrike) con informes públicos muy completos: capturas de pantalla del malware ejecutándose, árbol de procesos, IOC extraídos y mapeo a MITRE ATT&CK.

**Uso básico:** busca por hash; si existe informe, ve directo a *MITRE ATT&CK Matrix* y a *Extracted Strings / Network Analysis* para sacar IOC de red.

### IBM X-Force Exchange
`Reputación` `Gratis con registro` [exchange.xforce.ibmcloud.com](https://exchange.xforce.ibmcloud.com/)

**Para qué sirve:** puntuación de riesgo de IPs, URLs y hashes, con categorización y contexto histórico (a qué se dedicaba ese dominio antes). Buen segundo apoyo cuando VirusTotal no es concluyente.

### Cisco Talos Intelligence
`Reputación` `Gratis` [talosintelligence.com](https://talosintelligence.com/reputation_center)

**Para qué sirve:** reputación de IP y dominio desde la telemetría de Cisco, muy usada como referencia para correo. Dice si una IP está en listas de spam y su volumen de correo enviado.

**Uso básico:** en un caso de phishing, mete la IP del servidor emisor de la cabecera. Si Talos la clasifica como *Poor*, ya tienes un argumento sólido.

### Pulsedive
`Reputación` `Gratis + API` [pulsedive.com](https://pulsedive.com/)

**Para qué sirve:** enriquecer un indicador con riesgo, feeds donde aparece y datos pasivos (DNS, puertos, certificados). Muy cómodo por su vista de "todo en una página".

### AbuseIPDB
`Reputación IP` `Gratis + API` [abuseipdb.com](https://www.abuseipdb.com/)

**Para qué sirve:** ver si una IP ha sido denunciada por otros administradores (escaneo, fuerza bruta SSH, spam) y con qué frecuencia.

**Uso básico:** mira el **Confidence of Abuse** y, sobre todo, la *fecha* del último reporte. Una IP con 100 % de confianza pero último reporte hace dos años probablemente ya haya cambiado de dueño.

### GreyNoise
`Contexto` `Gratis limitado` [viz.greynoise.io](https://viz.greynoise.io/)

**Para qué sirve:** distinguir el **ruido de fondo de internet** (escáneres masivos, Shodan, Censys, bots) de un ataque dirigido contra ti. Es el mejor reductor de falsos positivos que existe para alertas perimetrales.

**Uso básico:** si GreyNoise clasifica la IP como *Benign* (Google, Cloudflare) o como escáner masivo, tu alerta baja de prioridad al instante. Si dice *unknown*, presta atención: puede ser dirigido.

> [!TIP]
> "Esta IP nos ha escaneado el puerto 443" + GreyNoise = *Internet scanner, visto por 3.000 sensores* → no es un ataque contra vosotros, es internet siendo internet.

## Bases de datos de muestras e IOC

### MalwareBazaar (abuse.ch)
`Muestras` `Gratis` [bazaar.abuse.ch](https://bazaar.abuse.ch/)

**Para qué sirve:** repositorio abierto de muestras de malware etiquetadas por familia. Sirve tanto para descargar muestras para el laboratorio como para identificar a qué familia pertenece un hash.

**Uso básico:** busca por hash → la etiqueta (`AgentTesla`, `Qakbot`) te da la familia. Las descargas van en ZIP con contraseña `infected`.

### ThreatFox (abuse.ch)
`IOC` `Gratis + API` [threatfox.abuse.ch](https://threatfox.abuse.ch/)

**Para qué sirve:** base de datos de IOC (IP, dominio, URL, hash) asociados a familias de malware concretas. Perfecto para responder "¿esta IP es un C2 conocido y de quién?".

### URLhaus (abuse.ch)
`URLs maliciosas` `Gratis + API` [urlhaus.abuse.ch](https://urlhaus.abuse.ch/)

**Para qué sirve:** URLs que distribuyen malware activamente. Muy útil cuando en un correo hay un enlace de descarga y quieres saber si ya está catalogado.

### Feodo Tracker (abuse.ch)
`C2` `Gratis` [feodotracker.abuse.ch](https://feodotracker.abuse.ch/)

**Para qué sirve:** lista de servidores de mando y control de botnets bancarias (Emotet, Dridex, TrickBot, QakBot). Su lista de IPs se puede meter directamente como bloqueo en el firewall.

### MalShare
`Muestras` `Gratis con API key` [malshare.com](https://malshare.com/)

**Para qué sirve:** otro repositorio comunitario de muestras, con API simple para automatizar descargas por hash.

### VirusShare
`Muestras` `Gratis con invitación` [virusshare.com](https://virusshare.com/)

**Para qué sirve:** archivo histórico enorme de muestras. Requiere solicitar cuenta, pero es la referencia para datasets de investigación.

## Plataformas de inteligencia

### MISP
`Plataforma` `Open source` [misp-project.org](https://www.misp-project.org/)

**Para qué sirve:** el estándar de facto para **almacenar, correlacionar y compartir** inteligencia entre organizaciones. Un MISP guarda eventos con sus atributos (IOC), etiquetas TLP y relaciones con actores.

**Uso básico:**
1. Se instala en tu infraestructura y se suscribe a *feeds* (CIRCL, abuse.ch, comunidades sectoriales).
2. Cada indicador se puede marcar como **IDS: yes/no** para exportarlo automáticamente al SIEM o al firewall.
3. Exporta en formatos listos para consumir: Suricata, Snort, STIX, CSV, OpenIOC.

> [!NOTE]
> Si trabajas en un SOC con clientes de un mismo sector, MISP es lo que convierte "lo vi en el cliente A" en "lo bloqueo en los clientes B, C y D".

### OpenCTI
`Plataforma` `Open source` [opencti.io](https://www.opencti.io/)

**Para qué sirve:** plataforma de inteligencia moderna basada en el modelo STIX 2.1. Frente a MISP, está más orientada a **conocimiento estructurado**: actores, campañas, técnicas ATT&CK y relaciones entre ellas, no sólo listas de IOC.

### AlienVault OTX
`Comunidad` `Gratis` [otx.alienvault.com](https://otx.alienvault.com/)

**Para qué sirve:** comunidad abierta donde los analistas publican *pulses* (colecciones de IOC sobre una campaña). Consulta rápida y API gratuita generosa.

**Uso básico:** busca el indicador; si aparece en pulses recientes, lee la descripción del pulse: normalmente explica la campaña entera.

### ThreatMiner
`Pivoting` `Gratis` [threatminer.org](https://www.threatminer.org/)

**Para qué sirve:** pivotar entre indicadores y **informes públicos**: introduces un hash y te dice en qué informes de APT aparece. Muy bueno para atribución rápida.

### Recorded Future / Mandiant Advantage / Anomali
`Comercial` `De pago` [recordedfuture.com](https://www.recordedfuture.com/)

**Para qué sirve:** inteligencia comercial con analistas propios, informes de actores y puntuación de riesgo integrable en el SIEM. Se mencionan porque son los nombres que aparecen en las ofertas de empleo; su valor está en el contexto y el análisis humano, no en la lista de IOC.

## Sandboxes públicos

### ANY.RUN
`Sandbox interactivo` `Gratis limitado` [any.run](https://any.run/)

**Para qué sirve:** sandbox **interactivo**: ves el escritorio de la máquina y puedes hacer clic tú mismo. Es la única forma cómoda de detonar cadenas que requieren interacción (abrir el ZIP, meter la contraseña del correo, pulsar "Habilitar edición").

**Uso básico:**
1. Sube el fichero o pega la URL y elige Windows 7/10.
2. Interactúa como lo haría la víctima.
3. Al terminar, mira el árbol de procesos, las conexiones HTTP y el apartado de IOC.

> [!CAUTION]
> En el plan gratuito **todos tus análisis son públicos**. No subas nada del cliente.

### Triage (Hatching / Recorded Future)
`Sandbox` `Gratis con registro` [tria.ge](https://tria.ge/)

**Para qué sirve:** sandbox automático muy rápido con extracción de **configuración de familias** conocidas (te saca directamente el C2 de un stealer). Informes limpios y buena API.

### Joe Sandbox
`Sandbox` `Gratis limitado` [joesandbox.com](https://www.joesandbox.com/)

**Para qué sirve:** informes extremadamente detallados, con análisis de comportamiento profundo y clasificación. La versión Cloud Basic es gratis y pública.

### CAPE Sandbox
`Sandbox` `Open source` [capesandbox.com](https://capesandbox.com/)

**Para qué sirve:** sandbox open source (evolución de Cuckoo) especializado en **desempaquetado y extracción de configuraciones**. Existe instancia pública y se puede montar en local.

### Intezer Analyze
`Similitud de código` `Gratis limitado` [analyze.intezer.com](https://analyze.intezer.com/)

**Para qué sirve:** compara el **código** de la muestra con bases de código conocidas (malware, software legítimo, librerías). Responde "esto reutiliza código de X familia" cuando los antivirus no dicen nada.

## Vulnerabilidades y exposición

### NVD / CVE
`Referencia` `Gratis` [nvd.nist.gov](https://nvd.nist.gov/)

**Para qué sirve:** ficha oficial de cada vulnerabilidad: descripción, CVSS, productos afectados y referencias. Es la fuente de verdad para "¿qué es CVE-2024-XXXX?".

### CISA KEV
`Priorización` `Gratis` [cisa.gov/known-exploited-vulnerabilities-catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)

**Para qué sirve:** catálogo de vulnerabilidades **explotadas de verdad en el mundo real**. Si un CVE está en KEV, se parchea ya, tenga el CVSS que tenga.

> [!TIP]
> Para priorizar parches: KEV primero, luego EPSS (probabilidad de explotación), y sólo después CVSS. El CVSS mide gravedad teórica, no urgencia.

### EPSS
`Priorización` `Gratis` [first.org/epss](https://www.first.org/epss/)

**Para qué sirve:** da la probabilidad estimada de que un CVE sea explotado en los próximos 30 días. Complementa a KEV para lo que aún no ha sido explotado.

### Exploit-DB
`Exploits` `Gratis` [exploit-db.com](https://www.exploit-db.com/)

**Para qué sirve:** archivo de exploits públicos. En defensa sirve para saber si existe PoC público de un CVE, lo que dispara la urgencia del parche.

### VulDB / Vulners
`Agregador` `Freemium` [vulners.com](https://vulners.com/)

**Para qué sirve:** buscador transversal de vulnerabilidades, exploits y parches con API, útil para automatizar la vigilancia de un inventario tecnológico.
