---
titulo: Logs de red
subtitulo: true
---

# Logs de red

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Cada dispositivo de red ve una parte distinta del tráfico, y su log responde a una pregunta distinta. Saber cuál mirar ahorra mucho tiempo en una investigación.

| Fuente | La pregunta que responde |
|---|---|
| **NetFlow** | ¿Quién habló con quién, cuánto y cuándo? |
| **Firewall** | ¿Se permitió esa conexión? |
| **VPN** | ¿Quién entró desde fuera, desde dónde y cuándo? |
| **Proxy** | ¿Qué webs visitó cada equipo? |
| **IDS/IPS** | ¿Llevaba el tráfico un ataque conocido? |
| **WAF** | ¿Llevaba la petición web un ataque? |
| **DNS** | ¿Qué dominios consultó cada equipo? |

Los ejemplos de log son de FortiGate y Forcepoint, pero los campos se llaman parecido en cualquier fabricante.

## NetFlow

El router o el switch agrupa los paquetes que comparten origen, destino, puertos y protocolo en un **flujo**, y exporta un resumen de cada flujo a un colector. No guarda el contenido: solo IPs, puertos, protocolo, bytes, paquetes, duración y flags TCP. Lo inventó Cisco; **IPFIX** es el estándar abierto equivalente y **sFlow** hace lo mismo por muestreo.

**Qué permite detectar:** picos de tráfico, posibles fugas de datos por volumen de salida, equipos nuevos o desconocidos, y primeras conexiones a sistemas críticos.

## Firewall

```text
date=2022-05-21 time=14:06:38 type="traffic" subtype="forward"
srcip=172.14.14.26 srcport=50495 srcintf="ACC-LAN" dstip=142.250.186.142 dstport=443
dstcountry="United States" proto=6 action="accept" policyid=284 service="HTTPS"
transip=89.145.185.195 duration=72 sentbyte=2518 rcvdbyte=49503
```

Lo que importa: **origen y destino** (`srcip`, `dstip`, puertos), **qué se hizo** (`action`), **qué regla** lo decidió (`policyid`), con qué IP pública salió tras el NAT (`transip`) y **cuántos datos** se movieron (`sentbyte`, `rcvdbyte`, `duration`). `proto=6` es TCP y `17` es UDP.

| `action` | Significado |
|---|---|
| `accept` | Permitido |
| `deny` / `drop` | Bloqueado. En general *reject* avisa al origen y *drop* descarta en silencio, pero cada fabricante lo llama a su manera |
| `close` | Sesión permitida que terminó con normalidad |
| `client-rst` / `server-rst` | Sesión permitida que cortó una de las partes |
| `timeout` | Sesión permitida que expiró sin actividad |

**Cómo se lee:** filtra por las IPs, mira si el tráfico llegó (`action`) y revisa bytes y duración para saber si hubo intercambio real de datos. Preguntas típicas: ¿la IP que bloqueó el IPS aparece después con tráfico permitido?, ¿algún equipo habló con un IOC?, ¿con qué otros equipos habló el que está infectado?

Un firewall de nueva generación (**NGFW**) identifica además la aplicación: puede bloquear SSH aunque vaya por un puerto distinto del 22.

## VPN

Está expuesta a Internet, así que es una de las superficies de ataque principales.

```text
type="event" subtype="vpn" logdesc="SSL VPN tunnel up" action="tunnel-up"
tunneltype="ssl-web" remip=13.29.5.4 user="j.garcia" reason="login successfully"
```

Lo esencial son tres datos: **IP de origen** (`remip`), **usuario** y **resultado**. Al conectarse, el usuario recibe una IP interna (`tunnelip`), y a partir de ahí su actividad aparece en los logs del firewall con esa IP como origen.

**Qué buscar:** fuerza bruta contra cuentas de la VPN, accesos desde países donde no tienes a nadie y accesos fuera de horario.

> [!TIP]
> Caso típico: tras una campaña de phishing, varios usuarios metieron sus credenciales. Lo primero es revisar sus accesos a la VPN y a los servicios expuestos: desde qué IP y qué país, y si de verdad fueron ellos.

