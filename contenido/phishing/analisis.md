---
titulo: Analizar un correo
subtitulo: true
---

# Analizar un correo

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

El recorrido de un análisis real, de principio a fin: conseguir el correo sin romperlo, leer las cabeceras, sacar URLs y adjuntos sin ejecutar nada, y solo al final, si hace falta, detonarlos en una sandbox. Cada paso deja datos que acaban en el [informe](#/phishing/informe).

## 0. Antes de empezar

- **Trabaja con el original.** Un `.eml` (texto plano) o un `.msg` (formato binario de Outlook). Un reenvío no vale: pierde las cabeceras originales.
- **No lo abras en tu cliente de correo.** Un cliente carga imágenes remotas (que avisan al atacante de que alguien ha abierto el correo) y previsualiza adjuntos. El `.eml` se abre con un editor de texto.
- **Aísla el entorno.** Una máquina virtual sin acceso a la red corporativa, sin carpetas compartidas con el anfitrión, y con una instantánea limpia a la que volver.

> [!WARNING]
> Lo que subas a un servicio público **deja de ser tuyo**. VirusTotal comparte los ficheros enviados con su comunidad de seguridad, y las sandboxes gratuitas (ANY.RUN, Hybrid Analysis) publican los análisis. Si el adjunto puede ser un documento interno de la empresa, busca **por hash**, no subas el fichero.

## 1. Cabeceras

Es la parte que más dice y la que menos se puede falsificar entera. El orden de lectura que funciona:

### Autenticación: `Authentication-Results`

La cabecera que añade **tu** servidor al recibir el correo con el resultado de SPF, DKIM y DMARC. Es lo primero que se mira porque resume media investigación en una línea:

```text
Authentication-Results: mx.empresa.example;
       spf=fail (sender IP is 203.0.113.45) smtp.mailfrom=facturas-envio.example;
       dkim=none;
       dmarc=fail action=quarantine header.from=banco.example
```

| Resultado | Qué significa |
|---|---|
| `spf=pass` | La IP que entregó el correo está autorizada por el dominio del `Return-Path` |
| `dkim=pass` | La firma es válida: el mensaje no se ha tocado desde que lo firmó ese dominio (`d=`) |
| `dmarc=pass` | SPF o DKIM pasan **y** su dominio coincide con el del `From:` visible |

> [!IMPORTANT]
> `spf=pass` sin más no significa que el correo sea legítimo. Un atacante puede montar su propio dominio con su SPF perfecto y pasar. Lo que importa es **qué dominio** ha pasado: si el `From:` dice `banco.example` y lo que pasa SPF es `facturas-envio.example`, eso es exactamente lo que DMARC comprueba y lo que tienes que mirar tú.

### Quién lo envía: `From`, `Return-Path`, `Reply-To`

```text
From: "Banco Example" <avisos@banco.example>
Return-Path: <bounce@facturas-envio.example>
Reply-To: soporte.banco@correo-gratuito.example
```

- `From:` es lo que ve el usuario. Se escribe a mano: no prueba nada.
- `Return-Path:` es el remitente del sobre SMTP (`MAIL FROM`), el que valida SPF.
- `Reply-To:` es a dónde irá la respuesta.

Tres dominios distintos en tres campos que deberían contar la misma historia es la señal más clara que vas a encontrar. Las plataformas legítimas de envío masivo también usan un `Return-Path` propio, así que la diferencia sola no condena; el `Reply-To` a un correo gratuito sí suele hacerlo.

### Por dónde ha pasado: `Received`

Cada servidor añade su `Received:` **encima** de los anteriores, así que se leen de abajo arriba. Lo que te interesa es la IP que entregó el correo a tu organización:

```text
Received: from mail.facturas-envio.example (unknown [203.0.113.45])
        by mx.empresa.example with ESMTPS; Mon, 21 Sep 2026 08:14:02 +0200
```

> [!TIP]
> Solo te puedes fiar de los `Received:` que añadieron servidores tuyos o de tu proveedor. Los de más abajo los pudo escribir el propio remitente. Por eso el dato bueno es el **primer salto que registró tu infraestructura**: esa IP es la que se conectó de verdad.

Con esa IP:

- **Reputación:** AbuseIPDB, Cisco Talos Intelligence, VirusTotal.
- **Propietario:** `whois 203.0.113.45`. Un proveedor de hosting barato o una IP residencial para un "banco" ya es un dato.
- **DNS inverso** del nombre que aparece en el `Received:`, y si cuadra con quien dice ser.

### Otros detalles que suman

| Cabecera | Qué mirar |
|---|---|
| `Message-ID` | El dominio tras la `@` suele ser el del sistema que generó el correo. Si no tiene nada que ver con el remitente, se apunta. |
| `Date` | Zona horaria y hora de envío frente a lo que se espera del remitente. |
| `Subject` | Si viene como `=?UTF-8?B?...?=` está codificado (base64). Se decodifica antes de copiarlo al informe. |
| `X-Mailer` / `User-Agent` | El programa que lo envió. Un script de envío masivo para un correo "personal" desentona. |
| `X-` de tu pasarela | Puntuación de spam y veredicto de tu propio filtro (`X-Spam-Status`, `X-MS-Exchange-...`). |

Para no hacerlo todo a ojo, los analizadores de cabeceras ordenan los saltos, calculan los tiempos y resaltan los fallos: **Microsoft Message Header Analyzer**, **Google Admin Toolbox Messageheader** o el de **MXToolbox**. Solo reciben cabeceras, no el cuerpo, pero aun así dentro va la dirección del destinatario: en una empresa, mejor usar el que corresponda a vuestra plataforma.

## 2. Cuerpo y URLs (estático)

El objetivo es sacar cada URL **sin pulsar ninguna**.

1. Abre el `.eml` en un editor de texto y busca `href=`. El texto visible del enlace y el destino real no tienen por qué coincidir.
2. Si el cuerpo viene con `Content-Transfer-Encoding: base64` o `quoted-printable`, decodifícalo antes (CyberChef: *From Base64*, *From Quoted Printable*).
3. Mira lo que hay alrededor del enlace:
   - **Enlaces reescritos** por tu propia protección (`safelinks.protection.outlook.com/?url=...`): la URL real va en el parámetro, codificada. *URL Decode* en CyberChef.
   - **Acortadores**: para ver a dónde llevan sin visitarlos en el navegador, pide solo las cabeceras desde la VM y mira el `Location:`.

     ```text
     curl -sI hxxps://acortador.example/abc123
     ```

   - **Códigos QR** en imagen (*quishing*): CyberChef tiene *Parse QR Code* para sacar la URL sin usar el móvil.

Con cada URL:

| Qué | Con qué |
|---|---|
| Captura de la página sin visitarla | urlscan.io (en modo *Unlisted* o *Private*), URL2PNG |
| Reputación | VirusTotal, urlscan.io |
| Antigüedad del dominio | `whois dominio.example`. Un dominio de días para un servicio conocido es la señal más fiable que hay. |
| Parecido con el legítimo | Letras cambiadas (`rn` por `m`, `0` por `o`), subdominios engañosos (`banco.example.dominio-raro.example`) |

> [!WARNING]
> urlscan.io publica por defecto los escaneos que hace la gente con cuenta gratuita, con la URL completa. Si la URL lleva el correo de la víctima o un token, **quítalo antes** o usa el modo privado.

Todas las URLs van al informe saneadas (`hxxps://dominio[.]example`). CyberChef tiene la operación *Defang URL*.

## 3. Adjuntos (estático)

### Primero, el hash

```text
Get-FileHash .\factura.docm -Algorithm SHA256     # Windows
sha256sum factura.docm                             # Linux
```

Con el SHA256, búsqueda en VirusTotal **por hash**. Si ya lo conoce, tienes veredicto sin haber subido nada. Si no lo conoce, es un fichero nuevo o hecho a medida para vosotros, que también es un dato.

### Luego, qué es de verdad

La extensión la elige el atacante. El tipo real se ve por la cabecera del fichero:

```text
file factura.pdf
```

Un "PDF" que resulta ser un ejecutable, o una `.iso` que dentro trae un `.lnk`, ya está analizado a efectos prácticos.

### Documentos de Office: oletools

| Herramienta | Para qué |
|---|---|
| `oleid` | Resumen rápido: ¿tiene macros?, ¿está cifrado?, ¿trae objetos incrustados? |
| `olevba` | Extrae el código de las macros y marca lo sospechoso (`AutoOpen`, `Shell`, descargas, ofuscación) |
| `mraptor` | Veredicto rápido: ¿las macros hacen algo peligroso al abrir el documento? |

```text
olevba factura.docm
```

Lo que buscas en la salida: macros que se ejecutan solas al abrir (`AutoOpen`, `Document_Open`), llamadas a `Shell` o `powershell`, y URLs de descarga. Esas URLs pasan al punto 2.

### PDF: pdfid y pdf-parser

```text
pdfid.py factura.pdf
```

`pdfid` cuenta palabras clave. Las que importan son `/JavaScript`, `/JS`, `/OpenAction`, `/AA`, `/Launch` y `/EmbeddedFile`. Un PDF de factura con cualquiera de ellas se abre con `pdf-parser.py` para ver qué hace ese objeto.

### HTML adjunto

Un `.htm` o `.html` adjunto suele ser una página de login falsa que se abre en local, sin URL que bloquear. Se lee con el editor: casi siempre hay un `<form>` cuyo `action` es el servidor que recoge las credenciales, a menudo escondido tras un `atob(...)` (base64) o un `unescape(...)`.

### Comprimidos

Si el `.zip` viene con la contraseña en el cuerpo del correo, es precisamente para que la pasarela no pueda abrirlo. Se descomprime en la VM y cada fichero de dentro pasa por los pasos anteriores.

## 4. Dinámico, si hace falta

Si el análisis estático no te ha dado un veredicto claro, se ejecuta el fichero o se visita la URL en una sandbox y se observa qué hace: procesos que lanza, conexiones, ficheros que escribe.

| Sandbox | Nota |
|---|---|
| ANY.RUN | Interactiva: puedes hacer clic dentro. Los análisis gratuitos son públicos. |
| Hybrid Analysis | Automática, informe detallado. Los envíos son públicos. |
| VM propia | Lo único privado de verdad. Con Wireshark o Procmon de fondo. |

Lo que salga de aquí (dominios, IPs, hashes de lo que descarga) son más indicadores para el informe y para bloquear.

## 5. Qué te llevas

Al acabar deberías tener, como mínimo:

| Indicador | De dónde sale |
|---|---|
| Remitente, `Reply-To` y `Return-Path` | Cabeceras |
| IP de origen y su propietario | Primer `Received:` fiable + whois |
| Resultado de SPF, DKIM y DMARC | `Authentication-Results` |
| URLs saneadas y sus dominios | Cuerpo y adjuntos |
| Nombre y hashes de cada adjunto | Paso 3 |
| Lo que hizo en la sandbox | Paso 4 |

Con eso se rellena el [informe](#/phishing/informe) y se aplican las [medidas reactivas](#/phishing/defensa).

## Fuentes

- RFC 5322, formato del mensaje y cabeceras: <https://www.rfc-editor.org/rfc/rfc5322>
- RFC 7208 (SPF), RFC 6376 (DKIM), RFC 7489 (DMARC).
- RFC 8601, cabecera `Authentication-Results`: <https://www.rfc-editor.org/rfc/rfc8601>
- RFC 2047, asuntos codificados `=?UTF-8?B?...?=`: <https://www.rfc-editor.org/rfc/rfc2047>
- oletools: <https://github.com/decalage2/oletools>
- pdfid y pdf-parser (Didier Stevens): <https://blog.didierstevens.com/programs/pdf-tools/>
- Privacidad de los envíos a VirusTotal: <https://docs.virustotal.com/docs/privacy-policy>
- Visibilidad de los escaneos en urlscan.io: <https://urlscan.io/docs/api/>
- CyberChef: <https://gchq.github.io/CyberChef/>
