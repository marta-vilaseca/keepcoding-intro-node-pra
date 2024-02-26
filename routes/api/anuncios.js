var express = require("express");
var router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET /api/anuncios
// Devuelve una lista de anuncios
router.get("/", async function (req, res, next) {
  try {
    const anuncios = await Anuncio.find();
    res.json({ results: anuncios });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
