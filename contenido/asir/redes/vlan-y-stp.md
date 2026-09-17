---
titulo: VLAN y STP
subtitulo: true
---

# VLAN y STP

Dos protocolos de nivel 2 que resuelven dos problemas distintos: separar redes sin cambiar el cableado, y evitar que los bucles tumben la red.

## Qué es una VLAN

Una **VLAN** (red de área local virtual) permite que los equipos pertenezcan a **redes lógicas** en lugar de depender de la red física a la que están cableados.

Cada VLAN se gestiona de forma independiente, como si fuera una red aparte: **es un dominio de difusión propio**. Dos equipos en VLAN distintas, aunque estén enchufados al mismo switch y en puertos contiguos, no se ven entre sí sin pasar por un router.

Lo que aporta:

- **Segmentar** sin tocar un cable ni comprar más switches.
- **Agrupar por función** y no por ubicación: dos equipos en plantas distintas pueden estar en la misma VLAN, y dos equipos en la misma sala, en VLAN diferentes.
- **Aislar** tráfico sensible: la red de administración, la de invitados y la de producción separadas entre sí.
- **Reducir el tráfico de difusión**, porque queda contenido en cada VLAN.

## Puertos de acceso y troncales

| Tipo de puerto | Para qué |
|---|---|
| **Acceso** (*access*) | Se conecta un equipo final. Pertenece a **una** VLAN |
| **Troncal** (*trunk*) | Une dos switches, o un switch con un router. Transporta **varias** VLAN a la vez |

Para que el tráfico de varias VLAN quepa en un solo cable, el troncal **etiqueta** cada trama con el número de su VLAN. El estándar que hace eso es **802.1Q**, y la etiqueta se quita al salir por un puerto de acceso, así que el equipo final nunca la ve.

## Configurar VLAN en un switch

Sobre la sintaxis habitual de un switch gestionable:

```
Switch> enable
Switch# configure terminal
Switch(config)# hostname SW-PLANTA-BAJA

Switch(config)# vlan 10
Switch(config-vlan)# name COMPRAS
Switch(config-vlan)# exit
Switch(config)# vlan 20
Switch(config-vlan)# name VENTAS
Switch(config-vlan)# exit
```

Se asigna cada puerto a su VLAN:

```
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit

Switch(config)# interface fa0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 20
Switch(config-if)# exit
```

Y se prepara el puerto que va al router como troncal, indicando qué VLAN pueden pasar:

```
Switch(config)# interface fa0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# exit
```

> [!TIP]
> `switchport trunk allowed vlan` es una medida de seguridad, no solo de orden: lo que no está en la lista no pasa por ese enlace. Dejar el troncal permitiendo todas las VLAN es el equivalente a no haberlas separado.

## Enrutamiento entre VLAN

Como cada VLAN es un dominio de difusión distinto, para que se hablen entre sí hace falta un router. El montaje clásico se llama **router-on-a-stick**: un solo cable físico al router, dividido en **subinterfaces**, una por VLAN.

```
Router> enable
Router# configure terminal
Router(config)# hostname R-INTERNET

Router(config)# interface fa0/0.1
Router(config-subif)# encapsulation dot1q 10
Router(config-subif)# ip address 192.168.1.1 255.255.255.0
Router(config-subif)# exit

Router(config)# interface fa0/0.2
Router(config-subif)# encapsulation dot1q 20
Router(config-subif)# ip address 192.168.2.1 255.255.255.0
Router(config-subif)# exit

Router(config)# interface fa0/1
Router(config-if)# ip address 80.0.0.1 255.0.0.0
Router(config-if)# exit
```

Lo que hay que entender de ahí:

- `encapsulation dot1q 10` le dice a la subinterfaz **qué VLAN atiende**: es lo que la une a la VLAN 10 del switch.
- La IP de cada subinterfaz es la **puerta de enlace** de los equipos de esa VLAN. Los de la VLAN 10 apuntarán a `192.168.1.1`.
- Cada VLAN lleva su **propia red IP**. Una VLAN sin su red aparte no separa nada.
- La otra interfaz, `fa0/1`, es la salida hacia el exterior.

| VLAN | Nombre | Red | Puerta de enlace |
|---|---|---|---|
| 10 | COMPRAS | 192.168.1.0/24 | 192.168.1.1 |
| 20 | VENTAS | 192.168.2.0/24 | 192.168.2.1 |

> [!IMPORTANT]
> El fallo más habitual al montar esto: el puerto del switch que va al router **se queda en modo acceso**. Entonces solo pasa una VLAN, y la otra se queda sin salida. Si tras configurarlo todo una VLAN funciona y la otra no, es lo primero que hay que mirar.

## STP: el problema de los bucles

En una topología con varios caminos posibles, una trama puede llegar a su destino por rutas distintas. Eso es bueno frente a averías —si se corta un cable, hay otro camino— y es un problema por sí solo: crea **bucles**.

### Tormenta de difusión

Cuando llega al switch una trama con destino de difusión, la duplica y la envía por todos sus puertos. Si la topología tiene bucles, esa copia vuelve, se vuelve a duplicar, y otra vez. El tráfico crece sin parar, se come el ancho de banda y la red deja de funcionar. Y en el nivel de enlace **no hay TTL** que lo detenga, como sí hay en IP.

### La solución

El **STP** (*Spanning Tree Protocol*), de nivel 2, está diseñado exactamente para eso: calcula las rutas de forma que no queden bucles y **bloquea artificialmente** los enlaces que los formarían, dejando activo un solo camino entre cada par de puntos.

Es **dinámico**: si la topología cambia, o si el enlace activo se cae, recalcula y **desbloquea** uno de los enlaces que tenía en reserva. De ahí que se pueda tener cableado redundante: está ahí, apagado, esperando a que haga falta.

> [!NOTE]
> Los enlaces bloqueados por STP existen y están conectados, pero no pasan tráfico. Ver un puerto físicamente conectado y sin actividad no significa que esté roto: puede estar haciendo su trabajo, que es esperar.
