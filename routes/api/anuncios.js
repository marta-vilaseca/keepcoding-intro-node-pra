var express = require("express");
var router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET /api/anuncios
// Devuelve una lista de anuncios con opción de filtros, paginación, ordenación y selección de campos
router.get("/", async function (req, res, next) {
  try {
    // parámetros para los filtros
    const filterByTag = req.query.tags;
    const filterByType = req.query.venta;
    const precio = req.query.precio;
    const namePattern = req.query.nombre;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // ordenación
    const sort = req.query.sort;

    // selección de qué campos mostrar
    const fields = req.query.fields;

    const filter = {};

    // filtro por tag
    if (filterByTag) {
      filter.tags = filterByTag;
    }

    // filtro por tipo (venta/búsqueda)
    if (filterByType === "venta") {
      filter.venta = true;
    } else if (filterByType === "busqueda") {
      filter.venta = false;
    }

    // filtro por (rango de) precio
    if (precio) {
      const precioRange = precio.split("-");

      if (precioRange.length === 2) {
        const [min, max] = precioRange;
        if (min) filter.precio = { ...filter.precio, $gte: parseFloat(min) };
        if (max) filter.precio = { ...filter.precio, $lte: parseFloat(max) };
      } else if (precioRange.length === 1) {
        filter.precio = parseFloat(precio);
      }
    }

    // filtro por nombre (resultados que empiecen por el patrón especificado)
    if (namePattern) {
      filter.nombre = new RegExp("^" + namePattern, "i");
    }

    const anuncios = await Anuncio.listar(filter, skip, limit, sort, fields);

    res.render("index", { anuncios });

    // res.json({ results: anuncios });
  } catch (error) {
    next(error);
  }
});

// GET /api/anuncios/<_id>
// Devuelve un anuncio concreto
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);

    res.json({ result: anuncio });
  } catch (error) {
    next(error);
  }
});

// POST /api/anuncios (body)
// Crea un anuncio
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;

    // creamos una instancia del anuncio  en memoria
    const anuncio = new Anuncio(data);

    // y lo persistimos en la BD
    const anuncioGuardado = await anuncio.save();

    res.json({ result: anuncioGuardado });
  } catch (error) {
    next(error);
  }
});

// PUT /api/agentes/<_id> (body)
// Actualiza un agente
router.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Anuncio.findByIdAndUpdate(id, data, { new: true });

    res.json({ result: anuncioActualizado });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/anuncios/<_id>
// Elimina un anuncio
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    await Anuncio.deleteOne({ _id: id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
