const mongoose = require("mongoose");

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, unique: true, required: true, index: true },
  venta: { type: Boolean, required: true, index: true },
  precio: { type: Number, required: true, index: true },
  foto: { type: String, default: "no-photo.png" },
  tags: { type: [String], required: true, index: true },
});

// método listar
anuncioSchema.statics.listar = function (filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro);

  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);

  return query.exec();
};

// crear el modelo de anuncio
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// exportar el modulo
module.exports = Anuncio;
