const mongoose = require("mongoose");

const validTags = ["collectibles", "electronics", "fashion", "games", "home", "lifestyle", "mobile", "motor", "outdoors", "work"];
const allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"];

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  venta: { type: Boolean, required: true, index: true },
  precio: { type: Number, required: true, index: true },
  foto: {
    type: String,
    validate: {
      validator: function (value) {
        // comprobar si el formato de archivo de la foto es uno de los permitidos
        return !value || allowedFormats.some((format) => value.endsWith(`.${format}`));
      },
      message: "Formato de imagen no válido. Formatos permitidos: jpg, jpeg, png, gif, webp",
    },
  },
  tags: {
    type: [String],
    required: true,
    index: true,
    validate: {
      validator: function (tags) {
        // comprobar que sólo intenten introducirse los tags permitidos
        return tags.every((tag) => validTags.includes(tag));
      },
      message: "Tag inválido. Tags permitidos: collectibles, electronics, fashion, games, home, lifestyle, mobile, motor, outdoors, work",
    },
  },
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
