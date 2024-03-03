/* eslint-disable newline-per-chained-call */
const { query, param, body } = require("express-validator");
const { validTags, allowedFormats, validSortOptions } = require("./variables");
const Anuncio = require("../models/Anuncio");

const validation = {
  queryValidators: [
    query("tipo").optional().isIn(["venta", "busqueda"]).withMessage("Para 'tipo' solo pueden especificarse las opciones 'venta' o 'busqueda'"),
    query("precio")
      .optional()
      .matches(/^-?\d+(-\d+)?$|^\d+-?$/)
      .withMessage("Formato de precio inválido, debe ser uno o dos números en formato m-n, n, -n o n-"),
    query("tags")
      .optional()
      .custom((value) => {
        // Si es un tag solo guardarlo igualmente como array
        const tagsArray = Array.isArray(value) ? value : [value];

        // Comprobar que todos los tags recibidos estén en la lista de tags válidos
        const invalidTags = tagsArray.filter((tag) => !validTags.includes(tag));
        if (invalidTags.length > 0) {
          throw new Error(`Tag inválido: ${invalidTags.join(", ")}. Los tags válidos son: ${validTags.join(", ")}`);
        }

        return true;
      }),
    query("skip").optional().isNumeric().withMessage("El parámetro 'skip' debe ser numérico"),
    query("limit").optional().isNumeric().withMessage("El parámetro 'limit' debe ser numérico"),
    query("sort")
      .optional()
      .custom((value) => {
        const options = value.split(/\s+/);
        return options.every((option) => {
          const cleanOption = option.startsWith("-") ? option.substring(1) : option;
          return validSortOptions.includes(cleanOption);
        });
      })
      .withMessage(
        `Solo se puede utilizar 'sort' con los siguientes valores: ${validSortOptions.join(", ")} o con un '-' delante para indicar orden descendente (separados por espacios para múltiples valores)`
      ),
  ],
  paramValidators: [
    param("id")
      .trim()
      .isMongoId()
      .withMessage("El ID proporcionado no tiene un formato válido")
      .custom(async (value) => {
        const anuncio = await Anuncio.findById(value);
        if (!anuncio) {
          throw new Error("El ID proporcionado no existe");
        }
        return true;
      }),
  ],
  bodyValidators: [
    body("nombre").isString().withMessage("Nombre debe ser un string").notEmpty().withMessage("Nombre es un campo obligatorio"),
    body("tipo").isBoolean().withMessage("Tipo debe ser un booleano (true o false)").notEmpty().withMessage("Tipo es un campo obligatorio"),
    body("precio").isNumeric().withMessage("Precio debe ser un valor numérico").notEmpty().withMessage("Precio es un campo obligatorio"),
    body("descripcion").optional().isString().withMessage("Descripcion debe ser un string"),
    body("foto")
      .optional()
      .isString()
      .custom((value) => {
        // comprobar que la extensi'on incluida en el nombre de la foto sea uno de los formatos permitidos
        if (!value || allowedFormats.some((format) => value.endsWith(`.${format}`))) {
          return true;
        }

        throw new Error(`Formato de imagen inválido. Formatos permitidos: ${allowedFormats.join(", ")}`);
      }),
    body("tags")
      .notEmpty()
      .custom((value) => {
        // Si es un tag solo guardarlo igualmente como array
        const tagsArray = Array.isArray(value) ? value : [value];

        // Comprobar que todos los tags recibidos estén en la lista de tags válidos
        const invalidTags = tagsArray.filter((tag) => !validTags.includes(tag));
        if (invalidTags.length > 0) {
          throw new Error(`Tag inválido: ${invalidTags.join(", ")}. Los tags válidos son: ${validTags.join(", ")}`);
        }

        return true;
      }),
  ],
};

module.exports = validation;
