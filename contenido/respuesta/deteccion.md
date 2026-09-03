---
titulo: Detección y análisis
subtitulo: true
---

# Detección y análisis

La fase donde se decide qué es ruido y qué es un incidente.

## Eventos comunes

Lo que aparece todos los días:

- **Escaneo** de remoto a local
- **DoS / DDoS** de remoto a local
- **Escaneo** de local a local
- **Errores de inicio de sesión**

El escaneo de **local a local** merece más atención de la que suele recibir: significa que algo dentro de tu red está buscando otras máquinas dentro de tu red. Puede ser una herramienta legítima de inventario, o puede ser movimiento lateral.

## Errores de inicio de sesión

Tres explicaciones típicas, y solo una es mala:

1. Se ha **restablecido la contraseña** de forma rutinaria y el usuario ha olvidado la nueva.
2. El usuario simplemente **ha olvidado su contraseña** y la ha metido mal varias veces.
3. Un **actor malicioso** intenta acceder a la cuenta y falla al adivinarla.

> [!TIP]
> Lo que separa el caso 3 de los otros dos casi nunca es el número de fallos: es el **patrón**. Un usuario despistado falla desde su equipo de siempre, en horario laboral, y luego acierta. Un atacante falla desde otra IP, a horas raras, o contra varias cuentas distintas.

## Baselines y perfiles de comportamiento

La **línea base** es el registro de cómo se comporta normalmente una red o un sistema: qué puertos se usan, cuánto tráfico hay, en qué horarios hay actividad y cómo actúan los usuarios.

Sirve como referencia de lo que es **normal** cuando no hay incidentes.

La **detección basada en anomalías** compara el estado actual contra esa línea base. Lo que se desvía se marca como anomalía, lo que indica que **puede** haber un problema —de seguridad o de rendimiento— y que hay que investigarlo.

> [!WARNING]
> Una línea base tomada durante un compromiso convierte la actividad del atacante en "lo normal". Por eso se establecen sobre periodos largos y limpios, y se revisan cuando la organización cambia.

## Detección mejorada

La detección por anomalías se integra con el resto de controles y procedimientos para mejorar la postura de seguridad. Permite identificar **ataques o amenazas desconocidas** rápidamente y avisar al CSIRT para actuar en fases tempranas.

Los registros de anomalías pueden enviarse a un **SIEM centralizado** y combinarse con otras fuentes —tráfico de red, logs de actividad— para dar una visión completa de lo que pasó antes y durante el ataque.

**Puntos clave:**

- Detecta amenazas desconocidas por **desviación del comportamiento normal**, no por firma. Ahí está su valor: una firma solo reconoce lo que ya se ha visto antes.
- Mejora la preparación y la respuesta.
- Herramientas típicas: **Cisco Stealthwatch**, **IBM QRadar**, **Flowmon ADS**.

## Gestión de casos

Los equipos usan herramientas de **case management** para documentar y gestionar las investigaciones.

Son esenciales para dos cosas distintas:

- **Operaciones** — correlación de datos y trabajo colaborativo entre analistas.
- **Cumplimiento** — trazabilidad y auditoría de lo que hizo cada uno.

### Herramientas habituales

| Herramienta | Nota |
|---|---|
| **ServiceNow** | Gestión de servicio general, muy extendida |
| **IBM Resilient** | Orientada a IR |
| **Jira Service Management** | Adaptable, común donde ya se usa Jira |
| **TheHive** | Open source, específica de respuesta a incidentes |

En BTL1 se centran en **TheHive**, así que si cae algo en el examen será sobre esa.
