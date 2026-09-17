---
titulo: Diseño web y SEO
subtitulo: true
---

# Diseño web y SEO

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Hacer una web que el buscador entienda. No es magia ni trucos: es que la página esté bien construida y tenga algo que merezca la pena leer.

## Qué es el SEO

**SEO** (*Search Engine Optimization*, optimización para motores de búsqueda) es el conjunto de técnicas para que los buscadores puedan leer e interpretar una web con facilidad, y para que la coloquen mejor en sus resultados.

Los buscadores recorren la web con programas automáticos —las **arañas** o *crawlers*—, guardan lo que encuentran (**indexación**) y después deciden en qué orden mostrarlo (**posicionamiento**). El SEO actúa sobre los tres pasos: que la araña pueda entrar, que entienda lo que hay y que tenga razones para ponerte por delante.

Lo que los buscadores premian hoy es contenido **relevante, propio y actualizado**, en páginas que cargan rápido y funcionan en el móvil.

## On page y off page

La división es sencilla: **dentro** o **fuera** de tu web.

| | SEO on page | SEO off page |
|---|---|---|
| **Dónde actúa** | En tus propias páginas | En el resto de internet |
| **Lo controlas** | Sí, del todo | Solo indirectamente |
| **Ejemplos** | Títulos, textos, imágenes, velocidad, estructura de enlaces internos | Enlaces desde otras webs, menciones, perfiles en redes |

Todo es SEO; lo que ocurre fuera de tu web, a través de enlaces y menciones, es la parte *off page*.

## SEO on page: lo que hay que hacer

### En el contenido

- Un **título** (`<title>`) distinto y descriptivo en cada página.
- La **meta descripción**, que es el texto que aparece bajo el título en los resultados.
- **Un solo `<h1>`** por página, y el resto de encabezados en orden (`h2`, `h3`), formando una jerarquía real.
- Texto **propio**: el contenido copiado de otro sitio compite consigo mismo y pierde.

### En las imágenes

Las arañas **no ven imágenes**: leen texto. Así que hay que decirles qué hay en cada una:

```html
<img src="latiguillo.jpg" alt="Conector RJ-45 crimpado sobre cable de par trenzado">
```

- El atributo **`alt`** describe la imagen. Es lo que lee el buscador, y también lo que lee en voz alta un lector de pantalla: la misma etiqueta sirve para el posicionamiento y para la accesibilidad.
- El **nombre del fichero** cuenta: `latiguillo-rj45.jpg` dice algo, `IMG_0042.jpg` no.
- Las imágenes **comprimidas y del tamaño justo**, porque el peso afecta a la velocidad.

### En la estructura

- **Enlaces internos** bien puestos, para que se pueda llegar a cualquier página desde otra y la araña recorra el sitio entero.
- **Sin errores 404**: los enlaces rotos hacia páginas que ya no existen desperdician recorrido y dan mala señal.
- Un **`sitemap.xml`**, que es la lista de todas tus páginas, para que el buscador sepa qué hay sin tener que adivinarlo.
- Un **`robots.txt`**, que indica qué no debe recorrer.
- **URLs legibles**: `/apuntes/subredes` en vez de `/index.php?id=472`.

### En lo técnico

- **Velocidad de carga**: es un factor de posicionamiento directo, y además la gente se va de las páginas lentas.
- **Diseño adaptable** (*responsive*), que funcione en móvil. La mayor parte del tráfico llega desde ahí, y los buscadores indexan pensando en la versión móvil.
- **HTTPS**, que también cuenta.

## SEO off page: lo que se puede fomentar

- Que **otras webs de tu temática te enlacen**. Un enlace desde un sitio de referencia vale más que cien desde sitios irrelevantes.
- Que te **mencionen** en blogs y publicaciones del sector.
- **Perfiles en redes** bien enlazados con la web, y la web enlazando a ellos: secciones de *contacto*, *sobre mí*, y enlaces coherentes.

> [!WARNING]
> Comprar enlaces o darse de alta en granjas de enlaces es la vía rápida a una penalización, y salir de ella cuesta mucho más que el atajo que se pretendía tomar. El off page sensato consiste en tener algo que alguien quiera enlazar.

## Herramientas

| Herramienta | Para qué |
|---|---|
| **Google Search Console** | Ver cómo te ve el buscador: qué ha indexado, con qué búsquedas apareces, qué errores encuentra |
| **Google Trends** | Con cuánta frecuencia se busca un término, por región y en el tiempo |
| **PageSpeed Insights** | Medir la velocidad y qué la está frenando |
| **Validadores de HTML** | Comprobar que el código está bien formado |

**Google Trends** es además el que mejor muestra el lado humano de esto: cuando ocurre algo —una erupción, un apagón, un partido— las búsquedas de esa palabra se disparan en las regiones afectadas, y la gráfica lo refleja en directo. Sirve para entender que detrás de cada búsqueda hay alguien con una necesidad en ese momento, que es exactamente lo que el SEO intenta atender.

> [!TIP]
> Si hay que elegir por dónde empezar, el orden que más resultado da es: **que cargue rápido**, **que funcione en móvil**, **que los títulos y los `alt` estén puestos** y **que el contenido sea propio**. Eso es el 80 % del trabajo, y no hace falta ninguna herramienta de pago.
