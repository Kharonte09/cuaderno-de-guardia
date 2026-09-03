---
titulo: Inteligencia operacional
subtitulo: true
---

# Inteligencia operacional

La que estudia **cómo trabaja el adversario**: sus fases, sus técnicas y qué rastros deja en cada una. Dos modelos la estructuran, y los dos aparecen constantemente en informes y en entrevistas.

## Cyber Kill Chain

Modelo de Lockheed Martin que descompone un ataque en **siete fases secuenciales**. La idea de fondo: el atacante tiene que completarlas todas, así que **al defensor le basta con romper una**.

```text
1. Recon ──► 2. Weaponization ──► 3. Delivery ──► 4. Exploitation
                                                        │
   7. Actions on Objectives ◄── 6. Command & Control ◄── 5. Installation
```

| # | Fase | Qué hace el atacante | Dónde lo ves tú |
|---|---|---|---|
| 1 | **Reconnaissance** | Recoge información del objetivo: empleados, dominios, tecnología | Casi nunca. Escaneos, OSINT sobre tu empresa |
| 2 | **Weaponization** | Prepara el artefacto: documento con macro, exploit + payload | Nada: ocurre en su infraestructura |
| 3 | **Delivery** | Lo hace llegar: correo, USB, web comprometida | Pasarela de correo, proxy, logs web |
| 4 | **Exploitation** | Se ejecuta el código y aprovecha la vulnerabilidad | EDR, logs de aplicación, procesos hijo raros |
| 5 | **Installation** | Instala persistencia para sobrevivir a un reinicio | Servicios nuevos, tareas programadas, claves de registro |
| 6 | **Command & Control** | Abre el canal con su servidor para dar órdenes | Tráfico saliente, DNS, beaconing |
| 7 | **Actions on Objectives** | Lo que venía a hacer: robar, cifrar, moverse lateralmente | Accesos masivos, exfiltración, cifrado |

> [!TIP]
> Las fases 1 y 2 ocurren fuera de tu red, así que ahí no tienes visibilidad. Tu primera oportunidad real de detección es la 3, y cuanto más a la izquierda cortes, menos daño hay que limpiar después.

### Su límite

El modelo asume un ataque lineal que entra desde fuera. Se ajusta mal a un insider, a un compromiso de credenciales sin malware, o a un ataque de cadena de suministro donde el atacante ya entra por la puerta. Sirve para estructurar, no como plantilla universal.

## Pirámide del Dolor

Modelo de David Bianco. Ordena los indicadores según **cuánto le duele al atacante** que se los quemes.

```text
        ▲  TTPs                      ← Duro
        │  Herramientas
        │  Artefactos de red/host
        │  Nombres de dominio
        │  Direcciones IP
        │  Hashes                     ← Trivial
```

| Nivel | Indicador | Qué le cuesta cambiarlo |
|---|---|---|
| 6 | **TTPs** | Muy duro. Cambiar cómo opera es rehacer su método |
| 5 | **Herramientas** | Difícil. Desarrollar o comprar otra, y aprenderla |
| 4 | **Artefactos de red y host** | Molesto. Recompilar, reconfigurar |
| 3 | **Nombres de dominio** | Fácil. Registrar otro cuesta euros y minutos |
| 2 | **Direcciones IP** | Trivial. Levantar otro servidor |
| 1 | **Hashes** | Trivial. Un byte distinto y el hash es otro |

La conclusión práctica: **bloquear hashes e IPs es barato para ti pero también para él**. Detectar por TTP —"un documento de Office lanza PowerShell que descarga un fichero"— es mucho más caro de construir, pero le obliga a cambiar su forma de trabajar, y eso no lo hace en una tarde.

> [!IMPORTANT]
> Las dos ideas se combinan bien. La Kill Chain te dice **en qué momento** puedes detectar; la Pirámide, **con qué tipo de indicador** merece la pena hacerlo. Una detección por TTP en la fase 4 vale por cien listas de IPs.

---

> [!NOTE]
> En tus apuntes originales esta lección eran solo dos diagramas del curso. Aquí están reconstruidos con texto y tablas: el contenido conceptual es público —la Kill Chain es de Lockheed Martin y la Pirámide del Dolor de David Bianco— pero las tablas de "dónde lo ves tú" y "qué le cuesta cambiarlo" son interpretación, no literal del temario. Revísalas antes de darlas por buenas.
