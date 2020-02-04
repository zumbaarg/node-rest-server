const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");

app.get("/usuario", function(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuarioDB
      });
    });
});

app.post("/usuario", function(req, res) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    console.log(usuarioDB);
    res.json({
      ok: true,
      usuario: usuarioDB
    });
    console.log(usuarioDB);
  });

  // if (body.nombre === undefined) {
  //   res.status(400).json({
  //     ok: false,
  //     mensaje: "el nombre es necesario"
  //   });
  // } else {
  //   res.json({
  //     body
  //   });
  // }
});

app.delete("/usuario", function(req, res) {
  res.json("delete usuario");
});

app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

module.exports = app;
