# fl-tienda

Código público de la tienda online de **FL Indumentaria** ([flindumentaria.ar](https://flindumentaria.ar)), hecha en Tiendanube.

La tienda lo carga desde [jsDelivr](https://www.jsdelivr.com/) con una línea chica en *Diseño › Pie de página › «Código Javascript o HTML del sello»*, siempre apuntando a un commit fijo (así un cambio acá no llega a la tienda hasta que se cambia esa línea).

| Archivo | Qué hace |
|---|---|
| `b4/que-talle-soy.js` | «¿Qué talle soy?» en la ficha de cada prenda: altura + peso → talle recomendado, con la guía de medidas que sale de la descripción de la prenda. |
| `b1/categorias-y-numeros.js` | Barra de categorías arriba en la compu y los números que suben en el inicio. |
| `b3/opiniones-ficha.js` | Opiniones de clientes adentro de cada prenda, para deslizar. |
| `b4/que-talle-soy.prueba.js` | La misma, pero solo se ve con `?flprueba` en la dirección (para probar cambios). |

Está acá porque el cuadro del pie de Tiendanube tiene un tope de unos 64 KB y ya está casi lleno.
No hay datos privados en este repositorio: es solo código que igual viaja a cada visitante de la tienda.
