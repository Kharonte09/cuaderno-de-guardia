---
titulo: Diseño físico
subtitulo: true
---

# Diseño físico

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

La última fase del diseño de una base de datos: traducir el modelo relacional a instrucciones SQL que crean las estructuras de verdad.

## Dónde encaja esta fase

El diseño de una base de datos va en cuatro pasos, y cada uno usa el resultado del anterior:

| Fase | Qué se produce |
|---|---|
| **Análisis de requisitos** | Qué datos hace falta guardar y qué se va a hacer con ellos |
| **Diseño conceptual** | El modelo entidad-relación: entidades, atributos y relaciones |
| **Diseño lógico** | El modelo relacional: tablas, claves y campos |
| **Diseño físico** | Las instrucciones SQL que crean esas estructuras |

Si las fases anteriores están bien hechas, **el diseño físico no tiene dificultad**: consiste en transcribir el modelo lógico a SQL. Los problemas que aparecen aquí casi siempre son problemas del diseño lógico que se habían pasado por alto.

## De dónde viene SQL

El **modelo relacional** en el que se basan los gestores actuales lo presentó en 1970 el matemático **Edgar F. Codd**, que trabajaba en los laboratorios de investigación de IBM.

Uno de los primeros gestores relacionales fue el **System R** de IBM (1974), desarrollado como prototipo para demostrar que el modelo relacional era viable. Venía acompañado de un lenguaje llamado **SEQUEL** (*Structured English Query Language*), que por motivos de marca pasó a llamarse **SQL**. De ahí que todavía mucha gente lo pronuncie "sícuel".

## Las familias de instrucciones

SQL es un lenguaje reducido y muy potente, y sus instrucciones se agrupan en tres familias que conviene tener clarísimas:

| Familia | Para qué | Instrucciones |
|---|---|---|
| **DDL** (definición) | Crear, modificar y eliminar estructuras | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| **DML** (manipulación) | Altas, bajas, modificaciones y consultas | `INSERT`, `UPDATE`, `DELETE`, `SELECT` |
| **DCL** (control) | Usuarios y privilegios | `GRANT`, `REVOKE` |

El diseño físico es, básicamente, **DDL**.

## Crear tablas

```sql
CREATE TABLE carrera (
  id          CHAR(3)       PRIMARY KEY,
  nombre      VARCHAR(100)  NOT NULL,
  plan        INT,
  centro      VARCHAR(100),
  creada      DATE          DEFAULT CURRENT_DATE
);

CREATE TABLE alumno (
  expediente  INT           PRIMARY KEY AUTO_INCREMENT,
  nombre      VARCHAR(50)   NOT NULL,
  apellido1   VARCHAR(50)   NOT NULL,
  email       VARCHAR(120)  UNIQUE,
  id_carrera  CHAR(3),
  FOREIGN KEY (id_carrera) REFERENCES carrera(id)
);
```

## Tipos de datos

| Tipo | Para qué |
|---|---|
| `INT`, `SMALLINT`, `BIGINT` | Números enteros |
| `DECIMAL(p,e)` | Números exactos con decimales. **El de dinero** |
| `FLOAT`, `DOUBLE` | Números aproximados |
| `CHAR(n)` | Texto de longitud **fija** |
| `VARCHAR(n)` | Texto de longitud **variable**, hasta n |
| `TEXT` | Texto largo |
| `DATE`, `TIME`, `DATETIME` | Fechas y horas |
| `BOOLEAN` | Verdadero o falso |
| `BLOB` | Datos binarios |

> [!IMPORTANT]
> Para importes **nunca** se usa `FLOAT` ni `DOUBLE`: son aproximados y los céntimos acaban descuadrando. Se usa `DECIMAL(10,2)`, que es exacto. Y `CHAR` solo cuando la longitud es siempre la misma (un código de tres letras, un DNI); para lo demás, `VARCHAR`.

## Restricciones

