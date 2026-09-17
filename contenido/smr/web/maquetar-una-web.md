---
titulo: Maquetar una web
subtitulo: true
---

# Maquetar una web

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Un sitio de varias páginas con HTML y CSS, sin frameworks ni nada instalado: un editor de texto y el navegador.

## La estructura de un fichero HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Servicios de red</title>
  <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
  ...
</body>
</html>
```

Cada línea del `<head>` está por un motivo:

| Etiqueta | Para qué |
|---|---|
| `<!DOCTYPE html>` | Dice que es HTML5. Sin él, el navegador entra en modo de compatibilidad antiguo |
| `lang="es"` | El idioma. Lo usan los buscadores y los lectores de pantalla |
| `charset="utf-8"` | La codificación. **Sin esto, los acentos y las eñes salen mal** |
| `viewport` | Hace que la página se adapte al ancho del móvil |
| `<title>` | El nombre en la pestaña y en los resultados del buscador |
| `<link>` | Enlaza la hoja de estilos externa |

## Etiquetas semánticas

Se puede maquetar todo con `<div>`, pero HTML5 tiene etiquetas que **dicen qué es cada cosa**:

| Etiqueta | Qué contiene |
|---|---|
| `<header>` | La cabecera: logotipo y título |
| `<nav>` | El menú de navegación |
| `<main>` | El contenido principal. Uno por página |
| `<section>` | Una sección temática |
| `<article>` | Un bloque con sentido por sí solo |
| `<aside>` | Contenido lateral o secundario |
| `<footer>` | El pie |

Usarlas no cambia el aspecto, y sí cambia dos cosas importantes: los buscadores entienden mejor la página y los lectores de pantalla pueden saltar directamente al contenido. Es gratis y merece la pena.

Un esqueleto de página con menú, dos secciones y pie:

```html
<body>
  <main>
    <header id="imagen">
      <img src="imagenes/logo.png" alt="Logotipo del sitio">
    </header>
    <header id="titulo">
      <h1>Servicios de red</h1>
    </header>

    <nav>
      <a href="index.html">Inicio</a>
      <a href="servicio_dhcp.html">DHCP</a>
      <a href="servicio_web.html">Web</a>
      <a href="servicio_ftp.html">FTP</a>
    </nav>

    <section id="sec1">
      <article>
        <h2>Qué es</h2>
        <p>...</p>
      </article>
    </section>

    <section id="sec2">
      <table class="default">
        <tr><th>Puerto</th><th>Servicio</th></tr>
        <tr><td>67 y 68</td><td>DHCP</td></tr>
      </table>
    </section>

    <footer>
      <a class="simple" href="contacto.html">Contacto</a>
    </footer>
  </main>
</body>
```

## Varias páginas

Un sitio pequeño se organiza así:

```
sitio/
├── index.html
├── contacto.html
├── servicio_dhcp.html
├── css/
│   └── estilo.css
└── imagenes/
    └── logo.png
```

- **`index.html`** es la portada: es el fichero que sirve el servidor cuando se pide la carpeta sin más.
- Las **rutas relativas** (`css/estilo.css`, `imagenes/logo.png`) funcionan igual en tu equipo y en el servidor. Una ruta absoluta del tipo `C:\Users\...` funciona en local y **se rompe al subirlo**, y es el error más típico.
- El **mismo `<nav>` en todas las páginas**, para que se pueda ir de cualquiera a cualquiera.

> [!WARNING]
> En un servidor Linux las mayúsculas **importan**: `Logo.png` y `logo.png` son ficheros distintos. En Windows no, así que una web que funciona en tu equipo puede aparecer sin imágenes al subirla. La norma que evita el problema: nombres en minúsculas, sin espacios ni acentos.

## CSS: separar el aspecto del contenido

El HTML dice **qué** es cada cosa; el CSS, **cómo se ve**. Van en ficheros distintos para poder cambiar el diseño entero sin tocar el contenido.

```css
main {
  max-width: 900px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

nav {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

a:link, a:visited { color: #1668d6; }
a:hover, a:active { text-decoration: underline; }

table, th, td {
  border: 1px solid #ccc;
  border-collapse: collapse;
  padding: 6px 10px;
}

footer {
  margin-top: 40px;
  font-size: 13px;
  color: #666;
}
```

### Cómo se selecciona

| Selector | A qué se aplica | Cuándo usarlo |
|---|---|---|
| `main`, `nav`, `table` | A todas las etiquetas de ese tipo | Para el estilo general |
| `#titulo` | Al **único** elemento con ese `id` | Para algo que solo existe una vez |
| `.subtitulo` | A **todos** los elementos con esa `class` | Para un estilo que se repite |
| `main > *` | A los hijos directos de `main` | Para espaciar bloques entre sí |
| `a:hover` | A un enlace cuando el ratón está encima | Para los estados |

> [!TIP]
> La regla práctica: **`class` por defecto, `id` solo cuando de verdad hay un solo elemento**. Los `id` no se pueden repetir en una página, y las clases sí, así que las clases envejecen mejor cuando el sitio crece.

## Probarlo

Para una web de solo HTML y CSS basta abrir el `index.html` en el navegador, **y** comprobar tres cosas:

1. Que todos los enlaces del menú funcionan desde todas las páginas.
2. Que las imágenes se ven (si falta una, el `alt` te dirá cuál).
3. Que **en móvil** se lee: se estrecha la ventana del navegador y se mira si algo se sale.

Con `F12` se abre las herramientas de desarrollo: la pestaña de red muestra los ficheros que no se han podido cargar, con su `404` al lado, y el inspector permite ver qué regla de CSS está ganando en cada elemento.

> [!NOTE]
> Los ficheros `.php` son distintos: llevan código que se ejecuta **en el servidor**, así que abrirlos con doble clic no hace nada. Necesitan un servidor que los interprete (IIS con PHP, Apache, o un paquete tipo XAMPP). Ahí está la frontera entre una web estática y una dinámica.
