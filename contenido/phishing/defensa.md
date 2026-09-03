---
titulo: Acciones defensivas
subtitulo: true
---

# Acciones defensivas

Las medidas se dividen en dos bloques: las **preventivas**, que se montan antes de que pase nada, y las **reactivas**, que son lo que haces cuando el correo ya está en los buzones.

---

# Preventivas

## Marcar el correo externo

Etiquetar como `[EXTERNAL]` todo correo recibido desde fuera de los dominios de la organización.

Es de las medidas más baratas que existen y de las que más rinde: la mayoría de los fraudes de suplantación interna se caen solos cuando el usuario ve que el supuesto correo del CEO viene marcado como externo.

## SPF

Registro **TXT en DNS** que indica qué servidores o IPs pueden enviar correo en nombre del dominio. Evita que un atacante falsifique el dominio con impunidad.

```text
v=spf1 <IP o dominio autorizado> <regla de cumplimiento>
```

Ejemplo:

```text
v=spf1 a: include:mailgun.org include:protection.outlook.com -all
```

Permite el correo desde Mailgun y desde Outlook, y **rechaza cualquier otro remitente** — eso es lo que significa el `-all` del final.

## DKIM

Autentica el correo mediante **firma criptográfica**, verificando integridad y origen. El servidor emisor firma con su clave privada; el receptor usa la clave pública publicada en el DNS para comprobar que nada se ha alterado.

```text
v=DKIM1 <tipo de clave> <clave pública>
```

## DMARC

Combina SPF y DKIM y añade **política de acción e informes**. Define qué hacer con los correos que fallan la autenticación: nada, cuarentena o rechazo.

```text
v=DMARC1; p=<acción>; rua=<correo para los informes>
```

Ejemplo:

```text
v=DMARC1; p=quarantine; rua=mailto:soc@empresa.com
```

Los correos que fallen van a cuarentena y se reportan al administrador.

> [!TIP]
> Los tres se despliegan en este orden y con calma: primero SPF, luego DKIM, y DMARC al final empezando por `p=none` para ver los informes sin romper nada. Pasar directamente a `p=reject` en un dominio con muchos sistemas que envían correo es la forma más rápida de tirar las facturas y las notificaciones de la empresa.

## Filtros de spam

### Según dónde se colocan

| Tipo | Dónde | Ejemplo |
|---|---|---|
| **Gateway** | Detrás del firewall corporativo | Barracuda |
| **Alojado** | En la nube, se actualiza rápido | SpamTitan |
| **De escritorio** | En el equipo del usuario, entorno pequeño | Freeware variado, con poco control sobre su propia seguridad |

### Según cómo detectan

- **Filtros de contenido** — analizan cabeceras y cuerpo buscando patrones, palabras clave o listas negras.
- **Filtros basados en reglas** — criterios predefinidos por el administrador. Reglas de Exchange que cazan cosas como "OFERTA GRATUITA".
- **Filtros bayesianos** — aprendizaje automático a partir del comportamiento del usuario al marcar correos como spam. Mejoran con el tiempo, pero **necesitan histórico suficiente** para ser útiles.

## Filtros de adjuntos

### Extensiones de riesgo frecuente

| Categoría | Extensiones |
|---|---|
| Ejecutables y scripts | `.exe` `.vbs` `.js` `.bat` `.ps1` |
| Imágenes de disco y web | `.iso` `.htm` `.html` |

### Extensiones normales en empresa, que también pueden ser maliciosas

| Categoría | Extensiones |
|---|---|
| Documentos y hojas | `.doc` `.docx` `.docm` `.xls` `.xlsx` `.xlsm` |
| Comprimidos y PDF | `.zip` `.pdf` |

Las terminadas en `m` —`.docm`, `.xlsm`— son las que **admiten macros**. Si en tu organización nadie las necesita, bloquearlas de entrada quita mucho trabajo.

### Qué se puede hacer al detectar uno

- Analizar el fichero buscando indicadores de malware.
- Bloquear la entrega del correo.
- Poner el correo en cuarentena, o eliminar solo el adjunto.
- Alertar al administrador o al equipo de seguridad.
- Generar registros para el SIEM y para la investigación posterior.

## Formación del usuario

El phishing es ingeniería social usando el correo como medio de entrega. Por eso la formación no es un extra: es un control de seguridad más.

Hacen falta **sesiones rutinarias**, no una charla al entrar en la empresa, para que cualquiera sepa reconocer un correo sospechoso y, sobre todo, **sepa a dónde reportarlo**.

---

# Reactivas

El proceso de respuesta inmediata, en orden.

## 1. Recuperar el correo original

Obtener la versión íntegra desde la pasarela de correo o desde el servidor (Exchange u otro), o pedirle al empleado que lo reenvíe a un buzón de seguridad.

> [!WARNING]
> Reenviar un correo **destruye las cabeceras originales**, que es justo lo que necesitas. Si tiene que enviarlo el usuario, que lo adjunte como fichero `.eml` o `.msg`, no que le dé a "Reenviar".

## 2. Recolectar artefactos

Extraer del correo las cabeceras, las URLs y los adjuntos, para analizarlos y sacar los indicadores.

## 3. Informar a los destinatarios

Avisar a quienes lo recibieron para que dejen de interactuar con él. La notificación debe incluir:

- Fecha y hora del envío.
- El **asunto exacto** del correo malicioso.
- Qué hacer: eliminarlo, o reenviarlo al equipo de seguridad.
- Un contacto del equipo para dudas.

## 4. Analizar e investigar

Con sandboxing, VirusTotal, URL2PNG, IPVoid o máquinas virtuales, según haga falta. El objetivo es determinar la peligrosidad y el origen del correo, de las URLs y de los adjuntos.

## 5. Tomar medidas defensivas

Bloquear correos, URLs y ficheros. Impedir que la gente llegue a la página de phishing o descargue el malware.

## 6. Completar el informe

Documentar todo: detección, análisis, notificaciones y medidas aplicadas.

No es burocracia. Es el **registro de auditoría** que demuestra que el incidente se gestionó correctamente, y es lo primero que se pide cuando el caso acaba escalando.
