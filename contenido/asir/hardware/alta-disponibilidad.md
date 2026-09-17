---
titulo: Alta disponibilidad
subtitulo: true
---

# Alta disponibilidad

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Que un servicio siga en pie cuando algo falla. Se consigue duplicando lo que se puede romper: discos, fuentes, corriente y máquinas enteras.

## Virtualización de servidores

Virtualizar es ejecutar **varios servidores lógicos sobre un mismo hardware físico**, cada uno con su sistema operativo y aislado de los demás.

Ventajas aplicadas a servidores:

| Ventaja | Por qué |
|---|---|
| **Mayor disponibilidad** | Una máquina virtual se mueve a otro anfitrión sin reinstalar nada |
| **Reducción de costes** | Un servidor potente sustituye a cinco a medio uso, con su electricidad y su espacio |
| **Mejor aprovechamiento** | Los recursos se reparten según lo que cada servicio necesita en cada momento |
| **Distribución más eficiente** | Se crean, clonan y eliminan servidores en minutos |
| **Más independencia** | El sistema virtual no depende del hardware concreto de debajo |
| **Mejor seguridad** | Cada servicio aislado: si uno se compromete, no arrastra a los demás |

### El respaldo de un servidor virtualizado

El objetivo es el de siempre —garantizar la seguridad del sistema ante fallos, ataques o caídas, preservando los datos— pero virtualizar lo hace mucho más fácil: la máquina virtual **es un fichero**, así que copiarla completa es copiar un fichero.

Eso permite:

- **Instantáneas** (*snapshots*) antes de un cambio delicado, para volver atrás en segundos.
- **Copias de la máquina entera**, no solo de sus datos.
- **Restaurar en otro anfitrión** distinto del original.

> [!WARNING]
> Una instantánea **no es una copia de seguridad**: vive en el mismo almacenamiento que la máquina virtual, así que si el almacenamiento falla se pierden las dos. Sirve para deshacer un cambio, no para sobrevivir a una avería. Y dejar instantáneas olvidadas durante semanas degrada el rendimiento y llena el disco.

## El CPD

Un **CPD** (Centro de Proceso de Datos) es el recinto —una sala grande o un edificio entero— donde se ubican los recursos **físicos, lógicos y humanos** necesarios para almacenar, gestionar, explotar y procesar los datos de una o varias organizaciones.

### Criticidad

Es el punto único del que depende todo lo demás: si el CPD cae, la organización se para. De ahí que todo en él se diseñe **por duplicado** y que se mida su disponibilidad en porcentajes con muchos nueves.

| Disponibilidad | Parada máxima al año |
|---|---|
| 99 % | ~3,7 días |
| 99,9 % | ~8,8 horas |
| 99,99 % | ~53 minutos |
| 99,999 % | ~5 minutos |

Cada nueve adicional multiplica el coste, así que el objetivo se elige según lo que cueste el minuto de parada.

### Qué se tiene en cuenta al diseñarlo

- **Ubicación**: sin riesgo de inundación, lejos de instalaciones peligrosas y con buenos accesos.
- **Suministro eléctrico**: dos acometidas independientes, SAI y grupo electrógeno.
- **Climatización** redundante: los equipos generan calor y se apagan si sube la temperatura.
- **Conectividad** con varios operadores.
- **Detección y extinción** de incendios sin agua sobre los equipos.
- **Suelo técnico** para pasar cableado y aire por debajo.
- **Crecimiento**: espacio y potencia previstos para dentro de unos años.

### Las áreas

| Área | Qué contiene |
|---|---|
| **Sala de servidores** | Los armarios con la electrónica |
| **Sala de comunicaciones** | La entrada de los operadores y los equipos de red |
| **Sala eléctrica** | SAI, cuadros y grupo electrógeno |
| **Área de operación** | Desde donde se supervisa |
| **Zona de recepción y almacén** | Material que entra y sale |

### Seguridad física y lógica

| Física | Lógica |
|---|---|
| Control de acceso por tarjeta o biometría | Autenticación y permisos |
| Videovigilancia y registro de entradas | Cortafuegos y segmentación de red |
| Armarios con cerradura | Cifrado de los datos |
| Detección de incendio, humo y agua | Registro y auditoría de accesos |
| Climatización y control de temperatura | Copias de seguridad y su verificación |

