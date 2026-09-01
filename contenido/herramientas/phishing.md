---
titulo: Phishing y correo
subtitulo: true
tarjetas: true
---

# Herramientas de phishing y correo

El análisis de correos sospechosos es, con diferencia, el ticket más repetido de un SOC. Aquí están las herramientas para las cuatro cosas que hay que mirar siempre: **cabeceras, remitente, enlaces y adjuntos**.

> [!IMPORTANT]
> Orden de trabajo recomendado: primero cabeceras (¿de dónde viene?), luego autenticación (SPF/DKIM/DMARC), luego enlaces en un entorno aislado, y sólo al final los adjuntos. Nunca abras el correo desde tu equipo corporativo: trabaja con el `.eml` exportado.

## Análisis de cabeceras y autenticación

### MXToolbox
`Cabeceras + DNS` `Gratis` [mxtoolbox.com/EmailHeaders.aspx](https://mxtoolbox.com/EmailHeaders.aspx)

**Para qué sirve:** analizador de cabeceras que descompone el recorrido del correo salto a salto (`Received:`) y marca los tiempos de cada salto. Además tiene comprobación de listas negras, MX, SPF y DMARC.

**Uso básico:**
1. En tu cliente de correo, exporta el mensaje o copia las cabeceras completas (*Ver original* en Gmail, *Propiedades* en Outlook).
2. Pega y analiza. Lee los `Received:` **de abajo arriba**: el de más abajo es el origen real.
3. Anota la primera IP pública que aparece: ese es el servidor emisor real, y es el indicador que vas a buscar en Talos y AbuseIPDB.

### Google Message Header Analyzer
`Cabeceras` `Gratis` [toolbox.googleapps.com/apps/messageheader](https://toolbox.googleapps.com/apps/messageheader/)

**Para qué sirve:** alternativa muy limpia para visualizar la cadena de entrega y detectar retrasos o saltos anómalos. Va bien como segunda opinión de MXToolbox.

### Learn and Test DMARC
`SPF/DKIM/DMARC` `Gratis` [learndmarc.com](https://www.learndmarc.com/)

**Para qué sirve:** aprender de verdad cómo se evalúan SPF, DKIM y DMARC: mandas un correo a la dirección que te dan y te dibuja todo el proceso de validación paso a paso.

> [!NOTE]
> Los tres conceptos, en corto:
> - **SPF**: qué IPs pueden enviar en nombre del dominio (mira el `MAIL FROM`, el remitente de sobre).
> - **DKIM**: firma criptográfica del mensaje; garantiza que no se ha alterado.
> - **DMARC**: qué hacer si SPF o DKIM fallan (`none`, `quarantine`, `reject`) y exige **alineación** con el `From:` que ve el usuario.
>
> Un correo puede pasar SPF perfectamente y ser phishing: el atacante pasa SPF **de su propio dominio**. Lo que importa es la alineación con el `From:` visible.

### dmarcian / DMARC Analyzer
`DMARC` `Freemium` [dmarcian.com/dmarc-inspector](https://dmarcian.com/dmarc-inspector/)

**Para qué sirve:** inspeccionar y validar registros DMARC/SPF de un dominio y entender los informes agregados. Útil tanto para revisar tu dominio como para valorar si un dominio suplantado tenía protección.

### Spamhaus / Barracuda / SORBS
`Listas negras` `Gratis` [check.spamhaus.org](https://check.spamhaus.org/)

**Para qué sirve:** comprobar si la IP emisora está en listas de bloqueo de spam. Un resultado positivo respalda la clasificación del correo, y si aparece **tu** IP, tienes un problema de correo saliente que investigar.

## Análisis de URLs y páginas

### urlscan.io
`Sandbox web` `Gratis + API` [urlscan.io](https://urlscan.io/)

**Para qué sirve:** abrir la URL sospechosa desde una máquina remota aislada y ver captura de pantalla, dominios contactados, redirecciones y DOM. Es *la* herramienta de phishing.

**Uso básico:** pega la URL → revisa la captura (¿imita a Microsoft 365?), la lista de *Domains* (¿hay algún dominio de exfiltración?) y el veredicto de la comunidad. Busca por `page.domain` para encontrar el resto de la campaña.

### PhishTool
`Análisis integral` `Gratis (Community)` [phishtool.com](https://www.phishtool.com/)

**Para qué sirve:** subes el `.eml` y te da un análisis completo en una sola pantalla: cabeceras interpretadas, autenticación, URLs, adjuntos con hashes y una plantilla de informe. Ahorra muchísimo tiempo en el triaje.

### CheckPhish / Phishtank / OpenPhish
`Listas` `Gratis` [phishtank.org](https://phishtank.org/)

**Para qué sirve:** bases de datos comunitarias de URLs de phishing ya reportadas. Consulta rápida para saber si la campaña ya es conocida.

### Browserling
`Navegador remoto` `Gratis limitado` [browserling.com](https://www.browserling.com/)

**Para qué sirve:** navegador desechable en la nube para abrir una web sospechosa sin arriesgar tu equipo, cuando urlscan no basta (por ejemplo, si necesitas interactuar).

### Unshorten.it / ExpandURL
`Redirecciones` `Gratis` [unshorten.it](https://unshorten.it/)

**Para qué sirve:** revelar el destino real de un acortador (`bit.ly`, `t.co`) sin visitarlo. También lo hace `curl`:

```bash
curl -sIL "https://bit.ly/xxxx" | grep -i "^location:"
```

> [!TIP]
> Muchos acortadores muestran el destino si añades `+` al final de la URL (`bit.ly/xxxx+`).

## Análisis de adjuntos

### Oletools
`Ofimática` `Open source` [github.com/decalage2/oletools](https://github.com/decalage2/oletools)

**Para qué sirve:** analizar documentos de Office sin abrirlos. `olevba` extrae y desofusca macros VBA; `oleid` da un veredicto rápido de riesgo; `oleobj` saca objetos embebidos.

```bash
oleid factura.doc        # ¿tiene macros, objetos, cifrado?
olevba -a factura.doc    # extrae macros y marca palabras clave sospechosas
```

### pdf-parser y pdfid (Didier Stevens)
`PDF` `Open source` [blog.didierstevens.com/programs/pdf-tools](https://blog.didierstevens.com/programs/pdf-tools/)

**Para qué sirve:** inspeccionar la estructura de un PDF buscando lo peligroso: `/JavaScript`, `/OpenAction`, `/Launch`, `/EmbeddedFile`.

```bash
pdfid.py documento.pdf                 # recuento de elementos peligrosos
pdf-parser.py -s JavaScript documento.pdf
```

### emldump / msgconvert
`Formatos` `Open source` [blog.didierstevens.com/programs/oledump-py](https://blog.didierstevens.com/programs/oledump-py/)

**Para qué sirve:** extraer partes y adjuntos de ficheros `.eml`, y convertir el `.msg` propietario de Outlook a `.eml` estándar para poder analizarlo con el resto de herramientas.

### Eml Analyzer
`Web` `Gratis` [eml-analyzer.herokuapp.com](https://github.com/ninoseki/eml_analyzer)

**Para qué sirve:** subir un `.eml` y ver estructura, cabeceras, URLs y adjuntos en el navegador, sin instalar nada. Práctico para un triaje rápido cuando no tienes tu caja de herramientas a mano.

## Simulación y concienciación

### GoPhish
`Simulación` `Open source` [getgophish.com](https://getgophish.com/)

**Para qué sirve:** montar campañas de phishing simulado internas: plantillas, páginas de aterrizaje, seguimiento de aperturas y clics, e informes por departamento.

> [!CAUTION]
> Una campaña de simulación necesita **autorización escrita de dirección y de RR. HH.**, aviso al SOC (para que no abra un incidente real) y cuidado con el tono: el objetivo es medir y formar, no humillar a nadie.

### King Phisher / Evilginx
`Simulación avanzada` `Open source` [github.com/kgretzky/evilginx2](https://github.com/kgretzky/evilginx2)

**Para qué sirve:** demostrar ataques *adversary-in-the-middle* que capturan cookies de sesión y **saltan el MFA**. Se mencionan porque hay que entender la técnica para detectarla; su uso está restringido a ejercicios de Red Team autorizados.

**En defensa:** la señal a vigilar es el inicio de sesión con cookie de sesión válida desde una IP y agente distintos a los del usuario justo tras un correo. Se detecta con reglas de sesión anómala y se mitiga con **claves de acceso / FIDO2**, que no son suplantables por proxy.

### KnowBe4 / Proofpoint Security Awareness
`Formación` `De pago` [knowbe4.com](https://www.knowbe4.com/)

**Para qué sirve:** plataformas comerciales de concienciación con campañas continuas, formación asignada automáticamente al que pica y métricas de riesgo humano por empleado.

## Bloques que revisar siempre en un correo

| Elemento | Qué mirar | Señal de alarma |
|---|---|---|
| `From:` visible | Nombre mostrado vs. dirección real | "Soporte Microsoft" &lt;random@gmail.com&gt; |
| `Return-Path` / `Reply-To` | ¿Coincide con el `From:`? | Responder va a otro dominio |
| Primer `Received:` | IP y país de origen | Origen que no encaja con el supuesto remitente |
| Dominio | Fecha de registro y parecido tipográfico | `micr0soft.com`, registrado ayer |
| Autenticación | SPF / DKIM / DMARC y alineación | `dmarc=fail` con dominio suplantado |
| Enlaces | Destino real al pasar el ratón | Texto "empresa.com" apuntando a otro sitio |
| Adjuntos | Extensión real y doble extensión | `.html`, `.iso`, `.lnk`, `factura.pdf.exe` |
| Tono | Urgencia, secreto, amenaza | "Responde en 2 h o se bloquea la cuenta" |

> [!TIP]
> Los adjuntos `.html` son ahora el vector estrella: no los detectan los antivirus y contienen el formulario de robo de credenciales embebido, sin salir a internet hasta que el usuario escribe. Ábrelos siempre en un editor de texto, nunca en un navegador.
