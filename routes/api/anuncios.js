var express = require("express");
var router = express.Router();
const { query, param, body, validationResult } = require("express-validator");
const Anuncio = require("../../models/Anuncio");
const validation = require("../../lib/validation");

// GET /api/anuncios
// Devuelve una lista de anuncios con opción de filtros, paginación y ordenación
router.get("/", validation.queryValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();
    // parámetros para los filtros
    const filterByTag = req.query.tags;
    const filterByType = req.query.tipo;
    const precio = req.query.precio;
    const namePattern = req.query.nombre;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // ordenación
    const sort = req.query.sort;

    const filter = {};

    // filtro por tag
    if (filterByTag) {
      filter.tags = filterByTag;
    }

    // filtro por tipo (venta/búsqueda)
    if (filterByType === "venta") {
      filter.tipo = true;
    } else if (filterByType === "busqueda") {
      filter.tipo = false;
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

    const anuncios = await Anuncio.listar(filter, skip, limit, sort);

    // comprobar si la request es para la API o para el frontend
    if (req.originalUrl.startsWith("/api")) {
      // si es la API mandar JSON
      res.json({ results: anuncios });
    } else {
      // si no renderizar los datos en la vista
      res.render("index", { anuncios });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/anuncios/<_id>
// Devuelve un anuncio concreto en base a su id
router.get("/:id", validation.paramValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();
    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);

    // comprobar si la request es para la API o para el frontend
    if (req.originalUrl.startsWith("/api")) {
      // si es la API mandar JSON
      res.json({ results: anuncio });
    } else {
      // si no renderizar los datos en la vista
      res.render("anuncio", { anuncio });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/anuncios (body)
// Crea un anuncio
router.post("/", validation.bodyValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();
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

// PATCH /api/nuncios/<_id> (body)
// Actualiza un anuncio en base a su id
router.patch("/:id", validation.paramValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();
    const id = req.params.id;
    const data = req.body;

    const anuncioActualizado = await Anuncio.findByIdAndUpdate(id, data, { new: true });

    if (req.originalUrl.startsWith("/api")) {
      // si es la API mandar JSON
      res.json({ result: anuncioActualizado });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/anuncios/<_id>
// Elimina un anuncio en base a su id
router.delete(
  "/:id",
  [
    param("id")
      .trim()
      .isMongoId()
      .withMessage("El ID proporcionado no tiene un formato válido")
      .custom(async (value) => {
        const anuncio = await Anuncio.findById(value);
        if (!anuncio) {
          throw new Error("El ID proporcionado no existe");
        }
        return true;
      }),
  ],
  async (req, res, next) => {
    try {
      validationResult(req).throw();
      const id = req.params.id;

      await Anuncio.deleteOne({ _id: id });

      if (req.originalUrl.startsWith("/api")) {
        // si es la API mandar JSON
        res.json({ message: "Document successfully deleted." });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
