---
titulo: El correo y el phishing
subtitulo: true
---

# El correo y el phishing

Antes de analizar un correo malicioso hay que saber cómo viaja un correo normal. Casi todas las técnicas de suplantación se apoyan en algún hueco de este recorrido.

## Cómo llega un correo de A a B

```text
Cliente          SMTP salida        DNS         SMTP destino      Buzón
  │                   │              │               │              │
  ├── 1. redacta ────►│              │               │              │
  │                   ├── 2. ¿IP? ──►│               │              │
  │                   │◄── 3. IP ────┤               │              │
  │                   ├──── 4. envía por Internet ──►│              │
  │                   │              │               ├── 5. recibe  │
  │                   │              │               ├── 6. POP3/IMAP ►│
```

1. El remitente escribe el mensaje en su cliente, que lo entrega al **servidor SMTP de salida** de su organización. En ese momento el servidor todavía no sabe dónde está el dominio de destino.
2. El SMTP de salida **consulta al DNS** para encontrar la IP asociada a ese dominio.
3. El DNS responde y ya sabe a dónde enviarlo.
4. El mensaje **viaja por Internet**, y puede pasar por otros servidores SMTP intermedios por el camino.
5. Llega al **servidor SMTP del dominio de destino**.
6. De ahí pasa a un servidor **POP3 o IMAP**, que es el que permite al destinatario iniciar sesión desde su cliente y leer el correo almacenado.

> [!IMPORTANT]
> Cada salto del punto 4 deja una cabecera `Received:`. Esa cadena es la que reconstruyes cuando analizas un correo, y se lee **de abajo arriba**: el `Received:` más bajo es el origen real.

## Anatomía de un correo

### Cabeceras obligatorias

| Campo | Qué contiene |
|---|---|
| `From:` | La dirección del remitente |
| `To:` | La dirección del destinatario |
| `Date:` | Fecha y hora de envío |

### Cabeceras opcionales

| Campo | Qué contiene |
|---|---|
| `Received:` | Los servidores intermedios y cuándo procesaron el mensaje |
| `Reply-To:` | A dónde va la respuesta si el destinatario pulsa "Responder" |
| `Subject:` | El asunto |
| `Message-ID:` | Identificador único del mensaje |

El **cuerpo** es el contenido en sí (texto, HTML o ambos) y va separado de las cabeceras por una línea en blanco.

### Cabeceras X

Es habitual encontrar cabeceras personalizadas que empiezan por `X-`. Las añaden las plataformas por el camino para aportar información extra. Muchos filtros antispam marcan así lo que consideran sospechoso:

```text
X-Spam-Status: YES
```

> [!TIP]
> `From:` y `Reply-To:` apuntando a sitios distintos es una de las señales más rentables que hay: el atacante quiere que veas un remitente de confianza pero que le contestes a él.

## Qué es exactamente el phishing

> Enviar un correo con malas intenciones para forzar al destinatario a revelar información, descargar archivos maliciosos o realizar una acción que normalmente no haría, explotando a la persona mediante una o más técnicas de ingeniería social.

La parte importante de esa definición es la última: **el objetivo no es el sistema, es la persona**. No se explota una vulnerabilidad de software, se explota la confianza, la prisa o el miedo de quien está delante de la pantalla.

## Los tres controles de autenticación

Son la base de casi todo el análisis. Los tres se publican como registros DNS del dominio que envía.

### SPF — Sender Policy Framework

Un registro TXT que indica **qué servidores están autorizados a enviar correo en nombre de un dominio**. Si un correo llega desde un servidor que no está en la lista, SPF falla y avisa de que el mensaje no viene realmente del dominio que aparenta.

*Ejemplo:* `empresa.com` publica que solo `mail.empresa.com` es válido. Si llega un correo desde `spamhost.ru` diciendo ser `info@empresa.com`, SPF falla.

### DKIM — DomainKeys Identified Mail

**Firma criptográficamente** el mensaje. El servidor emisor lo firma con una clave privada, y el receptor usa la clave pública publicada en el DNS del dominio para verificar dos cosas:

- Que el correo salió de un servidor autorizado del dominio.
- Que el contenido **no ha sido alterado** por el camino.

*Ejemplo:* un correo legítimo de `@microsoft.com` lleva una firma DKIM válida (`dkim=pass`).

### DMARC — Domain-based Message Authentication, Reporting and Conformance

Se apoya en los resultados de SPF y DKIM y define **qué hacer cuando uno o ambos fallan**:

| Política | Efecto |
|---|---|
| `none` | Solo registrar, no actuar |
| `quarantine` | Marcar el correo como sospechoso |
| `reject` | Rechazarlo directamente |

Además permite recibir informes sobre los intentos de suplantación del dominio.

*Ejemplo:* si `empresa.com` publica `v=DMARC1; p=reject;`, cualquier correo que falle SPF y DKIM será rechazado por el servidor receptor.

> [!WARNING]
> Un correo puede sacar `spf=pass` y ser phishing perfectamente: el atacante pasa SPF **de su propio dominio**, que sí le autoriza a enviar. Lo que hay que mirar no es el `pass`, es la **alineación** entre el dominio autenticado y el `From:` que ve el usuario. Eso es justo lo que añade DMARC.
