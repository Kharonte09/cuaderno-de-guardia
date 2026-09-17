---
titulo: Bootstrap
subtitulo: true
---

# Bootstrap

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Un framework de CSS: en vez de escribir estilos, se ponen clases ya hechas en el HTML. Sirve para montar algo presentable y adaptable a móvil en muy poco tiempo.

## Cómo se usa

Basta con enlazar su hoja de estilos:

```html
<link rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
```

Y para los componentes que se mueven (menús desplegables, ventanas modales, pestañas), además su JavaScript al final del `<body>`.

A partir de ahí, todo se hace añadiendo **clases** a las etiquetas.

## Contenedores

Todo el contenido va dentro de un contenedor, que es lo que da los márgenes laterales:

| Clase | Qué hace |
|---|---|
| `container` | Contenedor adaptable, con un ancho máximo por cada tamaño de pantalla |
| `container-fluid` | Ocupa el **100 %** del ancho, siempre |

```html
<div class="container">
  <h1>Contenido centrado con márgenes</h1>
</div>
```

## La rejilla

Es la parte importante de Bootstrap, y la razón por la que se usa. Divide el ancho en **12 columnas** y permite repartirlas.

```html
<div class="container">
  <div class="row">
    <div class="col-md-8">Contenido principal</div>
    <div class="col-md-4">Barra lateral</div>
  </div>
</div>
```

La estructura es siempre la misma: `container` → `row` → `col`. Y la suma de las columnas de una fila debe dar 12.

### Los puntos de corte

El fragmento intermedio de la clase indica **desde qué tamaño de pantalla** se aplica el reparto:

| Clase | A partir de | Pensado para |
|---|---|---|
| `col-` | Cualquier tamaño | Siempre |
| `col-sm-` | ~576 px | Móvil en horizontal |
| `col-md-` | ~768 px | Tableta |
| `col-lg-` | ~992 px | Portátil |
| `col-xl-` | ~1200 px | Escritorio |

> [!IMPORTANT]
> Esto es lo que hace que una web sea adaptable sin escribir una sola media query. `col-md-8` significa *ocho columnas a partir de tableta*; **por debajo de eso, ocupa el ancho completo**. Así el diseño de dos columnas se convierte solo en uno apilado en el móvil.

## Tipografía y texto

```html
<p class="text-center fw-bold">Centrado y en negrita</p>
```

| Familia | Clases |
|---|---|
| **Alineación** | `text-start`, `text-center`, `text-end`, `text-justify` |
| **Estilo** | `fst-italic`, `fw-bold`, `fw-light`, `fw-normal` |
| **Transformación** | `text-capitalize`, `text-uppercase`, `text-lowercase` |
| **Tamaño** | `fs-1` a `fs-6`, y `display-1` a `display-6` para titulares |

> [!NOTE]
> Algunas clases cambiaron de nombre entre la versión 4 y la 5: `text-left` pasó a `text-start`, `font-weight-bold` a `fw-bold` y `font-italic` a `fst-italic`. Si una clase no hace nada, lo primero que hay que mirar es qué versión se está enlazando.

## Colores

El mismo juego de nombres se repite por todo el framework, y eso es lo que hace fácil recordarlo:

`primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark`

| Para qué | Clase |
|---|---|
| Color del texto | `text-primary`, `text-danger`, `text-muted`, `text-white` |
| Color de fondo | `bg-primary`, `bg-success`, `bg-light` |
| Botones | `btn btn-primary`, `btn btn-outline-danger` |
| Avisos | `alert alert-warning` |
| Etiquetas | `badge bg-info` |

```html
<button class="btn btn-primary">Guardar</button>
<div class="alert alert-danger">No se pudo conectar</div>
```

## Espaciado

Una notación compacta que se usa constantemente:

```
{propiedad}{lado}-{tamaño}
```

- **Propiedad**: `m` margen, `p` relleno.
- **Lado**: `t` arriba, `b` abajo, `s` inicio, `e` final, `x` horizontal, `y` vertical, o nada para los cuatro.
- **Tamaño**: de `0` a `5`, y `auto`.

```html
<div class="mt-3 px-4 mb-0">…</div>
```

`mx-auto` con un ancho definido es la forma rápida de centrar un bloque.

## Componentes habituales

| Componente | Clase base |
|---|---|
| Tarjeta | `card`, con `card-body`, `card-title` |
| Barra de navegación | `navbar navbar-expand-lg` |
| Tabla | `table`, con `table-striped`, `table-hover` |
| Formulario | `form-control` en los campos, `form-label` en las etiquetas |
| Migas de pan | `breadcrumb` |
| Paginación | `pagination` |
| Ventana modal | `modal` (necesita el JavaScript) |

## Lo bueno y lo malo

| A favor | En contra |
|---|---|
| Resultado presentable en minutos | Todas las webs se parecen entre sí |
| Adaptable a móvil sin esfuerzo | Se carga mucho CSS que no se usa |
| Bien documentado y muy extendido | El HTML se llena de clases |
| Resuelve la compatibilidad entre navegadores | Personalizarlo a fondo cuesta más que partir de cero |

> [!TIP]
> Para aprender, merece la pena hacer al menos una web **sin framework**, escribiendo el CSS a mano. Bootstrap resuelve problemas que hay que haber tenido antes para entender qué está resolviendo: si se empieza por él, la rejilla parece magia y no se aprende cómo funciona la maquetación por debajo.
