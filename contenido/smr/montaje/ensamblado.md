---
titulo: Ensamblar un PC
subtitulo: true
---

# Ensamblar un PC

El montaje completo, en el orden que menos problemas da: primero lo que se hace con la placa fuera de la caja, luego el chasis.

## Herramientas

| Necesitas | Para qué |
|---|---|
| **Destornillador** de estrella | Prácticamente el único que hace falta, con los tornillos de la caja |
| **Pasta térmica** | Entre procesador y disipador |
| **Papel y alcohol isopropílico** | Limpiar la pasta vieja si el disipador ya se usó |
| **Bridas** | Ordenar los cables al final |
| **Pulsera antiestática** | Evitar cargarte un componente con la electricidad de tu cuerpo |

### Seguridad

Aparte de las normas generales de prevención de riesgos, dos cosas concretas:

- **Pulsera antiestática** conectada a una parte metálica sin pintar del chasis. Sin ella, descargar la electricidad estática tocando el metal de la caja antes de manipular nada.
- **No coger los componentes por los pines ni por los contactos.** Las placas y los módulos se sujetan por los bordes.

> [!WARNING]
> El equipo se monta **desenchufado de la corriente**. Una fuente conectada mantiene tensión en la placa incluso con el ordenador apagado.

## 1. Placa base, procesador y memoria

Se hace con la placa fuera de la caja, sobre una superficie firme y no metálica; la propia caja de la placa sirve.

1. **Procesador.** Se abre la palanca del zócalo y se coloca la CPU haciendo coincidir las **muescas** y el triángulo de una esquina. Cae por su propio peso: si hay que forzar, está mal orientado. Se cierra la palanca.
2. **Memoria RAM.** Se bajan las **dos pestañas** de la ranura, se alinea la muesca del módulo con la de la ranura y se hace presión en los dos extremos hasta que las pestañas suben solas y encajan con un clic.
3. **Pasta térmica.** Un punto del tamaño de un guisante en el centro del procesador. La presión del disipador la reparte; no hace falta extenderla.
4. **Disipador.** Los de Intel de anclaje por pines se colocan sobre los cuatro agujeros, se empuja cada pin hacia abajo y se **gira** para fijarlo. En diagonal y no todos seguidos, para que la presión sea uniforme. Luego se conecta su ventilador al conector **CPU_FAN** de la placa.

> [!TIP]
> Si la placa tiene cuatro ranuras de memoria y vas a poner dos módulos, el manual dice en cuáles ponerlos (normalmente la 2 y la 4) para que trabajen en **dual channel**. Ponerlos en las dos primeras es el error más común, y deja la memoria en canal simple.

## 2. Elementos en el chasis

- **Fuente de alimentación.** Va en su hueco, con los agujeros coincidiendo con los de la caja, y cuatro tornillos. Con el ventilador orientado según el diseño de la caja, normalmente hacia abajo o hacia fuera.
- **Unidad óptica.** En la bahía de 5,25", dos tornillos por cada lado.
- **Disco duro.** Igual, en su hueco de 3,5". Los dos se conectan luego con **SATA** de datos a la placa y **SATA** de alimentación a la fuente. En equipos antiguos, IDE para datos y Molex para alimentación. Los conectores SATA tienen **forma de L**, así que solo entran en una posición.

## 3. Placa base y conexionado

1. **Colocar la placa** sobre los separadores del chasis (los tornillos dorados), comprobando que hay uno debajo de cada agujero de la placa y **ninguno donde no toca**: un separador suelto bajo la placa la cortocircuita.
2. **Atornillar** sin apretar del todo hasta tener todos los tornillos puestos.
3. **Alimentación:** el **ATX de 24 pines** a la placa y el **ATX 12 V** de 4+4 u 8 pines al conector del procesador. Los dos hacen clic.
4. **Panel frontal:** los cables del botón de encendido, reset, leds y USB a sus pines. Es la parte más fácil de equivocarse, y el esquema está en el manual.
5. **Tarjeta gráfica**, si la hay, en la ranura PCIe x16 de arriba, con su alimentación PCIe si la pide.
6. **Ventiladores** de la caja a sus conectores, y **bridas** para peinar los cables lejos del flujo de aire.

<figure class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/B4AEOIU4x2U"
          title="Como MONTAR un PC desde cero (TUTORIAL COMPLETO)"
          loading="lazy" allowfullscreen
          referrerpolicy="strict-origin-when-cross-origin"></iframe>
  <figcaption>
    Vídeo de <a href="https://www.youtube.com/@ConsejosAndroid">ConsejosAndroid</a>:
    <a href="https://www.youtube.com/watch?v=B4AEOIU4x2U">Como MONTAR un PC desde cero (TUTORIAL COMPLETO)</a>.
  </figcaption>
</figure>

## 4. Comprobación

Se enchufa y se enciende. Si arranca, **entrar en la BIOS** antes de instalar nada y comprobar:

- Que reconoce **toda la memoria RAM** instalada, y a qué frecuencia.
- Que aparecen **todos los dispositivos de almacenamiento**.
- Las **temperaturas** del procesador en reposo.
- Que los **ventiladores** giran, el del disipador incluido.

Con eso en orden, ya se puede instalar el sistema operativo.

### Si no arranca

| Síntoma | Por dónde empezar |
|---|---|
| No enciende nada | Interruptor de la fuente, cable del panel frontal en los pines correctos, ATX de 24 pines |
| Enciende y no da imagen | Monitor conectado a la salida correcta (gráfica dedicada, no a la placa), RAM bien asentada |
| Pitidos o leds de error | El manual de la placa tiene la tabla de códigos |
| Se apaga a los segundos | Disipador mal fijado o sin pasta térmica |
| No ve un disco | Cable SATA de datos y de alimentación, y si el puerto está activo en la BIOS |
