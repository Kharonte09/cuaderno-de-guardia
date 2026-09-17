---
titulo: SASS
subtitulo: true
---

# SASS

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Un preprocesador de CSS: le da a las hojas de estilo lo que les falta de un lenguaje de programación —variables, funciones, anidación— y genera el CSS final automáticamente.

## Qué es un preprocesador

Un **preprocesador** es un programa que se ejecuta **antes** de la traducción real: toma tu código fuente, lo transforma y produce el fichero que de verdad se usa.

Aplicado a CSS: tú escribes en `.scss`, con variables y estructuras que el navegador no entiende, y SASS lo compila a un `.css` normal y corriente. El navegador nunca ve tu SASS, solo el resultado.

> [!NOTE]
> Por eso no hay que preocuparse por la compatibilidad: el CSS que sale es CSS de toda la vida. SASS es una comodidad para quien escribe, no una tecnología que el navegador tenga que soportar.

## Instalar y compilar

Hacen falta dos cosas:

1. **Node.js**, que trae el gestor de paquetes `npm`.
2. **SASS**, que se instala con él:

```bash
npm install -g sass
```

Y para compilar, dejándolo vigilando los cambios:

```bash
sass --watch estilos.scss estilos.css
```

Con `--watch` el programa se queda en marcha: cada vez que guardas el `.scss`, regenera el `.css` al instante. Es como se trabaja: editor a un lado, terminal con el `--watch` al otro.

```bash
sass estilos.scss estilos.css              # compilar una vez
sass --watch scss/:css/                    # vigilar carpetas enteras
sass --style=compressed entrada.scss salida.css   # CSS minificado
```

## Variables

Se declaran con `$` y evitan repetir el mismo valor por toda la hoja:

```scss
$fuente: Helvetica, sans-serif;
$color-principal: #1668d6;
$tamano-texto: 18px;
$ancho: 680px;

body {
  font-family: $fuente;
  font-size: $tamano-texto;
  color: $color-principal;
}

#contenedor {
  width: $ancho;
}
```

Cambiar el color de toda la web pasa a ser editar **una línea**. Es la razón número uno para usar SASS.

## Anidación

Permite escribir los selectores dentro de su contexto, en vez de repetir el camino completo:

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

Y eso compila a CSS plano:

```css
nav ul { margin: 0; padding: 0; list-style: none; }
nav li { display: inline-block; }
nav a  { display: block; padding: 6px 12px; text-decoration: none; }
```

El código queda más limpio y refleja la estructura del HTML.

> [!WARNING]
> Anidar demasiado es el error clásico de SASS. Cuatro o cinco niveles generan selectores larguísimos (`nav ul li a span`), difíciles de sobreescribir y lentos de evaluar. La norma sensata: **no pasar de tres niveles**.

### El símbolo &

Dentro de un bloque, `&` se refiere al selector padre. Es lo que permite manejar estados y variantes sin salir del bloque:

```scss
a {
  color: $color-principal;

  &:hover { text-decoration: underline; }
  &:visited { color: purple; }
  &.destacado { font-weight: bold; }
}
```

## Mixins

Un **mixin** es un bloque de estilos reutilizable, como una función:

```scss
@mixin caja-redondeada($radio: 8px) {
  border: 1px solid #ccc;
  border-radius: $radio;
  padding: 12px;
}

.tarjeta {
  @include caja-redondeada();
}

.aviso {
  @include caja-redondeada(16px);
}
```

Se declara con `@mixin` y se usa con `@include`. Pueden recibir **parámetros**, con valor por defecto, y ahí está su utilidad real: un mismo patrón con pequeñas variaciones.

## Otras piezas

### Herencia

```scss
.boton {
  padding: 8px 16px;
  border: 0;
}

.boton-peligro {
  @extend .boton;
  background: red;
}
```

`@extend` comparte los estilos de otro selector. Diferencia con un mixin: `@extend` agrupa los selectores en el CSS resultante, mientras que `@include` **copia** las propiedades en cada sitio.

### Operaciones

```scss
$base: 16px;

h1 { font-size: $base * 2; }
.mitad { width: 100% / 2; }
```

### Trocear en ficheros

```scss
// _variables.scss, _botones.scss  (el guion bajo evita que se compilen solos)
@use "variables";
@use "botones";
```

Así se reparte el estilo en ficheros pequeños por tema, y solo se compila el principal.

## Cuándo merece la pena

| Situación | ¿SASS? |
|---|---|
| Una página suelta con veinte reglas | No: es más herramienta que problema |
| Un sitio de varias páginas con paleta propia | Sí, solo por las variables |
| Un proyecto en equipo y a largo plazo | Sí |
| Ya se usa un framework que lo trae | Sí, es lo que se espera |

> [!TIP]
> El CSS moderno ha ido incorporando parte de esto por su cuenta: las **variables nativas** (`--color: #1668d6;` y `var(--color)`) y la **anidación** ya funcionan en los navegadores actuales. Para un proyecto nuevo y pequeño puede no hacer falta SASS; lo que sigue sin tener equivalente son los mixins con parámetros y el troceado en ficheros.
