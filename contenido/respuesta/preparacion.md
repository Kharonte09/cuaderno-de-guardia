---
titulo: Preparación
subtitulo: true
---

# Preparación

La fase que se trabaja **antes** de que pase nada, y la única que se hace sin prisa. Todo lo que no esté resuelto aquí habrá que improvisarlo con el incidente encima.

## El plan de respuesta (IRP)

Un **IRP** define cómo responder a un incidente de forma clara y ordenada.

### Las seis fases

1. Preparación
2. Identificación
3. Contención
4. Erradicación
5. Recuperación
6. Lecciones aprendidas

### 1. Preparación

> La fase más importante, y ocurre antes del incidente.

- Definir planes para distintos tipos: **malware, phishing, intrusión, fuga de datos**.
- **Simulacros** y ejercicios de mesa (*tabletop*).
- Roles y responsabilidades claras.
- Recursos listos: herramientas, equipos forenses, **accesos**.
- Formación continua del personal.

### 2. Identificación

Detectar y confirmar que hay un incidente. Hay que recoger:

- Cuándo ocurrió
- Quién lo detectó
- Cómo se detectó
- Sistemas afectados
- Impacto en el negocio
- Alcance

**Priorización:**

| Criterio | Determina |
|---|---|
| **Criticidad** | La urgencia de la respuesta |
| **Impacto** | La duración del daño |

> Un ransomware en un servidor crítico = criticidad alta + impacto alto.

### 3. Contención

Evitar que se propague: aislar sistemas comprometidos, bloquear accesos, desconectar de red.

> [!WARNING]
> Sin destruir evidencias. **La memoria RAM es volátil**: apagar un sistema borra pruebas que no se recuperan. Se aísla, pero no se apaga si va a haber forense.

Se preservan las evidencias digitales y se usan las copias de seguridad para mantener el negocio funcionando mientras tanto.

### 4. Erradicación

Eliminar la causa raíz. Se analiza qué pasó realmente usando logs, SIEM, capturas de tráfico y **MITRE ATT&CK** para reconstruir el ataque.

Acciones: eliminar malware, quitar persistencias, revertir cambios maliciosos, parchear, reforzar defensas (HIPS, NIPS).

### 5. Recuperación

Restaurar sistemas limpios, verificar que no queda infección, reintroducirlos en producción y **monitorizarlos de cerca** durante un tiempo.

### 6. Lecciones aprendidas

Reunión post-incidente: qué funcionó, qué falló, qué mejorar. De ahí salen actualizaciones del IRP, cambios de procedimiento, peticiones de recursos y mejoras de formación.

## El equipo (IRT)

Los **equipos de respuesta a incidentes** gestionan los incidentes cuando ocurren. Están formados por especialistas **técnicos y no técnicos** que trabajan coordinados para reducir impacto, costes y tiempo de respuesta.

**Por qué hacen falta:**

- Respuesta rápida y coordinada
- Reducción del impacto en el negocio
- Continuidad operativa
- Minimizar daños y costes
- **Centralizar la toma de decisiones**

El último punto es el importante. En un incidente el problema rara vez es que nadie sepa qué hacer: es que hay cinco personas decidiendo cosas distintas a la vez.

## Inventario de activos

> "No se puede proteger lo que no se ve."

Un **inventario de activos** es una lista centralizada y actualizada de todos los activos de TI. También se le llama **CMDB** (*Configuration Management Database*).

**Qué incluye:**

- Ordenadores de sobremesa y portátiles
- Servidores
- Impresoras
- Dispositivos IoT: televisores, alarmas, máquinas expendedoras
- Dispositivos de red: firewalls, switches, routers, balanceadores
- Móviles y tablets

Es especialmente crítico cuando hay **varios incidentes a la vez**: sin inventario no puedes decidir cuál atender primero porque no sabes qué vale más.

## Evaluación de riesgos

Permite identificar qué sistemas son más valiosos, cuáles necesitan más protección y qué incidentes tienen prioridad.

Se apoya en el **Business Impact Plan (BIP)** y el **Business Continuity Plan (BCP)**.

**Factores de riesgo habituales:**

- Sistema expuesto a Internet
- Falta de parches
- Sistema crítico para el negocio
- Datos sensibles almacenados

### Tratamiento del riesgo

Cuatro opciones, y solo cuatro:

| Opción | Qué significa |
|---|---|
| **Transferir** | Pasárselo a otro, típicamente un seguro o un proveedor |
| **Aceptar** | Asumirlo conscientemente, porque mitigarlo cuesta más que el daño |
| **Mitigar** | Reducirlo con controles |
| **Evitar** | Dejar de hacer la actividad que lo genera |

> [!NOTE]
> "Aceptar" es una decisión legítima y documentada, no una forma elegante de no hacer nada. La diferencia es que un riesgo aceptado tiene dueño, fecha de revisión y firma de alguien con autoridad para asumirlo.

## DMZ

Una **DMZ** es una subred que separa la LAN interna de Internet, dando una capa de protección adicional a la red privada.

**Objetivo:** proteger los sistemas internos sensibles, aislar lo que está expuesto a Internet y controlar el acceso externo.

**Qué vive en la DMZ:** servidores web, proxies, servidores de correo, DNS, FTP, VoIP. Cualquier servicio que deba ser accesible desde Internet.

### Arquitecturas

**1. Firewall único (modelo de tres patas)**

Un solo firewall con al menos **3 interfaces**: externa (Internet), interna (LAN) y DMZ. Control básico del tráfico entre las tres zonas.

**2. Doble firewall** — más seguro

- **Firewall frontal**: controla Internet → DMZ.
- **Firewall de fondo**: controla DMZ → LAN.

Mejor protección si son **de fabricantes distintos**, porque una vulnerabilidad en uno no compromete el otro. Más caro, recomendado para redes grandes.

**Beneficios:** control de acceso, dificultar el reconocimiento de la red interna, y protección frente a suplantación de IP.
