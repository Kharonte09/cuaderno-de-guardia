---
titulo: Autopsy y Scalpel
subtitulo: true
---

# Autopsy y Scalpel

Las dos herramientas para trabajar sobre **disco**, no sobre memoria. Una analiza la imagen entera con interfaz gráfica; la otra recupera ficheros que ya no están.

---

# Autopsy

Herramienta forense **con interfaz gráfica** para analizar imágenes de disco de Windows, Linux y Android. Permite ver artefactos, buscar actividad sospechosa y reconstruir lo que hizo el usuario.

Piénsalo como un **visor forense completo**: cargas una imagen y te enseña lo importante sin tener que ir fichero por fichero.

## Lo que más se usa

| Función | Para qué |
|---|---|
| **Búsqueda** | Palabras clave y expresiones regulares |
| **Timeline** | Cronología de eventos |
| **Artefactos web** | Historial, cookies, descargas |
| **Registro (RegRipper)** | USBs conectados, documentos recientes |
| **LNK** | Ficheros que se abrieron |
| **Clasificación** | Agrupa imágenes, documentos y vídeos |
| **EXIF** | Metadatos de fotos: GPS, cámara |
| **Hashsets** | Marcar ficheros como buenos o malos |
| **Ficheros interesantes** | Busca automáticamente lo sospechoso |
| **Android** | SMS, llamadas, contactos y algunas apps |

> [!TIP]
> El **Timeline** es por donde conviene empezar cuando ya tienes una hora aproximada del incidente. Filtras a esa ventana y ves de golpe qué se creó, se modificó y se ejecutó alrededor, en vez de ir buscando artefacto por artefacto.

Los **hashsets** merecen una mención aparte: cargar un conjunto de hashes conocidos como buenos (ficheros legítimos del sistema) elimina de la vista miles de ficheros y deja solo lo que no reconoce nadie. Es la forma más rápida de reducir el ruido en una imagen grande.

---

# Scalpel

Herramienta de **recuperación de ficheros borrados** o incrustados dentro de otros ficheros o de una imagen de disco.

Es un **file carver**: no depende del sistema de ficheros. Analiza los datos **en bruto** buscando firmas —cabecera y pie de cada tipo de fichero— y reconstruye lo que encuentra entre medias.

Por eso funciona cuando la entrada del sistema de ficheros ya se borró: los datos siguen en el disco hasta que algo los sobrescribe, y Scalpel los busca por su forma, no por su nombre.

## Uso

```bash
scalpel -o <directorio_salida> <imagen_disco>
```

El directorio de salida **tiene que estar vacío** o Scalpel se niega a ejecutarse.

## Añadir un tipo de fichero propio

Si necesitas recuperar un formato que no viene definido, se añade al fichero de configuración con este formato:

```text
extensión  case  max_size  header  footer
```

Donde `header` y `footer` son las firmas en hexadecimal que marcan el principio y el final del fichero.

> [!NOTE]
> El *footer* es opcional en muchos formatos. Cuando no se define, Scalpel recorta al llegar al `max_size`, así que un tamaño máximo mal puesto te deja ficheros truncados o, al revés, enormes y llenos de basura del disco que venía detrás.
