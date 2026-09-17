---
titulo: XPath
subtitulo: true
---

# XPath

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

El lenguaje para señalar partes de un documento XML. Se aprende resolviendo consultas, así que esta página es sobre todo ejemplos.

## La idea

Un documento XML es un **árbol** de nodos. XPath es una forma de escribir un camino hasta los nodos que interesan, igual que una ruta de directorios señala un fichero.

```
/universidad/carrera/nombre
```

Eso es: desde la raíz, el elemento `universidad`, dentro sus `carrera`, y de cada una su `nombre`.

## Lo esencial de la sintaxis

| Expresión | Qué selecciona |
|---|---|
| `/` | Desde la **raíz**. Ruta absoluta |
| `//` | En **cualquier nivel** de profundidad |
| `.` | El nodo actual |
| `..` | El nodo padre |
| `@` | Un **atributo** |
| `*` | Cualquier elemento |
| `@*` | Cualquier atributo |
| `[...]` | Un **predicado**: la condición que filtra |
| `\|` | Unión de dos consultas |
| `node()` | El contenido del nodo, sin su etiqueta |
| `text()` | Solo el texto |

> [!IMPORTANT]
> La diferencia entre `/` y `//` es la que más falla en los exámenes. `/universidad/carrera` exige que `carrera` sea **hija directa** de la raíz; `//carrera` la encuentra **esté donde esté**. Cuando no se conoce la estructura exacta, `//` es lo seguro; cuando se conoce, `/` es más preciso y más rápido.

## Consultas resueltas

Sobre un documento con universidades, carreras, asignaturas y alumnos:

| Qué se pide | XPath |
|---|---|
| Nombre de la universidad | `/universidad/nombre` |
| País de la universidad | `/universidad/pais` |
| Nombres de las carreras | `//carrera/nombre` |
| Años del plan de estudios | `//carrera/plan` |
| Nombres de todos los alumnos | `//alumno/nombre` |
| Identificadores de todas las carreras | `//carrera/@id` |
| Datos de la carrera con `id` c01 | `//carrera[@id="c01"]` |
| Centro donde se estudia la carrera c02 | `//carrera[@id="c02"]/centro` |
| Carreras **que tengan** subdirector | `//carrera[subdirector]/nombre` |
| Asignaturas de segundo trimestre | `//asignatura[trimestre=2]/nombre` |
| El último alumno | `//alumno[last()]` |
| Apellidos de los alumnos varones | `//alumno[sexo="Hombre"]/apellido1` |

Y sobre un documento de productos con peso y unidad:

| Qué se pide | XPath |
|---|---|
| Todos los elementos `peso`, etiqueta incluida | `//peso` |
| Solo las cantidades, sin la etiqueta | `//peso/node()` |
| El peso del último producto | `//producto[last()]/peso` |
| Las distintas unidades usadas | `//peso/@unidad` |
| El último código | `//producto[last()]/@codigo` |
| El peso del producto con código AAA-111 | `//producto[@codigo="AAA-111"]/peso` |
| Nombre de los productos con el peso en gramos | `//producto[peso/@unidad="g"]/nombre` |
| Código de los productos llamados «Monitor» | `//producto[nombre="Monitor"]/@codigo` |

## Los tres tipos de predicado

Viendo la tabla anterior, todos los filtros son uno de estos tres casos, y con eso se resuelve casi cualquier ejercicio:

**1. Por existencia** — el elemento hijo existe, sin importar su valor:

```
//carrera[subdirector]
```

**2. Por valor** — de un hijo o de un atributo:

```
//asignatura[trimestre=2]
//producto[@codigo="AAA-111"]
```

Ojo con las comillas: el texto se compara entre comillas (`="Hombre"`), los números sin ellas (`=2`).

**3. Por posición** — con las funciones de posición:

```
//alumno[1]          primero
//alumno[last()]     último
//alumno[position()<=3]   los tres primeros
```

> [!TIP]
> En XPath la numeración **empieza en 1**, no en 0. Y `[1]` se aplica por cada nodo padre, no al conjunto total: `//carrera/alumno[1]` devuelve el primer alumno **de cada** carrera, no el primer alumno del documento.

## Filtrar por un hijo de un hijo

Es el caso que parece complicado y no lo es. Para seleccionar productos cuya **unidad de peso** sea gramos, la condición cuelga de la ruta interna:

```
//producto[peso/@unidad="g"]/nombre
```

Dentro del predicado se escribe una ruta relativa al nodo que se está filtrando. Así se puede filtrar por cualquier cosa que esté por debajo, a cualquier profundidad.

## Funciones útiles

| Función | Qué hace |
|---|---|
| `last()` | La posición del último nodo |
| `position()` | La posición del nodo actual |
| `count(ruta)` | Cuántos nodos coinciden |
| `contains(a, b)` | Si `a` contiene el texto `b` |
| `starts-with(a, b)` | Si `a` empieza por `b` |
| `not(cond)` | Niega una condición |
| `string-length(a)` | Longitud del texto |
| `sum(ruta)` | Suma de los valores numéricos |

```
//alumno[contains(apellido1, "Gar")]
//carrera[not(subdirector)]/nombre
count(//alumno)
```

## Dónde se usa esto

XPath no se queda en la asignatura: aparece en todas partes.

- En **XSLT**, para transformar un XML en otro formato.
- En **extracción de datos** de páginas web (el navegador expone el HTML como un árbol, y se consulta igual).
- En **pruebas automatizadas**, para localizar elementos de una interfaz.
- En **consultas a bases de datos** que almacenan XML.

> [!TIP]
> Se puede practicar sin instalar nada: en las herramientas de desarrollo del navegador (`F12`), en la consola, `$x("//h2")` ejecuta una consulta XPath sobre la página que se está viendo y devuelve los nodos que coinciden. Es la forma más rápida de comprobar si una expresión está bien escrita.
