---
titulo: Modelo del Diamante
subtitulo: true
---

# Modelo del Diamante

Publicado en 2013 por Caltagirone, Pendergast y Betz. Sostiene que todo evento de intrusión puede describirse con **cuatro vértices** y las relaciones entre ellos:

<figure class="diagrama">
<svg viewBox="0 0 660 330" role="img" aria-label="Modelo del Diamante: adversario arriba, víctima abajo, infraestructura a la izquierda y capacidad a la derecha, unidos entre sí. El eje vertical es socio-político y el horizontal, técnico.">
  <!-- Aristas del rombo -->
  <path d="M330 66 L150 165 M330 66 L510 165 M150 165 L330 264 M510 165 L330 264" class="linea"/>
  <!-- Ejes -->
  <line x1="330" y1="66" x2="330" y2="264" class="linea" stroke-dasharray="5 5"/>
  <line x1="150" y1="165" x2="510" y2="165" class="linea" stroke-dasharray="5 5"/>
  <rect x="240" y="26"  width="180" height="52" rx="8" class="caja" style="fill:color-mix(in srgb, var(--accent) 16%, var(--bg-inset))"/>
  <text x="330" y="57" text-anchor="middle">Adversario</text>
  <rect x="40"  y="139" width="200" height="52" rx="8" class="caja"/>
  <text x="140" y="170" text-anchor="middle">Infraestructura</text>
  <rect x="420" y="139" width="200" height="52" rx="8" class="caja"/>
  <text x="520" y="170" text-anchor="middle">Capacidad</text>
  <rect x="240" y="252" width="180" height="52" rx="8" class="caja" style="fill:color-mix(in srgb, var(--accent) 16%, var(--bg-inset))"/>
  <text x="330" y="283" text-anchor="middle">Víctima</text>
  <text class="eje" x="342" y="114">Socio-político · motivación</text>
  <text class="eje" x="248" y="156">Técnico · el cómo</text>
</svg>
<figcaption>Un adversario usa una capacidad sobre una infraestructura contra una víctima.</figcaption>
</figure>

Un evento es: *un **adversario** usa una **capacidad** sobre una **infraestructura** contra una **víctima***.

## Los cuatro vértices

### Adversario

Quién está detrás. Se distingue entre:
- **Operador**: quien teclea (el afiliado de ransomware).
- **Cliente / patrocinador**: quien se beneficia (el grupo que alquila el RaaS, o un Estado).

Es el vértice más difícil de rellenar y del que menos hay que fiarse: la atribución es cara, lenta y en un SOC rara vez cambia lo que hay que hacer.

### Capacidad

Las herramientas y técnicas: el malware, el exploit, el script, la técnica de ingeniería social. Su *capability capacity* es el rango completo de lo que el adversario sabe hacer.

Se conecta directamente con las técnicas de [MITRE ATT&CK](#/fundamentos/mitre-attack).

### Infraestructura

Lo que usa para operar:
- **Tipo 1**: controlada por el adversario (su VPS, su dominio registrado).
- **Tipo 2**: intermediaria y de terceros (webs comprometidas, servicios legítimos abusados como Discord o Google Drive, redes de bots).

### Víctima

A quién ataca. Dos planos: la **persona/organización** (el objetivo real, por sector o interés) y los **activos técnicos** (el equipo, la cuenta, el servidor concretos).

## Los ejes

El modelo define dos ejes que estructuran la investigación:

- **Eje socio-político** (adversario ↔ víctima): la **motivación**. Espionaje, lucro, hacktivismo, sabotaje. Explica *por qué* te atacan a ti y predice si volverán.
- **Eje técnico** (capacidad ↔ infraestructura): el **cómo**. Es donde vive el trabajo diario del analista.

## Metaentradas

Cada evento se anota además con: marca de tiempo, fase de la [Kill Chain](#/fundamentos/cyber-kill-chain), resultado, dirección, metodología y **confianza** en el dato. Esa última es clave: obliga a separar lo que sabes de lo que supones.

## Pivotar entre vértices

Su valor práctico es el **pivote analítico**. Conoces un vértice y desde ahí descubres los demás:

| Sabes… | Puedes descubrir… | Con qué |
|---|---|---|
| Una IP (infraestructura) | Otros dominios que resuelven a ella | DNS pasivo, ViewDNS, SecurityTrails |
| Un dominio | Su certificado, y otros hosts que lo usan | crt.sh, Censys |
| Un hash (capacidad) | Otras muestras de la misma familia | VirusTotal Relations, Intezer, YARA |
| Una muestra | Los C2 que contacta | Sandbox, extracción de configuración |
| Un C2 | Otras víctimas que le hablan | Tus propios logs de red |
| Un adversario | Su repertorio completo de TTP | ATT&CK Groups, informes públicos |

**Ejemplo completo:**

1. Alerta: un equipo contacta con `203.0.113.45`. *(Infraestructura + Víctima)*
2. DNS pasivo: esa IP aloja `update-svc-cdn[.]com` y otros 8 dominios. *(Más infraestructura)*
3. VirusTotal: tres muestras contactan con esos dominios. *(Capacidad)*
4. Las muestras son AsyncRAT con el mismo mutex y certificado. *(Capacidad concreta)*
5. Se busca ese mutex en la flota → aparecen **4 equipos más infectados**. *(Más víctimas)*
6. Informes públicos asocian esa infraestructura a una campaña contra el sector sanitario. *(Adversario y motivación)*

Cada paso ha usado un vértice para llegar a otro. Eso es el modelo funcionando.

## Hilos de actividad y grupos

Varios eventos relacionados en el tiempo forman un **activity thread** (el recorrido de una intrusión). Varios hilos que comparten vértices forman un **activity group**, que es como se construyen los perfiles de actores tipo "APT29".

## Cómo se relaciona con los otros modelos

| Modelo | Responde a | Fuerte en |
|---|---|---|
| **Kill Chain** | ¿En qué fase estamos? | Secuencia y comunicación |
| **ATT&CK** | ¿Qué técnica exacta usó? | Detección e ingeniería de reglas |
| **Diamante** | ¿Cómo se relaciona todo esto? | Investigación, pivote y atribución |

No compiten: se usan juntos. En un informe de incidente maduro aparecen los tres — la Kill Chain para la narrativa, ATT&CK para las técnicas y el Diamante para la relación entre indicadores.

> [!TIP]
> En el trabajo diario, la forma más honesta de usar el Diamante es como **plantilla de nota de investigación**: cuatro apartados en blanco (adversario, capacidad, infraestructura, víctima) que se van rellenando. Obliga a preguntarte qué vértice te falta, que es justo lo que suele desbloquear el caso.
