---
titulo: Tipos de phishing
subtitulo: true
---

# Tipos de phishing

Casi todos los ataques por correo buscan lo mismo —que descargues un fichero o que escribas tus credenciales en una web falsa— pero hay varias formas de conseguirlo, y unas funcionan bastante mejor que otras.

| Tipo | Objetivo | Volumen |
|---|---|---|
| **Recon** | Confirmar que la dirección existe y que alguien la lee | Alto |
| **Credential harvester** | Robar usuario y contraseña | Alto |
| **Ingeniería social** | Que respondas, pagues o entregues información | Medio |
| **Vishing y smishing** | Lo mismo, pero por SMS o llamada | Variable |
| **Whaling** | Directivos con acceso a lo importante | Muy bajo |
| **Fichero malicioso** | Ejecutar código en tu equipo | Alto |
| **Spam** | Vender algo, o preparar el terreno | Muy alto |

## Recon

Buscan confirmar que una dirección está activa y que el usuario abre o interactúa con el mensaje, para preparar ataques posteriores: phishing dirigido, BEC o envío de malware.

**Tres variantes:**

- **Recon spam** — envíos masivos simples para ver qué direcciones rebotan y cuáles no. Si no rebota, existe.
- **Recon por ingeniería social** — mensajes personalizados que inducen a responder, haciéndose pasar por contactos legítimos.
- **Pixel recon** — un píxel o URL invisible que, al cargarse, avisa al atacante de que el mensaje se ha abierto.

**Qué obtiene con un solo píxel:** IP, fecha y hora de apertura, tipo de cliente (webmail o aplicación), sistema operativo, resolución y si es móvil o escritorio. Todo eso sirve para afinar el siguiente ataque.

> [!TIP]
> Es el motivo por el que los clientes de correo bloquean las imágenes remotas por defecto. No es estética: es evitar que abrir un correo confirme al atacante que estás ahí.

## Credential harvester

El más común con diferencia.

- **Imita servicios muy utilizados**: Outlook, Amazon, DHL, FedEx, bancos, la administración pública.
- **Empuja a introducir credenciales** en un portal de inicio de sesión falso.
- Usa ingeniería social: **sensación de urgencia** y **autoridad falsa**.
- Las URL pueden ser completamente aleatorias o intentar parecerse al dominio legítimo de la organización suplantada.
- Suelen tener **pequeños errores de ortografía o de estilo**, algo muy raro en correos reales de una marca grande.

## Ingeniería social

El phishing **ya es** un ataque de ingeniería social en sí mismo. Estas son las tácticas que más se ven:

- Convencer al destinatario de que responda al correo inicial (los correos de recon).
- Convencerle de que **transfiera dinero**, haciéndose pasar por el CEO, el CFO u otro directivo.
- Convencerle de que entregue **información confidencial**, haciéndose pasar por el titular de esos datos o por alguien de rango superior.

Todos los correos de suplantación usan alguna técnica de este tipo, porque el phishing no ataca sistemas técnicos: va a por la persona que está detrás de la pantalla.

## Vishing y smishing

Suplantación usando el teléfono en lugar del correo.

| | Smishing (SMS) | Vishing (llamada) |
|---|---|---|
| **Vector** | Mensajes de texto o apps de mensajería | Llamadas de voz |
| **Busca** | Información personal o financiera (PII, PCI) | Acceso a cuentas corporativas o datos financieros |
| **A quién** | Masivo y genérico, sin objetivo concreto | Empleados con cierto nivel de acceso, uno o dos niveles bajo dirección |
| **Defensa** | Formación, no pulsar enlaces de números desconocidos, filtros | Formación, bloqueo de llamadas automatizadas, códigos internos de autorización, separación de funciones |

## Whaling

Phishing muy dirigido a **altos cargos** —CEO, CFO, COO— aprovechando que tienen acceso a información sensible y, a menudo, menos formación en seguridad que el resto de la plantilla.

**Características:**

- Altamente personalizado, construido con **OSINT** para parecer legítimo.
- **Volumen bajísimo**, lo que lo hace difícil de detectar por filtros automáticos: no hay campaña masiva que correlacionar.
- Puede llevar malware, enlaces a robo de credenciales, o ser puramente ingeniería social.

**Defensas:**

- Formación específica para directivos **y para sus asistentes**, que son quienes suelen leer el correo primero.
- Marcado de correos externos.
- Políticas de DLP.
- Alertas tempranas ante mensajes sospechosos dirigidos a esas cuentas.

## Fichero malicioso

### Cómo llega

- **Adjunto**: el fichero viene dentro del correo (Word, Excel, PDF).
- **Enlace a malware**: el correo lleva un hipervínculo que descarga el fichero desde un servidor.

### Adjuntos y macros

Los documentos de Office pueden contener **macros**, scripts que al activarse descargan y ejecutan malware. Hoy vienen deshabilitadas por defecto, así que los atacantes engañan al usuario para que las active: *"Habilitar contenido"*, *"este documento se creó con una versión anterior"*.

Una vez activadas pueden traer troyanos, ransomware o lo que toque.

### Malware alojado

El atacante hospeda el fichero en un **dominio propio** y convence al usuario de que lo descargue. Registrar dominios es barato y rápido, y por eso un porcentaje enorme de los dominios recién creados son maliciosos.

### Dominios comprometidos

En lugar de crear dominios nuevos, vulneran **sitios legítimos** y distribuyen desde ahí, sin tocar la web visible. Es más eficaz: el dominio tiene historial y reputación buena.

### Defensas

- Macros deshabilitadas por política de empresa.
- Formación: no abrir adjuntos de remitentes desconocidos.
- Reglas **ASR** y controles que impidan la ejecución de código desde Office.
- Filtrar y bloquear dominios y URLs maliciosos, tras confirmarlo con el análisis.

## Spam

Mensajes no solicitados o inesperados, pero **no necesariamente maliciosos**: boletines, marketing, promociones, productos varios. Suelen venir de listas de correo compradas o vendidas, y por ley deben incluir opción de cancelar la suscripción.

**Malspam** es la versión con intención maliciosa: envío masivo con enlaces o adjuntos que buscan infectar.

> [!WARNING]
> El riesgo del spam "inofensivo" está en el enlace de darse de baja. Al pulsarlo, el sitio puede tomar huella del sistema y, sobre todo, **confirmar que la cuenta está activa y la lee una persona**. Es recon disfrazado de cortesía.

## Falso positivo

Un correo **legítimo** marcado o reportado como malicioso por error.

**Causas habituales:**

1. Desconfianza del usuario, que cree que el correo es malicioso.
2. Formato extraño o poco profesional, típico de correos internos hechos deprisa.
3. Contenido inesperado que pide una acción: pulsar, contactar, transferir.
4. Falta de formación en análisis de correo.

**Y no es un problema.** Un falso positivo significa que la gente está atenta y reporta. Es preferible tener muchos a que se cuele uno real: un solo correo que funcione puede comprometer toda la red.

> [!TIP]
> Cómo cierras un falso positivo importa más de lo que parece. Si el usuario recibe una respuesta seca o siente que ha hecho el ridículo, la próxima vez no reporta — y esa vez puede ser la buena.
