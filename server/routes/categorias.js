const express = require("express");

let {
  verificaToken,
  verificaAdmin_Role
} = require("../middlewares/autenticacion");

let app = express();

let Categoria = require("../models/categoria");

// ============================
// Mostrar todas las categorias
// ============================

app.get("/categoria", verificaToken, (req, res) => {
  Categoria.find({ estado: true }, "categoria usuarioAlta estado").exec(
    (err, categorias) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        categorias
      });
    }
  );
});

// ============================
// Mostrar una categorias  por ID
// ============================

app.get("/categoria/:id", verificaToken, (req, res) => {
  let id = req.params.id;

  Categoria.findById(id, (err, categoria) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    if (!categoria) {
      return res.status(400).json({
        ok: false,
        error: {
          message: "Categoria no encontrada"
        }
      });
    }

    res.json({
      ok: true,
      usuario: categoria
    });
  });
});

// ============================
// Crear nueva categoria
// ============================

app.post("/categoria", verificaToken, (req, res) => {
  let usuario = req.usuario._id;
  let body = req.body;

  let categoria = new Categoria({
    categoria: body.categoria,
    usuarioAlta: usuario,
    estado: true
  });

  categoria.save((err, categoria) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: categoria
    });
  });
});

// ============================
// Actualiza categoria
// ============================

app.put("/categoria/:id", verificaToken, (req, res) => {
  //regresa la nueva categoria
  //req.usuario._id
  let usuario = req.usuario._id;
  let id = req.params.id;
  let body = req.body;

  Categoria.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: false },
    (err, categoriaDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        categoria: categoriaDB
      });
    }
  );
});

// ============================
// Borrar Catigoria
// ============================

app.delete(
  "/categoria/:id",
  [verificaToken, verificaAdmin_Role],
  (req, res) => {
    //solo un administrador puede borrar categorias
    //Categoria.findByIdAndRemove

    let id = req.params.id;
    let cambiaEstado = {
      estado: false
    };

    Categoria.findByIdAndDelete(id, cambiaEstado, (err, categoriaBorrada) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      if (!categoriaBorrada) {
        return res.status(400).json({
          ok: false,
          error: {
            message: "Categoria no encontrada"
          }
        });
      }

      res.json({
        ok: true,
        categoria: categoriaBorrada
      });
    });
  }
);

module.exports = app;
