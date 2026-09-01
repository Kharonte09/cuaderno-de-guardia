---
titulo: Cyber Kill Chain
subtitulo: true
---

# Cyber Kill Chain

Modelo publicado por **Lockheed Martin en 2011** que describe una intrusión como una cadena de siete fases. Su idea central: el atacante necesita completar todas las fases; al defensor le basta con romper una.

## Las siete fases

<figure class="diagrama">
<svg viewBox="0 0 760 132" role="img" aria-label="Las siete fases de la Cyber Kill Chain: reconocimiento, preparación, distribución, explotación, instalación, mando y control, y acciones sobre objetivos.">
  <line x1="56" y1="42" x2="704" y2="42" class="linea"/>
  <g>
    <circle cx="56"  cy="42" r="19" class="nodo"/><text class="num" x="56"  y="47" text-anchor="middle">1</text>
    <text class="tenue" x="56"  y="84" text-anchor="middle">Reconoci-</text>
    <text class="tenue" x="56"  y="99" text-anchor="middle">miento</text>
  </g>
  <g>
    <circle cx="164" cy="42" r="19" class="nodo"/><text class="num" x="164" y="47" text-anchor="middle">2</text>
    <text class="tenue" x="164" y="84" text-anchor="middle">Prepa-</text>
    <text class="tenue" x="164" y="99" text-anchor="middle">ración</text>
  </g>
  <g>
    <circle cx="272" cy="42" r="19" class="nodo"/><text class="num" x="272" y="47" text-anchor="middle">3</text>
    <text class="tenue" x="272" y="84" text-anchor="middle">Distri-</text>
    <text class="tenue" x="272" y="99" text-anchor="middle">bución</text>
  </g>
  <g>
    <circle cx="380" cy="42" r="19" class="nodo"/><text class="num" x="380" y="47" text-anchor="middle">4</text>
    <text class="tenue" x="380" y="84" text-anchor="middle">Explo-</text>
    <text class="tenue" x="380" y="99" text-anchor="middle">tación</text>
  </g>
  <g>
    <circle cx="488" cy="42" r="19" class="nodo"/><text class="num" x="488" y="47" text-anchor="middle">5</text>
    <text class="tenue" x="488" y="84" text-anchor="middle">Insta-</text>
    <text class="tenue" x="488" y="99" text-anchor="middle">lación</text>
  </g>
  <g>
    <circle cx="596" cy="42" r="19" class="nodo"/><text class="num" x="596" y="47" text-anchor="middle">6</text>
    <text class="tenue" x="596" y="84" text-anchor="middle">Mando y</text>
    <text class="tenue" x="596" y="99" text-anchor="middle">control</text>
  </g>
  <g>
    <circle cx="704" cy="42" r="19" class="nodo"/><text class="num" x="704" y="47" text-anchor="middle">7</text>
    <text class="tenue" x="704" y="84" text-anchor="middle">Acciones</text>
    <text class="tenue" x="704" y="99" text-anchor="middle">sobre objetivos</text>
  </g>
  <text class="eje" x="56" y="126">Fuera de tu red</text>
  <text class="eje" x="704" y="126" text-anchor="end">Dentro de tu red</text>
</svg>
<figcaption>El atacante necesita completar las siete; al defensor le basta con romper una.</figcaption>
</figure>

### 1. Reconocimiento

El atacante recopila información sobre el objetivo: empleados en LinkedIn, direcciones de correo, tecnologías expuestas, proveedores, dominios.

- **Qué usa:** OSINT, Shodan, Google Dorks, redes sociales, escaneo de puertos.
- **Detección:** difícil, ocurre en gran parte fuera de tu red. Escaneos en el perímetro, consultas anómalas al DNS, registro de dominios parecidos al tuyo.
- **Defensa:** reducir la exposición pública, vigilar registros de dominios *typosquatting*, formar a la plantilla sobre lo que publica.

### 2. Preparación (*Weaponization*)

Se construye el artefacto: un documento con macro, un ejecutable empaquetado, un LNK dentro de un ISO, un enlace a una página de credenciales.

- **Detección:** ninguna directa; ocurre en la infraestructura del atacante. Aquí es donde la **inteligencia de amenazas** aporta: saber qué está preparando un actor antes de que llegue.
- **Defensa:** anticiparse con feeds de IOC y reglas YARA de familias conocidas.

### 3. Distribución (*Delivery*)

