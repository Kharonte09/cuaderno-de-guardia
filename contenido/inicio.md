---
titulo: Inicio
subtitulo: true
---

# Apuntes de Ciberseguridad

Apuntes abiertos de ciberseguridad defensiva: **herramientas, fundamentos y cómo se trabaja en un SOC**. Sirven como referencia rápida para el día a día y como guía ordenada para quien está empezando.

<div class="stats">
  <div class="stat"><b>125</b><span>Herramientas fichadas</span></div>
  <div class="stat"><b>6</b><span>Modelos y fundamentos</span></div>
  <div class="stat"><b>5</b><span>Guías del oficio</span></div>
  <div class="stat"><b>4</b><span>Cheatsheets</span></div>
</div>

## Quién escribe esto

Me llamo **David** y trabajo en seguridad defensiva. Esto empezó siendo mi cuaderno: lo que iba aprendiendo, las herramientas que acababa buscando dos veces y las cosas que me habría gustado tener ordenadas cuando empecé.

Lo publico porque me costó encontrar material en español que fuera **práctico y honesto**, sin vender humo ni dar por sabida la mitad. Se actualiza según voy aprendiendo, así que habrá huecos y cosas por pulir. Si ves un error, se agradece el aviso.

## Empezar aquí

Si acabas de llegar al sector, empieza por la primera.

<div class="card-grid">
  <a class="card" href="#/por-donde-empezar">
    <span class="card-ico">🚀</span><b>Por dónde empezar</b>
    <span>De cero al primer empleo: qué estudiar y en qué orden, dónde practicar, qué laboratorio montar, certificaciones y entrevista.</span>
  </a>
  <a class="card" href="#/como-usar">
    <span class="card-ico">🧭</span><b>Cómo usar estos apuntes</b>
    <span>Cómo está organizado, atajos de teclado y cómo añadir una nota nueva.</span>
  </a>
</div>

## Fundamentos

Los modelos que dan estructura al oficio. Se leen en este orden.

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
    <span>Qué indicadores duelen de verdad al atacante.</span>
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

Cómo se aplica todo lo anterior en un turno real.

<div class="card-grid">
  <a class="card" href="#/blue-team/que-es-un-soc">
    <span class="card-ico">🛡️</span><b>Qué es un SOC</b>
    <span>Niveles, roles, turnos y métricas que se miran de verdad.</span>
  </a>
  <a class="card" href="#/blue-team/triaje-de-alertas">
    <span class="card-ico">🔍</span><b>Triaje de alertas</b>
    <span>Método para pasar de "salta una alerta" a una conclusión.</span>
  </a>
  <a class="card" href="#/blue-team/respuesta-a-incidentes">
    <span class="card-ico">🚨</span><b>Respuesta a incidentes</b>
    <span>Las seis fases, contención y qué no hacer nunca.</span>
  </a>
  <a class="card" href="#/blue-team/logs-y-telemetria">
    <span class="card-ico">📊</span><b>Logs y telemetría</b>
    <span>Event IDs de Windows, Sysmon y logs de Linux que importan.</span>
  </a>
  <a class="card" href="#/blue-team/deteccion-y-reglas">
    <span class="card-ico">📝</span><b>Detección y reglas</b>
    <span>Sigma, YARA y Suricata: escribir la regla, no sólo consumirla.</span>
  </a>
</div>

## Herramientas

125 fichas con enlace, para qué sirve y uso básico.

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
    <span>Decodificar, convertir, comprobar y no perder tiempo.</span>
  </a>
</div>

## Cheatsheets

Sólo tablas y comandos, para consultar con el incidente delante.

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
> Estos apuntes son de **seguridad defensiva**. Muchas herramientas listadas son de doble uso: úsalas sólo sobre sistemas propios o con autorización expresa por escrito.
