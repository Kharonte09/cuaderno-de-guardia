---
titulo: ROM, BIOS y UEFI
subtitulo: true
---

# ROM, BIOS y UEFI

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

El programa que arranca el ordenador antes de que exista sistema operativo, y la memoria donde vive.

## La memoria ROM

La **ROM** (*Read Only Memory*, memoria de solo lectura) es un almacenamiento del que el equipo puede leer pero no escribir en su uso normal. A diferencia de la RAM, **no es volátil**: mantiene su contenido sin corriente.

Se usa para lo que no debe cambiar nunca, o casi nunca:

- **Firmware**: el programa que hace funcionar el hardware de un aparato.
- **Datos fijos**: tablas de consulta y valores que no cambian en toda la vida del producto.
- Históricamente, **sistemas operativos completos**: los microordenadores de los años 80 llevaban el suyo en ROM, para que el usuario no pudiera estropearlo.

## El firmware de arranque

En un PC, esa ROM contiene el programa de arranque: el **BIOS** o, en los equipos modernos, el **UEFI**. Va en un chip dedicado de la placa base.

**BIOS** significa *Basic Input/Output System*, sistema básico de entrada y salida. Es el primer programa que se ejecuta al pulsar el botón de encendido, y su trabajo es tener el equipo listo para que el sistema operativo tome el control.

### Qué hace

1. **POST** (*Power-On Self Test*): comprueba que el hardware esencial está y responde — procesador, memoria, gráfica.
2. **Inicializa** los dispositivos básicos: teclado, almacenamiento, vídeo.
3. **Busca el sistema operativo** en el orden de arranque configurado (disco, USB, red).
4. **Le pasa el control** y se aparta.

Si el POST falla, el equipo avisa con **pitidos** o con **leds de diagnóstico** en la placa, porque todavía no hay imagen en pantalla. La tabla de códigos está en el manual de la placa, y cada fabricante usa la suya.

### Qué se configura desde ahí

- **Orden de arranque**: desde qué dispositivo se busca el sistema. Es lo que se cambia para instalar desde un USB.
- **Fecha y hora** del equipo.
- **Contraseña** de acceso a la configuración, o de arranque.
- **Activar o desactivar** dispositivos integrados: red, audio, puertos SATA.
- **Frecuencias y voltajes**, que es donde se hace el overclocking.
- **Perfiles de memoria** (XMP o equivalente), para que la RAM funcione a su velocidad anunciada en vez de a la mínima estándar.
- **Temperaturas y ventiladores**, para consultarlas y ajustar sus curvas.

## La pila de la placa

La configuración no se guarda en la ROM, sino en una pequeña memoria llamada **CMOS**, que necesita alimentación constante para no olvidarse. De eso se encarga la **pila de botón** de la placa base.

> [!TIP]
> Cuando un equipo antiguo pierde la hora cada vez que se apaga, o vuelve solo a la configuración por defecto, la pila está agotada. Es una CR2032 de un par de euros. Ese mismo efecto se provoca a propósito quitando la pila o moviendo el *jumper* de **Clear CMOS**, que es la forma de recuperar un equipo que no arranca por una mala configuración.

## Tipos de chip, por cómo se graban

| Tipo | Cómo se escribe |
|---|---|
| **ROM** | Se graba al fabricar el chip y no se puede alterar |
| **EPROM** | Se borra con luz ultravioleta, por una ventanita transparente en el chip, tapada con una pegatina. Propia de equipos muy antiguos |
| **Flash** | Se reprograma por software, sin desmontar nada. Es lo que llevan todas las placas actuales |

Gracias al tipo flash existe la **actualización de BIOS**: el fabricante publica una versión nueva que corrige fallos, mejora la estabilidad o añade compatibilidad con procesadores más recientes.

> [!WARNING]
> Actualizar el firmware es la operación más delicada que se hace en una placa. Si se corta la corriente a medias, la placa puede quedar inservible. Solo se actualiza si hace falta de verdad, con el fichero exacto de **ese** modelo y, si es posible, con la utilidad oficial del fabricante.

## BIOS y UEFI

El BIOS clásico tiene más de cuarenta años, y se le quedaron cortas muchas cosas. **UEFI** (*Unified Extensible Firmware Interface*) es su sustituto, aunque en la calle se le siga llamando BIOS a todo.

| | BIOS clásico | UEFI |
|---|---|---|
| Interfaz | Texto, solo teclado | Gráfica, con ratón |
| Tabla de particiones | MBR | GPT, y MBR por compatibilidad |
| Tamaño máximo de disco | 2 TB | Muy por encima de eso |
| Particiones primarias | 4 | 128 o más |
| Arranque | Más lento | Más rápido, con inicio rápido |
| Seguridad | Ninguna | **Secure Boot**, que solo arranca cargadores firmados |

> [!NOTE]
> **Secure Boot** comprueba la firma digital de lo que arranca, para impedir que se cuele un cargador manipulado. Es una buena medida de seguridad, pero puede dar problemas al instalar algunas distribuciones de Linux o herramientas de arranque, y a veces hay que desactivarlo temporalmente.

## La memoria caché

Aparece junto a esto en los apuntes porque es la otra memoria invisible del equipo, pero no tiene que ver con el arranque: la caché es memoria **muy rápida y pequeña** donde se guarda una copia de los datos que más se usan, para no tener que ir a buscarlos al sitio lento cada vez.

El procesador lleva la suya en tres niveles (L1, L2 y L3), pero la idea se repite por todas partes: la caché del disco duro, la del navegador y la de un servidor web hacen exactamente lo mismo a otra escala. Está explicada dentro de la [jerarquía de memoria](#/smr/montaje/memoria-ram).
