---
titulo: Inteligencia de amenazas
subtitulo: true
---

# Inteligencia de amenazas

CTI (*Cyber Threat Intelligence*) es información sobre amenazas **procesada, analizada y contextualizada** para poder tomar decisiones. La diferencia con un feed de IOC es la misma que entre una lista de matrículas y un informe policial.

> Dato → Información → **Inteligencia**
> `203.0.113.45` → "es un C2 de AsyncRAT" → "el grupo X está usando AsyncRAT contra el sector sanitario español desde marzo; nuestros clientes de ese sector deben priorizar la detección de LNK en ISO".

## Los tres niveles

| Nivel | Para quién | Horizonte | Ejemplo |
|---|---|---|---|
| **Estratégica** | Dirección, CISO | Meses/años | "El ransomware contra logística ha crecido un 40 %; conviene invertir en segmentación OT" |
| **Operativa** | Responsables de SOC, IR | Semanas/meses | "El grupo X ataca por VPN sin MFA y despliega en 48 h; revisad estos accesos" |
| **Táctica** | Analistas L1/L2 | Días/horas | "IOC de la campaña: estos dominios, estos hashes, esta regla Sigma" |

Se habla también de inteligencia **técnica** para referirse a los indicadores puros. La mayoría de los "feeds de threat intel" que se venden son sólo eso: el nivel más bajo y más perecedero.

## El ciclo de inteligencia

Seis fases, y es circular por diseño:

1. **Dirección** — ¿qué necesitamos saber? Se definen los *requisitos de inteligencia* (PIR). Sin esto, se acaba coleccionando IOC sin propósito.
2. **Recolección** — OSINT, feeds, MISP, informes de proveedores, dark web, telemetría propia.
3. **Procesamiento** — normalizar, deduplicar, traducir, enriquecer.
4. **Análisis** — convertir datos en juicio: ¿esto nos afecta? ¿qué significa? ¿qué confianza tengo?
5. **Difusión** — entregarlo en el formato que necesita cada consumidor (regla para el SIEM, correo para dirección, ticket para IT).
6. **Retroalimentación** — ¿le sirvió a quien lo recibió? Ajustar y volver a empezar.

> [!IMPORTANT]
> La fase que más se salta y más duele saltarse es la **1**. Un programa de CTI sin requisitos definidos produce ruido caro. La pregunta fundacional es: *"¿qué decisiones vamos a tomar con esto?"*.

## Traffic Light Protocol (TLP)

Estándar de FIRST para indicar hasta dónde puede compartirse una información. Versión **TLP 2.0**:

| Etiqueta | Se puede compartir con… |
|---|---|
| **TLP:RED** | Sólo con los destinatarios nombrados. No se reenvía |
| **TLP:AMBER** | La organización del receptor y sus clientes, según necesidad de conocer |
| **TLP:AMBER+STRICT** | Sólo dentro de la organización del receptor |
| **TLP:GREEN** | La comunidad del sector, pero no públicamente |
| **TLP:CLEAR** | Sin restricciones, es público |

> [!CAUTION]
> Reenviar un informe TLP:AMBER a un grupo de WhatsApp o publicarlo en LinkedIn rompe la confianza de la comunidad y puede costar la expulsión del grupo de intercambio. Se mira siempre la etiqueta antes de reenviar.

## Fiabilidad de la fuente: escala del Almirantazgo

Sistema de dos dimensiones que conviene usar al anotar cualquier dato:

- **Fuente** (A–F): A = completamente fiable · C = bastante fiable · F = no se puede juzgar.
- **Información** (1–6): 1 = confirmada por otras fuentes · 3 = posiblemente cierta · 6 = no se puede juzgar.

Un dato "B2" es de fuente normalmente fiable y probablemente cierto. Escribir "**A1**" o "**C3**" junto a una afirmación evita las discusiones de "pero, ¿esto lo sabemos o lo suponemos?".

## Lenguaje de estimación

Relacionado: usar expresiones de probabilidad consistentes en vez de "puede que". La convención habitual (ICD 203):

| Expresión | Probabilidad aproximada |
|---|---|
| Casi con certeza no | 5–20 % |
| Improbable | 20–45 % |
| Aproximadamente igual de probable | 45–55 % |
| Probable / verosímil | 55–80 % |
| Muy probable | 80–95 % |
| Casi con certeza | 95–99 % |

## Formatos e intercambio

### STIX 2.1
Lenguaje estructurado para describir inteligencia: objetos (`indicator`, `malware`, `threat-actor`, `attack-pattern`, `campaign`) y relaciones entre ellos. Es JSON, y es lo que permite que dos plataformas distintas se entiendan.

### TAXII 2.1
El **protocolo de transporte** para intercambiar STIX: colecciones a las que suscribirse y de las que tirar actualizaciones.

> STIX es el idioma; TAXII es el teléfono.

### Otros formatos
- **MISP Core Format** — JSON de eventos y atributos, muy práctico.
- **OpenIOC** — formato XML de Mandiant, más antiguo.
- **Sigma** — reglas de detección genéricas para SIEM.
- **YARA** — reglas de identificación de ficheros y memoria.

## Fuentes recomendadas para empezar

| Tipo | Fuente |
|---|---|
| Feeds abiertos | abuse.ch (URLhaus, ThreatFox, MalwareBazaar), CIRCL, Feodo Tracker |
| Comunidad | AlienVault OTX, MISP comunitarios sectoriales |
| Informes de actores | Mandiant, CrowdStrike, ESET, Kaspersky, Cisco Talos, Microsoft MSTIC |
| Avisos oficiales | INCIBE-CERT, CCN-CERT, CISA Alerts, ENISA |
| Análisis técnico | The DFIR Report, Malware-Traffic-Analysis, Red Canary Threat Detection Report |
| Ransomware | Ransomware.live, ecrime.ch, blogs de filtraciones |

> [!TIP]
> **The DFIR Report** merece mención aparte: publica incidentes reales completos, con timeline, comandos exactos, IOC y reglas Sigma. Leer uno entero al mes enseña más de intrusiones reales que casi cualquier curso.

## Errores típicos de un programa de CTI

- **Coleccionismo de IOC.** Meter 3 millones de indicadores en el SIEM sin criterio: sólo se consigue ruido y coste de licencia.
- **No caducar los indicadores.** Un IOC de hace dos años genera falsos positivos, no detecciones.
- **Confundir atribución con acción.** Saber que "es APT28" es interesante; no cambia lo que hay que parchear esta tarde.
- **Producir informes que nadie lee.** Si nadie toma una decisión con tu informe, no era inteligencia.
- **Ignorar la inteligencia propia.** Tus incidentes pasados son la mejor fuente de amenazas que te afectan de verdad.
