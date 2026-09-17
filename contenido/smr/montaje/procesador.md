---
titulo: El procesador
subtitulo: true
---

# El procesador

Lo que se mira de una CPU al comprarla o al comparar dos, y de dónde sale cada número de la ficha técnica.

## Qué dice la ficha

| Característica | Qué significa |
|---|---|
| **Núcleos** | Unidades de proceso físicas. Más núcleos, más tareas de verdad en paralelo. |
| **Hilos** | Tareas simultáneas que gestiona. Con SMT (Hyper-Threading en Intel) son el doble que los núcleos. |
| **Frecuencia base** | Los ciclos por segundo garantizados, en GHz. |
| **Frecuencia turbo** | A la que sube puntualmente si la temperatura y el consumo lo permiten. |
| **Caché** | Memoria interna, muy rápida. La L3 es la grande y la que sale en la ficha. |
| **TDP** | Los vatios de calor que hay que disipar. Marca qué refrigeración hace falta. |
| **Socket** | El zócalo que necesita. Tiene que coincidir con el de la placa base. |

Un ejemplo leído del todo: **8 núcleos / 16 hilos, 3,6 GHz de base hasta 5 GHz, 16 MB de caché L3, 95 W de TDP, socket LGA 1151**. Con eso ya se sabe qué placa admite ese procesador y qué disipador hay que ponerle.

## Frecuencia, bus y multiplicador

La frecuencia del procesador no es un número independiente: sale de multiplicar la del bus por el multiplicador.

```
frecuencia del procesador = frecuencia del bus × multiplicador
```

Así que despejando se saca cualquiera de los tres. Un procesador antiguo a **450 MHz con multiplicador 4,5** funcionaba con un bus de:

```
450 MHz ÷ 4,5 = 100 MHz
```

Este cálculo aparece siempre en los exámenes y es la base de lo siguiente.

## Overclocking

Es subir la frecuencia por encima de la de fábrica, tocando el multiplicador (o el bus) desde la BIOS, o con las utilidades que trae el fabricante.

**A favor:** el equipo rinde algo más sin gastar en componentes nuevos, y sube la puntuación en los *benchmarks*.

**En contra**, y es lo que hay que tener presente:

- **Más calor y más consumo**, así que suele obligar a comprar mejor refrigeración: parte del ahorro se va ahí.
- **Menos estabilidad**: cuelgues y reinicios si se pasa de vueltas o falta tensión.
- **Menos vida útil** del componente, y a menudo **pérdida de garantía**.

> [!WARNING]
> El overclocking se hace subiendo de poco en poco y comprobando temperaturas y estabilidad en cada paso. Subir de golpe la frecuencia o la tensión es la forma rápida de tirar un procesador.

## No todos se pueden overclockear

De fábrica, el multiplicador viene **bloqueado** en la mayoría de modelos: no se puede tocar.

- En **Intel**, los que lo traen libre llevan una **K** en el nombre (y el chipset de la placa tiene que permitirlo, las series Z).
- En **AMD**, la mayoría de los Ryzen vienen **desbloqueados**, y la placa lo admite con casi cualquier chipset B o X.

En los dos casos "desbloqueado" significa lo mismo: que el multiplicador es modificable y por tanto el overclocking es posible.

## APU

Una **APU** de AMD es un procesador que integra en el mismo encapsulado la CPU y una gráfica de rendimiento decente, pensada para funcionar **sin tarjeta gráfica dedicada**.

La diferencia con la gráfica integrada de toda la vida es la ambición: una APU aspira a mover juegos y trabajo con gráficos en condiciones modestas, no solo a pintar el escritorio. Es la opción natural en un equipo de oficina, un HTPC o un montaje de bajo coste, porque ahorra el componente más caro.

## Cómo comparar dos procesadores

Comparar solo los GHz es el error clásico: dos procesadores a la misma frecuencia pueden rendir muy distinto. Lo que de verdad decide:

1. **La generación.** Entre dos modelos de precio parecido, el más reciente casi siempre gana: mismo dinero, arquitectura más eficiente. Un año de diferencia se nota.
2. **Núcleos e hilos**, según el uso. Para editar vídeo o compilar, cuantos más mejor. Para tareas de un solo hilo, importa más la frecuencia y el rendimiento por ciclo.
3. **La caché**, que amortigua los accesos a la RAM.
4. **El TDP**, porque un procesador que consume el doble necesita disipación y fuente acordes.
5. **El conjunto**: el socket y el chipset condicionan la placa, y ahí se va parte del presupuesto.

> [!TIP]
> Entre dos modelos de la misma marca y gama separados por varias generaciones, el caro y antiguo suele perder contra el barato y nuevo en todo salvo en núcleos. Para decidir, las tablas de *benchmarks* independientes valen más que la ficha del fabricante.
