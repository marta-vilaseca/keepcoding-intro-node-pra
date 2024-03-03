/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
const mongoose = require("mongoose");

const { validTags, allowedFormats } = require("../lib/variables");

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  nombre: { type: String, required: true, index: true },
  tipo: { type: Boolean, required: true, index: true },
  precio: { type: Number, required: true, index: true },
  foto: {
    type: String,
    validate: {
      validator(value) {
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
      validator(tags) {
        // comprobar que sólo intenten introducirse los tags permitidos
        return tags.every((tag) => validTags.includes(tag));
      },
      message: "Tag inválido. Tags permitidos: collectibles, electronics, fashion, games, home, lifestyle, mobile, motor, outdoors, work",
    },
  },
  descripcion: {
    type: String,
    default:
      "Vestibulum sed ullamcorper risus. Proin condimentum erat erat, vitae convallis mi vehicula id. Suspendisse sed ultricies metus. Quisque augue nisi, condimentum at sagittis et, dapibus vel dui. Morbi at ante nisl. Nulla sit amet mi metus. Nulla auctor sagittis porttitor. Praesent pellentesque risus est, eget bibendum erat ultricies at. Suspendisse potenti. Nullam eu nisl vel mauris hendrerit elementum ac vel enim. Praesent rhoncus bibendum lectus ac aliquet.",
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
anuncioSchema.statics.listar = function (filtro, options) {
  const query = Anuncio.find(filtro);

  query.skip(options.skip);
  query.limit(options.limit);
  query.sort(options.sort);

  return query.exec();
};

// crear el modelo de anuncio
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

// exportar el modulo
module.exports = Anuncio;
