const express = require("express");

const router = express.Router();

const Anuncio = require("../../models/Anuncio");

// GET /api/tags
// Devuelve una lista de todas las etiquetas utilizadas
router.get("/", async (req, res, next) => {
  try {
    const distinctTags = await Anuncio.distinct("tags");

    // comprobar si la request es para la API o para el frontend
    if (req.originalUrl.startsWith("/api")) {
      // si es la API mandar JSON
      res.json({ tags: distinctTags });
    } else {
      // si no renderizar los datos en la vista
      res.render("tags", { distinctTags });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
