---
titulo: Elementos de la comunicación
subtitulo: true
---

# Elementos de la comunicación

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Antes de hablar de cables y protocolos: toda comunicación, de un semáforo a una petición HTTP, tiene las mismas seis piezas.

## Las seis piezas

| Elemento | Qué es |
|---|---|
| **Emisor** | Quien genera el mensaje y lo envía. |
| **Receptor** | Quien lo recibe y lo interpreta. |
| **Mensaje** | La información que se quiere transmitir. |
| **Código** | El conjunto de reglas que da sentido al mensaje. Emisor y receptor tienen que compartirlo. |
| **Canal** | El medio físico por el que viaja: aire, luz, cable, fibra. |
| **Ruido** | Cualquier interferencia que degrada el mensaje. Está siempre presente en algún grado. |

Si falta una, no hay comunicación: un mensaje en un código que el receptor no conoce no se entiende, y sin canal no llega.

## En ejemplos del día a día

| Situación | Emisor | Receptor | Canal | Mensaje | Código |
|---|---|---|---|---|---|
| Un semáforo en rojo | Semáforo | Conductor | Visual | Párate | Código de circulación |
| Un jugador levanta la mano pidiendo el balón | El que levanta la mano | El que lleva el balón | Visual | Pásamela | Gestos acordados |
| Una ambulancia con la sirena detrás de ti | Ambulancia | Conductor | Acústico y visual | Apártate | Código de circulación |
| Enviar un correo | Quien escribe | Quien lo recibe | Internet | El contenido del correo | Lengua escrita |

El **ruido** cambia según el canal, y por eso importa: en el semáforo es el sol de frente o la niebla; en el campo de fútbol, otro jugador tapando la vista; en el correo, una falta de ortografía que cambia el sentido de la frase.

## Cómo se traslada a una red

En una red informática las piezas son las mismas, con otros nombres:

| Elemento | En la red |
|---|---|
| Emisor y receptor | Los dos equipos, identificados por su dirección IP |
| Mensaje | Los datos, partidos en paquetes |
| Código | Los protocolos: TCP/IP, HTTP, DNS… |
| Canal | El medio: par trenzado, fibra, radio |
| Ruido | Interferencias, atenuación, colisiones, paquetes perdidos |

> [!NOTE]
> Los protocolos son el "código" del esquema, y por eso son tan estrictos: son el acuerdo previo que permite que dos máquinas que no se han visto nunca se entiendan. Si una de las dos no habla ese protocolo, la conexión no se establece.

La diferencia práctica está en el ruido. Una persona rellena los huecos de una frase a medias; una máquina no, así que los protocolos tienen que traer el mecanismo puesto: **sumas de comprobación** para detectar que un paquete llegó corrupto, **confirmaciones** para saber que llegó, y **retransmisión** de lo que se perdió.
