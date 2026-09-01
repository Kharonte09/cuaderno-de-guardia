---
titulo: Marcos y normativa
subtitulo: true
---

# Marcos y normativa

Los marcos ordenan **qué hacer** y en qué orden; la normativa dice **qué es obligatorio**. En un SOC aparecen constantemente en informes, auditorías y conversaciones con dirección.

## NIST Cybersecurity Framework 2.0

El marco de referencia mundial para organizar un programa de seguridad. La versión 2.0 (2024) añadió una sexta función, **Govern**, en el centro de las otras cinco.

| Función | Qué cubre | Ejemplo de control |
|---|---|---|
| **GOVERN** | Estrategia, roles, políticas, gestión de riesgo de terceros | Definir quién decide y responde |
| **IDENTIFY** | Inventario de activos, riesgos, dependencias | Saber qué servidores tienes de verdad |
| **PROTECT** | Controles preventivos | MFA, cifrado, formación, parcheo |
| **DETECT** | Monitorización y detección | SIEM, EDR, reglas, SOC |
| **RESPOND** | Gestión del incidente | Playbooks, contención, comunicación |
| **RECOVER** | Volver a la normalidad | Restauración, lecciones aprendidas |

> [!TIP]
> Es el marco que mejor funciona para **explicar a dirección** dónde está la organización: se puntúa cada función de 1 a 5 y sale un gráfico de araña que se entiende sin ser técnico.

## NIST SP 800-61 — Respuesta a incidentes

La guía operativa del ciclo de vida de un incidente. Cuatro fases (que en la práctica se cuentan como seis, ver [Respuesta a incidentes](#/blue-team/respuesta-a-incidentes)):

1. **Preparación**
2. **Detección y análisis**
3. **Contención, erradicación y recuperación**
4. **Actividad post-incidente**

## SANS PICERL

La versión de SANS del mismo ciclo, con las seis fases explícitas — es la que más se usa como acrónimo:

**P**reparation · **I**dentification · **C**ontainment · **E**radication · **R**ecovery · **L**essons learned

## ISO/IEC 27001 y 27002

- **27001**: norma **certificable** que define cómo montar y mantener un SGSI (Sistema de Gestión de Seguridad de la Información). Habla de procesos: análisis de riesgos, declaración de aplicabilidad, mejora continua, auditorías.
- **27002**: el catálogo de controles concretos (93 controles en la versión 2022, agrupados en organizativos, de personas, físicos y tecnológicos).
- **27035**: específicamente gestión de incidentes.
- **27037**: identificación, recogida y preservación de evidencia digital.

> [!NOTE]
> ISO 27001 certifica que **tienes un sistema de gestión**, no que seas seguro. Es un requisito comercial habitual para vender a grandes clientes o a la Administración.

## CIS Critical Security Controls v8

18 controles ordenados por **prioridad real**. Su mayor virtud es que responden a "¿por dónde empiezo?" mejor que ningún otro marco, y están agrupados en tres grupos de implementación (IG1, IG2, IG3) según el tamaño de la organización.

Los seis primeros, que son los que más incidentes evitan:

1. **Inventario de activos** — no puedes proteger lo que no sabes que tienes.
2. **Inventario de software** — y qué está autorizado a ejecutarse.
3. **Protección de datos** — clasificación, cifrado, retención.
4. **Configuración segura** — endurecimiento de equipos y software.
5. **Gestión de cuentas** — altas, bajas, cuentas de servicio.
6. **Gestión de accesos** — mínimo privilegio y MFA.

**IG1** (56 salvaguardas) es lo que CIS llama "higiene cibernética básica": es un objetivo realista y muy defendible para una pyme.

## OWASP

Referencia para seguridad de aplicaciones. Lo que hay que conocer:

- **OWASP Top 10**: los diez riesgos más críticos en aplicaciones web. La edición de 2021 encabeza con *Broken Access Control*, *Cryptographic Failures* e *Injection*.
- **OWASP ASVS**: estándar de verificación con requisitos concretos por nivel.
- **OWASP SAMM**: modelo de madurez de desarrollo seguro.
- **OWASP Top 10 for LLM**: la versión para aplicaciones con modelos de lenguaje (inyección de prompt, fuga de datos, etc.).

## Normativa europea y española

### NIS2

Directiva europea (UE 2022/2555), en aplicación desde octubre de 2024. Amplía enormemente el número de entidades obligadas (energía, transporte, salud, agua, banca, infraestructura digital, administración pública, fabricación, servicios postales, gestión de residuos, alimentación y otros).

Lo que hay que retener:
- Obligaciones de **gestión de riesgos** y de **seguridad en la cadena de suministro**.
- **Notificación en 24 h** (alerta temprana) y **72 h** (notificación completa) al CSIRT correspondiente.
- **Responsabilidad de la dirección**: los órganos de administración responden personalmente y deben formarse.
- Sanciones de hasta 10 M € o el 2 % de la facturación global para entidades esenciales.

### RGPD / LOPDGDD

Protección de datos personales. En un incidente, lo que dispara la alarma:
- **72 horas** para notificar a la AEPD una brecha que suponga riesgo para los derechos de los afectados.
- **Comunicación a los afectados** sin dilación si el riesgo es alto.
- Obligación de **registro de brechas**, incluso de las que no se notifican.

### ENS (Esquema Nacional de Seguridad)

Real Decreto 311/2022. Obligatorio para el sector público español y para los proveedores que le prestan servicios. Categorías **básica, media y alta** según el impacto, con controles concretos y auditoría bienal en las categorías media y alta.

### DORA

Reglamento (UE) 2022/2554 de resiliencia operativa digital, aplicable al sector financiero desde enero de 2025. Muy centrado en el **riesgo de terceros TIC** y en pruebas de resiliencia (incluido *threat-led penetration testing*).

### Otros que aparecen

- **PCI DSS** — obligatorio si se procesan tarjetas de pago.
- **HIPAA** — datos sanitarios en EE. UU.
- **SOC 2** — informe de auditoría de controles muy pedido en el mundo SaaS.
- **ISO 22301** — continuidad de negocio.

## Quién es quién en España

| Organismo | Ámbito |
|---|---|
| **INCIBE-CERT** | Ciudadanos y empresas. Referencia de avisos y respuesta |
| **CCN-CERT** | Sector público. Publica guías CCN-STIC y la herramienta LUCIA |
| **ESPDEF-CERT** | Ámbito de Defensa |
| **AEPD** | Protección de datos; se le notifican las brechas |
| **Policía Nacional / Guardia Civil** | Denuncia penal, delitos informáticos |

> [!IMPORTANT]
> En un incidente serio, la parte de **notificación** tiene plazos legales que corren desde que se conoce el hecho, no desde que se resuelve. Conviene tener escrito de antemano quién notifica, a quién y con qué plantilla. Ese trámite es exactamente lo que nadie recuerda a las 4 de la mañana.
