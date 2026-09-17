---
titulo: Ubuntu Desktop y Ubuntu Server
subtitulo: true
---

# Ubuntu Desktop y Ubuntu Server

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

La misma distribución en dos ediciones. La diferencia de fondo es una sola cosa, y de ahí sale todo lo demás.

## La diferencia

**Ubuntu Server no trae interfaz gráfica.** Se maneja entero por línea de comandos. Ubuntu Desktop sí la trae, con escritorio, ventanas y ratón.

Eso explica el resto de diferencias:

| | Desktop | Server |
|---|---|---|
| **Interfaz** | Escritorio gráfico | Solo terminal |
| **Tamaño de la instalación** | En torno a 2,7 GB | Menos de 1 GB |
| **Consumo en reposo** | Más memoria y CPU | Mínimo |
| **Programas incluidos** | Ofimática, navegador, multimedia | Ninguno de escritorio |
| **Para quién** | Usuario final | Administración de sistemas |
| **Instalador** | Gráfico | De texto, con más opciones de red y disco |

Un servidor no necesita dibujar un escritorio que nadie va a mirar: todo lo que no se instala es memoria que queda libre para el servicio, y una superficie de ataque menos.

> [!NOTE]
> La separación no es rígida. A un Server se le puede instalar un escritorio después, y a un Desktop se le pueden instalar los mismos servicios que a un Server. Las ediciones solo eligen el punto de partida.

## Instalar cualquiera de las dos

El proceso es el mismo:

1. **Descargar la imagen ISO** de la web oficial de Ubuntu, eligiendo la edición.
2. **Preparar un USB arrancable** con una herramienta de grabado de imágenes.
3. **Arrancar el equipo desde el USB**, cambiando el orden de arranque en la BIOS o UEFI si hace falta.
4. **Seguir el instalador**: idioma, teclado, disco y particiones, usuario y contraseña.
5. **Reiniciar** y quitar el USB.

Las dos ediciones son de **licencia libre y gratuita**, así que no hay clave de producto ni activación en ningún paso.

> [!TIP]
> Ubuntu Desktop permite **probarlo sin instalar** desde ese mismo USB: arranca el sistema completo en memoria sin tocar el disco. Es la forma de comprobar que el hardware funciona (red, sonido, gráfica) antes de decidir instalarlo, y también de acceder a los datos de un disco cuyo sistema ya no arranca.

## Trabajar con Server

Sin escritorio, la administración pasa a ser por comandos, y casi siempre **en remoto por SSH**: el servidor está en un armario o en un centro de datos, y nadie se sienta delante.

Eso exige manejar lo básico con soltura: moverse por directorios, editar ficheros de configuración, gestionar usuarios y permisos, instalar paquetes y arrancar, parar y consultar servicios.

## Para qué se usa un Server

Todo lo que se sirve a otros equipos:

| Servicio | Para qué |
|---|---|
| **Servidor web** (Apache, Nginx) | Publicar páginas y aplicaciones |
| **Servidor de bases de datos** | Guardar los datos de esas aplicaciones |
| **Servidor DNS** | Resolver nombres dentro de la red |
| **Servidor de correo** | Enviar y recibir mensajes |
| **Servidor de ficheros** (FTP, Samba) | Compartir carpetas en red |
| **NAS casero** | Almacenamiento central para copias de seguridad |
| **Virtualización y contenedores** | Alojar otras máquinas o servicios aislados |

Un **NAS** hecho con Ubuntu Server y un par de discos es uno de los proyectos más útiles para aprender: se practica con particiones, permisos, red y copias de seguridad, y al final queda algo que se usa de verdad en casa.