El artefacto llega a la víctima: correo, USB, web comprometida, mensaje en Teams, anuncio malicioso.

- **Detección:** pasarela de correo, proxy web, sandbox de adjuntos, filtrado DNS.
- **Defensa:** filtrado de correo con reescritura de URLs, bloqueo de extensiones peligrosas (`.iso`, `.lnk`, `.js`, `.hta`), navegación restringida, concienciación.

> [!TIP]
> Ésta es la fase **más rentable** para invertir. Bloquear en la entrega es barato; responder tras el cifrado es carísimo.

### 4. Explotación

Se ejecuta el código: el usuario abre la macro, se explota una vulnerabilidad del navegador, se aprovecha un servicio sin parchear.

- **Detección:** EDR (creación de procesos anómala), Sysmon Event ID 1, alertas de explotación.
- **Defensa:** parcheo, deshabilitar macros de internet por GPO, ASR rules de Defender, EMET/Exploit Guard, mínimo privilegio.

### 5. Instalación

El atacante se asegura de sobrevivir a un reinicio: clave `Run`, tarea programada, servicio, WMI, DLL sideloading.

- **Detección:** Sysmon 11/12/13 (fichero y registro), Autoruns, EDR, Event ID 7045 (servicio nuevo), 4698 (tarea creada).
- **Defensa:** control de aplicaciones (AppLocker/WDAC), revisión de puntos de arranque, alertar sobre binarios ejecutando desde `%TEMP%` o `%APPDATA%`.

### 6. Mando y control (C2)

El equipo comprometido contacta con el servidor del atacante y queda a la espera de órdenes. Es la fase donde el ataque pasa de automático a **manual**.

- **Detección:** beaconing regular, DNS a dominios recién registrados, JA3 conocidos, tráfico a IPs de hosting no habituales, Zeek `conn.log`.
- **Defensa:** proxy con inspección, filtrado DNS, bloqueo de salida por defecto (sólo se permite lo necesario), listas de C2 de Feodo Tracker.

> [!IMPORTANT]
> Ésta es la **última oportunidad barata**. Si cortas el C2, el atacante tiene un implante mudo. Después de aquí, todo son daños.

### 7. Acciones sobre objetivos

Lo que venía a hacer: robar datos, cifrar, moverse lateralmente, escalar a Domain Admin, sabotear.

- **Detección:** volumen anómalo de salida, accesos masivos a ficheros, borrado de copias de seguridad (`vssadmin delete shadows`), creación de cuentas de administrador.
- **Defensa:** segmentación, DLP, copias inmutables y fuera de línea, monitorización de cuentas privilegiadas.

## Cómo se usa

La utilidad práctica no es recitarla, sino **mapear tus controles a cada fase** y ver dónde tienes agujeros:

| Fase | Detección | Bloqueo | ¿Cubierto? |
|---|---|---|---|
| Reconocimiento | Logs de perímetro | WAF, rate limiting | Parcial |
| Distribución | Pasarela de correo | Filtrado de adjuntos | Sí |
| Explotación | EDR | ASR, parcheo | Sí |
| Instalación | Sysmon + SIEM | AppLocker | Parcial |
| C2 | Proxy, DNS | Bloqueo de salida | **No** |
| Acciones | DLP, SIEM | Segmentación | **No** |


La doctrina de acciones defensivas asociada al modelo es: **detectar, denegar, interrumpir, degradar, engañar y contener**.

## Limitaciones

Conviene conocerlas, porque también se preguntan:

- **Es muy lineal.** Un ataque real salta fases, itera, y el movimiento lateral significa volver a empezar dentro de la red.
- **Se centra en el malware y el perímetro.** Un ataque con credenciales válidas robadas se salta las fases 2 a 5 enteras: entra por la VPN y ya está dentro.
- **No cubre bien la amenaza interna** ni los ataques a la nube o a la identidad.
- **Todo el peso está en las primeras fases**, cuando hoy la mayor parte del daño ocurre en las últimas.

Por eso se complementa con:

- **[MITRE ATT&CK](#/fundamentos/mitre-attack)**, mucho más granular y sin asumir orden.
- **Unified Kill Chain** (Paul Pols, 2017), que fusiona ambos en 18 fases y sí cubre el movimiento lateral y el pivote entre sistemas.

> [!NOTE]
> Regla mental útil: la Kill Chain sirve para **explicar** un ataque a alguien no técnico o a dirección; ATT&CK sirve para **trabajar** con él en detección.
