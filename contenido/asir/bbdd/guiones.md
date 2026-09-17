---
titulo: Construcción de guiones
subtitulo: true
---

# Construcción de guiones

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Agrupar instrucciones SQL en secuencia, y dar el salto a programar dentro de la propia base de datos con la extensión procedimental de MySQL.

## Por qué hacen falta

SQL por sí solo es **autosuficiente**: permite consultar y actualizar directamente la base de datos sin ningún programa por medio. Y eso es una ventaja enorme.

Pero acceder directamente no elimina la necesidad de **programar** la gestión de los datos: hay tareas que son una secuencia de pasos, con decisiones y repeticiones, y eso SQL solo no lo expresa.

Para cubrirlo, los principales gestores incorporan **extensiones procedimentales** del lenguaje SQL: lenguajes de tercera generación que permiten escribir pequeños programas y subprogramas que se **almacenan en la propia base de datos** y se pueden ejecutar desde cualquier entorno. MySQL la incorpora desde su versión 5.0, en 2006.

## Guiones

Un **guion** (*script*) no es otra cosa que una **secuencia ordenada de instrucciones SQL** que se ejecutan una detrás de otra. Se guarda en un fichero `.sql` y se lanza de una vez.

Para qué se usan:

- **Crear la base de datos entera**: todas las tablas, índices y vistas de golpe.
- **Cargar datos iniciales**.
- **Repetir** una secuencia de mantenimiento cada cierto tiempo.
- **Documentar** la estructura: el guion *es* la definición de la base de datos, y se puede guardar en un control de versiones.

```sql
-- crear_universidad.sql
DROP DATABASE IF EXISTS universidad;
CREATE DATABASE universidad CHARACTER SET utf8mb4;
USE universidad;

CREATE TABLE carrera ( ... );
CREATE TABLE alumno ( ... );

INSERT INTO carrera VALUES ('INF', 'Ingeniería Informática', 2018);
```

```bash
mysql -u usuario -p < crear_universidad.sql
```

> [!TIP]
> Un guion que empieza por `DROP DATABASE IF EXISTS` se puede ejecutar tantas veces como haga falta y siempre deja la base de datos igual. Eso se llama ser **idempotente**, y es lo que permite rehacer el entorno de pruebas en cinco segundos cuando se ha liado algo.

## Variables

```sql
SET @total = 0;
SELECT COUNT(*) INTO @total FROM alumno;
SELECT @total;
```

Y dentro de un bloque de programa, con `DECLARE` y su tipo:

```sql
DECLARE contador INT DEFAULT 0;
DECLARE nombre_alumno VARCHAR(50);
```

## Delimitadores

Un detalle que hace fallar el primer procedimiento de todo el mundo: dentro de un procedimiento hay puntos y coma, y el cliente los interpreta como el final de la sentencia. Hay que cambiar el delimitador mientras se escribe:

```sql
DELIMITER //

CREATE PROCEDURE saludo()
BEGIN
  SELECT 'Hola';
END //

DELIMITER ;
```

## Procedimientos almacenados

Un bloque de código con nombre, guardado en la base de datos, que se ejecuta cuando se le llama:

```sql
DELIMITER //

CREATE PROCEDURE matricular(
  IN  p_expediente INT,
  IN  p_asignatura INT,
  OUT p_resultado  VARCHAR(50)
)
BEGIN
  DECLARE ya_existe INT;

  SELECT COUNT(*) INTO ya_existe
  FROM matricula
  WHERE expediente = p_expediente AND id_asignatura = p_asignatura;

  IF ya_existe > 0 THEN
    SET p_resultado = 'Ya estaba matriculado';
  ELSE
    INSERT INTO matricula (expediente, id_asignatura)
    VALUES (p_expediente, p_asignatura);
    SET p_resultado = 'Matrícula realizada';
  END IF;
END //

DELIMITER ;

CALL matricular(1042, 7, @res);
SELECT @res;
```

Los parámetros pueden ser `IN` (entrada), `OUT` (salida) o `INOUT` (las dos cosas).

## Funciones

Igual que un procedimiento, pero **devuelve un valor** y se puede usar dentro de una consulta:

