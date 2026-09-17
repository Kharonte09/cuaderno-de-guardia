---
titulo: Edición de los datos
subtitulo: true
---

# Edición de los datos

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Una vez creadas las tablas hay que meter datos, corregirlos y borrarlos. Y hacerlo de forma que un fallo a medias no deje la base de datos inconsistente.

## Las tres instrucciones de manipulación

Las instrucciones **DML** que modifican datos se reducen a tres:

| Instrucción | Qué hace |
|---|---|
| `INSERT` | Introduce nuevas filas |
| `UPDATE` | Modifica filas existentes |
| `DELETE` | Borra filas |

Y junto a ellas, las de **control de transacciones**, que aseguran que un conjunto de operaciones se ejecute **entero o nada**.

## INSERT

```sql
-- Indicando las columnas: la forma recomendada
INSERT INTO alumno (nombre, apellido1, email, id_carrera)
VALUES ('Ana', 'García', 'ana@ejemplo.es', 'INF');

-- Varias filas de una vez
INSERT INTO alumno (nombre, apellido1, id_carrera) VALUES
  ('Luis', 'Pérez', 'INF'),
  ('Marta', 'Ruiz', 'TEL');

-- A partir de una consulta
INSERT INTO alumno_historico (nombre, apellido1)
SELECT nombre, apellido1 FROM alumno WHERE baja = 1;
```

> [!TIP]
> **Nombrar siempre las columnas.** La forma corta, `INSERT INTO alumno VALUES (...)`, depende del orden físico de las columnas: el día que alguien añada un campo en medio con `ALTER TABLE`, todos esos INSERT empiezan a meter los datos en la columna equivocada, y sin dar error.

## UPDATE

```sql
UPDATE alumno
SET email = 'nuevo@ejemplo.es'
WHERE expediente = 1042;

-- Varias columnas, y calculando a partir del valor actual
UPDATE asignatura
SET creditos = creditos * 1.1, revisada = CURRENT_DATE
WHERE trimestre = 2;
```

## DELETE

```sql
DELETE FROM alumno WHERE expediente = 1042;
DELETE FROM alumno WHERE baja = 1 AND fecha_baja < '2020-01-01';
```

> [!WARNING]
> **Un `UPDATE` o un `DELETE` sin `WHERE` afecta a toda la tabla.** Es el error más caro que se comete con SQL, y no avisa: se ejecuta sin más y devuelve "10.000 filas afectadas".
>
> Dos costumbres que lo evitan: escribir primero la sentencia como un `SELECT` con ese mismo `WHERE` para ver **qué filas van a caer**, y trabajar con la transacción abierta para poder deshacerlo.

## Transacciones

Una **transacción** es un conjunto de operaciones que deben ejecutarse **con éxito en su totalidad** o, si hay un problema, **abortarse por completo** (o hasta un punto determinado).

El ejemplo de siempre es una transferencia: restar de una cuenta y sumar en otra. Si solo se ejecuta la primera mitad, el dinero desaparece. O las dos, o ninguna.

```sql
START TRANSACTION;

UPDATE cuenta SET saldo = saldo - 100 WHERE id = 1;
UPDATE cuenta SET saldo = saldo + 100 WHERE id = 2;

COMMIT;      -- confirma: los cambios pasan a ser definitivos
-- ROLLBACK; -- deshace: la base de datos vuelve a como estaba
```

| Instrucción | Qué hace |
|---|---|
| `START TRANSACTION` / `BEGIN` | Abre la transacción |
| `COMMIT` | Confirma todos los cambios |
| `ROLLBACK` | Deshace todos los cambios |
| `SAVEPOINT nombre` | Marca un punto intermedio |
| `ROLLBACK TO nombre` | Deshace solo hasta ese punto |

```sql
START TRANSACTION;
INSERT INTO alumno (nombre, apellido1) VALUES ('Ana', 'García');
SAVEPOINT tras_alumno;
INSERT INTO matricula (expediente, id_asignatura) VALUES (1042, 7);
ROLLBACK TO tras_alumno;   -- se deshace la matrícula, el alumno se queda
COMMIT;
```

### Las propiedades ACID

Lo que un gestor garantiza con las transacciones:

| Propiedad | Significa |
|---|---|
| **Atomicidad** | Todo o nada |
| **Consistencia** | Al terminar, las restricciones se siguen cumpliendo |
| **Aislamiento** | Una transacción no ve los cambios a medias de otra |
| **Durabilidad** | Lo confirmado sobrevive a un corte de luz |

> [!NOTE]
> Muchos gestores trabajan por defecto en **autoconfirmación** (*autocommit*): cada sentencia es su propia transacción y se confirma al instante. Eso explica por qué un `DELETE` mal escrito ya no se puede deshacer: no hay transacción abierta que revertir.

## Concurrencia

Cuando varios usuarios trabajan a la vez sobre los mismos datos aparecen problemas que el aislamiento debe evitar:

| Problema | Qué ocurre |
|---|---|
| **Lectura sucia** | Se leen datos que otra transacción aún no ha confirmado, y luego deshace |
| **Lectura no repetible** | La misma consulta da distinto dentro de una transacción, porque otro la modificó |
| **Lectura fantasma** | Aparecen filas nuevas entre dos consultas iguales |
| **Actualización perdida** | Dos transacciones modifican lo mismo y una sobreescribe a la otra |

Se controlan con los **niveles de aislamiento**, de menos a más estricto:

```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- permite lecturas sucias
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- el habitual por defecto
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- el más estricto
```

Cuanto más estricto, más consistencia y **menos concurrencia**: el gestor bloquea más y las transacciones se esperan unas a otras. Es un equilibrio, no una escala de mejor a peor.

> [!NOTE]
> Un **interbloqueo** (*deadlock*) ocurre cuando dos transacciones se esperan mutuamente. El gestor lo detecta, **aborta una de las dos** y devuelve un error. La aplicación debe estar preparada para reintentar esa operación: es una situación normal, no una avería.

## Control de acceso: DCL

Las instrucciones **DCL** gestionan usuarios y privilegios, y son la otra mitad de proteger la información:

```sql
CREATE USER 'consulta'@'localhost' IDENTIFIED BY 'contraseña';

GRANT SELECT ON universidad.* TO 'consulta'@'localhost';
GRANT SELECT, INSERT, UPDATE ON universidad.alumno TO 'gestion'@'localhost';

REVOKE INSERT ON universidad.alumno FROM 'gestion'@'localhost';

SHOW GRANTS FOR 'consulta'@'localhost';
```

> [!IMPORTANT]
> **Privilegio mínimo**: a cada usuario, solo lo que necesita. Una aplicación que únicamente muestra listados se conecta con un usuario que solo tiene `SELECT`. Así, si esa aplicación tiene un fallo de inyección SQL, el atacante tampoco puede borrar nada. Conectar la aplicación con el usuario administrador convierte cualquier fallo pequeño en un desastre.
