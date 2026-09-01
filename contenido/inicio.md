---
titulo: Inicio
subtitulo: true
---

# Apuntes de Ciberseguridad

Una recopilación viva de **herramientas, conceptos y metodología** de ciberseguridad defensiva. Pensado para tenerlo abierto en la segunda pantalla mientras se analiza una alerta, un correo sospechoso o un indicador raro.

<div class="stats">
  <div class="stat"><b>8</b><span>Categorías de herramientas</span></div>
  <div class="stat"><b>170</b><span>Herramientas fichadas</span></div>
  <div class="stat"><b>7</b><span>Marcos y modelos</span></div>
  <div class="stat"><b>5</b><span>Guías de Blue Team</span></div>
</div>

## Herramientas por categoría

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
  <a class="card" href="#/herramientas/analisis-malware">
    <span class="card-ico">🦠</span><b>Análisis de malware</b>
    <span>Estático, dinámico, sandbox e ingeniería inversa.</span>
  </a>
  <a class="card" href="#/herramientas/red-y-trafico">
    <span class="card-ico">🌐</span><b>Red y tráfico</b>
    <span>PCAP, IDS, escaneo y monitorización de red.</span>
  </a>
  <a class="card" href="#/herramientas/dfir-y-forense">
    <span class="card-ico">🧪</span><b>DFIR y forense</b>
    <span>Adquisición, artefactos de Windows, memoria y línea temporal.</span>
  </a>
  <a class="card" href="#/herramientas/siem-edr-y-labs">
    <span class="card-ico">🖥️</span><b>SIEM, EDR y labs</b>
    <span>Plataformas de detección, SOAR, emulación y máquinas de práctica.</span>
  </a>
  <a class="card" href="#/herramientas/utilidades">
    <span class="card-ico">🧰</span><b>Utilidades</b>
    <span>Decodificar, convertir, comprobar y no perder tiempo.</span>
  </a>
</div>

## Fundamentos y modelos

<div class="card-grid">
  <a class="card" href="#/fundamentos/conceptos-basicos">
    <span class="card-ico">🧠</span><b>Conceptos básicos</b>
    <span>CIA, amenaza vs. riesgo, IOC vs. IOA, TTP, tipos de malware.</span>
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
  <a class="card" href="#/fundamentos/marcos-y-normativa">
    <span class="card-ico">📐</span><b>Marcos y normativa</b>
    <span>NIST CSF, NIST 800-61, ISO 27001, CIS Controls, NIS2.</span>
  </a>
</div>

## Blue Team en la práctica

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

## Cómo está montado esto

Cada nota es un fichero **Markdown** dentro de `contenido/`. La web no tiene compilación: el navegador carga el `.md` y lo pinta. Eso significa que se puede leer igual de bien desde GitHub que desde la web, y que añadir una nota es crear un fichero.

> [!TIP]
> Pulsa <kbd>/</kbd> en cualquier momento para saltar al buscador. Busca por herramienta ("*volatility*"), por concepto ("*pirámide*") o por lo que recuerdes del texto.

> [!WARNING]
> Estos apuntes son de **seguridad defensiva**. Muchas herramientas listadas son de doble uso: úsalas sólo sobre sistemas propios o con autorización expresa por escrito.
