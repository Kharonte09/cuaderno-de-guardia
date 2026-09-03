---
titulo: Cómo procesa el SIEM
subtitulo: true
---

# Cómo procesa el SIEM

Lo que le pasa a un log entre que entra y que tú lo buscas. Cinco pasos, en orden.

```text
log crudo ──► normalizar ──► categorizar ──► enriquecer ──► indexar ──► almacenar
```

## 1. Normalización

**Qué es:** convertir logs que llegan en formatos distintos a un **formato común**.

**Por qué:** cada fabricante habla su idioma. Normalizar es traducirlos todos al mismo.

```text
Cisco    envía  src_ip
Juniper  envía  source_address
                    ↓
        ambos quedan como  source_ip
```

**Beneficio:** buscas `source_ip="10.0.0.5"` y el SIEM encuentra coincidencias en **todos** los fabricantes a la vez. Sin esto tendrías que conocer el nombre del campo de cada marca.

## 2. Categorización

**Qué es:** asignar etiquetas que indican **qué tipo de evento** es.

**Por qué:** para que el SIEM sepa si algo es de autenticación, de red, de sistema, de malware, un error, una operación remota.

```text
"User john attempted to login to server XYZ"
                    ↓
        authentication.login.attempt
```

**Beneficio:** permite escribir reglas genéricas del tipo *"alerta si hay fallos de login desde un país inusual"*, sin tener que enumerar cada formato de log que existe.

## 3. Enriquecimiento

**Qué es:** añadir contexto que el log no traía.

Si en el evento aparece una IP externa, el SIEM añade automáticamente:

| Dato añadido | Ejemplo |
|---|---|
| País | Italia |
| ASN | TIM S.p.A. |
| Reputación | Sospechosa |

**Beneficio:** como analista ya no tienes que buscar la IP a mano en tres sitios. Llegas al evento con el contexto puesto.

## 4. Indexación

**Qué es:** crear índices para que las búsquedas sean rápidas, igual que el índice de un libro.

**Por qué:** el SIEM guarda millones de eventos. Sin índices, buscar sería recorrerlos uno a uno.

Se indexan campos como `timestamp`, `source_ip` o `username`.

**Beneficio:** buscar `source_ip=10.1.1.5` tarda milisegundos y no minutos.

## 5. Almacenamiento

**Dónde** se guardan físicamente los logs:

- Discos locales
- Servidores NAS
- Nube (S3 y equivalentes)
- Hadoop

**Por qué importa:** una empresa grande genera muchísimos logs al día, y hay que equilibrar cuatro cosas que tiran en direcciones distintas:

| Factor | Tensión |
|---|---|
| **Capacidad** | Cuánto cabe |
| **Rendimiento** | Cómo de rápido se busca |
| **Retención** | 90 días, un año, siete años según normativa |
| **Coste** | Lo que limita a los otros tres |

> [!TIP]
> La retención es la que suele decidirse por normativa y no por criterio técnico. Cuando investigues un incidente antiguo, lo primero es comprobar hasta dónde llega el histórico: es habitual descubrir que la evidencia que necesitas se borró hace dos semanas.
