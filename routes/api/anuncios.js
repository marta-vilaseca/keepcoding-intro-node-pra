const express = require("express");
const { validationResult } = require("express-validator");
const Anuncio = require("../../models/Anuncio");
const validation = require("../../lib/validation");
const { buildFilter, buildOptions } = require("../../lib/queryHelpers");

const router = express.Router();

// GET /api/anuncios
// Devuelve una lista de anuncios con opción de filtros, paginación y ordenación
router.get("/", validation.queryValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();

    const filter = buildFilter(req);
    const options = buildOptions(req);

    const anuncios = await Anuncio.listar(filter, options);

    res.json({ results: anuncios });
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

    res.json({ results: anuncio });
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

    res.json({ result: anuncioActualizado });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/anuncios/<_id>
// Elimina un anuncio en base a su id
router.delete("/:id", validation.paramValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();
    const id = req.params.id;

    await Anuncio.deleteOne({ _id: id });

    res.json({ message: "Document successfully deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
