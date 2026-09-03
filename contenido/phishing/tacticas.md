---
titulo: Tácticas y técnicas
subtitulo: true
---

# Tácticas y técnicas

Las técnicas que usan los atacantes para que sus correos parezcan legítimos, aumenten la probabilidad de que alguien interactúe, esquiven los sistemas de análisis y dificulten la respuesta del equipo de seguridad.

## Spear phishing

Ataque dirigido en el que el atacante **investiga a la víctima antes de escribir**: LinkedIn, redes sociales, búsqueda inversa de imágenes, contactos, intereses. Con eso personaliza el correo y lo hace muy creíble.

Al estar adaptado al destinatario, sube muchísimo la probabilidad de que pulse el enlace, introduzca credenciales o abra el adjunto.

Se suele combinar con suplantación del remitente o typosquatting. Un caso típico: localizar a un empleado en LinkedIn, encontrar su Facebook, y usar detalles personales para construir un correo que le convenza de abrir un fichero.

## Impersonation

Fingir ser otra persona para ganarse la confianza del objetivo. Puede ser un amigo, un compañero o alguien con autoridad dentro de la empresa: un responsable, el CEO.

Cuando la orden viene de arriba, la víctima **piensa menos y obedece más**, por miedo a las consecuencias de no hacerlo. Es lo que hace tan eficaz el fraude del CEO contra el departamento financiero.

## Typosquatting y homógrafos

Dos formas de hacer que un dominio parezca el legítimo.

**Typosquatting** — registrar dominios casi idénticos al original, cambiando o quitando una letra:

```text
DicksonUnited.co.uk   ← el real
DicksonUnted.co.uk    ← el del atacante
```

Con ese dominio ya puede enviar correos que parecen auténticos: por ejemplo suplantando a una responsable de RR. HH. para sacarle datos a un empleado.

**Homógrafos** — aprovechar que caracteres de alfabetos distintos se ven igual. La "o" latina y la "о" cirílica son visualmente idénticas, pero son caracteres diferentes, así que el dominio es otro.

> [!WARNING]
> Un ataque homógrafo bien hecho **no se detecta a simple vista**, ni con formación ni con buena voluntad. La defensa aquí no puede ser el usuario: tiene que ser tecnología de seguridad del correo que analice los enlaces y compruebe si el dominio es malicioso.

## Sender spoofing

El campo `From:` se manipula para que parezca venir de una fuente de confianza. El protocolo **SMTP permite fijar cualquier dirección de remitente**, así que técnicamente es trivial.

A menudo se acompaña de un `Reply-To:` distinto, para que las respuestas lleguen a una cuenta que el atacante sí controla.

## HTML styling

Se usa código HTML e imágenes para que el correo parezca profesional y con la marca correcta. Los recolectores de credenciales lo copian para ganar credibilidad.

Muchos `.eml` incluyen partes codificadas en **Base64** —es muy habitual— que hay que decodificar para ver el HTML real. Con **CyberChef** o con utilidades locales se extrae esa parte a un `.html` y se revisa.

> [!TIP]
> Revisa el HTML en un editor de texto, nunca abriéndolo en el navegador. Ahí es donde se ve a dónde apunta de verdad cada botón, y si hay un formulario que envía a un dominio ajeno.

## Adjuntos

Tres tipos, de menos a más peligroso:

**1. Ficheros no maliciosos usados como ingeniería social.** Facturas, cartas o formularios falsos. No llevan código, sirven para que el usuario entregue información. Por ejemplo, hacerse pasar por RR. HH. y mandar un formulario para "actualizar la nómina", con urgencia añadida: *si no respondes rápido no cobras*. Aunque el fichero sea inofensivo, lo que el empleado escriba en él sirve para fraudes posteriores.

**2. Ficheros limpios con hipervínculos maliciosos (documentos *lure*).** Un PDF o un Word que parece inocuo pero contiene un enlace a una web maliciosa. Sirve para **evadir los controles del correo**, porque el fichero en sí no tiene nada que detectar. Ejemplo: un PDF que dice "ver factura en línea" y lleva a un sitio que roba credenciales.

**3. Ficheros maliciosos.** Llevan el código dentro. El caso clásico son los documentos de Office con macros: si el usuario pulsa "Habilitar contenido", se ejecutan comandos que descargan e instalan el malware.

## Hipervínculos

Una URL incrustada en texto, imagen o botón. Los atacantes los usan para llevar a la víctima a páginas de login falsas, descargas de malware u otro contenido de la campaña.

Se combinan casi siempre con otras técnicas:

- **Dominios con errores tipográficos** — `micr0soft.com` en vez de `microsoft.com`.
- **Acortadores de URL** para ocultar el destino real.

## Acortadores de URL

Servicios como Bitly o TinyURL guardan la URL completa y generan una versión corta que redirige a ella. Para el atacante son útiles porque **disfrazan el destino** y estorban a parte del análisis automático.

Para verlo sin visitarlo, [wannabrowser.net](https://www.wannabrowser.net/) permite pedir la página como si fueras un navegador cualquiera y ver qué responde.

## Uso de servicios legítimos

Los atacantes se apoyan en **Gmail, Outlook, MailChimp, Dropbox o Google Drive** para evadir defensas y ganar apariencia de fiabilidad.

Pueden enviar desde dominios comunes, usar plataformas de marketing reales, o alojar el fichero malicioso en la nube y poner solo el enlace en el correo.

Funciona por una razón muy simple: **las empresas no pueden bloquear esos servicios**, porque los usan a diario, y los empleados confían en ellos.

## Business Email Compromise (BEC)

Fraude en el que el atacante finge ser alguien de la empresa —o directamente compromete su cuenta— para ordenar transferencias, pedir datos sensibles o manipular a proveedores. Las pérdidas globales se cuentan por miles de millones.

**Cómo funciona:** primero reconocimiento, estudiando quién paga a quién y con qué proceso. Después suplantan o comprometen la cuenta adecuada y ordenan el pago a una cuenta que controlan.

**Cinco escenarios reales:**

1. **Cuenta comprometida → factura falsa.** Desde la cuenta real de quien gestiona pagos, se envían facturas a proveedores con los datos bancarios del atacante.
2. **Suplantación → cambio de método de pago.** Correo falso pidiendo actualizar la cuenta bancaria de un proveedor.
3. **Fraude al CEO/CFO.** Se hacen pasar por un directivo y exigen una transferencia urgente y confidencial.
4. **Robo de datos.** Piden información del empleado —dirección, datos bancarios— para ataques futuros o para venderla.
5. **Hilos zombi.** Comprometen una cuenta legítima y **responden a conversaciones antiguas reales** insertando enlaces maliciosos. Es de lo más difícil de detectar: el hilo es auténtico y el remitente también.

**Defensa, en tres acciones:**

1. Verificar **cualquier** cambio de datos de pago por teléfono o canal fuera del correo.
2. MFA, y monitorizar cuentas comprometidas y cabeceras de autenticación.
3. Formación: no ejecutar instrucciones urgentes recibidas por correo sin confirmarlas por otra vía.

> [!IMPORTANT]
> Fíjate en que ninguna de las tres es un producto. El BEC no lleva malware ni enlaces la mayoría de las veces —solo texto— así que no hay nada técnico que detectar. Se para con proceso, no con herramienta.