> [!IMPORTANT]
> Las dos son igual de necesarias y la física se olvida más: da lo mismo el mejor cortafuegos del mundo si cualquiera puede entrar en la sala y llevarse un disco. **Quien tiene acceso físico a una máquina, la tiene.**

## Fuentes de alimentación redundantes

Son **dos fuentes** en el mismo equipo: si una falla, la otra mantiene el servicio, y así se garantiza la continuidad.

Están preparadas además para **sustituirse en caliente** (*hot swap*): se pueden desconectar y conectar **mientras el equipo sigue funcionando**, así que cambiar una fuente averiada no implica parar el servidor.

## SAI

Un **SAI** (sistema de alimentación ininterrumpida), o **UPS**, proporciona alimentación eléctrica durante un tiempo acotado cuando hay un corte de suministro. Además **protege** los equipos conectados frente a sobretensiones.

Sus parámetros:

| Parámetro | Qué es |
|---|---|
| **Potencia** | En VA o W: cuánto puede alimentar |
| **Autonomía** | Cuánto tiempo aguanta. Depende de las baterías **y de la carga** |
| **Tipo** | *Offline*, *línea interactiva* o *online* de doble conversión, de menos a más protección |
| **Tiempo de transferencia** | Lo que tarda en pasar a baterías |
| **Baterías** | Su capacidad y su vida útil, de unos años |

> [!NOTE]
> El SAI no está para que el servidor siga trabajando toda la noche: está para **aguantar los cortes breves** y, si el corte se alarga, dar tiempo a un **apagado ordenado** antes de que se agoten las baterías. Por eso se conecta al servidor por USB o red: para avisarle de que se está quedando sin corriente y que él mismo se apague bien.
>
> Y las baterías se degradan: un SAI con baterías de siete años puede tener treinta segundos de autonomía sin que nadie lo sepa, hasta el día del corte.

## RAID

**RAID** (*Redundant Array of Independent Disks*) es una configuración basada en varios discos independientes entre sí que se comportan **como si fueran un único dispositivo**. Permite reducir el tiempo de acceso a la información y, a la vez, usar redundancia para reducir las posibilidades de pérdida de datos.

### Formas de implementarlo

| Implementación | Cómo funciona |
|---|---|
| **RAID por hardware** | Requiere una **controladora específica**, integrada en la placa base o externa. Es ella la que administra los discos |
| **RAID por software** | Los discos se conectan a una controladora normal (IDE, SATA, SCSI o SAS) y **el sistema operativo** gestiona el conjunto |

El de hardware rinde más y no carga al procesador, y tiene un inconveniente que se olvida: si muere la controladora, a veces hace falta **una idéntica** para leer los discos. El de software no depende de un modelo concreto y funciona con cualquier controladora.

### Los niveles

| Nivel | Discos mínimos | Qué hace | Tolera fallo de |
|---|---|---|---|
| **RAID 0** | 2 | Reparte los datos entre los discos (*striping*). Rápido, **sin redundancia** | Ninguno |
| **RAID 1** | 2 | Copia idéntica en los dos (*mirroring*) | 1 disco |
| **RAID 5** | 3 | Reparto con **paridad** distribuida | 1 disco |
| **RAID 6** | 4 | Como el 5 con doble paridad | 2 discos |
| **RAID 10** | 4 | Espejo y reparto combinados | 1 por espejo |

| Nivel | Capacidad aprovechada |
|---|---|
| RAID 0 | 100 % |
| RAID 1 | 50 % |
| RAID 5 | Todos menos uno |
| RAID 6 | Todos menos dos |
| RAID 10 | 50 % |

> [!WARNING]
> **RAID 0 no es RAID de verdad**: al repartir sin copia, si falla un disco se pierde **todo** el conjunto. Duplica el riesgo en lugar de reducirlo, y solo tiene sentido para datos temporales que se puedan perder.
>
> Y lo más importante: **RAID no es una copia de seguridad.** Protege de que un disco se estropee, no de un borrado por error, un cifrado por ransomware, un incendio o un fallo de la controladora, que escribe mal en todos los discos a la vez. Un sistema con RAID necesita copias exactamente igual que uno sin él.