## Proxy

Intermediario entre los equipos e Internet. Normalmente consulta la **categoría** del dominio y bloquea las de riesgo.

```text
type="utm" subtype="webfilter" srcip=192.168.209.142 hostname="android.prod.cloud.netflix.com"
profile="Wifi-Guest" action="blocked" sentbyte=517 rcvdbyte=0
msg="URL was blocked because it is in the URL filter list"
```

Un equipo de la red de invitados intentó acceder a un dominio bloqueado; `rcvdbyte=0` confirma que no recibió nada.

**Qué buscar:** conexiones con dominios sospechosos y **si llegaron a completarse**, equipos infectados que llaman a su C2, y tunelización. Si es un **servidor** el que hace peticiones web raras, el siguiente paso es ir al EDR y ver qué proceso las hizo.

## IDS/IPS

El firewall decide por IP, puerto y protocolo; el IDS/IPS **inspecciona el contenido** y lo compara con firmas de ataques conocidos (Snort, Suricata, Emerging Threats). El IDS solo detecta; el IPS también bloquea. Es de las fuentes que más alertas generan.

```text
type="utm" subtype="ips" severity="high" srcip=12.11.2.4 dstip=19.66.201.16
action="detected" service="DNS" dstport=53 direction="incoming"
attack="DNS.Server.Label.Buffer.Overflow" ref="http://www.fortinet.com/ids/VID37088"
```

**Cómo se prioriza:**

1. **Dirección:** ¿entrante o saliente? Un ataque saliente significa que el equipo interno ya está comprometido.
2. **Severidad:** high y critical, cuanto antes.
3. **Varias firmas distintas** entre el mismo origen y destino suben la prioridad.
4. **¿El destino ejecuta lo que la firma ataca?** Si sí, es crítico: hay que comprobar si está comprometido. En el ejemplo, la firma afecta al servidor DNS de Tftpd32; si el destino no lo usa, no le afecta.
5. **Acción:** `detected` significa que **la petición llegó** al destino; `dropped`, que se bloqueó.

## WAF

Protege las aplicaciones web y es lo que suele detectar primero un ataque web, porque ve el contenido de la petición. Para eso tiene que **descifrar el HTTPS** (*SSL offload*); sin eso no ve nada.

```text
type=attack sub_type="SQL Injection" severity_level=High action=Alert policy="Alert_Policy"
src=19.6.150.138 dst=172.16.10.10 dst_port=443 http_method=get
http_url="?v=(SELECT (CHR(113)||CHR(120)||...))" srccountry="Germany"
```

Una inyección SQL desde Alemania contra un servidor interno. `action=Alert` significa que el WAF está en **modo monitorización**: avisó, pero la petición llegó al servidor. Cómo saber si funcionó está en [Ataques web y OWASP](#/ataques-web/introduccion).

## DNS

Casi todo lo que hace un equipo empieza con una consulta DNS, así que es de las fuentes más útiles para saber **qué dominios tocó un sistema y cuándo**.

| Tipo de log | Qué registra |
|---|---|
| **Auditoría del servidor** | Cambios en los registros: altas, bajas, modificaciones. En Windows, el Event ID **516** es un borrado |
| **Consultas** | Qué equipo consultó qué dominio. **No se registran por defecto**: hay que activarlo, o capturarlas desde la red (por ejemplo, con Zeek) |

**Qué buscar:**

- Dominios consultados **por primera vez** en la organización.
- Dominios o subdominios **anormalmente largos** y muchas consultas a subdominios aleatorios de un mismo dominio: posible **túnel DNS**.
- Muchas respuestas **NXDOMAIN**: posible DGA.
- Coincidencias con IOCs.
- Uso de DNS sobre HTTPS o TLS, que esquiva tu servidor DNS.
- **Quién consulta qué.** Un servidor de bases de datos resolviendo `onedrive.live.com` es sospechoso aunque el dominio sea legítimo. Así se podrían haber detectado los dominios del ataque a SolarWinds (2020).
