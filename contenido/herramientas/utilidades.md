---
titulo: Utilidades del día a día
subtitulo: true
tarjetas: true
---

# Utilidades del día a día

Las herramientas pequeñas que se usan veinte veces al día: decodificar, convertir, comprobar, comparar. No son glamurosas, pero son las que marcan la diferencia entre tardar dos minutos o media hora.

## Decodificar y transformar

### CyberChef
`Navaja suiza` `Open source` [gchq.github.io/CyberChef](https://gchq.github.io/CyberChef/)

**Para qué sirve:** encadena operaciones ("recetas") para decodificar, descifrar, extraer y analizar datos: Base64, hex, XOR, gzip, URL encoding, JWT, regex, entropía.

**Recetas que se usan constantemente:**

| Situación | Receta |
|---|---|
| PowerShell con `-EncodedCommand` | `From Base64` → `Decode text (UTF-16LE)` |
| Cadena Base64 dentro de una macro | `From Base64` → `Strip null bytes` |
| Payload ofuscado con XOR | `XOR Brute Force` (busca la clave sola) |
| Sacar todas las URLs de un blob | `Extract URLs` |
| Ver qué es un fichero desconocido | `Detect File Type` + `Entropy` |
| Token JWT de un login sospechoso | `JWT Decode` |
| Deshacer varias capas | `Magic` (adivina la codificación y la deshace) |

> [!TIP]
> La operación **Magic** con *Intensive mode* resuelve la mayoría de ofuscaciones de una capa. Conviene probarla antes de deshacerlas a mano.

### Base64Decode / URLDecode
`Rápido` `Gratis` [base64decode.org](https://www.base64decode.org/)

**Para qué sirve:** cuando sólo necesitas decodificar una cadena y no quieres abrir CyberChef. Cuidado con pegar datos sensibles en webs de terceros.

### JWT.io
`Tokens` `Gratis` [jwt.io](https://jwt.io/)

**Para qué sirve:** decodificar y validar tokens JWT. En una investigación de cuenta comprometida, el token revela emisor, claims, caducidad y a veces la aplicación implicada.

### Regex101
`Expresiones regulares` `Gratis` [regex101.com](https://regex101.com/)

**Para qué sirve:** escribir y depurar expresiones regulares con explicación en tiempo real. Imprescindible para construir reglas de SIEM, Sigma o grep sin volverse loco.

**Uso básico:** elige el "flavor" correcto (PCRE para la mayoría de SIEM, RE2 si es Go). El panel derecho explica cada token.

### Explainshell
`Comandos` `Gratis` [explainshell.com](https://explainshell.com/)

**Para qué sirve:** pega un comando de Linux largo y te explica qué hace cada flag. Muy útil cuando encuentras un comando sospechoso en un log y no reconoces las opciones.

## Comprobar e identificar

### VirusTotal
`Multimotor` `Gratis + API` [virustotal.com](https://www.virustotal.com/)

**Para qué sirve:** consulta de hash, URL, IP o dominio. Ficha completa en [Threat Intelligence](#/herramientas/threat-intelligence).

### Calculadora de hashes
`Hashes` `Gratis` [emn178.github.io/online-tools/sha256_checksum.html](https://emn178.github.io/online-tools/sha256_checksum.html)

**Para qué sirve:** sacar el SHA256 de un fichero. En local es más rápido y seguro:

```powershell
Get-FileHash -Algorithm SHA256 fichero.exe     # Windows
```
```bash
sha256sum fichero.exe                          # Linux
```

### ipinfo.io / ip-api
`Geolocalización` `Freemium` [ipinfo.io](https://ipinfo.io/)

**Para qué sirve:** país, ASN, organización y tipo (hosting, residencial, VPN) de una IP. El **ASN** es más informativo que el país: una IP en un ASN de hosting búlgaro conectando a tu VPN merece una mirada.

```bash
curl ipinfo.io/8.8.8.8
```

### Certificate Decoder / SSL Labs
`TLS` `Gratis` [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest/)

**Para qué sirve:** auditar la configuración TLS de un servidor propio (protocolos, cifrados, cadena de certificados) y ver detalles de certificados sospechosos.

### Browserling
`Navegador remoto` `Gratis limitado` [browserling.com](https://www.browserling.com/)

**Para qué sirve:** abrir una web sospechosa desde un navegador desechable en la nube.

### AnyDesk/TeamViewer ID lookup y comprobación de bulos
`Verificación` `Gratis` [maldita.es](https://maldita.es/)

**Para qué sirve:** contrastar campañas de fraude y bulos que llegan por WhatsApp o correo. En incidentes de fraude al usuario, ahorra explicaciones tener la referencia pública.

## Contraseñas y credenciales

### Have I Been Pwned
`Filtraciones` `Gratis` [haveibeenpwned.com](https://haveibeenpwned.com/)

**Para qué sirve:** comprobar exposición de correos y contraseñas. La API **Pwned Passwords** permite comprobar contraseñas por k-anonimato sin enviarlas enteras.

### KeePassXC / Bitwarden
`Gestor` `Open source` [keepassxc.org](https://keepassxc.org/)

**Para qué sirve:** gestor de contraseñas. Recomendación profesional básica: KeePassXC si la base debe quedarse en local, Bitwarden si hace falta sincronización y compartir en equipo.

### Hashcat / John the Ripper
`Auditoría` `Open source` [hashcat.net](https://hashcat.net/hashcat/)

**Para qué sirve:** auditar la robustez de las contraseñas de tu propio dominio (con autorización) y, en DFIR, identificar el tipo de hash encontrado.

```bash
hashcat --identify hashes.txt        # ¿qué tipo de hash es esto?
```

> [!CAUTION]
> Crackear hashes de un sistema que no es tuyo, o sin autorización expresa del responsable, es acceso ilícito. En una auditoría interna, que conste por escrito en el alcance.

## Documentación y trabajo

### Obsidian
`Notas` `Gratis` [obsidian.md](https://obsidian.md/)

**Para qué sirve:** notas en Markdown enlazadas entre sí, en local. Sirve para mantener apuntes de investigación y de casos.

### draw.io / Excalidraw
`Diagramas` `Gratis` [app.diagrams.net](https://app.diagrams.net/)

**Para qué sirve:** dibujar la topología del incidente, la cadena de ataque o el flujo de datos para el informe.

### Timeline Explorer
`Tablas` `Gratis` [ericzimmerman.github.io](https://ericzimmerman.github.io/)

**Para qué sirve:** abrir CSV enormes (millones de filas) con filtros y marcado de líneas. Es el visor con el que se leen las salidas de KAPE, Plaso y las herramientas de Zimmerman.

### Notion / Markdown + Git
`Documentación` `Freemium` [notion.so](https://www.notion.so/)

**Para qué sirve:** mantener actualizados los playbooks y procedimientos del SOC, y accesibles fuera de horario.

## Trucos de línea de comandos

**Windows / PowerShell**

```powershell
Get-FileHash -Algorithm SHA256 fichero.exe
Get-Process | Where-Object { $_.Path -like "*\Temp\*" }        # procesos ejecutando desde temporales
Get-NetTCPConnection -State Established | Select LocalPort,RemoteAddress,OwningProcess
Get-WinEvent -FilterHashtable @{LogName='Security'; ID=4625} -MaxEvents 50
Get-ScheduledTask | Where-Object State -ne "Disabled"           # persistencia por tareas
```

**Linux**

```bash
ss -tulpn                          # puertos abiertos y proceso
lsof -i -P -n                      # conexiones por proceso
last -a | head -20                 # últimos inicios de sesión
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn
find / -mtime -1 -type f 2>/dev/null   # ficheros modificados en 24 h
```

> [!TIP]
> El último `grep` de `auth.log` devuelve el ranking de IPs con más intentos fallidos, que es lo que se necesita ante una fuerza bruta por SSH.
