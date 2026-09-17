---
titulo: XML y DTD
subtitulo: true
---

# XML y DTD

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

XML sirve para guardar datos con su estructura, y DTD para definir qué estructura es válida. Es la base de casi todos los formatos de intercambio.

## Qué es XML

**XML** (*eXtensible Markup Language*) es un lenguaje de marcas para **describir datos**, no para presentarlos. A diferencia de HTML, no tiene etiquetas predefinidas: las etiquetas las pones tú, con los nombres que tengan sentido para tus datos.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<universidad>
  <nombre>Universidad de Ejemplo</nombre>
  <pais>España</pais>
  <carrera id="c01" codigo="INF">
    <nombre>Ingeniería Informática</nombre>
    <plan>2018</plan>
    <centro>Escuela de Ingeniería</centro>
    <subdirector>Nombre Apellido</subdirector>
    <asignatura>
      <nombre>Redes</nombre>
      <trimestre>2</trimestre>
    </asignatura>
  </carrera>
  <alumno>
    <nombre>Ana</nombre>
    <apellido1>García</apellido1>
    <sexo>Mujer</sexo>
  </alumno>
</universidad>
```

## Las reglas de un XML bien formado

Son pocas y no se negocian: si se incumple una, el documento **no se puede procesar**.

1. **Declaración** al principio: `<?xml version="1.0" encoding="UTF-8"?>`.
2. **Un solo elemento raíz** que contenga todo lo demás.
3. **Todas las etiquetas se cierran**: `<nombre>…</nombre>`, o `<nombre/>` si va vacía.
4. **Correctamente anidadas**: se cierra primero la última que se abrió.
5. **Sensible a mayúsculas**: `<Nombre>` y `<nombre>` son etiquetas distintas.
6. **Atributos siempre entre comillas**: `id="c01"`.
7. Los caracteres reservados se escapan: `&lt;` `&gt;` `&amp;` `&quot;` `&apos;`.

| Término | Significa |
|---|---|
| **Bien formado** (*well-formed*) | Cumple las reglas de sintaxis de XML |
| **Válido** (*valid*) | Además cumple la estructura que define su DTD o su esquema |

Un documento puede estar bien formado y no ser válido: sintaxis correcta, pero con elementos que su definición no permite.

## Elementos y atributos

```xml
<carrera id="c01">          <!-- id es un atributo -->
  <nombre>Informática</nombre>   <!-- nombre es un elemento -->
</carrera>
```

¿Cuándo usar uno u otro? La regla práctica: **los datos van en elementos, los metadatos en atributos**. Un identificador, un código o una unidad de medida son buenos atributos; el nombre de algo es un elemento. Los atributos no pueden repetirse ni contener estructura, así que en la duda, elemento.

## DTD

Un **DTD** (*Document Type Definition*) define qué elementos puede tener un documento, en qué orden y con qué atributos. Es el contrato: quien recibe el XML puede comprobar que trae lo que debe.

### Declararlo

**Interno**, dentro del propio documento:

```xml
<!DOCTYPE universidad [
  <!ELEMENT universidad (nombre, pais, carrera+, alumno*)>
  <!ELEMENT nombre (#PCDATA)>
  <!ELEMENT pais (#PCDATA)>
]>
```

**Externo**, en un fichero aparte:

```xml
<!DOCTYPE universidad SYSTEM "universidad.dtd">
```

### Declarar elementos

```xml
<!ELEMENT carrera (nombre, plan, centro, subdirector?, asignatura*)>
<!ELEMENT nombre (#PCDATA)>
<!ELEMENT vacio EMPTY>
<!ELEMENT cualquiera ANY>
```

Los **indicadores de cardinalidad** son lo que más se pregunta:

| Símbolo | Significa |
|---|---|
| *(nada)* | Exactamente **una** vez |
| `?` | **Cero o una** vez: opcional |
| `+` | **Una o más** veces |
| `*` | **Cero o más** veces |

Y los separadores: la **coma** exige ese orden (secuencia), y la **barra vertical** `\|` significa una opción u otra.

| Contenido | Significa |
|---|---|
| `#PCDATA` | Texto |
| `EMPTY` | Sin contenido |
| `ANY` | Cualquier cosa |
| `(a, b)` | `a` seguido de `b` |
| `(a \| b)` | `a` o `b` |

### Declarar atributos

```xml
<!ATTLIST carrera
  id     ID       #REQUIRED
  codigo CDATA    #IMPLIED
  turno  (manana|tarde) "manana">
```

| Tipo | Qué admite |
|---|---|
| `CDATA` | Texto |
| `ID` | Un identificador **único** en todo el documento |
| `IDREF` | Una referencia a un `ID` existente |
| `(a\|b)` | Solo uno de esos valores |

| Modificador | Significa |
|---|---|
| `#REQUIRED` | Obligatorio |
| `#IMPLIED` | Opcional |
| `#FIXED "v"` | Siempre ese valor |
| `"valor"` | Valor por defecto si no se indica |

> [!NOTE]
> DTD es el mecanismo clásico y el que se estudia primero, pero tiene limitaciones: no distingue tipos de datos (todo es texto, no hay "número entero" ni "fecha") y no se escribe en XML. Por eso en la práctica se usa cada vez más **XML Schema (XSD)**, que sí es XML, sí tiene tipos y permite restricciones mucho más finas.

## Para qué se usa XML

- **Configuración** de aplicaciones y servidores.
- **Intercambio de datos** entre sistemas distintos, que es su razón de ser.
- **Formatos de documento**: los `.docx` y `.xlsx` son XML comprimido en un ZIP.
- **Canales de contenido** como RSS.
- **Servicios web** SOAP.

> [!TIP]
> Saber esto tiene un uso inmediato y poco evidente: como los ficheros de Office son XML dentro de un ZIP, se pueden descomprimir y leer su contenido **sin tener Office instalado**. Es la forma de extraer el texto de un documento desde un servidor Linux, o de inspeccionar sus metadatos.
