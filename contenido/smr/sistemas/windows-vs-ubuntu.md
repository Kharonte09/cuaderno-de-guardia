---
titulo: Windows frente a Ubuntu
subtitulo: true
---

# Windows frente a Ubuntu

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Comparar los dos sistemas que se usan en el día a día: qué piden para funcionar, qué cuestan y para qué es mejor cada uno.

## De dónde vienen

**Windows** es el sistema de Microsoft, de la familia Windows NT. Es privativo y de pago, con varias ediciones (Home, Pro, Enterprise) y distintos tipos de licencia. Domina el escritorio doméstico y de oficina.

**Ubuntu** es una distribución de GNU/Linux mantenida por Canonical y basada en Debian. Es libre y gratuita: se descarga de su web y se instala en tantos equipos como se quiera. Es la distribución más usada como primer Linux, porque es la que menos cuesta de coger viniendo de Windows.

## Requisitos mínimos

Comparando una versión de Windows 10 con una Ubuntu de soporte extendido:

| Recurso | Windows 10 | Ubuntu Desktop |
|---|---|---|
| **Procesador** | 1 GHz | 2 GHz |
| **Memoria RAM** | 1 GB en 32 bits, 2 GB en 64 bits | 4 GB |
| **Gráfica** | Compatible con DirectX 9 | Sin requisito concreto |
| **Disco** | 16 GB en 32 bits, 20 GB en 64 bits | 25 GB |

> [!NOTE]
> Los requisitos oficiales de Ubuntu Desktop parecen más altos, pero son los de su escritorio completo. Ahí está la trampa de esta comparación: una distribución Linux con un escritorio ligero (Xubuntu, Lubuntu) o un Ubuntu Server sin interfaz gráfica funciona con una fracción de eso. En Windows no se puede quitar el escritorio.

Y los mínimos oficiales son justo eso: el punto en el que el sistema arranca, no en el que se trabaja a gusto. Para uso real, en los dos casos hay que contar bastante más memoria.

## Comparativa

| | Windows | Ubuntu |
|---|---|---|
| **Coste** | Licencia de pago | Gratuito |
| **Código** | Cerrado | Abierto |
| **Instalación** | Sencilla, guiada | Sencilla, guiada, con opción de probar antes de instalar |
| **Software de oficina** | Microsoft Office, de pago | LibreOffice incluido |
| **Juegos** | El estándar del sector | Cada vez mejor, pero sigue por detrás |
| **Controladores** | Los fabricantes los hacen para Windows primero | Muchos vienen en el propio núcleo; algunos modelos dan guerra |
| **Actualizaciones** | Del sistema, y cada programa por su cuenta | Sistema y programas desde el gestor de paquetes |
| **Personalización** | Limitada | Prácticamente total, incluido el escritorio |
| **Terminal** | Existe y es potente, pero es opcional | Parte natural del trabajo |
| **Uso típico** | Escritorio y oficina | Servidores, desarrollo y equipos reutilizados |

## Por qué los juegos siguen siendo mejores en Windows

No es cosa del sistema en sí, sino del ecosistema:

- Los **controladores gráficos** se desarrollan pensando en Windows.
- Los estudios **programan sobre las bibliotecas de Windows** (DirectX), porque ahí está el público.
- Los **sistemas antitrampas** de los juegos en línea a menudo no funcionan fuera de Windows.

Las capas de compatibilidad han mejorado mucho y hoy se juega bastante en Linux, pero sigue habiendo títulos que simplemente no arrancan.

## Cuál elegir

- **Windows**, si el equipo es para un usuario que necesita programas concretos de Windows, para jugar, o si es el puesto de trabajo de una oficina que ya trabaja así.
- **Ubuntu**, si el equipo va a ser un servidor, si es para desarrollo o administración de sistemas, si hay que revivir un ordenador antiguo, o si el presupuesto no da para licencias.

> [!TIP]
> No hace falta decidir: **arranque dual** para tener los dos en el mismo equipo, una **máquina virtual** para probar sin tocar el sistema principal, o un **USB en vivo** para llevar Ubuntu encima y arrancarlo donde haga falta. Esta última opción es además la herramienta estándar para rescatar datos de un Windows que no arranca.
