---
titulo: TCP y puertos
subtitulo: true
---

# TCP y puertos

Cómo se identifica cada conversación dentro de un mismo equipo, y cómo se abre y se cierra una conexión fiable.

## Los puertos

Un **puerto** es un número de **16 bits** que identifica una conexión concreta dentro de un dispositivo. La IP dice *a qué máquina*; el puerto, *a qué servicio de esa máquina*.

Las aplicaciones servidoras se quedan **a la escucha** en su puerto, esperando solicitudes de conexión. El cliente, al conectarse, usa un puerto cualquiera del rango alto para su extremo.

| Rango | Nombre | Uso |
|---|---|---|
| **0 – 1023** | Bien conocidos | Servicios estándar. Requieren privilegios para abrirlos |
| **1024 – 49151** | Registrados | Aplicaciones concretas registradas ante la IANA |
| **49152 – 65535** | Dinámicos o privados | Los que usan los clientes para su extremo de la conexión |

> [!NOTE]
> Por eso una conexión se identifica de verdad por **cuatro datos**: IP y puerto de origen, IP y puerto de destino. Es lo que permite que un mismo navegador tenga diez pestañas abiertas contra el mismo servidor sin mezclar las respuestas.

## Puertos que hay que saberse

| Puerto | Servicio |
|---|---|
| **20 / 21** | FTP: datos y órdenes |
| **22** | SSH |
| **23** | Telnet |
| **25** | SMTP (envío de correo) |
| **53** | DNS |
| **80** | HTTP |
| **110 / 995** | POP3 / POP3S |
| **123** | NTP (hora en red) |
| **137 / 138 / 139** | NetBIOS: nombres, datagramas y sesión |
| **143 / 993** | IMAP / IMAPS |
| **443** | HTTPS |
| **445** | SMB (compartición de ficheros de Windows, y Samba) |
| **990** | FTPS |
| **1194** | OpenVPN |
| **1723** | PPTP (VPN antigua) |
| **3306** | MySQL |
| **3389** | Escritorio remoto (RDP) |
| **25565** | Servidor de Minecraft |

Los que más aparecen en el trabajo defensivo son el **22**, el **445** y el **3389**: son los tres que nunca deberían estar abiertos a internet, y son los tres que más se encuentran abiertos.

```
netstat -an                    # conexiones y puertos a la escucha
netstat -ano | findstr :445    # quién escucha en un puerto (Windows)
ss -tulpn                      # lo mismo en Linux
```

## TCP frente a UDP

| | TCP | UDP |
|---|---|---|
| **Conexión** | Se establece antes de enviar | No hay |
| **Fiabilidad** | Confirma, reordena y retransmite | No garantiza nada |
| **Velocidad** | Algo más lento | Más rápido y con menos sobrecarga |
| **Para qué** | Web, correo, transferencia de ficheros | DNS, voz y vídeo, juegos |

TCP es el que pone la fiabilidad que [IP no da](#/asir/redes/ip-arp-icmp).

## Apertura: el saludo de tres vías

Para usar TCP hay que **abrir la conexión** primero, y se hace en tres pasos:

1. **SYN** — el equipo que quiere abrir la conexión (apertura activa) envía un segmento con el bit **SYN** activado y su primer número de secuencia.
2. **SYN + ACK** — el servidor recibe la petición y, si acepta abrirla, responde con un segmento que lleva **SYN** activado (con su propio número de secuencia) y **ACK** confirmando el del cliente.
3. **ACK** — el cliente recibe esa respuesta y envía su confirmación. Al recibirla el servidor, la conexión queda **abierta por los dos extremos**.

```
Cliente                         Servidor
   │ ──────── SYN, seq=x ────────► │
   │ ◄── SYN, ACK, seq=y, ack=x+1 ─│
   │ ──────── ACK, ack=y+1 ───────► │
   │        conexión abierta        │
```

Los **números de secuencia** son la clave de todo lo demás: con ellos cada extremo sabe qué ha llegado, qué falta y en qué orden va, y de ahí salen las confirmaciones y las retransmisiones.

> [!TIP]
> Este saludo es lo que se ve en cualquier captura de tráfico al principio de una conexión, y es lo primero que se busca al diagnosticar: si se ve el **SYN** salir y no vuelve nada, el problema es de red o de cortafuegos; si vuelve un **RST**, el destino está ahí pero **ese puerto está cerrado**. Son dos diagnósticos completamente distintos con la misma apariencia para el usuario.

## Cierre

Cerrar es más laborioso que abrir, porque la conexión es **full-duplex**: son dos canales, uno en cada sentido, y cada lado se cierra de forma independiente. Por eso hacen falta cuatro segmentos:

```
   │ ──────── FIN, ACK ───────► │
   │ ◄─────────── ACK ───────── │
   │ ◄──────── FIN, ACK ─────── │
   │ ─────────── ACK ─────────► │
```

Quien termina de enviar manda **FIN**, y el otro lo confirma. Pero el segundo extremo puede seguir enviando lo que le quede, y solo cuando acaba manda su propio **FIN**, que también se confirma. Hasta ese último ACK, la conexión sigue medio abierta.

> [!NOTE]
> Existe también el cierre brusco con **RST**, que corta sin negociar. Aparece cuando un proceso se muere, cuando un cortafuegos rechaza activamente la conexión o cuando se intenta hablar con un puerto cerrado.
