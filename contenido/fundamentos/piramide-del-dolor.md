---
titulo: Pirámide del Dolor
subtitulo: true
---

# Pirámide del Dolor

Modelo de **David Bianco (2013)**. Ordena los tipos de indicador según **cuánto le duele al atacante** que se los detectes y bloquees. Cuanto más arriba, más caro le resulta adaptarse.

Responde a por qué bloquear IPs deja de servir a los pocos días.

## La pirámide

```text
   MÁS DOLOR PARA EL ATACANTE
   ^
   |   +---------------------------------------+
   |   |  TTPs                     ¡Brutal!    |  <- Rediseñar su forma de operar
   |   +---------------------------------------+
   |   |  Herramientas             Difícil     |  <- Buscar o desarrollar otra
   |   +---------------------------------------+
   |   |  Artefactos de red/host   Molesto     |  <- Rehacer el implante
   |   +---------------------------------------+
   |   |  Nombres de dominio       Fastidioso  |  <- Registrar y propagar otro
   |   +---------------------------------------+
   |   |  Direcciones IP           Fácil       |  <- Cambiar de VPS
   |   +---------------------------------------+
   |   |  Valores hash             Trivial     |  <- Recompilar: hash nuevo
   |   +---------------------------------------+
```

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

