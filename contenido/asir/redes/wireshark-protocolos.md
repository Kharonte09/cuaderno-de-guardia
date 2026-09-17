---
titulo: Estudiar protocolos con Wireshark
subtitulo: true
---

# Estudiar protocolos con Wireshark

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Capturar una navegación normal y reconocer, paquete a paquete, todo lo que hace falta para abrir una simple página web.

## Preparar la captura

Para que la captura sea limpia y contenga el intercambio completo desde el principio:

1. **Borrar la caché del navegador.** Si no, las páginas se sirven de local y no hay tráfico que ver.
2. **Borrar la caché ARP**, desde una consola con privilegios:
   ```
   arp -d
   ```
   Así se fuerza a que el equipo vuelva a preguntar quién es la puerta de enlace, y ese intercambio aparece en la captura.
3. **Empezar a capturar** en la interfaz por la que sale el tráfico.
4. **Navegar** a una web, recorrer dos o tres páginas y cerrar.
5. **Parar la captura.**

> [!TIP]
> Si no hay claro cuál es la interfaz correcta, Wireshark muestra un gráfico de actividad al lado de cada una: la que se mueve es la buena.

## Lo que hay que localizar

El orden en que ocurren las cosas ya cuenta la historia completa:

| Orden | Protocolo | Qué está pasando |
|---|---|---|
| 1 | **ARP** | El equipo busca la MAC de su puerta de enlace |
| 2 | **DNS** | Resuelve el nombre del sitio a una dirección IP |
| 3 | **TCP** | Abre la conexión con el servidor |
| 4 | **HTTP** o **TLS** | Pide la página y recibe el contenido |
| 5 | **TCP** | Cierra la conexión |

### Los paquetes ARP

Se filtran con:

```
arp
```

Hay que encontrar la **pregunta** y la **respuesta**:

- **Pregunta**: el equipo pregunta en difusión quién tiene una IP concreta, normalmente la de la puerta de enlace (`192.168.0.1` o la que sea). El paquete incluye la IP y la MAC de quien pregunta.
- **Respuesta**: el router contesta con **su dirección MAC**.

En una captura de navegación real salen bastantes paquetes ARP (decenas), porque la tabla va caducando y se refresca, y porque otros equipos de la red también preguntan.

### Los paquetes DNS

```
dns
```

Se busca la pareja de **pregunta y respuesta**, y de ellos se anota:

| Dato | Valor típico |
|---|---|
| **Protocolo de transporte** | UDP |
| **Puerto de destino** | 53 |
| **Puerto de origen** | Uno del rango dinámico, por ejemplo 63641 |

Que DNS vaya sobre **UDP** es el detalle que se pregunta: no hace falta abrir conexión para una consulta que cabe en un paquete, y si se pierde se repite.

### La conexión TCP

```
tcp
```

Aquí está el [saludo de tres vías](#/asir/redes/tcp-y-puertos), reconocible por los indicadores de cada paquete:

1. **SYN** — del cliente al servidor.
2. **SYN, ACK** — del servidor al cliente.
3. **ACK** — del cliente, y la conexión queda abierta.

Después vienen los paquetes de datos, y al final los de cierre, con el indicador **FIN** (`FIN, ACK` → `ACK` → `FIN, ACK` → `ACK`).

De cualquier paquete de datos se anotan:

- **Puerto de origen** — el del cliente, del rango dinámico.
- **Puerto de destino** — 80 en HTTP, 443 en HTTPS.
- **Identificador de flujo** (*stream index*) — el número con el que Wireshark agrupa todos los paquetes de la misma conexión.

> [!TIP]
> El identificador de flujo es la herramienta más útil de todas: con el botón derecho sobre un paquete, *Follow → TCP Stream*, se ve **la conversación completa** de esa conexión aislada del resto. Filtrar por `tcp.stream == 3` hace lo mismo a mano.

### La cabecera IP

Abriendo la capa IP de cualquier paquete TCP o UDP se leen los campos que se estudian en [IP, ARP e ICMP](#/asir/redes/ip-arp-icmp):

| Campo | Qué dice |
|---|---|
| **IP de origen** | Quién envía |
| **IP de destino** | A quién |
| **ToS / DSCP** | Tipo de servicio, para priorizar tráfico |
| **TTL** | Cuántos saltos le quedan de vida |

El **TTL** de los paquetes que llegan es informativo por sí solo: los valores iniciales típicos son 64 (Linux), 128 (Windows) y 255 (equipos de red). Si llega un paquete con TTL 57, se puede deducir que salió con 64 y ha pasado por siete routers.

## Analizar una captura ajena

El otro ejercicio habitual es abrir un fichero de captura y reconstruir qué pasó. Lo que se pregunta y cómo se saca:

| Pregunta | Cómo se responde |
|---|---|
| ¿Qué IP tiene el cliente? | La que origina las peticiones. En *Statistics → Conversations* se ve de un golpe |
| ¿A qué páginas se conecta? | Filtro `http.request` o `dns.qry.name`, que lista los nombres pedidos |
| ¿Qué servidor le responde? | La IP de destino de cada conexión |
| ¿Qué navegador usa? | La cabecera `User-Agent` de las peticiones HTTP |
| ¿Se descargó algo? | *File → Export Objects → HTTP* |
| ¿Hubo errores? | Filtro `http.response.code >= 400` |

> [!NOTE]
> Todo esto funciona con **HTTP**. Con **HTTPS** se ve la conexión, los nombres del certificado y el nombre del servidor en el saludo TLS, pero **no el contenido**. Por eso las prácticas de clase se hacen sobre sitios en HTTP: son los únicos donde el intercambio completo es legible.

## Filtros que conviene memorizar

```
arp                          # solo ARP
dns                          # solo DNS
tcp.flags.syn == 1           # inicios de conexión
tcp.flags.reset == 1         # conexiones rechazadas
http.request                 # peticiones web
ip.addr == 192.168.1.50      # todo el tráfico de un equipo
tcp.port == 443              # todo el tráfico HTTPS
tcp.stream == 0              # una conversación concreta
```

> [!WARNING]
> Capturar tráfico de una red que no es tuya, o de la que no tienes autorización para analizar, no es un ejercicio académico: es interceptar comunicaciones ajenas. En clase se hace sobre tu propio equipo y tu propia navegación, y en el trabajo, con la autorización de quien gestiona esa red.

El uso de Wireshark en investigación de incidentes está en la parte de [respuesta a incidentes](#/respuesta/wireshark) del cuaderno.
