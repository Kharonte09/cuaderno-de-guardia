---
titulo: Puntos de restauración
subtitulo: true
---

# Puntos de restauración

La red de seguridad de Windows: una foto de la configuración del sistema a la que volver cuando algo lo rompe.

## Qué guarda y qué no

Un punto de restauración guarda el **estado del sistema**, no tus datos:

| Sí guarda | No guarda |
|---|---|
| Registro de Windows | Documentos, fotos y vídeos |
| Controladores instalados | Correos y descargas |
| Programas y sus claves de registro | Ficheros personales en general |
| Archivos del sistema | Contraseñas de cuentas nuevas |

> [!WARNING]
> **Esto no es una copia de seguridad.** Restaurar un punto no recupera un fichero borrado, y si el disco muere se pierden los puntos junto con todo lo demás. Para los datos hacen falta copias de verdad, y en otro soporte.

Sí sirve, y muy bien, para lo contrario: volver atrás cuando el equipo ha dejado de funcionar bien después de instalar un programa, un controlador o una actualización.

## Activarlo

En Windows la protección del sistema viene **desactivada** en muchos equipos, así que lo primero es comprobarlo:

1. Buscar **Crear un punto de restauración** en el menú de inicio.
2. En la lista de unidades, seleccionar la del sistema, normalmente `C:`.
3. Pulsar **Configurar**.
4. Marcar **Activar la protección del sistema**.
5. Ajustar el **espacio máximo en disco** que puede usar. Cuando se llena, los puntos antiguos se van borrando para dejar sitio a los nuevos.
6. Aceptar. La unidad debe quedar como *Activado*.

En esa misma ventana está **Eliminar**, que borra todos los puntos de esa unidad. Sirve para liberar espacio de golpe, sabiendo que se pierde la posibilidad de volver atrás.

## Crear un punto a mano

Windows crea puntos por su cuenta antes de algunas actualizaciones e instalaciones, pero conviene crearlos a mano **antes de tocar algo delicado**:

1. En la misma ventana, pulsar **Crear**.
2. Darle un nombre reconocible. Lo más práctico es decir qué vas a hacer: *antes de instalar los controladores de la gráfica*.
3. Esperar a que termine, unos segundos.

La fecha y la hora las añade Windows solo, así que no hace falta ponerlas en el nombre.

## Restaurar

1. En la pestaña **Protección del sistema**, pulsar **Restaurar sistema**.
2. Elegir el punto en la lista. Con **Mostrar más puntos de restauración** aparecen los antiguos.
3. Antes de seguir, usar **Detectar programas afectados**: dice qué se desinstalará y qué volverá, y evita sorpresas.
4. **Siguiente** y **Finalizar**, confirmando el aviso.
5. El equipo se reinicia y aplica la restauración fuera del sistema. Al volver, avisa de cómo ha ido.

> [!TIP]
> Si el equipo ya no arranca, todavía se puede restaurar: en el **entorno de recuperación** de Windows (al que se llega tras varios arranques fallidos, o desde un USB de instalación) está la misma herramienta, en *Solucionar problemas → Opciones avanzadas*.

## Cuándo usar esto y cuándo no

| Problema | ¿Punto de restauración? |
|---|---|
| Un controlador nuevo deja el equipo inestable | Sí, es el caso ideal |
| Un programa recién instalado ha roto algo | Sí |
| Una actualización de Windows da guerra | Sí |
| He borrado una carpeta de fotos | No: hace falta una copia de seguridad |
| El equipo va lento desde hace meses | No: el problema no es un cambio concreto |
| Sospecha de infección por malware | No basta: el sistema puede seguir comprometido después |
