---
titulo: El sistema de archivos de Linux
subtitulo: true
---

# El sistema de archivos de Linux

Cómo guarda Linux los datos y cómo está organizado su árbol de directorios. Saberse los directorios de memoria ahorra muchísimo tiempo después.

## La familia ext

El **sistema de archivos** es la forma en que se organizan los datos dentro de una partición. Linux usa desde sus inicios la familia **ext** (*extended file system*), creada específicamente para él:

| Versión | Tamaño máximo de fichero | Tamaño máximo de volumen |
|---|---|---|
| **ext** | La primera, hoy histórica | — |
| **ext2** | 2 TB | 16 TB |
| **ext3** | 2 TB | 32 TB |
| **ext4** | 16 TB | 1 EB (un millón de TB) |

**ext4** es el estándar actual, y el que usa Ubuntu por defecto. Frente a ext3 mejora el rendimiento de lectura y escritura, la gestión de energía y la resistencia a la fragmentación.

Lo importante de ext3 en adelante es que son **transaccionales** (con *journal*): antes de escribir un cambio, lo apuntan en un registro. Si se corta la luz a medias, al arrancar el sistema sabe qué operaciones quedaron incompletas y recupera un estado coherente en segundos, en vez de tener que revisar el disco entero.

> [!NOTE]
> Hay más sistemas de archivos en Linux (XFS, Btrfs, ZFS), cada uno con sus ventajas, y sabe leer y escribir los de Windows: **NTFS** y **FAT32**. Lo contrario no es cierto sin instalar software adicional: un Windows no ve una partición ext4.

## El árbol de directorios

Aquí está la diferencia grande con Windows: **no hay letras de unidad**. Todo cuelga de un único directorio raíz, `/`, formando un árbol. Los discos y los USB no son "otra unidad": se **montan** en un punto del árbol y aparecen como una carpeta más.

| Directorio | Qué contiene |
|---|---|
| `/` | La raíz. Todo lo demás cuelga de aquí |
| `/bin` | Comandos básicos, ejecutables por cualquier usuario |
| `/sbin` | Comandos de administración, reservados al superusuario |
| `/boot` | Lo necesario para arrancar: el núcleo y el gestor de arranque GRUB |
| `/dev` | Los dispositivos del equipo, tratados como ficheros |
| `/etc` | **Los ficheros de configuración del sistema.** Todos pueden leerlos, solo root puede modificarlos |
| `/home` | Las carpetas personales de los usuarios. El equivalente a *Usuarios* en Windows |
| `/lib` | Las bibliotecas que necesitan los programas del sistema |
| `/media` | Donde se montan los dispositivos extraíbles: USB, discos externos, CD |
| `/mnt` | Punto de montaje para montajes manuales o temporales |
| `/proc` | Información del sistema en marcha: procesos y estado del núcleo, generada al vuelo |
| `/root` | La carpeta personal del superusuario. Solo él entra |
| `/tmp` | Ficheros temporales. Se vacía al reiniciar |
| `/usr` | Los programas instalados que no forman parte del sistema base |
| `/var` | Datos que cambian con el uso: **registros del sistema** (`/var/log`), colas de correo, cachés |

> [!TIP]
> Con tres de estos se resuelve casi todo el trabajo diario: **`/etc`** para configurar un servicio, **`/var/log`** para averiguar por qué falla, y **`/home`** para los datos de las personas. Son también los tres directorios que hay que incluir sí o sí en una copia de seguridad.

## Varios núcleos a la vez

En `/boot` puede haber **varios núcleos instalados**, y GRUB permite arrancar con el que se quiera. Cuando el sistema se actualiza a una versión nueva del núcleo, se añade una entrada más al menú de arranque y se conservan las anteriores.

Eso da una red de seguridad que no existe en un Windows: si la versión nueva rompe algo (típicamente un controlador), se reinicia y se arranca con la anterior, que sigue ahí intacta.

## Permisos, en una línea

Cada fichero y cada directorio tiene un **propietario**, un **grupo** y tres conjuntos de permisos: lectura, escritura y ejecución, para el propietario, para el grupo y para el resto. Es la razón por la que en Linux un usuario normal no puede tocar `/etc` y por la que hay que usar `sudo` para administrar.

Es también lo que hace que el sistema resista el uso compartido: mil usuarios en `/home` sin que ninguno pueda leer los ficheros de los demás.
