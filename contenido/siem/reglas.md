---
titulo: Reglas de detección y Sigma
subtitulo: true
---

# Reglas de detección y Sigma

## Qué son las reglas de un SIEM

Son **consultas de búsqueda** que buscan actividad concreta dentro de los logs, en tiempo real o de forma programada. Si encuentran coincidencia pueden generar una alerta, enviar un correo o registrar el evento en otro sitio.

**Dos orígenes:**

1. **Reglas del proveedor** — vienen listas para usar y detectan ataques genéricos comunes.
2. **Reglas del analista** — ajustadas a la organización y a lo que en ella es normal.

Las segundas son las que marcan la diferencia, porque "normal" es distinto en cada empresa.

## Qué se puede detectar

Depende enteramente de los logs que el SIEM esté recibiendo. Si no ingieres Sysmon, no detectas relaciones padre-hijo, por buena que sea la regla.

### Autenticación y cuentas

- Intentos fallidos de inicio de sesión
- Logins contra cuentas deshabilitadas
- Uso de cuentas críticas como Administrador
- Cambios sospechosos de SID, posible escalada de privilegios

### Procesos

- Programas ejecutándose desde rutas raras — `Temp` es la clásica
- Relaciones padre-hijo anómalas: **Word lanzando CMD** es señal de macro maliciosa
- Hashes de ficheros maliciosos conocidos

### Red

- Escaneo de puertos
- Enumeración de servicios
- Descubrimiento de hosts internos

## Falsos positivos y cómo reducirlos

Un falso positivo es una alerta que parece mala y no lo es.

**El ejemplo clásico:** el evento **4625** de Windows, login fallido. Si alertas por cada uno, generas miles de alertas inútiles al día y el equipo deja de mirarlas.

### Solución 1: umbrales

```text
10 fallos de login en 10 minutos → alerta
```

Así detectas fuerza bruta sin ahogarte en ruido.

### Solución 2: excluir lo conocido

- La regla detecta escaneos de red desde una IP.
- La empresa instala un escáner de vulnerabilidades interno.
- Esa IP genera escaneos legítimos todos los días → se excluye de la regla.

> [!WARNING]
> Cada exclusión es un agujero. Si excluyes la IP del escáner y un atacante compromete esa máquina, sus escaneos ya no generan alerta. Las exclusiones se documentan, se revisan periódicamente y se hacen lo más estrechas posible.

## Sigma

Un **lenguaje universal para reglas de SIEM**. La comparación que mejor funciona: *YARA pero para logs*.

Escribes la regla **una vez** en Sigma y la conviertes a Splunk, QRadar, Elastic, ArcSight o el que uses.

### Para qué sirve

- **Describir detecciones** sin depender de un SIEM concreto.
- **Compartir reglas** entre analistas, equipos y comunidades.
- **Migrar** de SIEM sin perder tus detecciones.
- Incluir reglas en informes, junto a los IOCs y las reglas YARA.

Es especialmente útil en informes de incidente, en threat intel y en detección colaborativa.

### Cómo funciona

1. **Escribes** la regla en Sigma, que es YAML sencillo.
2. Usas un **convertidor** (`sigmac`) para traducirla al destino: Splunk, QRadar, ArcSight, Elasticsearch (Kibana, Watcher, Elastalert), Logpoint.
3. El proceso también funciona **al revés**: de un SIEM a Sigma, y de ahí a otro SIEM.

### Un ejemplo: detección de web shell

La regla busca **palabras clave dentro de la URL**. Si una URL contiene algo típico de comandos del sistema, algo va mal:

```text
https://example.com/xxxx/shell.php?cmd=whoami
```

Un usuario legítimo **no escribe comandos del sistema operativo en una URL**. Por eso esta regla tiene muy pocos falsos positivos.

> [!TIP]
> Ese es el patrón de una buena regla: no busca algo *sospechoso*, busca algo que **no tiene ninguna explicación legítima**. Cuanto más difícil sea imaginar un caso de uso normal que la dispare, menos ruido genera.

### Dónde ver reglas reales

- **SigmaHQ** — las colecciones oficiales.
- **Florian Roth (Neo23x0)** — reglas muy usadas en respuesta a incidentes.
