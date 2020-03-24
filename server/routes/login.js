const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

console.log("entro en post login");

app.post("/login", (req, res) => {
  let body = req.body;

  Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!usuarioDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "(Usuario) o contraseña incorrectos"
        }
      });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o (contraseña) incorrectos"
        }
      });
    }
    let SEED = process.env.SEED;
    let CADUCIDAD = process.env.CADUCIDAD_TOKEN;

    let token = jwt.sign(
      {
        usuario: usuarioDB
      },
      SEED,
      { expiresIn: CADUCIDAD }
    );

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  });
});

module.exports = app;
