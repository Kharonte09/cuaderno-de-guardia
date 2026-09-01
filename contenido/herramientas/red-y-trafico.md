---
titulo: Red y tráfico
subtitulo: true
tarjetas: true
---

# Herramientas de red y tráfico

Análisis de PCAP, detección en red, escaneo y monitorización. El tráfico no miente: aunque el atacante borre logs del endpoint, el paquete ya salió.

## Análisis de capturas

### Wireshark
`PCAP` `Open source` [wireshark.org](https://www.wireshark.org/)

**Para qué sirve:** analizador de protocolos. Abre una captura y permite diseccionar cada paquete, seguir conversaciones y exportar objetos transferidos.

**Filtros de display más usados:**

| Filtro | Para qué |
|---|---|
| `ip.addr == 10.0.0.5` | Todo el tráfico de un host |
| `http.request` | Sólo peticiones HTTP |
| `dns` | Consultas DNS (nombres de C2) |
| `tls.handshake.extensions_server_name` | SNI: dominio real aunque vaya cifrado |
| `tcp.flags.syn == 1 && tcp.flags.ack == 0` | Intentos de conexión (escaneos) |
| `frame contains "powershell"` | Buscar una cadena en el contenido |
| `http.request.method == "POST"` | Posible exfiltración |
| `!(arp || icmp || stp)` | Quitar ruido de fondo |

**Menús más usados:**
- *Statistics → Conversations*: quién habla con quién y cuántos bytes. Ordena por bytes para ver exfiltración.
- *Statistics → Protocol Hierarchy*: qué protocolos hay. Un porcentaje raro de "Data" es señal de túnel.
- *File → Export Objects → HTTP*: extrae los ficheros descargados directamente de la captura.
- *Follow → TCP Stream*: reconstruye la conversación completa en texto.

> [!TIP]
> Para detectar *beaconing* (baliza de C2): *Statistics → Conversations*, ordena por número de paquetes y mira si hay conexiones muy regulares al mismo destino. Un C2 late cada N segundos con tamaño casi idéntico.

### tshark
`PCAP CLI` `Open source` [wireshark.org](https://www.wireshark.org/docs/man-pages/tshark.html)

**Para qué sirve:** Wireshark en línea de comandos. Imprescindible para procesar capturas grandes o automatizar extracciones.

```bash
# Todos los dominios DNS consultados, ordenados por frecuencia
tshark -r captura.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name | sort | uniq -c | sort -rn

# SNI de todas las conexiones TLS
tshark -r captura.pcap -Y "tls.handshake.type == 1" -T fields -e tls.handshake.extensions_server_name
```

### tcpdump
`Captura` `Open source` [tcpdump.org](https://www.tcpdump.org/)

**Para qué sirve:** capturar tráfico desde un servidor Linux sin interfaz gráfica. Se captura con tcpdump y se analiza con Wireshark.

```bash
tcpdump -i eth0 -nn -s0 -w captura.pcap host 10.0.0.5
```

### NetworkMiner
`Forense de red` `Gratis (versión libre)` [netresec.com/?page=NetworkMiner](https://www.netresec.com/?page=NetworkMiner)

**Para qué sirve:** análisis orientado a hosts, no a paquetes. Abre un PCAP y presenta los equipos, sistemas operativos detectados, ficheros extraídos, credenciales en claro e imágenes.

### Brim / Zui
`PCAP a escala` `Open source` [zui.brimdata.io](https://zui.brimdata.io/)

**Para qué sirve:** abrir capturas enormes convirtiéndolas a logs de Zeek y consultarlas con un lenguaje de búsqueda. Donde Wireshark se atraganta, Brim va fluido.

### Arkime (antes Moloch)
`Captura total` `Open source` [arkime.com](https://arkime.com/)

**Para qué sirve:** capturar e indexar **todo** el tráfico de forma permanente para poder buscar hacia atrás cuando aparece un IOC nuevo. Es el "full packet capture" de código abierto.

## Detección en red

### Suricata
`IDS/IPS` `Open source` [suricata.io](https://suricata.io/)

**Para qué sirve:** motor de detección de intrusiones que inspecciona el tráfico contra reglas, extrae metadatos (HTTP, TLS, DNS, ficheros) y genera alertas en formato EVE JSON, ideal para un SIEM.

**Uso básico:**
```bash
# Analizar una captura contra tus reglas
suricata -r captura.pcap -S reglas.rules -l ./salida/
# Las alertas quedan en salida/fast.log y salida/eve.json
```

Los conjuntos de reglas habituales son **Emerging Threats Open** (gratis) y ET Pro (de pago).

### Snort
`IDS/IPS` `Open source` [snort.org](https://www.snort.org/)

**Para qué sirve:** el IDS clásico, mantenido por Cisco. Su sintaxis de reglas es la referencia que casi todos los demás imitan.

### Zeek (antes Bro)
`Monitor de red` `Open source` [zeek.org](https://zeek.org/)

**Para qué sirve:** no busca firmas, sino que **describe** todo lo que pasa en la red en logs estructurados (`conn.log`, `dns.log`, `http.log`, `ssl.log`, `files.log`). Es la base de telemetría de red sobre la que se caza.

> [!TIP]
> `conn.log` de Zeek contiene la duración y bytes de cada conexión: es el fichero perfecto para buscar beaconing con un simple análisis de intervalos.

### RITA
`Análisis de beacons` `Open source` [github.com/activecm/rita](https://github.com/activecm/rita)

**Para qué sirve:** consume logs de Zeek y busca específicamente **balizas de C2**, túneles DNS y conexiones largas. Automatiza la caza que a mano llevaría horas.

### Security Onion
`Distribución` `Open source` [securityonion.net](https://securityonion.net/)

**Para qué sirve:** distribución que integra Zeek, Suricata, Elastic, Kibana y herramientas de caso en un solo despliegue. Sirve tanto para producción como para laboratorio.

## Escaneo y diagnóstico

### Nmap
`Escaneo` `Open source` [nmap.org](https://nmap.org/)

**Para qué sirve:** descubrir hosts, puertos abiertos, servicios y versiones. En Blue Team se usa para inventariar y verificar que el firewall hace lo que debe.

**Uso básico:**
```bash
nmap -sn 10.0.0.0/24                 # qué hosts hay vivos
nmap -sV -sC -p- 10.0.0.5            # todos los puertos, versiones y scripts básicos
nmap -sV --script vuln 10.0.0.5      # comprobaciones de vulnerabilidades conocidas
```

> [!WARNING]
> Escanear redes ajenas sin autorización es delito en España (art. 197 bis CP y equivalentes). Escanea sólo lo tuyo o con permiso firmado.

### Netcat / Ncat
`Conexiones` `Open source` [nmap.org/ncat](https://nmap.org/ncat/)

**Para qué sirve:** abrir o conectar a un puerto en crudo. Sirve para comprobar si un puerto responde, ver el banner de un servicio o probar reglas de firewall.

```bash
nc -nv 10.0.0.5 445
```

### httpx
`Web` `Open source` [github.com/projectdiscovery/httpx](https://github.com/projectdiscovery/httpx)

**Para qué sirve:** sondear masivamente una lista de dominios o IPs y devolver código de estado, título, tecnología y certificado. Ideal para inventariar la superficie web propia.

### Nuclei
`Vulnerabilidades` `Open source` [github.com/projectdiscovery/nuclei](https://github.com/projectdiscovery/nuclei)

**Para qué sirve:** escáner basado en plantillas YAML de la comunidad. En defensa, se lanza contra tu propio inventario para detectar exposiciones y CVEs conocidos antes que otros.

### Nessus Essentials / OpenVAS
`Vulnerabilidades` `Gratis limitado` [tenable.com/products/nessus/nessus-essentials](https://www.tenable.com/products/nessus/nessus-essentials)

**Para qué sirve:** escáner de vulnerabilidades autenticado sobre tu parque. Nessus Essentials es gratuito hasta 16 IPs; **OpenVAS/Greenbone** es la alternativa completamente libre.

### mtr / traceroute / dig
`Diagnóstico` `Open source` [linux.die.net/man/8/mtr](https://linux.die.net/man/8/mtr)

**Para qué sirve:** diagnóstico de resolución. `dig` resuelve y muestra la respuesta DNS completa (clave para verificar registros SPF/DMARC y detectar cambios de infraestructura del atacante).

```bash
dig empresa.com TXT +short          # ver SPF y verificaciones
dig malo.com A +trace               # de dónde viene realmente la resolución
```

## Señales de red que siempre merecen mirada

| Señal | Qué suele significar |
|---|---|
| Conexiones periódicas y de tamaño constante | Beaconing de C2 |
| Muchas consultas DNS a subdominios largos y aleatorios | Túnel DNS o DGA |
| Tráfico saliente masivo fuera de horario | Exfiltración |
| Conexión directa a IP sin resolución DNS previa | Malware con IP hardcodeada |
| TLS con certificado autofirmado o JA3 raro | C2 tipo Cobalt Strike |
| SMB de estación a estación (no a servidor) | Movimiento lateral |
| Un host hablando con todos los demás por 445/3389 | Escaneo interno o propagación |
