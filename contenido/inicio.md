---
titulo: Inicio
---

# Cuaderno de Guardia

## ¿Dónde estoy?

En unos apuntes de **ciberseguridad defensiva**. Hay cuatro bloques: los modelos que estructuran el oficio, cómo se organiza el trabajo en un SOC, fichas de herramientas y chuletas de consulta rápida.

Se puede leer de arriba abajo, como un curso, o ir directo a lo que necesites con el buscador (tecla <kbd>/</kbd>).

## Quién escribe esto

Me llamo **David** y trabajo en seguridad defensiva. Esto empezó siendo mi cuaderno: lo que iba aprendiendo, las herramientas que acababa buscando dos veces y las cosas que me habría gustado tener ordenadas cuando empecé.

Lo publico por si le sirve a alguien más. Se actualiza según voy aprendiendo, así que hay huecos y cosas sin pulir. Si ves un error, se agradece el aviso.

## Empezar aquí

<div class="card-grid">
  <a class="card" href="#/por-donde-empezar">
    <span class="card-ico">🚀</span><b>Por dónde empezar</b>
    <span>Qué estudiar y en qué orden, dónde practicar, qué laboratorio montar, certificaciones y entrevista.</span>
  </a>
  <a class="card" href="#/como-usar">
    <span class="card-ico">🧭</span><b>Cómo usar estos apuntes</b>
    <span>Cómo está organizado, atajos de teclado y cómo añadir una nota nueva.</span>
  </a>
</div>

## Fundamentos

<div class="card-grid">
  <a class="card" href="#/fundamentos/conceptos-basicos">
    <span class="card-ico">🧠</span><b>Conceptos básicos</b>
    <span>CIA, amenaza vs. riesgo, IOC vs. IOA, TTP, tipos de malware, siglas.</span>
  </a>
  <a class="card" href="#/fundamentos/cyber-kill-chain">
    <span class="card-ico">⛓️</span><b>Cyber Kill Chain</b>
    <span>Las 7 fases de una intrusión y dónde romper la cadena.</span>
  </a>
  <a class="card" href="#/fundamentos/mitre-attack">
    <span class="card-ico">🎯</span><b>MITRE ATT&CK</b>
    <span>Tácticas, técnicas y procedimientos con lenguaje común.</span>
  </a>
  <a class="card" href="#/fundamentos/piramide-del-dolor">
    <span class="card-ico">🔺</span><b>Pirámide del Dolor</b>
    <span>Qué indicadores le cuestan más al atacante.</span>
  </a>
  <a class="card" href="#/fundamentos/modelo-diamante">
    <span class="card-ico">💎</span><b>Modelo del Diamante</b>
    <span>Adversario, capacidad, infraestructura y víctima.</span>
  </a>
  <a class="card" href="#/fundamentos/inteligencia-de-amenazas">
    <span class="card-ico">📡</span><b>Inteligencia de amenazas</b>
    <span>Ciclo de inteligencia, niveles, TLP, STIX/TAXII y fuentes.</span>
  </a>
</div>

## El trabajo en el SOC

<div class="card-grid">
  <a class="card" href="#/blue-team/que-es-un-soc">
    <span class="card-ico">🛡️</span><b>Qué es un SOC</b>
    <span>Niveles, roles, turnos y métricas.</span>
  </a>
  <a class="card" href="#/blue-team/triaje-de-alertas">
    <span class="card-ico">🔍</span><b>Triaje de alertas</b>
    <span>De la alerta a una conclusión documentada.</span>
  </a>
  <a class="card" href="#/blue-team/respuesta-a-incidentes">
    <span class="card-ico">🚨</span><b>Respuesta a incidentes</b>
    <span>Las seis fases, contención y playbooks.</span>
  </a>
  <a class="card" href="#/blue-team/logs-y-telemetria">
    <span class="card-ico">📊</span><b>Logs y telemetría</b>
    <span>Event IDs de Windows, Sysmon y logs de Linux que importan.</span>
  </a>
  <a class="card" href="#/blue-team/deteccion-y-reglas">
    <span class="card-ico">📝</span><b>Detección y reglas</b>
    <span>Escribir reglas Sigma, YARA y Suricata.</span>
  </a>
</div>

## Herramientas

<div class="card-grid">
  <a class="card" href="#/herramientas/threat-intelligence">
    <span class="card-ico">🛰️</span><b>Threat Intelligence</b>
    <span>Reputación de IP, dominios y hashes. Feeds, IOC y sandboxes públicos.</span>
  </a>
  <a class="card" href="#/herramientas/osint">
    <span class="card-ico">🔎</span><b>OSINT</b>
    <span>Reconocimiento de infraestructura, personas, dominios y filtraciones.</span>
  </a>
  <a class="card" href="#/herramientas/phishing">
    <span class="card-ico">🎣</span><b>Phishing y correo</b>
    <span>Cabeceras, URL, adjuntos, SPF/DKIM/DMARC y simulación.</span>
  </a>
  <a class="card" href="#/herramientas/red-y-trafico">
    <span class="card-ico">🌐</span><b>Red y tráfico</b>
    <span>PCAP, IDS, escaneo y monitorización de red.</span>
  </a>
  <a class="card" href="#/herramientas/dfir-y-forense">
    <span class="card-ico">🧪</span><b>DFIR y forense</b>
    <span>Adquisición, artefactos de Windows, memoria y línea temporal.</span>
  </a>
  <a class="card" href="#/herramientas/utilidades">
    <span class="card-ico">🧰</span><b>Utilidades</b>
    <span>Decodificar, convertir y comprobar.</span>
  </a>
</div>

## Cheatsheets

<div class="card-grid">
  <a class="card" href="#/cheatsheets/event-ids-windows">
    <span class="card-ico">🪟</span><b>Event IDs de Windows</b>
    <span>Security, System, PowerShell y Sysmon, con las combinaciones que alertan.</span>
  </a>
  <a class="card" href="#/cheatsheets/wireshark-y-red">
    <span class="card-ico">🦈</span><b>Wireshark y red</b>
    <span>Filtros, tshark, tcpdump, nmap, dig y puertos de memoria.</span>
  </a>
  <a class="card" href="#/cheatsheets/comandos-de-triaje">
    <span class="card-ico">⌨️</span><b>Comandos de triaje</b>
    <span>PowerShell y Linux para mirar un equipo sospechoso. Volatility y KAPE.</span>
  </a>
  <a class="card" href="#/cheatsheets/analisis-de-phishing">
    <span class="card-ico">📧</span><b>Análisis de phishing</b>
    <span>Checklist de ocho pasos, de la cabecera al cierre del ticket.</span>
  </a>
</div>

> [!WARNING]
> Usa estas herramientas sólo sobre sistemas tuyos o con permiso por escrito.
