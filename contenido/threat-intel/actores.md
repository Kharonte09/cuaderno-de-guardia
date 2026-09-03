---
titulo: Actores y APTs
subtitulo: true
---

# Actores y APTs

## Amenaza, vulnerabilidad y riesgo

Tres palabras que se usan como sinónimos y no lo son:

| Concepto | Qué es |
|---|---|
| **Vulnerabilidad** | La debilidad que existe en el sistema |
| **Amenaza** | Lo que puede aprovechar esa debilidad |
| **Riesgo** | La probabilidad de que pase, por el impacto si pasa |

Ejemplo de amenaza intencional:

- **Vulnerabilidad:** la aplicación no valida la entrada del usuario.
- **Amenaza:** un ataque de inyección SQL que aprovecha ese fallo.
- **Resultado:** robo de datos, usuarios y contraseñas.

Sin vulnerabilidad no hay riesgo, por mucha amenaza que haya. Y al revés: una vulnerabilidad que nadie puede alcanzar tiene riesgo bajo aunque el CVE sea un 9.8.

## Tipos de actor

- **Ciberdelincuentes** — buscan dinero: ransomware, phishing, fraude. Van desde equipos muy capaces hasta *script kiddies* que compran el kit hecho.
- **Estados-nación (APT)** — patrocinados por gobiernos. Muy sofisticados, con recursos y con paciencia.
- **Hacktivistas** — motivación social o política. Usan DDoS y *defacement* para difundir su mensaje.
- **Amenaza interna** — empleados que filtran datos, sea **intencionadamente** (venganza, soborno) o **por accidente** (error, o porque cayeron en un phishing).

### Ejemplos reales

**APT29 / Cozy Bear** — grupo ruso patrocinado por el estado. Desarrolla malware propio y hace operaciones encubiertas. Responsable del ataque de phishing al Pentágono en 2015. Activo desde alrededor de 2010.

**Anonymous** — hacktivistas con motivación social y política. En 2012 lanzaron la Operación Megaupload, con ataques DDoS contra webs del gobierno de Estados Unidos.

## Motivaciones

Cuando se analiza *por qué* alguien ataca, casi todo entra en cuatro cajones:

- **Financiera**
- **Política**
- **Social**
- **Desconocida**

La última no es un cajón de sastre inútil: reconocer que no sabes la motivación es mejor que forzar una atribución que luego condiciona toda la investigación.

## Cómo se nombran los grupos

Cada fabricante tiene su propia convención, y por eso el mismo grupo aparece con tres nombres distintos según quién escriba el informe.

### CrowdStrike: animal + origen

Clasifican por **animal según el país o la intención**.

**Estados-nación:**

| Animal | País |
|---|---|
| **Bear** | Rusia — *Fancy Bear* |
| **Panda** | China — *Goblin Panda* |
| **Kitten** | Irán — *Refined Kitten* |
| **Chollima** | Corea del Norte — *Stardust Chollima* |
| **Tiger** | India — *Viceroy Tiger* |
| **Buffalo** | Vietnam |
| **Crane** | Corea del Sur |
| **Leopard** | Pakistán |

**No estatales:**

| Animal | Tipo |
|---|---|
| **Jackal** | Hacktivistas |
| **Spider** | Ciberdelincuentes — *Mummy Spider / Emotet* |

### Mandiant / FireEye: APT + número

Formato **APT** seguido de un número, agrupados por país:

| País | Grupos |
|---|---|
| China | APT1, 2, 3, 10, 19, 20, 30, 40, 41 |
| Irán | APT33, 34, 35, 39 |
| Corea del Norte | APT37, 38 |
| Rusia | APT28, 29 |
| Vietnam | APT32 |

Además usan dos prefijos más:

- **FIN** — ciberdelincuentes con motivación financiera: FIN4, FIN5, FIN6, FIN7, FIN8, FIN10.
- **UNC** — *uncategorized*, grupos aún sin atribuir o con el análisis en curso.

> [!TIP]
> Cuando leas un informe, comprueba si el grupo tiene alias en otras convenciones antes de concluir que son actores distintos. APT29, Cozy Bear, The Dukes y Nobelium han sido el mismo grupo en distintos informes.

## Qué hace que un grupo sea APT

**APT** significa *Advanced Persistent Threat*: un grupo muy capacitado y con recursos, a menudo estatal, que busca **acceso prolongado** para espionaje o daño. Usan malware propio, 0-days y técnicas sofisticadas.

Lo que los distingue de un ciberdelincuente cualquiera:

- **Financiación y recursos** muy por encima de lo normal.
- **Objetivos específicos**: políticos, militares o financieros. No van a por quien caiga.
- **Herramientas y metodologías avanzadas**, muchas veces desarrolladas a medida.
- **Persistencia**: el objetivo no es entrar y salir, es quedarse dentro sin que se note.

### Tres ejemplos

- **APT28 (Fancy Bear)** — ruso, ciberespionaje político, campañas electorales.
- **Cobalt Group** — motivación financiera, dirigido a bancos y TPV. Spear phishing y cargas como Cobalt Strike.
- **APT32** — vinculado a Vietnam, objetivos en el sudeste asiático, compromisos de sitios web.

> [!IMPORTANT]
> La "P" de persistente es la que más te afecta como defensor. Frente a un delincuente común, si bloqueas el vector se va a otro sitio. Frente a un APT, si bloqueas el vector vuelve por otro, porque el objetivo eres tú específicamente.
