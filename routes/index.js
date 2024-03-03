const express = require("express");
const { validationResult } = require("express-validator");
const Anuncio = require("../models/Anuncio");
const validation = require("../lib/validation");
const { buildFilter, buildOptions } = require("../lib/queryHelpers");

const router = express.Router();

// GET /api/anuncios
// Devuelve una lista de anuncios con opción de filtros, paginación y ordenación
router.get("/", validation.queryValidators, async (req, res, next) => {
  try {
    validationResult(req).throw();

    const filter = buildFilter(req);
    const options = buildOptions(req);
    console.log("Options:", options);

    const anuncios = await Anuncio.listar(filter, options);

    res.render("index", { anuncios });
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

    res.render("anuncio", { anuncio });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
