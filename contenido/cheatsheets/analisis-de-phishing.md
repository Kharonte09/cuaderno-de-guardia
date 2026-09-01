---
titulo: Análisis de phishing
subtitulo: true
---

# Análisis de phishing

Checklist operativo para despachar un correo sospechoso sin dejarse nada. Las herramientas de cada paso están en [Phishing y correo](#/herramientas/phishing).

## Antes de empezar

1. Pide el correo **como adjunto** (`.eml` o `.msg`), no reenviado: reenviarlo destruye las cabeceras originales.
2. Trabaja en una máquina de análisis o, como mínimo, sin hacer clic en nada.
3. Anota hora de recepción, destinatarios y si alguien ha picado ya.

## Paso 1 · Cabeceras

| Campo | Qué mirar | Alarma |
|---|---|---|
| `From:` | Nombre mostrado vs. dirección real | "Soporte Microsoft" con dominio gratuito |
| `Return-Path` | Remitente de sobre | No coincide con el `From:` |
| `Reply-To` | A dónde va la respuesta | Dominio distinto al remitente |
| `Received:` (el de más abajo) | Primera IP pública: el origen real | País o proveedor incoherente |
| `Message-ID` | Dominio del identificador | No coincide con el servidor emisor |
| `X-Originating-IP` | IP del cliente que envió | Presente y ajena a la organización |
| `Date` vs. `Received` | Coherencia temporal | Desfase grande |

> [!TIP]
> Los `Received:` se leen **de abajo arriba**. El de más abajo es el primer salto, es decir, el origen.

## Paso 2 · Autenticación

```
Authentication-Results: spf=pass smtp.mailfrom=malo.com
                        dkim=none
                        dmarc=fail (p=reject) header.from=banco.es
```

| Resultado | Significado |
|---|---|
| `spf=pass` | La IP puede enviar por el dominio del **sobre**, no por el `From:` visible |
| `spf=fail` | La IP no está autorizada por el dominio |
| `dkim=pass` | La firma es válida y el mensaje no se ha alterado |
| `dkim=none` | No venía firmado |
| `dmarc=pass` | SPF o DKIM pasan **y además alinean** con el `From:` visible |
| `dmarc=fail` | Suplantación del dominio del `From:` |

> [!IMPORTANT]
> `spf=pass` **no** significa legítimo: el atacante pasa SPF de su propio dominio. Lo que importa es **`dmarc`** y la alineación con el `From:` que ve el usuario.

Comprobar los registros del dominio suplantado:

```bash
dig empresa.com TXT +short              # SPF
dig _dmarc.empresa.com TXT +short       # política DMARC (p=none/quarantine/reject)
```

## Paso 3 · Remitente y dominio

- **Fecha de registro** del dominio (whois): registrado hace días → phishing casi seguro.
- **Parecido tipográfico**: `rnicrosoft.com`, `micros0ft.com`, `banco-seguridad.com`.
- **Homógrafos**: caracteres cirílicos que se ven igual que los latinos (`раypal`).
- **Subdominio engañoso**: `banco.es.login-seguro.xyz` → el dominio real es `login-seguro.xyz`.
- **Reputación de la IP emisora**: Talos, AbuseIPDB, Spamhaus.

## Paso 4 · Enlaces

1. **No hagas clic.** Copia el enlace con clic derecho, o léelo del código fuente.
2. Expande acortadores sin visitarlos:
   ```bash
   curl -sIL "https://bit.ly/xxxx" | grep -i "^location:"
   ```
3. Pásalo por **urlscan.io** (modo *Unlisted* si lleva un token de la víctima) y mira la captura, las redirecciones y los dominios contactados.
4. Comprueba en VirusTotal, PhishTank y OpenPhish.
5. Señales típicas:
   - El texto del enlace no coincide con el destino real.
   - Dominio distinto al de la marca suplantada.
   - Parámetros con el correo de la víctima ya rellenado.
   - Alojado en servicios legítimos abusados: Firebase, Cloudflare Pages, SharePoint ajeno, Google Forms, Telegram.

## Paso 5 · Adjuntos

| Extensión | Riesgo |
|---|---|
| `.html` / `.htm` | **Muy alto.** Formulario de robo embebido; los antivirus casi no lo ven |
| `.iso` / `.img` / `.vhd` | Alto. Contenedor para saltarse Mark of the Web |
| `.lnk` | Alto. Acceso directo que lanza PowerShell |
| `.js` / `.wsf` / `.hta` / `.vbs` | Alto. Script directo |
| `.docm` / `.xlsm` / `.xlsb` | Alto. Macros |
| `.zip` / `.rar` con contraseña en el cuerpo | Alto. Evita el análisis del antivirus |
| `.pdf` | Medio. Normalmente sólo lleva el enlace |
| `.exe` / `.msi` / `.scr` | Alto, pero casi siempre bloqueado en la pasarela |

Sin abrirlos:

```bash
sha256sum adjunto            # y buscar el hash en VirusTotal
file adjunto                 # tipo real, no la extensión
oleid documento.doc          # ¿macros, objetos, cifrado?
olevba -a documento.doc      # extraer y desofuscar macros
pdfid.py documento.pdf       # /JavaScript /OpenAction /Launch /EmbeddedFile
```

Un `.html` sospechoso se abre **en un editor de texto**, nunca en el navegador. Busca `atob(`, `eval(`, `document.write`, `<form action=` y bloques Base64 largos.

## Paso 6 · Contenido y contexto

Señales de ingeniería social:

- **Urgencia**: "en 24 h se bloquea la cuenta".
- **Autoridad**: se hace pasar por dirección, RR. HH. o un proveedor.
- **Secreto**: "no lo comentes con nadie" (fraude del CEO).
- **Cambio de datos bancarios** en una factura.
- Saludo genérico, o al contrario, datos personales reales que dan credibilidad.
- Errores de idioma, o traducción demasiado perfecta y aséptica.
- Hilo de correo falseado ("RE:" sin conversación previa).

## Paso 7 · Alcance

Antes de cerrar, siempre:

```
# ¿A cuántos más ha llegado?
remitente = <dirección>  OR  asunto = "<asunto>"

# ¿Alguien ha hecho clic?
url = "<dominio del enlace>"   en logs de proxy y DNS

# ¿Alguien se ha autenticado después desde una IP rara?
inicios de sesión de los destinatarios en las horas siguientes
```

## Paso 8 · Acciones

| Situación | Acción |
|---|---|
| Confirmado, nadie ha picado | Purgar de todos los buzones, bloquear remitente y dominio |
| Alguien ha hecho clic | Aislar equipo, revisar EDR, revisar sesiones del usuario |
| Alguien ha metido credenciales | **Cuenta comprometida**: revocar sesiones, cambiar contraseña, revisar MFA y reglas de reenvío |
| Adjunto ejecutado | Incidente: aislar, volcar memoria, buscar persistencia |
| Campaña dirigida | Avisar a la plantilla, subir IOC al SIEM, informar a CTI |

## IOC que extraer siempre

- Dirección y dominio del remitente, y la IP emisora real.
- `Message-ID` y asunto (para buscar el resto de copias).
- URLs completas y dominios de destino, incluida la cadena de redirecciones.
- SHA256 de cada adjunto.
- Dominio de exfiltración del formulario, si lo hay.

## Plantilla de cierre

```
Veredicto:      phishing de robo de credenciales / fraude / falso positivo
Suplanta a:     Microsoft 365
Remitente:      contacto@dominio-malo.com  (IP 203.0.113.45, ASN xxx)
Autenticación:  spf=pass dkim=none dmarc=fail
Enlace:         hxxps://login-seguro[.]xyz/o365  -> formulario de credenciales
Adjuntos:       ninguno
Alcance:        12 destinatarios · 1 clic · 0 credenciales introducidas
Acciones:       purgado de buzones, dominio bloqueado en proxy y DNS,
                usuario avisado, IOC subidos al SIEM
```

> [!TIP]
> Escribe las URLs maliciosas **defanged** (`hxxps://`, `dominio[.]com`) en tickets, informes y correos. Evita clics accidentales y que los clientes de correo las conviertan en enlaces vivos.
