---
titulo: Arranque y respaldo
subtitulo: true
---

# Arranque y respaldo

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

De dónde arranca un equipo, quién decide qué sistema se carga, y cómo se recupera todo cuando algo se rompe.

## La BIOS

La **BIOS** (*Basic Input-Output System*) es el software cargado en la placa base. Se encarga de **localizar y reconocer los dispositivos** del sistema y de dar apoyo para gestionar y controlar el hardware del equipo.

Sus tareas principales:

1. **Comprobar el hardware** al encender (el POST).
2. **Reconocer e inicializar** los dispositivos conectados.
3. **Buscar un sistema operativo** en el orden de arranque configurado.
4. **Cederle el control**.

### Cambiar el orden de arranque

Es la operación más habitual, y la que hace falta para instalar cualquier sistema:

1. Encender y pulsar la tecla de acceso a la configuración (`Del`, `F2`, `F10` o `F12`, según el fabricante).
2. Ir a la sección de arranque (*Boot*).
3. Poner primero el dispositivo desde el que se quiere arrancar.
4. Guardar y salir.

En equipos con UEFI y arranque rápido a veces no hay tiempo de pulsar la tecla: entonces se entra desde el propio sistema, con un reinicio a las opciones de firmware.

El detalle de BIOS, UEFI y la memoria donde vive está en [ROM, BIOS y UEFI](#/smr/montaje/bios-uefi).

## Desde dónde se puede arrancar

| Medio | Uso |
|---|---|
| **Disco duro o SSD** | El arranque normal del sistema instalado |
| **Memoria flash USB** | Instalaciones y sistemas de rescate. Lo habitual hoy |
| **Dispositivo óptico** (CD o DVD) | La forma clásica, cada vez menos usada |
| **Red (PXE)** | Instalación desatendida desde un servidor, en despliegues grandes |

## Gestores de arranque

El **gestor de arranque** (*bootloader*) es el programa que, una vez el firmware le cede el control, decide qué sistema se carga y con qué opciones.

| Sistema | Gestor |
|---|---|
| **Linux** | **GRUB**, el estándar actual, y **LILO**, el antiguo |
| **Windows** | **BCD** (*Boot Configuration Data*), almacenado en el directorio `boot` |

### GRUB

Muestra un menú con las entradas disponibles y permite:

- Elegir entre **varios sistemas** instalados: es lo que hace posible el arranque dual.
- Elegir entre **varios núcleos** de Linux, incluidos los anteriores a la última actualización.
- Arrancar en **modo de recuperación**, con lo mínimo cargado.
- **Editar los parámetros** de arranque al vuelo, que es cómo se recupera una contraseña de root perdida.

```bash
sudo update-grub          # regenerar el menú tras instalar otro sistema
```

### BCD

En Windows se gestiona con `bcdedit` desde una consola con privilegios, o con la configuración del sistema:

```
bcdedit /enum
```

> [!IMPORTANT]
> En un arranque dual, el **orden de instalación** importa: si se instala Windows después de Linux, su gestor sobreescribe a GRUB y Linux deja de aparecer en el menú. Se arregla reinstalando GRUB desde un USB en vivo, pero el disgusto se evita instalando primero Windows y Linux después, porque GRUB sí detecta y añade a Windows.

## Copias de seguridad

### Los tres tipos

| Tipo | Qué copia | Restaurar necesita |
|---|---|---|
| **Completa** | Todo, cada vez | Solo la última completa |
| **Incremental** | Lo que cambió **desde la última copia**, sea del tipo que sea | La completa **y todas** las incrementales posteriores |
| **Diferencial** | Lo que cambió **desde la última completa** | La completa y **la última** diferencial |

Las consecuencias prácticas:

- La **incremental** es la más rápida de hacer y la más lenta y frágil de restaurar: si falta una de la cadena, no se puede reconstruir.
- La **diferencial** ocupa más cada día que pasa desde la completa, y restaura con solo dos piezas.
- La **completa** es la más costosa en tiempo y espacio, y la más simple de recuperar.

Lo habitual es combinarlas: completa semanal y diferencial o incremental diaria.

> [!IMPORTANT]
> La regla **3-2-1**: tres copias de los datos, en dos medios distintos, y una de ellas **fuera del sitio**. Una copia en el mismo equipo no protege de un robo, un incendio ni un cifrado por ransomware. Y una copia que no se ha **probado restaurando** no es una copia: es una suposición.

## Imágenes de respaldo

Una **imagen** es una copia **exacta** del sistema en un momento dado: el sistema operativo, las aplicaciones instaladas, la configuración, los datos y la estructura de carpetas, todo tal cual estaba.

### Diferencia con una copia de seguridad

| | Copia de seguridad | Imagen |
|---|---|---|
| **Alcance** | Carpetas y ficheros concretos | **Unidades completas** |
| **Para qué** | Recuperar datos perdidos | Recuperar **el sistema entero** |
| **Restauración** | Fichero a fichero | El equipo vuelve al estado exacto |
| **Tras restaurar** | Hay que tener el sistema funcionando | El sistema arranca y funciona sin instalar nada |

Ventajas de la imagen: se recupera un equipo completo en minutos en lugar de reinstalar y reconfigurar durante horas, y sirve para **clonar** un equipo tipo en muchos puestos iguales.

### Dónde se guardan y cómo se recuperan

Se almacenan en un **disco externo**, en una **unidad de red o NAS**, o en un servidor de imágenes. Nunca en la misma unidad de la que se hace la imagen.

Para recuperar hace falta arrancar **desde fuera** del sistema, porque no se puede sobreescribir un sistema que está en marcha:

- Desde un **USB o DVD de rescate** con la herramienta que creó la imagen.
- Desde el **entorno de recuperación** del propio sistema.
- Desde la **red**, por PXE, en entornos grandes.

Herramientas habituales: Clonezilla (libre), las utilidades de imagen de Windows, y las suites comerciales de respaldo.

> [!TIP]
> El momento ideal para hacer la imagen de referencia de un equipo es **justo después de instalarlo y configurarlo**, con los controladores y el software puestos y antes de que empiece a acumular datos. Esa imagen limpia es la que vale para clonar y la que deja el equipo nuevo en veinte minutos.
