---
titulo: Qué es un SIEM
subtitulo: true
---

# Qué es un SIEM

Un SIEM es la suma de dos cosas que antes se vendían por separado: **SIM** y **SEM**. Entender de dónde viene explica por qué hace lo que hace.

## SIM — Security Information Management

Recoge y **centraliza logs** de muchos dispositivos: firewalls, IDS, antivirus. Los normaliza, los analiza y genera alertas e informes.

**Qué hace:**

- Recolecta y traduce logs.
- Monitoriza eventos en tiempo real.
- Correlaciona datos de distintas fuentes.
- Genera alertas e informes.
- Puede ejecutar respuestas automáticas.

| Ventajas | Inconvenientes |
|---|---|
| Fácil de usar | Caro |
| Maneja mucho volumen | Puede no adaptarse bien a tu entorno |
| Detección más rápida y clara | Soporte limitado según proveedor |
| Mejor visión global | |

## SEM — Security Event Management

Analiza **en tiempo real** los eventos y alertas de la red para detectar comportamiento sospechoso y ayudar a responder rápido.

**Qué hace:**

- Monitoriza eventos al instante.
- Recoge eventos de seguridad de muchos dispositivos.
- Los correlaciona para dar contexto.
- Prioriza registros según importancia.
- Responde a incidentes en tiempo real.

**Cómo analiza:** detecta anomalías —logins raros, webs sospechosas, software desactualizado— usando algoritmos, estadística y bases de datos de vulnerabilidades.

| Ventajas | Inconvenientes |
|---|---|
| Información centralizada | Difícil de desplegar |
| Menos falsos positivos y negativos | Coste alto |
| Respuesta mucho más rápida | La automatización puede fallar |

## SIEM = SIM + SEM

Recoge logs, los normaliza, los correlaciona en tiempo real y aplica reglas y estadística para **detectar amenazas** y apoyar la respuesta y la investigación.

### Qué hace, en concreto

- Recoge datos de **toda la infraestructura**: servidores, red, controladores de dominio.
- Los **almacena, normaliza y agrega**.
- Aplica análisis y correlación para detectar actividad sospechosa.
- Lo presenta en un **panel** desde el que los analistas investigan y responden.
- Sirve además para **forense** y para **cumplimiento normativo**.

> [!WARNING]
> Configurarlo es lo complicado, no comprarlo. Hay que decidir qué fuentes de log se ingieren, dimensionar el hardware y el almacenamiento, escribir las reglas y ajustarlas. Un SIEM mal alimentado es un gasto que no detecta nada.

### Para qué se compra

- **Detección avanzada de amenazas**: insiders, exfiltración, APTs. Cosas que un antivirus no ve porque no son un fichero, son un patrón.
- **Investigación forense más rápida**: histórico protegido, búsquedas y correlaciones sobre meses de datos.
- **Cumplimiento**: PCI DSS, HIPAA, SOX, ISO 27001.
- **Auditoría y retención**: guardar y organizar todo para demostrar que la política se cumple.

> [!TIP]
> En muchas organizaciones el SIEM se compra por la última razón —cumplimiento— y se usa por la primera. Eso explica que a veces esté lleno de logs que nadie mira: están ahí porque una norma los exige, no porque detecten algo.
