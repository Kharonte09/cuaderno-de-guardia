---
titulo: Ataques web y OWASP
subtitulo: true
---

# Ataques web y OWASP

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Las aplicaciones web están expuestas a Internet por definición, y por eso son de los objetivos más atacados. Como analista no vas a explotarlas: vas a **reconocer el ataque en un log** y decidir si funcionó.

Cómo funciona HTTP (cliente y servidor, métodos, códigos de estado) está en [Cómo funciona la web](#/smr/web/como-funciona-la-web). Aquí va lo que importa desde el lado defensivo.

## OWASP Top 10

OWASP es una fundación sin ánimo de lucro que publica recursos abiertos de seguridad de aplicaciones. Su **Top 10** es la lista de referencia de los riesgos más críticos. La versión vigente es la de **2025**:

| # | Riesgo |
|---|---|
| A01 | Broken Access Control |
| A02 | Security Misconfiguration |
| A03 | Software Supply Chain Failures *(nueva)* |
| A04 | Cryptographic Failures |
| A05 | Injection |
| A06 | Insecure Design |
| A07 | Authentication Failures |
| A08 | Software or Data Integrity Failures |
| A09 | Security Logging & Alerting Failures |
| A10 | Mishandling of Exceptional Conditions *(nueva)* |

La A09 es la que te toca más de cerca: una aplicación que no registra lo que pasa es una aplicación en la que no puedes investigar nada.

## Dónde se ve un ataque web

| Fuente | Qué te da | Límite |
|---|---|---|
| **WAF** | Suele ser lo primero que lo detecta: está delante de la aplicación y ve el contenido de la petición | Solo si descifra el tráfico HTTPS (*SSL offload*). En modo monitorización alerta pero **no bloquea** |
| **Log del servidor web** (Apache, Nginx, IIS) | Cada petición con IP, fecha, método, URL, código de respuesta, tamaño y user-agent | Normalmente **no registra el cuerpo** de un POST |
| **Firewall / IDS** | Conexiones y firmas conocidas | Con HTTPS no ven el contenido |

Una línea de log de acceso típica:

```text
203.0.113.7 - - [12/Oct/2026:10:41:03 +0200] "GET /productos.php?id=1%27%20OR%201=1--%20- HTTP/1.1" 200 5120 "-" "sqlmap/1.8"
```

De izquierda a derecha: IP de origen, fecha, método y URL (con el payload codificado), **código de respuesta**, **tamaño de la respuesta** y user-agent.

## Cómo saber si funcionó

1. **¿Se bloqueó?** Si el WAF lo paró, el riesgo baja. Si solo alertó, la petición llegó al servidor.
2. **Código de respuesta.** Un `200` significa que el servidor procesó la petición, no que el ataque saliera bien. Un `403` o un `500` repetido suele indicar que no.
3. **Tamaño de la respuesta.** Es la pista más útil. Si todas las respuestas pesan lo mismo y una de repente pesa mucho más, esa es la que devolvió datos.
4. **¿Aplica a tu tecnología?** Un escaneo de fallos de PHP contra una aplicación en ASP.NET no va a funcionar. Aun así, la IP que escanea se bloquea en el perímetro.
5. **¿Qué pasó después?** Peticiones nuevas desde esa IP a rutas que no existían antes (una webshell), procesos raros en el servidor o conexiones salientes.

> [!TIP]
> Decodifica la URL antes de leerla. `%27` es `'`, `%20` es un espacio, `%3C` es `<` y `%2F` es `/`. Un payload que a simple vista es ruido suele ser obvio una vez decodificado.

> [!IMPORTANT]
> El user-agent ayuda a reconocer herramientas automáticas (`sqlmap`, `nikto`, `gobuster`, `nuclei`), pero lo controla el atacante. Que no ponga `sqlmap` no significa que no lo sea.

Los ataques concretos: [inyecciones](#/ataques-web/inyecciones), [accesos a ficheros y objetos](#/ataques-web/ficheros-y-accesos) y [fuerza bruta](#/ataques-web/fuerza-bruta).
