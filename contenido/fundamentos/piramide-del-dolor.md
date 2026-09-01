---
titulo: Pirámide del Dolor
subtitulo: true
---

# Pirámide del Dolor

Modelo de **David Bianco (2013)**. Ordena los tipos de indicador según **cuánto le duele al atacante** que se los detectes y bloquees. Cuanto más arriba, más caro le resulta adaptarse.

Responde a por qué bloquear IPs deja de servir a los pocos días.

## La pirámide

<figure class="diagrama">
<svg viewBox="0 0 700 358" role="img" aria-label="Pirámide del Dolor: de abajo arriba, hashes (trivial), direcciones IP (fácil), nombres de dominio (fastidioso), artefactos de red y host (molesto), herramientas (difícil) y TTP (brutal).">
  <defs>
    <!-- El marcador se dibuja apuntando a la derecha; orient="auto" lo gira
         según la dirección de la línea. -->
    <marker id="pd-punta" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
      <path d="M0.5 0.5 L8.5 4.5 L0.5 8.5 Z" class="punta"/>
    </marker>
  </defs>
  <!-- Eje de dolor creciente -->
  <line x1="46" y1="342" x2="46" y2="26" class="flecha" marker-end="url(#pd-punta)"/>
  <text class="eje" x="30" y="184" transform="rotate(-90 30 184)" text-anchor="middle">Más dolor para el atacante</text>
  <!-- Escalones, de la cúspide a la base -->
  <g>
    <rect x="300" y="26"  width="220" height="46" rx="6" class="caja" fill-opacity="1" style="fill:color-mix(in srgb, var(--accent) 34%, var(--bg-inset))"/>
    <text x="318" y="55">TTP</text>
    <text class="tenue" x="502" y="55" text-anchor="end">¡Brutal!</text>
  </g>
  <g>
    <rect x="270" y="78"  width="280" height="46" rx="6" class="caja" style="fill:color-mix(in srgb, var(--accent) 26%, var(--bg-inset))"/>
    <text x="288" y="107">Herramientas</text>
    <text class="tenue" x="532" y="107" text-anchor="end">Difícil</text>
  </g>
  <g>
    <rect x="240" y="130" width="340" height="46" rx="6" class="caja" style="fill:color-mix(in srgb, var(--accent) 19%, var(--bg-inset))"/>
    <text x="258" y="159">Artefactos de red y host</text>
    <text class="tenue" x="562" y="159" text-anchor="end">Molesto</text>
  </g>
  <g>
    <rect x="210" y="182" width="400" height="46" rx="6" class="caja" style="fill:color-mix(in srgb, var(--accent) 13%, var(--bg-inset))"/>
    <text x="228" y="211">Nombres de dominio</text>
    <text class="tenue" x="592" y="211" text-anchor="end">Fastidioso</text>
  </g>
  <g>
    <rect x="180" y="234" width="460" height="46" rx="6" class="caja" style="fill:color-mix(in srgb, var(--accent) 8%, var(--bg-inset))"/>
    <text x="198" y="263">Direcciones IP</text>
    <text class="tenue" x="622" y="263" text-anchor="end">Fácil</text>
  </g>
  <g>
    <rect x="150" y="286" width="520" height="46" rx="6" class="caja"/>
    <text x="168" y="315">Valores hash</text>
    <text class="tenue" x="652" y="315" text-anchor="end">Trivial</text>
  </g>
</svg>
<figcaption>Cuanto más arriba detectas, más caro le sale al atacante seguir operando.</figcaption>
</figure>

## Nivel a nivel

### Hashes — Trivial

MD5, SHA1, SHA256 de un fichero concreto.

- **Al atacante le cuesta:** nada. Cambiar un byte, recompilar o volver a empaquetar genera un hash completamente distinto. Muchos *builders* generan una muestra única por víctima.
- **Sirve para:** confirmar una muestra conocida, buscar en VirusTotal, bloquear una campaña muy concreta.
- **No sirve para:** protegerte de mañana.

### Direcciones IP — Fácil

- **Al atacante le cuesta:** unos euros y cinco minutos. Levanta otro VPS, rota por Tor o usa infraestructura en cloud legítima.
- **Sirve para:** bloqueo perimetral rápido durante una campaña activa.
- **Ojo:** bloquear una IP de un CDN o de un cloud grande puede tirar servicios legítimos. Y una IP maliciosa hoy puede ser un servidor legítimo dentro de un mes.

### Nombres de dominio — Fastidioso

