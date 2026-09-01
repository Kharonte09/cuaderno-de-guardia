---
titulo: Por dónde empezar
subtitulo: true
---

# Por dónde empezar

Si has llegado hasta aquí porque quieres empezar en ciberseguridad y no sabes muy bien por dónde tirar, esta parte es para ti.

No necesitas aprenderlo todo antes de empezar. De hecho, probablemente te vas a encontrar muchas veces con algo que no sabes. Es normal.

La idea es que tengas una **ruta orientativa** para saber qué aprender, practicar y consultar según vayas avanzando.

> [!NOTE]
> Ten en cuenta una cosa: esto es mi cuaderno de notas, no un temario cerrado. Y como yo me dedico a la parte defensiva, casi todo lo que vas a encontrar aquí tira hacia el **Blue Team**: SOC, detección, análisis de alertas, respuesta a incidentes y forense.
>
> La ruta de aquí abajo te vale para cualquier camino que elijas, pero a partir del punto 2 los ejemplos y las herramientas son sobre todo de ese lado.

---

## 1. Antes de meterte en ciberseguridad

Primero necesitas una base de informática.

No hace falta que seas administrador de sistemas, pero sí que entiendas qué está pasando cuando un equipo se conecta a una red, levanta un servicio o genera un log.

Una buena forma de practicar es montar un pequeño laboratorio:

- Una máquina virtual con **Windows**.
- Una máquina virtual con **Ubuntu**.
- Que ambas máquinas puedan comunicarse.
- **DNS**
- **DHCP**
- Un servidor web: **IIS** o **Apache**.
- **SMB** para compartir carpetas.
- **SSH**
- Un servidor de correo, si te apetece complicarlo un poco más.
- Un firewall.

La idea no es montar una infraestructura perfecta. Es **romper cosas, configurarlas de nuevo y mirar qué ocurre**.

Para redes puedes utilizar:

- **Cisco Packet Tracer**
- **GNS3**

Con ellos puedes montar routers, switches, VLANs y diferentes topologías sin necesidad de comprar hardware.

---

## 2. Ahora sí: empieza con seguridad

Una vez tengas una base de IT, empieza a entender cómo funcionan los ataques y cómo se detectan.

En esta Wiki tienes algunos conceptos que te recomiendo conocer:

1. [Conceptos básicos](#/fundamentos/conceptos-basicos)
2. [Cyber Kill Chain](#/fundamentos/cyber-kill-chain)
3. [MITRE ATT&CK](#/fundamentos/mitre-attack)
4. [Pirámide del Dolor](#/fundamentos/piramide-del-dolor)
5. [Modelo del Diamante](#/fundamentos/modelo-diamante)
6. [Qué es un SOC](#/blue-team/que-es-un-soc)

No hace falta que memorices cada modelo ni que seas capaz de recitarlos.

Lo importante es que empieces a entender **cómo piensa un atacante, qué evidencias deja y cómo puede detectarlo un equipo defensivo**.

---

## 3. Deja la teoría y empieza a tocar cosas

Aquí es donde empieza lo interesante.

Hay muchas plataformas donde puedes practicar sin tener que montar todo desde cero:

| Plataforma | Coste |
|---|---|
| **TryHackMe — SOC Level 1** | Freemium |
| **LetsDefend** | Freemium |
| **Blue Team Labs Online** | Freemium |
| **CyberDefenders** | Freemium |
| **Malware-Traffic-Analysis.net** | Gratis |

No necesitas hacerlas todas.

Puedes empezar por **TryHackMe SOC Level 1** y después ir probando otras plataformas.

Una progresión bastante lógica sería:

**Phishing → Logs de Windows → Tráfico de red → Análisis de memoria → Forense**

Ahí empezarás a encontrarte con herramientas, logs y conceptos que seguramente al principio no conozcas.

Es normal.

Cuando eso ocurra, vuelve a la Wiki, busca la herramienta o concepto que necesites y continúa.

---

## 4. No intentes aprender todas las herramientas

Este es probablemente uno de los errores más comunes cuando empiezas.

No necesitas saber utilizar 50 herramientas.

Aprende **qué problema resuelve cada una** y profundiza en ellas cuando realmente las necesites.

Por ejemplo:

> "Tengo que analizar una alerta de Windows."

Buscas qué logs necesitas, qué herramienta puedes utilizar y cómo analizarlos.

> "Tengo una IP sospechosa."

Buscas cómo obtener información sobre ella, qué IOCs puedes sacar y cómo comprobar si aparece en otros sistemas.

La sección de [Herramientas](#/herramientas/threat-intelligence) está pensada precisamente para eso.

**No está hecha para que te la estudies de principio a fin.**

---

## 5. ¿Y después qué?

Cuando empieces a tener una base, probablemente descubras que alguna parte de la ciberseguridad te interesa más que otra.

Puedes tirar hacia:

**🔴 Red Team**
Pentesting, explotación, adversary emulation, etc.

**🔵 Blue Team**
SOC, detección, respuesta a incidentes, threat hunting, DFIR, etc.

**🟣 Purple Team**
Trabajar entre ofensiva y defensiva para mejorar las detecciones y la respuesta.

**⚪ White Team**
Coordinación y gobierno de ejercicios de seguridad.

**🟢 GRC**
Gobierno, riesgos, cumplimiento, auditorías, políticas y controles.

No tienes que decidirlo ahora.

Empieza por aprender las bases, prueba diferentes cosas y deja que sea la práctica la que te diga qué camino te interesa más.

---

### Una última cosa

**No te obsesiones con avanzar rápido.**

En ciberseguridad vas a encontrarte constantemente con conceptos que no conoces. Incluso después de años.

La diferencia está en saber **buscar, entender y aplicar lo que necesitas en cada momento**.

Esta Wiki pretende servir precisamente para eso.
