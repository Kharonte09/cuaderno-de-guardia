---
titulo: Qué es la inteligencia de amenazas
subtitulo: true
---

# Qué es la inteligencia de amenazas

Conjunto de **información útil sobre amenazas actuales o potenciales**, usada para mejorar las defensas, reducir riesgos y detectar actividad maliciosa.

Se apoya en **indicadores de compromiso (IOC)** —IPs, dominios, direcciones de correo, hashes de fichero— y sirve para entender **quién ataca, por qué y cómo**.

> [!NOTE]
> La diferencia entre *datos* e *inteligencia* es que la inteligencia ya está analizada y contextualizada para alguien concreto. Una lista de 10.000 IPs maliciosas son datos. "Estas tres IPs pertenecen al grupo que ataca a tu sector y una ya aparece en tus logs" es inteligencia.

## El ciclo de vida

No es un proceso lineal: acaba realimentándose y vuelve a empezar.

1. **Planificación** — definir objetivos, alcance y qué amenazas investigar.
2. **Colección** — reunir datos de múltiples fuentes: OSINT, dark web, MISP.
3. **Procesamiento** — limpiar, traducir y estructurar los datos para poder analizarlos.
4. **Análisis** — convertir los datos en inteligencia procesable, y adaptarla al público que la va a recibir: técnico o directivo.
5. **Difusión** — entregar el resultado a quien corresponda: SOC, equipo de inteligencia, dirección.
6. **Retroalimentación** — recoger comentarios para mejorar el proceso y reajustar prioridades.

El paso 6 es el que más se salta y el que más cuesta después: sin él acabas produciendo informes que nadie usa.

## Las disciplinas "INT"

De dónde sale la información, en el sentido clásico del término.

| Disciplina | Qué recoge |
|---|---|
| **SIGINT** | Señales y comunicaciones interceptadas |
| ↳ **COMINT** | Mensajes y voz entre personas |
| ↳ **ELINT** | Señales no comunicativas: radares, misiles |
| **OSINT** | Información pública: redes, dominios, correos, registros |
| **HUMINT** | Información obtenida de personas: entrevistas, espionaje, diplomacia |
| **GEOINT** | Información geoespacial: imágenes de satélite, ubicaciones |

De todas ellas, **OSINT es la que vas a usar tú**. Y sirve igual para defender que para atacar: la misma búsqueda que hace un analista para saber qué expone su empresa, la hace un atacante para preparar un spear phishing.

## Los tres niveles de threat intel

Es la clasificación que más se usa en el día a día, y la que decide a quién le sirve cada cosa.

| Nivel | Público | Qué contiene | Caduca |
|---|---|---|---|
| **Estratégica** | Dirección, CISO | Tendencias, riesgo geopolítico, ataques al sector | Lento (meses o años) |
| **Operativa** | Analistas, threat hunters | Actores, motivaciones y TTPs | Medio (meses) |
| **Táctica** | SOC, herramientas | IOCs para detectar y bloquear | Rápido (días u horas) |

- **Estratégica** — nivel alto y no técnica. Ayuda a decidir sobre presupuesto, políticas y riesgo.
- **Operativa** — estudia a los **actores**, sus motivos y sus TTPs. Responde a *quién ataca y cómo*.
- **Táctica** — técnica e inmediata. Son los IOCs que entran en el SIEM y en el EDR.

> [!TIP]
> Fíjate en la columna de caducidad, porque explica muchas frustraciones. Una IP maliciosa deja de serlo en días; el hecho de que un grupo use spear phishing contra tu sector sigue siendo cierto dentro de dos años. Cuanto más táctico es el indicador, antes se pudre.
