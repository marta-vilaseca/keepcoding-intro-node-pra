var express = require("express");
var router = express.Router();

const Anuncio = require("../../models/Anuncio");

// GET /api/tags
// Devuelve una lista de todas las etiquetas utilizadas
router.get("/", async function (req, res, next) {
  try {
    const distinctTags = await Anuncio.distinct("tags");

    res.json({ tags: distinctTags });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
