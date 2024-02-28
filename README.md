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

### Ejemplos URL Api

Para obtener el **listado de anuncios completo**:

```
/api/anuncios
```

Para obtener listado de anuncios **de un tag determinado**:

```
/api/anuncios?tags=mobile
```

Para obtener listado de anuncios **sólo de artículos en venta** o **sólo de artículos en búsqueda**:

```
/api/anuncios?tipo=venta
/api/anuncios?tipo=busqueda
```

Para obtener **listado de anuncios filtrado por (rango de) precio**:

- Productos cuyo precio sea 100 o más `/api/anuncios?precio=100-`
- Productos cuyo precio sea menor a 500 `/api/anuncios?precio=-500`
- Productos cuyo precio esté entre 10 y 200 `/api/anuncios?precio=10-200`
- Productos cuyo precio sea _exactamente_ 150 `/api/anuncios?precio=150`

Para obtener **un listado de anuncios filtrados por título**, de manera que el nombre o título del anuncio empiece por la `cadena` de caracteres especificada:

```
/api/anuncios?nombre=cadena
```

Para aplicar paginación

```
/api/anuncios?skip=2&limit=2
```

Para ordenar los resultados

```
/api/anuncios?sort=-precio%20nombre
```

Para elegir qué campos seleccionamos con nuestra consulta

```
/api/anuncios?fields=nombre%20precio%20-_id
```

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

- [x] Lista de anuncios
  - [x] Posibilidad de paginación
  - [x] Filtros por tag
  - [x] Filtros por tipo de anuncio (venta/búsqueda)
  - [x] Filtros por rango de precio (especificando precio min y max)
  - [x] Filtro por nombre de artículo (que empiece por el texto buscado)
- [x] Lista de los tags existentes
- [x] Creación de anuncio