Son la parte que de verdad protege los datos: lo que el gestor **no va a permitir** aunque la aplicación lo intente.

| Restricción | Qué garantiza |
|---|---|
| `PRIMARY KEY` | Identifica cada fila de forma única. No admite nulos |
| `FOREIGN KEY` | El valor existe en la tabla referenciada: **integridad referencial** |
| `NOT NULL` | El campo no puede quedar vacío |
| `UNIQUE` | No hay dos filas con el mismo valor |
| `CHECK` | El valor cumple una condición |
| `DEFAULT` | Valor que se pone si no se indica |

```sql
CREATE TABLE asignatura (
  id         INT PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  trimestre  INT CHECK (trimestre BETWEEN 1 AND 3),
  creditos   DECIMAL(4,1) DEFAULT 6.0
);
```

### Qué pasa al borrar el padre

En una clave ajena se define qué ocurre si se borra o se cambia la fila referenciada:

| Cláusula | Efecto |
|---|---|
| `ON DELETE RESTRICT` | Impide el borrado. Es lo más seguro |
| `ON DELETE CASCADE` | Borra también las filas hijas |
| `ON DELETE SET NULL` | Deja la clave ajena a nulo |

```sql
FOREIGN KEY (id_carrera) REFERENCES carrera(id)
  ON DELETE RESTRICT ON UPDATE CASCADE
```

> [!WARNING]
> `ON DELETE CASCADE` es cómodo y peligroso: borrar una carrera se lleva por delante todos sus alumnos sin preguntar. Se pone solo cuando la fila hija **no tiene sentido** sin la padre.

## Modificar y eliminar estructuras

```sql
ALTER TABLE alumno ADD telefono VARCHAR(15);
ALTER TABLE alumno MODIFY nombre VARCHAR(80);
ALTER TABLE alumno DROP COLUMN telefono;

DROP TABLE alumno;          -- elimina la tabla entera
TRUNCATE TABLE alumno;      -- vacía la tabla, la estructura se queda
```

| Instrucción | Qué se lleva |
|---|---|
| `DELETE FROM t` | Filas, una a una, y se puede deshacer en una transacción |
| `TRUNCATE TABLE t` | Todas las filas de golpe, sin registrar cada una. Más rápido y no se deshace |
| `DROP TABLE t` | La tabla completa, estructura incluida |

## Índices

Un **índice** es una estructura auxiliar que acelera las búsquedas por un campo, igual que el índice de un libro evita leerlo entero.

```sql
CREATE INDEX idx_apellido ON alumno(apellido1);
CREATE UNIQUE INDEX idx_email ON alumno(email);
DROP INDEX idx_apellido ON alumno;
```

Las claves primarias y las restricciones `UNIQUE` **ya crean su índice** automáticamente.

> [!TIP]
> Los índices no son gratis: aceleran las consultas y **frenan las escrituras**, porque hay que actualizarlos en cada alta, baja o modificación, y ocupan espacio. La regla: indexar los campos por los que **de verdad** se busca o se une con otras tablas, no todos por si acaso.

## Vistas

Una **vista** es una consulta guardada a la que se trata como si fuera una tabla:

```sql
CREATE VIEW alumnos_informatica AS
  SELECT a.nombre, a.apellido1, c.nombre AS carrera
  FROM alumno a
  JOIN carrera c ON a.id_carrera = c.id
  WHERE c.nombre = 'Ingeniería Informática';

SELECT * FROM alumnos_informatica;
```

Para qué sirven:

- **Simplificar** consultas complicadas que se repiten mucho.
- **Restringir** qué ve cada usuario: se le da acceso a la vista y no a la tabla, y así solo ve las filas y columnas que le corresponden.
- **Aislar** las aplicaciones de cambios en la estructura de las tablas.

La vista **no guarda datos**: cada consulta sobre ella se ejecuta contra las tablas reales, así que siempre está al día.
