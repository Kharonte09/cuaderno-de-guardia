---
titulo: Búsqueda avanzada
subtitulo: true
---

# Búsqueda avanzada

> [!REVISION]
> Apuntes pasados a limpio que todavía no he releído enteros. Puede haber erratas
> o cosas explicadas a medias.

Los operadores del buscador. Se aprenden en diez minutos y cambian por completo la velocidad a la que se encuentra cualquier cosa.

## Los operadores

| Operador | Qué hace | Ejemplo |
|---|---|---|
| `"..."` | Busca la **frase exacta**, sin variaciones ni sinónimos | `"error 0x80070005"` |
| `-palabra` | **Excluye** los resultados que la contengan | `aquarius limón -signo` |
| `OR` | Resultados con **cualquiera** de los términos | `limón OR naranja` |
| `site:` | Solo dentro de un **sitio o dominio** | `informatica site:ejemplo.es` |
| `filetype:` | Solo un **tipo de fichero** | `MySQL filetype:pdf` |
| `inurl:` | Una palabra en la **URL** | `inurl:login` |
| `allinurl:` | **Todas** las palabras en la URL | `allinurl: admin panel` |
| `intitle:` | Una palabra en el **título** de la página | `intitle:manual` |
| `400..600` | Un **rango numérico** | `iPhone 400..600` |
| `*` | Comodín para una palabra cualquiera | `cómo * un latiguillo` |
| `related:` | Sitios **parecidos** a uno dado | `related:ejemplo.es` |
| `cache:` | La copia **guardada** por el buscador | `cache:ejemplo.es` |

Se combinan entre sí, y es ahí donde ganan:

```
"windows server" dhcp filetype:pdf site:microsoft.com
```

Eso son manuales en PDF, del propio fabricante, sobre esa función concreta. Sin operadores, la misma búsqueda devuelve foros y vídeos.

## Ejemplos que resuelven problemas reales

| Necesito | Búsqueda |
|---|---|
| El manual de una placa base concreta | `"P5KPL-AM" manual filetype:pdf` |
| Un error tal cual lo escupe el sistema | `"no se puede iniciar el servicio" 1053` |
| Documentación oficial y no blogs copiados | `dhcp scope site:learn.microsoft.com` |
| Precios en un rango | `ssd nvme 1tb 50..90` |
| Algo excluyendo el ruido comercial | `montar pc guía -comprar -oferta` |
| Saber si un sitio tiene un panel expuesto | `site:ejemplo.es inurl:login` |

> [!TIP]
> El operador que más se acaba usando en soporte técnico es el de la **frase exacta** con el mensaje de error literal, entre comillas. Pegar el error tal cual, sin quitarle los códigos, lleva directo a quien ya lo ha sufrido.

## Por qué esto también es seguridad

Los mismos operadores sirven para encontrar lo que un sitio **no debería estar publicando**: paneles de acceso, listados de directorios, copias de seguridad olvidadas, documentos internos indexados por error.

Esa técnica tiene nombre, **Google dorking**, y es una de las primeras cosas que se hacen al recopilar información sobre un objetivo, tanto por parte de quien ataca como de quien defiende.

> [!WARNING]
> Buscar es legal; **entrar no lo es**. Encontrar un panel de acceso o un fichero expuesto con un operador de búsqueda no autoriza a usarlo. Si aparece algo así en un sitio que no es tuyo, lo que corresponde es avisar a quien lo gestione.

Aplicado a la defensa, es un ejercicio periódico muy útil: buscar `site:tudominio.es` con `filetype:` y con `inurl:` para ver qué ha indexado el buscador de tu propio sitio. Casi siempre aparece algo que nadie pensó que estuviera público.

## Más allá del buscador

- **Google Trends** — muestra con qué frecuencia se busca un término, por región y a lo largo del tiempo. Sirve para ver el interés real por un tema antes de escribir sobre él, y para detectar cuándo un suceso dispara las búsquedas de una palabra.
- **Buscadores alternativos** — DuckDuckGo o Bing indexan de forma distinta y admiten operadores parecidos. Cambiar de buscador es la forma más rápida de comprobar si un resultado que no aparece es cosa de la web o del buscador.
- **Herramientas de archivo** — el archivo de internet permite ver **cómo era** una página hace años, que es la única forma de recuperar algo que ya se borró.
