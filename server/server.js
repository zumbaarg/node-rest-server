const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("./config/config");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta public

app.use(express.static(path.resolve(__dirname, "../public")));

// Configuracin global de rutas

app.use(require("./routes/index"));

// Conexion a base de datos

// mongoose.connect(
//   process.env.URLDB,
//   { useNewUrlParser: true, useCreateIndex: true },
//   (err, res) => {
//     if (err) throw err;

//     console.log("Base de datos online!!");

//     mongoose.set("useFindAndModify", false);
//   }
// );

app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
});