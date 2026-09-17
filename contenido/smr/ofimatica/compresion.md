---
titulo: Comprimir y descomprimir
subtitulo: true
---

# Comprimir y descomprimir

Juntar muchos ficheros en uno y hacerlos más pequeños. Parece trivial y tiene más opciones de las que la gente usa.

## Para qué sirve

- **Reducir tamaño**, para enviar o almacenar.
- **Agrupar** muchos ficheros en un solo archivo, que es a veces la razón principal.
- **Partir** en trozos manejables un fichero enorme.
- **Proteger** el contenido con contraseña y cifrado.

> [!NOTE]
> Cuánto se comprime depende del tipo de fichero. Un texto o una hoja de cálculo pueden bajar mucho, porque están llenos de patrones repetidos. Un JPG, un MP3 o un MP4 casi no bajan: ya están comprimidos con sus propios algoritmos, y volver a comprimirlos no tiene nada que quitar.

## Los formatos

| Formato | Compatibilidad | Notas |
|---|---|---|
| **ZIP** | Universal. Windows, macOS y Linux lo abren sin instalar nada | La opción segura si no sabes qué tiene la otra persona |
| **RAR** | Necesita WinRAR o compatible | Buena compresión. El compresor es de pago |
| **7z** | Necesita 7-Zip o compatible | Suele comprimir más que los otros dos. Libre y gratuito |
| **TAR.GZ** | El estándar en Linux | `tar` agrupa y `gzip` comprime: dos pasos, un resultado |

En RAR conviven dos versiones del formato: el **RAR** clásico y el **RAR5**, que es el **más reciente** y mejora el cifrado y la recuperación de errores. A cambio, los programas muy antiguos no lo abren.

## Las opciones que importan

### Método de compresión

Los compresores ofrecen una escala que va de no comprimir a comprimir todo lo posible: *Almacenar*, *El más rápido*, *Rápido*, *Normal*, *Bueno* y *El mejor*.

Es un intercambio directo: **más compresión, más tiempo y más memoria**. Y las diferencias entre *Normal* y *El mejor* suelen ser de pocos puntos porcentuales a cambio de bastante más tiempo.

**Almacenar** no comprime nada: solo mete los ficheros en un contenedor. Tiene sentido cuando el contenido ya está comprimido (fotos, vídeos) y lo único que se quiere es agrupar.

### Tamaño del diccionario

El diccionario es la cantidad de memoria que el algoritmo usa para buscar patrones repetidos. Un diccionario grande encuentra repeticiones más separadas entre sí, así que comprime mejor **ficheros grandes**, a cambio de ser más lento y gastar más memoria. Los valores por defecto (unos 4 MB en RAR, 32 MB en RAR5) están bien para casi todo.

### Archivo sólido

Comprime todos los ficheros como si fueran **un único flujo continuo** de datos, en vez de uno a uno. Comprime mucho mejor cuando hay **muchos ficheros pequeños y parecidos** entre sí.

El inconveniente: para sacar un solo fichero del medio hay que procesar todo lo anterior, y si el archivo se corrompe se puede perder todo a partir de ese punto.

### Partir en volúmenes

Divide el resultado en trozos de un tamaño fijo (`.part1.rar`, `.part2.rar`…). Se inventó para los disquetes y sigue siendo útil para límites de subida de correo o de una web. **Hacen falta todos los trozos** para descomprimir: si falta uno, no hay nada que hacer.

### Contraseña

Protege el contenido con cifrado. Dos avisos:

> [!WARNING]
> En ZIP clásico, el **nombre de los ficheros se ve igual** aunque el contenido esté cifrado. Si eso importa, hay que marcar la opción de cifrar también los nombres, que RAR5 y 7z soportan.
>
> Y si se pierde la contraseña, **no hay recuperación posible**. No es un candado que se pueda forzar desde el propio programa.

## En la práctica

**En Windows**, tanto WinRAR como 7-Zip se instalan como cualquier programa y se integran en el menú del botón derecho: comprimir una carpeta, extraer aquí, extraer en una carpeta con su nombre. Durante la instalación se eligen los formatos que el programa va a asociarse; esa es la pantalla a la que merece la pena prestar atención.

**En Linux**, por terminal:

```bash
tar -czvf copia.tar.gz carpeta/     # comprimir
tar -xzvf copia.tar.gz              # extraer
zip -r copia.zip carpeta/           # ZIP, para compatibilidad
unzip copia.zip
```

> [!TIP]
> Comprimir no es hacer una copia de seguridad. Un ZIP en la misma carpeta que el original no te salva de nada: si se estropea el disco, se van los dos. La copia tiene que estar en otro soporte, y a ser posible en otro sitio.
