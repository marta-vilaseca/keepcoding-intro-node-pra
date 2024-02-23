# 🛒 Nodepop

> 👤 Marta Vilaseca Foradada  
> 💻 XVI Bootcamp Full Stack Web  
> 📅 3 Marzo 2024

Desarrollar el API que se ejecutará en el servidor de un servicio de venta de artículos de segunda mano llamado **Nodepop** [[requisitos]](#requisitos)

## Documentación App

Para instalar e inicializar la app:

```
npm install
```

_( en proceso )_

## Requisitos

El servicio mantiene anuncios de compra o venta de artículos y permite tanto buscar como poner filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos necesarios para esto.

Los sistemas donde se utilizará la API utilizan **bases de datos MongoDB**

Además del desarrollo de la API, es necesario que el site tenga una página frontend que muestre la lista de anuncios con los filtros que correspondan, según la URL introducida.

#### Datos de cada anuncio:

- **Nombre** del artículo/anuncio
- Si el artículo está en **Venta** o bien el anuncio es porque alguien está buscando ese producto
- **Precio** del artículo (de venta o de cuánto está dispuesto a pagar el anunciante, en caso de estarlo buscando)
- **Foto** del artículo
- **Tags**, conteniendo siempre uno o varios de estos cuatro: `work`, `lifestyle`, `motor` y `mobile`

#### Operaciones que debe realizar el API:

- [ ] Lista de anuncios
  - [ ] Posibilidad de paginación
  - [ ] Filtros por tag
  - [ ] Filtros por tipo de anuncio (venta/búsqueda)
  - [ ] Filtros por rango de precio (especificando precio min y max)
  - [ ] Filtro por nombre de artículo (que empiece por el texto buscado)
- [ ] Lista de los tags existentes
- [ ] Creación de anuncio
