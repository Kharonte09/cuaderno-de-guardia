---
titulo: Servidor FTP
subtitulo: true
---

# Servidor FTP

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Dar a cada cliente una carpeta donde subir su web por FTP, con su usuario y sus permisos. Es el montaje clásico de un pequeño alojamiento.

## Qué es FTP

**FTP** (*File Transfer Protocol*) sirve para transferir ficheros entre un cliente y un servidor. Es de los protocolos más antiguos que siguen en uso, y su papel típico es justo este: subir los ficheros de una web al servidor que la publica.

Usa **dos puertos**: el **21** para las órdenes y otro para los datos. De ahí sus dos modos:

| Modo | Cómo funciona |
|---|---|
| **Activo** | El servidor abre la conexión de datos hacia el cliente. Suele fallar si el cliente está detrás de un router o un cortafuegos |
| **Pasivo** | El cliente abre las dos conexiones. Es el que funciona en casi todas partes |

> [!WARNING]
> **FTP no cifra nada**: usuario, contraseña y ficheros viajan en claro. En una red de laboratorio da igual, pero fuera de ahí hay que usar sus versiones seguras: **FTPS** (FTP sobre TLS) o **SFTP** (transferencia dentro de una sesión SSH, que no tiene nada que ver con FTP salvo el propósito).

## Instalar el servicio

En Windows Server, el servidor FTP viene dentro del rol de IIS: en *Agregar roles y características* se marca **Servidor FTP** bajo Servidor web (IIS).

## Crear un sitio FTP

Desde el Administrador de IIS, *Sitios → Agregar sitio FTP*:

1. **Nombre** del sitio y **ruta física**: la carpeta que se va a compartir. Si es para que alguien suba su web, se apunta a la carpeta desde la que sirve ese sitio web.
2. **Dirección IP** y **puerto**: el 21, o otro si ya está ocupado.
3. **SSL**: en un laboratorio, *Permitir* o *Sin SSL*. En producción, obligatorio.
4. **Autenticación**: *Básica* (no anónima).
5. **Autorización**: a qué usuarios se permite el acceso, y con qué **permisos** — lectura, escritura o las dos.

## Los usuarios

Cada cliente lleva su **usuario local** en el servidor, con su contraseña, y acceso únicamente a su carpeta. Así:

| Sitio | Usuario | Carpeta | Permisos |
|---|---|---|---|
| Web del cliente A | `usuario_a` | `C:\webs\cliente_a` | Lectura y escritura |
| Web del cliente B | `usuario_b` | `C:\webs\cliente_b` | Lectura y escritura |

> [!IMPORTANT]
> Las contraseñas de los ejercicios **no se documentan en los apuntes**. En el original de esta práctica estaban escritas tal cual, y además una llevaba dentro el nombre de la institución. En un informe de verdad se escribe *"se crea un usuario por sitio con contraseña propia"*, y la contraseña se entrega por un canal aparte.

Para que funcione de verdad hacen falta las dos capas de permisos, y esto es lo que más falla:

- Los de **IIS**, en la autorización del sitio FTP.
- Los de **NTFS**, en la propia carpeta de Windows. Si el usuario no tiene permiso de escritura en la carpeta, IIS le dejará entrar y no podrá subir nada.

## Abrir el paso

Igual que con los sitios web, hay que **crear la regla de entrada** en el cortafuegos para el puerto 21, y también para el **rango de puertos pasivos** si se configura FTP pasivo.

Y en la máquina virtual, comprobar que está en la **red interna** con el cliente.

## Conectarse desde el cliente

Tres formas, de menos a más cómoda:

**Desde el explorador de Windows** o el navegador:

```
ftp://192.168.80.5
```

**Desde la línea de comandos:**

```
ftp 192.168.80.5
```

**Con un cliente dedicado** como FileZilla, que es lo que se usa en la práctica: muestra local y remoto lado a lado, gestiona el modo pasivo y reanuda transferencias.

Una vez dentro, se sube el `index.html` a la carpeta y se comprueba en el navegador que la web publica lo que se acaba de subir. Ese es el ciclo completo: **subo por FTP, se publica por HTTP**.

## Órdenes básicas

| Orden | Qué hace |
|---|---|
| `ls` o `dir` | Listar el contenido remoto |
| `cd carpeta` | Cambiar de directorio remoto |
| `lcd carpeta` | Cambiar de directorio local |
| `get fichero` | Descargar |
| `put fichero` | Subir |
| `mput *.html` | Subir varios |
| `delete fichero` | Borrar en el servidor |
| `binary` | Modo binario, para todo lo que no sea texto plano |
| `passive` | Alternar modo pasivo |
| `bye` | Salir |

> [!TIP]
> Si una transferencia por línea de comandos deja el fichero corrupto, casi siempre es el modo: `binary` antes de subir imágenes, comprimidos o ejecutables. El modo texto altera los saltos de línea, y eso rompe cualquier fichero que no sea texto.

## Comprobación final

| Prueba | Debe pasar |
|---|---|
| `ping` al servidor | Responde |
| Conexión FTP con el usuario A | Entra y ve solo su carpeta |
| Subir un fichero | Se copia sin error de permisos |
| Abrir la web en el navegador | Muestra lo subido |
| Conexión con el usuario B | Entra en su carpeta, no en la del A |
| Usuario con contraseña incorrecta | Rechazado |

La penúltima prueba es la importante: si el usuario A puede ver la carpeta del B, el aislamiento está mal hecho, y eso en un alojamiento real es un incidente.