- **Al atacante le cuesta:** registrar, pagar, esperar propagación DNS y actualizar sus implantes. Horas o días.
- **Sirve para:** filtrado DNS, barato de desplegar y efectivo mientras el dominio siga activo.
- **Nota:** los DGA (algoritmos generadores de dominios) están pensados justo para abaratar este nivel; se contrarrestan detectando el **patrón** de consultas, no los dominios uno a uno.

### Artefactos de red y host — Molesto

Patrones que delatan la herramienta aunque cambie de servidor: un *user-agent* característico, una URI concreta, un JA3/JA4 de TLS, un nombre de mutex, una clave de registro específica, un nombre de servicio.

- **Al atacante le cuesta:** modificar y volver a probar su implante, o cambiar de perfil C2.
- **Sirve para:** reglas Suricata, reglas YARA sobre memoria, detecciones de EDR.
- **Ejemplo:** los perfiles Malleable C2 por defecto de Cobalt Strike tienen URIs y cabeceras reconocibles; muchos operadores no las cambian.

### Herramientas — Difícil

Detectar la herramienta en sí, con independencia de su configuración: Mimikatz, PsExec, Cobalt Strike, Rclone, AdFind, SoftPerfect Network Scanner.

- **Al atacante le cuesta:** buscar una alternativa, aprenderla y reconstruir su flujo de trabajo. Semanas.
- **Sirve para:** reglas YARA sólidas, detección por comportamiento del EDR, control de aplicaciones.
- **Ejemplo:** detectar cualquier acceso al proceso `lsass.exe` con permisos de lectura de memoria detecta Mimikatz y sus variantes, estén ofuscadas o no.

### TTP — ¡Brutal!

El comportamiento: cómo entra, cómo escala, cómo se mueve, en qué orden.

- **Al atacante le cuesta:** rediseñar su forma de operar y volver a entrenarse. Meses, y a veces le sale más rentable buscar otra víctima.
- **Sirve para:** detecciones que siguen funcionando meses o años después.
- **Ejemplos:**
  - Un proceso de Office lanzando un intérprete de comandos.
  - Un binario firmado cargando una DLL desde `%APPDATA%` (*sideloading*).
  - Borrado de instantáneas de volumen.
  - Un usuario normal autenticándose contra 40 equipos en 3 minutos.
  - Compresión masiva de ficheros seguida de subida a un servicio de almacenamiento.

## Cómo se aplica en la práctica

> [!IMPORTANT]
> No significa "no uses IOC". Significa **saber qué esperas de cada nivel**: los de abajo son baratos, automáticos y desechables; los de arriba son caros de construir pero duran.

Un SOC sano se organiza así:

| Nivel | Cómo se gestiona | Caducidad |
|---|---|---|
| Hashes, IPs | Feeds automáticos al firewall/SIEM, sin intervención humana | Días |
| Dominios | Filtrado DNS automatizado + revisión de dominios recién registrados | Semanas |
| Artefactos | Reglas Suricata/YARA mantenidas por el equipo | Meses |
| Herramientas | Reglas de comportamiento del EDR, control de aplicaciones | Años |
| TTP | Reglas Sigma propias, caza de amenazas, ejercicios purple | Años |

**La pregunta que hay que hacerse ante cada detección nueva:** *"si el atacante cambia de servidor mañana, ¿esta regla sigue funcionando?"*. Si la respuesta es no, está en la base de la pirámide, y hay que buscar la versión de arriba de esa misma detección.

## Ejemplo de subida por la pirámide

Llega un aviso: *"IP 203.0.113.45 es C2 de un stealer"*.

1. **Hash/IP** → bloqueo la IP en el firewall. Hecho en un minuto, caduca en días.
2. **Dominio** → paso resolución inversa y DNS pasivo: la IP aloja 12 dominios de la campaña. Los bloqueo todos en el DNS.
3. **Artefacto** → analizo una muestra: el implante usa el user-agent `Mozilla/5.0 (Windows NT 6.1) Custom` y pide `/api/gate.php`. Escribo una regla Suricata.
4. **Herramienta** → identifico la familia (RedLine). Aplico una regla YARA de la familia sobre memoria en toda la flota con Velociraptor.
5. **TTP** → veo que llega siempre como adjunto ISO con LNK que lanza PowerShell. Escribo una regla Sigma: *proceso hijo de `explorer.exe` ejecutando `powershell.exe` con `-enc` desde un volumen montado*. Esta regla sigue valiendo para la siguiente campaña.

