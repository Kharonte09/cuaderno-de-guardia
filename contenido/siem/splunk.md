---
titulo: Splunk
subtitulo: true
---

# Splunk

Notas de práctica con el dataset **BOTSv1** (*Boss of the SOC*), que es el que se usa para aprender a buscar sobre datos reales.

## Búsquedas básicas

Se empieza fijando el índice y el rango de tiempo:

```text
index="botsv1"
```

Conviene **acotar el tiempo** siempre, y usar la opción de muestra de eventos mientras exploras, para no cargar la instancia con búsquedas enormes que luego vas a descartar.

## Campos

Los campos son los datos extraídos de los logs —nombres de host, direcciones IP— y son lo que hace posible filtrar en vez de leer texto.

```text
index="botsv1" src_ip="10.10.10.5"
```

## Operadores

`AND`, `OR` y `NOT` para combinar condiciones:

```text
index="botsv1" (src_ip="10.10.10.5" OR src_ip="10.10.10.6") NOT action=allowed
```

## Comodines

El asterisco busca patrones:

```text
src_ip="10.10.10.*"        ← todo el rango
pass* AND fail*            ← variaciones de palabra
```

## Búsquedas de procesos

Con Sysmon, el campo `Image` contiene la ruta del ejecutable:

```text
index="botsv1" Image="*cmd.exe"
```

## Comandos para ordenar el resultado

Van después de una barra vertical, encadenados.

### sort

Ordena por un campo.

```text
| sort time asc              ← del más antiguo al más reciente
| sort limit=2 time desc     ← solo los 2 más recientes
```

### stats

Genera estadísticas: conteos y agrupaciones.

```text
| stats count by srcip
```

Se suele combinar con `sort` para que lo más frecuente quede arriba:

```text
| stats count by srcip | sort -count
```

### table

Muestra solo los campos que interesan y oculta el resto.

```text
| table date time srcip dstport action msg
```

### dedup

Elimina duplicados.

```text
| table action | dedup action
```

Existe también `uniq`, pero **`dedup` es más fiable**.

> [!TIP]
> El orden natural al investigar es: filtrar con la búsqueda → `stats` para ver la forma de los datos → `table` para quedarte con las columnas que importan. Si empiezas por `table` te cargas campos que luego necesitas.

## Alertas: los cuatro pasos

### 1. Consulta de búsqueda

Define **qué quieres detectar**: fallos de login, uso de cuenta administrativa, conexión a una IP externa sospechosa.

### 2. Tiempo de búsqueda

| Tipo | Cuándo se usa |
|---|---|
| **Tiempo real** | Se ejecuta continuamente. Lo más común |
| **Programada** | Cada cierto intervalo. Para líneas base y análisis de comportamiento |

### 3. Activador (trigger)

Evita el ruido usando **umbrales**:

```text
6 fallos de login en 5 minutos, por usuario
```

### 4. Acción

Qué ocurre cuando salta:

- Enviar un correo
- Aparecer en la cola de alertas
- Guardar e indexar el evento
- Lanzar un webhook o un script

## Crear la alerta en la interfaz

1. Escribes la búsqueda.
2. **Guardar como → Alerta**.
3. Configuras:
   - **Nombre y descripción** — que se entienda desde la cola, sin abrirla.
   - **Permisos** — privada o compartida.
   - **Tipo** — tiempo real o programada.
   - **Condiciones** — por resultado, con supresión si hace falta.
   - **Acciones** — notificar, registrar, ejecutar script.

> [!IMPORTANT]
> La supresión es lo que evita que una misma condición genere cien alertas idénticas seguidas. Sin ella, un incidente real te llena la cola de duplicados y esconde todo lo demás que estaba pasando a la vez.
