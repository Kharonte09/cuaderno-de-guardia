---
titulo: Wireshark y red
subtitulo: true
---

# Wireshark y red

Filtros y comandos de consulta rápida. El contexto de cada herramienta está en [Red y tráfico](#/herramientas/red-y-trafico).

## Filtros de visualización de Wireshark

### Por dirección y host

```
ip.addr == 10.0.0.5              # cualquier sentido
ip.src == 10.0.0.5               # sólo origen
ip.dst == 203.0.113.45           # sólo destino
ip.addr == 10.0.0.0/24           # una subred
!(ip.addr == 10.0.0.5)           # excluir un host
eth.addr == 00:11:22:33:44:55    # por MAC
```

### Por protocolo y puerto

```
tcp.port == 445                  # SMB
udp.port == 53                   # DNS
tcp.port in {80 443 8080}        # varios puertos
http || dns || smb2              # varios protocolos
tls.handshake.type == 1          # Client Hello
```

### Lo que más se usa en un análisis

| Filtro | Para qué |
|---|---|
| `http.request` | Todas las peticiones HTTP |
| `http.request.method == "POST"` | Posible exfiltración o envío de credenciales |
| `http.response.code >= 400` | Errores del servidor |
| `dns.qry.name` | Dominios consultados |
| `dns.flags.response == 0` | Sólo consultas, no respuestas |
| `tls.handshake.extensions_server_name` | SNI: el dominio real aunque vaya cifrado |
| `tcp.flags.syn == 1 && tcp.flags.ack == 0` | Intentos de conexión (escaneo) |
| `tcp.flags.reset == 1` | Conexiones rechazadas |
| `tcp.analysis.retransmission` | Problemas de red |
| `frame contains "powershell"` | Cadena en el contenido del paquete |
| `frame.len > 1400` | Paquetes grandes (transferencia de datos) |
| `!(arp or icmp or stp or cdp)` | Quitar ruido de fondo |
| `smtp.req.command == "AUTH"` | Autenticación de correo |
| `ftp.request.command == "PASS"` | Contraseñas FTP en claro |

### Filtros de captura (sintaxis BPF, distinta a la anterior)

```
host 10.0.0.5
net 10.0.0.0/24
port 443
tcp port 445 or tcp port 3389
not port 22                      # no capturar tu propia sesión SSH
src host 10.0.0.5 and dst port 80
```

## Menús que ahorran tiempo

| Menú | Qué da |
|---|---|
| *Statistics → Conversations* | Quién habla con quién, bytes y duración |
| *Statistics → Protocol Hierarchy* | Reparto de protocolos; un "Data" alto = túnel |
| *Statistics → Endpoints* | Lista de hosts, con geolocalización |
| *Statistics → DNS* | Resumen de consultas |
| *File → Export Objects → HTTP/SMB* | Extraer ficheros transferidos |
| *Follow → TCP Stream* | Reconstruir la conversación en texto |
| *Edit → Preferences → Appearance → Columns* | Añadir columna de SNI o de user-agent |

> [!TIP]
> Para cazar *beaconing*: *Statistics → Conversations*, pestaña TCP, ordena por *Packets*. Un C2 aparece como conexiones repetidas al mismo destino, con duración y tamaño casi idénticos.

## tshark

```bash
# Dominios DNS consultados, por frecuencia
tshark -r captura.pcap -Y "dns.flags.response == 0" -T fields -e dns.qry.name \
  | sort | uniq -c | sort -rn

# SNI de todas las conexiones TLS
tshark -r captura.pcap -Y "tls.handshake.type == 1" \
  -T fields -e tls.handshake.extensions_server_name | sort -u

# URLs HTTP completas
tshark -r captura.pcap -Y http.request \
  -T fields -e http.host -e http.request.uri

# User-agents distintos
tshark -r captura.pcap -T fields -e http.user_agent | sort -u

# Resumen de conversaciones
tshark -r captura.pcap -q -z conv,tcp

# Exportar objetos HTTP a una carpeta
tshark -r captura.pcap --export-objects http,./objetos
```

## tcpdump

```bash
tcpdump -D                                    # listar interfaces
tcpdump -i eth0 -nn                           # sin resolver nombres ni puertos
tcpdump -i eth0 -nn -s0 -w captura.pcap       # guardar paquetes completos
tcpdump -i eth0 -nn host 10.0.0.5
tcpdump -i eth0 -nn 'tcp port 445 or tcp port 3389'
tcpdump -i eth0 -nn -A 'tcp port 80'          # ver el contenido en ASCII
tcpdump -r captura.pcap -nn | head -50        # leer una captura
tcpdump -i eth0 -nn -C 100 -W 10 -w rot.pcap  # rotar cada 100 MB, 10 ficheros
```

## Nmap

```bash
nmap -sn 10.0.0.0/24                  # qué hosts están vivos
nmap -sS -p- 10.0.0.5                 # todos los puertos TCP
nmap -sV -sC 10.0.0.5                 # versiones + scripts por defecto
nmap -sU --top-ports 20 10.0.0.5      # UDP más comunes
nmap -O 10.0.0.5                      # detección de sistema operativo
nmap -sV --script vuln 10.0.0.5       # comprobaciones de vulnerabilidades
nmap -T2 10.0.0.5                     # lento, menos ruidoso
nmap -oA informe 10.0.0.5             # guardar en los tres formatos
```

> [!WARNING]
> Escanear sistemas que no son tuyos sin autorización por escrito es delito. Estos comandos son para tu propio inventario o para una auditoría con alcance firmado.

## Diagnóstico DNS

```bash
dig empresa.com A +short
dig empresa.com MX +short
dig empresa.com TXT +short           # SPF y verificaciones
dig _dmarc.empresa.com TXT +short    # política DMARC
dig selector._domainkey.empresa.com TXT +short   # clave DKIM
dig malo.com A +trace                # resolución paso a paso
dig -x 203.0.113.45                  # resolución inversa
nslookup -type=any empresa.com       # equivalente en Windows
```

## Puertos que hay que reconocer de memoria

| Puerto | Servicio | Puerto | Servicio |
|---|---|---|---|
| 21 | FTP | 445 | SMB |
| 22 | SSH | 465 / 587 | SMTP cifrado |
| 23 | Telnet | 514 | Syslog |
| 25 | SMTP | 636 | LDAPS |
| 53 | DNS | 993 / 995 | IMAPS / POP3S |
| 80 | HTTP | 1433 | MSSQL |
| 88 | Kerberos | 3306 | MySQL |
| 110 | POP3 | **3389** | **RDP** |
| 135 | RPC | 5432 | PostgreSQL |
| 139 | NetBIOS | 5985 / 5986 | WinRM |
| 143 | IMAP | 8080 | HTTP alternativo |
| 389 | LDAP | 9200 | Elasticsearch |
| 443 | HTTPS | 27017 | MongoDB |

## Señales de red sospechosas

| Señal | Qué suele significar |
|---|---|
| Conexiones periódicas de tamaño constante | Beaconing de C2 |
| Subdominios largos y aleatorios por DNS | Túnel DNS o DGA |
| Salida masiva fuera de horario | Exfiltración |
| Conexión a IP sin resolución DNS previa | Malware con IP fija |
| Certificado autofirmado o JA3 raro | Cobalt Strike y similares |
| SMB entre estaciones de trabajo | Movimiento lateral |
| Un host hablando con todos por 445/3389 | Escaneo interno o propagación |
| Muchos NXDOMAIN seguidos | DGA buscando su C2 |
