const mongoose = require("mongoose");

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  title: { type: String },
  status: { type: String },
  price: { type: Number },
  photo: { type: String },
  tags: { type: [String] },
});

// crear el modelo de anuncio
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// (opcional) exportar el modulo
module.exports = Anuncio;
