const mongoose = require("mongoose");

const validTags = ["collectibles", "electronics", "fashion", "games", "home", "lifestyle", "mobile", "motor", "outdoors", "work"];

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  venta: { type: Boolean, required: true, index: true },
  precio: { type: Number, required: true, index: true },
  foto: { type: String },
  tags: { type: [String], required: true, index: true },
});

// comprobamos que si no se ha proporcionado foto o el formato de la misma es erróneo, utilizamos una imagen por defecto
anuncioSchema.pre("save", function (next) {
  if (!this.foto || typeof this.foto !== "string") {
    this.foto = "no-photo.png";
  }
  next();
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
