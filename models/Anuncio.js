const mongoose = require("mongoose");

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true, index: true },
  venta: { type: Boolean, required: true, index: true },
  price: { type: Number, required: true, index: true },
  photo: { type: String, unique: true, required: true },
  tags: { type: [String], required: true, index: true },
});

// crear el modelo de anuncio
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// (opcional) exportar el modulo
module.exports = Anuncio;
