---
titulo: OSINT
subtitulo: true
tarjetas: true
---

# Herramientas de OSINT

OSINT es **inteligencia a partir de fuentes abiertas**: todo lo que se puede averiguar sin tocar el objetivo ni saltarse ningún control. En defensa se usa para dos cosas: enriquecer indicadores durante una investigación, y ver qué expone tu propia organización antes de que lo vea otro.

> [!WARNING]
> Muchas de estas herramientas hacen consultas **activas** contra el objetivo (Amass, Nmap, algunos módulos de SpiderFoot). Eso ya no es OSINT pasivo y puede ser ilegal sin autorización. Antes de lanzar nada contra un dominio que no es tuyo, ten el permiso por escrito.

## Infraestructura y dominios

### Shodan
`Buscador` `Freemium` [shodan.io](https://www.shodan.io/)

**Para qué sirve:** buscador de **dispositivos conectados a internet**. Indexa banners de servicios, así que responde a "qué tiene expuesto esta IP/organización" sin escanear tú nada.

**Uso básico:**
- `org:"Nombre Empresa"` — todo lo expuesto por una organización.
- `net:203.0.113.0/24` — un rango concreto.
- `ssl:"empresa.com"` — servidores cuyo certificado menciona el dominio (encuentra hosts olvidados).
- `port:3389 country:ES` — RDP expuesto en España.
- `product:"Apache" version:"2.4.49"` — servicios en versión vulnerable.

> [!TIP]
> Para revisar la superficie de ataque propia: `org:` y `ssl:`, ordenando por *last seen*. Suelen aparecer entornos de preproducción olvidados.

### Censys
`Buscador` `Freemium` [search.censys.io](https://search.censys.io/)

**Para qué sirve:** alternativa a Shodan con datos de certificados más ricos y mejor consulta estructurada. Excelente para encontrar **infraestructura del atacante** que comparte certificado o configuración.

**Uso básico:** `services.tls.certificates.leaf_data.subject.common_name: "malo.com"` para localizar todos los servidores que usan ese certificado.

### FOFA / ZoomEye
`Buscador` `Freemium` [fofa.info](https://fofa.info/)

**Para qué sirve:** buscadores equivalentes de origen chino. Su interés está en que a veces indexan hosts que Shodan no ve, y su histórico es distinto.

### crt.sh
`Certificados` `Gratis` [crt.sh](https://crt.sh/)

**Para qué sirve:** consulta los registros de **Certificate Transparency**. Como todo certificado emitido queda registrado públicamente, es la forma más rápida y silenciosa de enumerar subdominios.

**Uso básico:** busca `%.empresa.com` y obtendrás el histórico de todos los subdominios que han pedido certificado, incluidos `vpn-test`, `jenkins` o `backup`.

### DNSdumpster
`DNS` `Gratis` [dnsdumpster.com](https://dnsdumpster.com/)

**Para qué sirve:** mapa visual de la infraestructura DNS de un dominio: registros MX, TXT, subdominios y hosts, con el resultado en un grafo.

### ViewDNS.info
`DNS` `Gratis` [viewdns.info](https://viewdns.info/)

**Para qué sirve:** consultas DNS y WHOIS desde el navegador: DNS histórico, IP compartida (*reverse IP lookup*), propagación, whois inverso.

**Uso básico:** *Reverse IP Lookup* sobre la IP de un dominio de phishing suele revelar decenas de dominios hermanos de la misma campaña.

### SecurityTrails
`DNS histórico` `Freemium` [securitytrails.com](https://securitytrails.com/)

**Para qué sirve:** histórico de DNS y WHOIS. Contesta a "¿a dónde apuntaba este dominio hace seis meses?", clave cuando el atacante ya ha movido su infraestructura.

### Amass
`Enumeración` `Open source` [github.com/owasp-amass/amass](https://github.com/owasp-amass/amass)

**Para qué sirve:** enumeración exhaustiva de subdominios combinando fuentes pasivas y resolución activa. Es el estándar de OWASP para mapear superficie de ataque.

**Uso básico:**
```bash
# Sólo fuentes pasivas, no toca el objetivo
amass enum -passive -d empresa.com -o subdominios.txt
```

### Subfinder
`Enumeración` `Open source` [github.com/projectdiscovery/subfinder](https://github.com/projectdiscovery/subfinder)

**Para qué sirve:** enumeración pasiva de subdominios, mucho más rápida que Amass y con salida limpia para encadenar con otras herramientas.

```bash
subfinder -d empresa.com -silent | httpx -title -status-code
```

### Whois
`Registro` `Gratis` [whois.domaintools.com](https://whois.domaintools.com/)

**Para qué sirve:** datos de registro de un dominio. Con GDPR casi todo está anonimizado, pero la **fecha de creación** sigue visible: un dominio registrado hace tres días que envía una factura es casi con certeza phishing.

## Personas, correos y filtraciones

### Have I Been Pwned
`Filtraciones` `Gratis` [haveibeenpwned.com](https://haveibeenpwned.com/)

**Para qué sirve:** comprobar si una dirección de correo aparece en filtraciones conocidas. La función *Domain search* permite vigilar todo tu dominio corporativo.

### Dehashed / LeakCheck / IntelX
`Filtraciones` `De pago` [intelx.io](https://intelx.io/)

**Para qué sirve:** buscar credenciales concretas dentro de filtraciones. En un SOC se usan para valorar si una cuenta comprometida tenía la contraseña expuesta previamente.

### Hunter.io
`Correos` `Freemium` [hunter.io](https://hunter.io/)

**Para qué sirve:** descubrir el **patrón de direcciones** de una empresa (`nombre.apellido@`) y correos publicados. Es exactamente lo que hace un atacante antes de un spear phishing.

### theHarvester
`Recolección` `Open source` [github.com/laramies/theHarvester](https://github.com/laramies/theHarvester)

**Para qué sirve:** recolectar correos, subdominios, nombres y hosts de múltiples motores públicos desde línea de comandos.

```bash
theHarvester -d empresa.com -b bing,duckduckgo,crtsh -l 500
```

### Holehe
`Cuentas` `Open source` [github.com/megadose/holehe](https://github.com/megadose/holehe)

**Para qué sirve:** comprueba en qué servicios (Instagram, Twitter, Spotify…) está registrado un correo, usando el flujo de "recuperar contraseña" sin notificar al titular.

### Sherlock
`Usuarios` `Open source` [github.com/sherlock-project/sherlock](https://github.com/sherlock-project/sherlock)

**Para qué sirve:** buscar un mismo **nombre de usuario** en cientos de redes sociales. Muy útil para perfilar a un actor que reutiliza alias.

```bash
python3 sherlock.py nombre_usuario
```

### Epieos
`Correo/teléfono` `Freemium` [epieos.com](https://epieos.com/)

**Para qué sirve:** a partir de un correo o teléfono, saca perfiles asociados y datos de cuentas de Google (incluida la foto y reseñas públicas de Maps).

### GHunt
`Google` `Open source` [github.com/mxrch/GHunt](https://github.com/mxrch/GHunt)

**Para qué sirve:** extraer información pública de una cuenta de Google: nombre, ID, servicios usados, documentos públicos.

## Buscadores y archivos

### Google Dorks
`Técnica` `Gratis` [exploit-db.com/google-hacking-database](https://www.exploit-db.com/google-hacking-database)

**Para qué sirve:** usar operadores de búsqueda para encontrar exposiciones no intencionadas.

**Operadores esenciales:**

| Operador | Qué hace | Ejemplo |
|---|---|---|
| `site:` | Limita a un dominio | `site:empresa.com` |
| `filetype:` | Tipo de fichero | `filetype:pdf site:empresa.com` |
| `intitle:` | Texto en el título | `intitle:"index of"` |
| `inurl:` | Texto en la URL | `inurl:admin` |
| `-` | Excluye | `site:empresa.com -www` |
| `cache:` | Versión cacheada | `cache:empresa.com` |

**Combinación típica de auditoría:** `site:empresa.com filetype:xlsx OR filetype:docx` para ver documentos internos indexados por error.

### Wayback Machine
`Archivo` `Gratis` [web.archive.org](https://web.archive.org/)

**Para qué sirve:** ver cómo era una web en el pasado. Sirve para recuperar contenido borrado de un sitio de phishing, o para ver qué información publicaba tu empresa y ya retiró.

**Uso básico:** la API de URLs es más útil que la interfaz para enumerar rutas antiguas:
```bash
curl "http://web.archive.org/cdx/search/cdx?url=empresa.com*&output=text&fl=original&collapse=urlkey"
```

### urlscan.io
`Web` `Gratis + API` [urlscan.io](https://urlscan.io/)

**Para qué sirve:** visita una URL desde una máquina aislada y guarda captura, peticiones, dominios contactados y DOM. Imprescindible en phishing: ves la página **sin abrirla tú**.

**Uso básico:** pega la URL sospechosa, marca visibilidad *Unlisted* si contiene datos sensibles, y revisa la captura y la lista de dominios. La búsqueda por `page.domain:` encuentra campañas relacionadas.

> [!CAUTION]
> Los escaneos públicos son visibles para cualquiera y algunos actores vigilan urlscan buscando sus propias URLs. Si la URL lleva un token único de la víctima, usa modo *Unlisted* o *Private*.

## Marcos, imágenes y geolocalización

### OSINT Framework
`Índice` `Gratis` [osintframework.com](https://osintframework.com/)

**Para qué sirve:** árbol navegable con cientos de recursos OSINT clasificados por tipo de dato.

### Maltego
`Grafos` `Freemium` [maltego.com](https://www.maltego.com/)

**Para qué sirve:** herramienta de análisis de enlaces. Se parte de una entidad (dominio, persona) y se lanzan *transforms* que van descubriendo entidades relacionadas, dibujando el grafo de la investigación.

**Uso básico:** la versión Community es gratuita y limitada en resultados, pero suficiente para aprender el flujo entidad → transform → grafo.

### SpiderFoot
`Automatización` `Open source` [github.com/smicallef/spiderfoot](https://github.com/smicallef/spiderfoot)

**Para qué sirve:** automatiza más de 200 módulos OSINT sobre un objetivo y lo correlaciona solo. Se lanza contra un dominio y produce un informe completo.

> [!TIP]
> Elige el modo *Passive* si no quieres tocar el objetivo. El modo *All* incluye escaneos activos.

### Recon-ng
`Framework` `Open source` [github.com/lanmaster53/recon-ng](https://github.com/lanmaster53/recon-ng)

**Para qué sirve:** framework modular de reconocimiento con interfaz tipo Metasploit (workspaces, módulos, base de datos de resultados). Bueno cuando la investigación es larga y hay que guardar estado.

### ExifTool
`Metadatos` `Open source` [exiftool.org](https://exiftool.org/)

**Para qué sirve:** leer y borrar metadatos de ficheros. Una foto puede llevar coordenadas GPS; un PDF, el nombre del autor, la ruta interna y el software con el que se creó.

```bash
exiftool documento.pdf          # ver todo
exiftool -gps:all -o limpio.jpg foto.jpg   # quitar GPS
```

### FOCA
`Metadatos` `Gratis` [github.com/ElevenPaths/FOCA](https://github.com/ElevenPaths/FOCA)

**Para qué sirve:** descarga masiva de documentos públicos de un dominio y extracción de metadatos para reconstruir usuarios, rutas de red e impresoras internas.

### Búsqueda inversa de imágenes
`Imágenes` `Gratis` [images.google.com](https://images.google.com/)

**Para qué sirve:** comprobar si una foto de perfil está reutilizada, habitual en cuentas falsas y fraude del CEO. Yandex funciona mejor con caras; TinEye, para localizar la primera aparición de una imagen.
