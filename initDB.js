"use strict";

const fs = require("fs");
const readline = require("node:readline");
const connection = require("./lib/connectMongoose");
const Anuncio = require("./models/Anuncio");
const data = JSON.parse(fs.readFileSync("./anuncios.json", "utf-8"));

main().catch((err) => console.log("Se ha producido un error", err));

async function main() {
  // esperamos a que se conecte con la BBDD
  await new Promise((resolve) => connection.once("open", resolve));

  const borrar = await pregunta("Estas seguro de querer borrar el contenido de la base de datos? (no) ");

  if (!borrar) {
    process.exit();
  }

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
  return new Promise((resolve, reject) => {
    // conectar readline con la consola
    const ifc = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    ifc.question(texto, (respuesta) => {
      ifc.close();
      resolve(respuesta.toLowerCase() === "si");
    });
  });
}