```sql
DELIMITER //

CREATE FUNCTION creditos_alumno(p_expediente INT)
RETURNS DECIMAL(6,1)
DETERMINISTIC
READS SQL DATA
BEGIN
  DECLARE total DECIMAL(6,1);
  SELECT COALESCE(SUM(a.creditos), 0) INTO total
  FROM matricula m
  JOIN asignatura a ON m.id_asignatura = a.id
  WHERE m.expediente = p_expediente;
  RETURN total;
END //

DELIMITER ;

SELECT nombre, creditos_alumno(expediente) AS creditos FROM alumno;
```

| | Procedimiento | Función |
|---|---|---|
| **Devuelve** | Nada, o parámetros `OUT` | Un valor con `RETURN` |
| **Se llama con** | `CALL` | Dentro de un `SELECT` |
| **Puede modificar datos** | Sí | Se evita: debería solo calcular |

## Control de flujo

```sql
-- Condicional
IF nota >= 5 THEN
  SET resultado = 'Aprobado';
ELSEIF nota >= 4 THEN
  SET resultado = 'Recuperable';
ELSE
  SET resultado = 'Suspenso';
END IF;

-- Selección múltiple
CASE trimestre
  WHEN 1 THEN SET periodo = 'Primero';
  WHEN 2 THEN SET periodo = 'Segundo';
  ELSE SET periodo = 'Tercero';
END CASE;

-- Bucles
WHILE contador < 10 DO
  SET contador = contador + 1;
END WHILE;

REPEAT
  SET contador = contador - 1;
UNTIL contador = 0
END REPEAT;
```

## Cursores

Un **cursor** recorre el resultado de una consulta **fila a fila**, para cuando hay que hacer algo con cada una:

```sql
DELIMITER //

CREATE PROCEDURE revisar_alumnos()
BEGIN
  DECLARE hecho INT DEFAULT 0;
  DECLARE v_nombre VARCHAR(50);

  DECLARE cur CURSOR FOR SELECT nombre FROM alumno;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET hecho = 1;

  OPEN cur;
  bucle: LOOP
    FETCH cur INTO v_nombre;
    IF hecho = 1 THEN
      LEAVE bucle;
    END IF;
    -- lo que haya que hacer con cada fila
  END LOOP;
  CLOSE cur;
END //

DELIMITER ;
```

El `HANDLER FOR NOT FOUND` es imprescindible: es lo que detecta que ya no quedan filas. Sin él, el bucle no termina.

> [!WARNING]
> Un cursor es **lento**: hace una vuelta por fila en lugar de una operación sobre el conjunto. Antes de escribir uno hay que asegurarse de que el problema no se resuelve con un `UPDATE` con `JOIN` o con una consulta agrupada, que es lo que el gestor sabe hacer rápido. Los cursores se reservan para lo que de verdad necesita ir fila a fila.

## Disparadores

Un **disparador** (*trigger*) es código que se ejecuta **automáticamente** al insertar, modificar o borrar en una tabla:

```sql
DELIMITER //

CREATE TRIGGER auditar_baja
AFTER DELETE ON alumno
FOR EACH ROW
BEGIN
  INSERT INTO auditoria (tabla, accion, clave, fecha)
  VALUES ('alumno', 'DELETE', OLD.expediente, NOW());
END //

DELIMITER ;
```

- Momento: `BEFORE` o `AFTER`.
- Evento: `INSERT`, `UPDATE` o `DELETE`.
- `NEW.campo` es el valor nuevo; `OLD.campo`, el anterior.

Se usan para **auditoría** (dejar constancia de quién cambió qué), para mantener datos derivados y para validaciones que no se pueden expresar con un `CHECK`.

> [!NOTE]
> Los disparadores son potentes y **invisibles**: se ejecutan sin que nadie los llame, así que un comportamiento raro de la base de datos puede venir de un disparador que nadie recuerda que existe. Conviene tenerlos documentados y no abusar de ellos.

## Ventajas de programar dentro de la base de datos

| A favor | A tener en cuenta |
|---|---|
| Se ejecuta **junto a los datos**: menos tráfico de red | La lógica queda repartida entre la aplicación y la base de datos |
| Se reutiliza desde cualquier aplicación o entorno | La sintaxis cambia entre gestores: cuesta migrar |
| Se puede dar permiso de ejecución **sin** dar acceso a las tablas | Más difícil de depurar y de poner en control de versiones |
| Centraliza reglas de negocio que deben cumplirse siempre | Un cambio afecta a todas las aplicaciones a la vez |
