---
titulo: Qué es un sistema operativo
subtitulo: true
---

# Qué es un sistema operativo

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

El programa que está por debajo de todos los demás: reparte el hardware entre ellos y les da una forma común de usarlo.

## Qué hace

El sistema operativo es el software principal de un equipo. Entre el hardware y los programas, se encarga de:

| Función | Qué significa |
|---|---|
| **Gestionar el procesador** | Decidir qué programa se ejecuta en cada momento y por cuánto tiempo |
| **Gestionar la memoria** | Dar a cada programa su espacio y evitar que se pisen entre ellos |
| **Gestionar el almacenamiento** | Organizar los datos en ficheros y carpetas |
| **Gestionar los dispositivos** | Hablar con teclado, pantalla, red o impresora a través de sus controladores |
| **Ofrecer una interfaz** | Gráfica o de comandos, para que la persona maneje el equipo |
| **Controlar el acceso** | Usuarios, permisos y qué puede hacer cada uno |

Sin sistema operativo, cada programa tendría que saber hablar con cada modelo de tarjeta gráfica y de disco que existe. Con él, le basta con pedirle las cosas al sistema.

> [!NOTE]
> El sistema operativo no es lo primero que se ejecuta al encender: antes está el firmware de la placa, el [BIOS o UEFI](#/smr/montaje/bios-uefi), que hace las comprobaciones de arranque y luego le pasa el control.

## Las partes

- **Núcleo** (*kernel*) — la pieza central, que gestiona procesador, memoria y dispositivos. Es lo que de verdad es el sistema operativo.
- **Controladores** (*drivers*) — el código que sabe hablar con cada hardware concreto.
- **Intérprete de órdenes** (*shell*) — recoge lo que pide el usuario, por línea de comandos o por interfaz gráfica.
- **Programas del sistema** — utilidades que vienen con él: gestor de archivos, configuración, herramientas de disco.

## Los tres grandes de escritorio

| Sistema | Quién lo hace | Licencia |
|---|---|---|
| **Windows** | Microsoft | Privativo y de pago, con varias ediciones |
| **macOS** | Apple | Privativo, ligado a su hardware |
| **GNU/Linux** | Comunidad, con muchas distribuciones | Libre y gratuito |

**Software privativo** significa que el código no se puede ver ni modificar, y su uso está limitado por una licencia. **Software libre** significa que se puede usar, estudiar, modificar y redistribuir. Que sea gratis es una consecuencia habitual, pero no es lo que define al software libre: lo que lo define son esos permisos.

De Linux existen muchas **distribuciones**: el mismo núcleo con distinta selección de programas, escritorio y forma de instalar. Ubuntu, Debian, Fedora o Arch son distribuciones distintas del mismo sistema.

## Dónde manda cada uno

El reparto depende por completo del ámbito:

- **Escritorio doméstico y de oficina** — Windows tiene la mayor parte del mercado, con macOS en segundo lugar y Linux con una porción pequeña.
- **Servidores** — Linux domina con claridad.
- **Supercomputación** — prácticamente todo es Linux.
- **Móviles** — Android, que está construido sobre el núcleo de Linux, y iOS.
- **Dispositivos y electrónica** — routers, televisores y coches llevan casi siempre un Linux dentro.

Así que la idea de que Linux es minoritario solo vale en el escritorio. Fuera de ahí, es la norma.

> [!TIP]
> Por eso en esta profesión se acaban usando los dos: el puesto del usuario suele ser Windows, y el servidor al que se conecta, Linux. Saber moverse solo en uno de los dos deja la mitad del trabajo fuera.
