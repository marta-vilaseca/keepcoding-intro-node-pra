"use strict";

const fs = require("node:fs");
const readline = require("node:readline");
const connection = require("./lib/connectMongoose");
const Anuncio = require("./models/Anuncio");

// Leemos los anuncios a insertar desde un archivo JSON externo
const data = JSON.parse(fs.readFileSync("./anuncios.json", "utf-8"));

main().catch((err) => console.log("Se ha producido un error", err));

async function main() {
  await new Promise((resolve) => {
    connection.once("open", resolve);
  });
  const borrar = await pregunta("Estas seguro de querer borrar el contenido de la base de datos? (no) ");

  // si el usuario no responde afirmativamente, parar la ejecución
  if (!borrar) {
    process.exit();
  }

  // si no, seguir adelante con el borrado e inserción de anuncios en la BD
  await initAds();

  connection.close();
}

async function initAds() {
  // borrar todos los anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear los anuncios iniciales
  const inserted = await Anuncio.create(data);
  console.log(`Creados ${inserted.length} anuncios.`);
}

function pregunta(texto) {
  return new Promise((resolve) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    // recoger respuesta del usuario
    ifc.question(texto, (respuesta) => {
      ifc.close();
      resolve(respuesta.toLowerCase() === "si");
    });
  });
}
