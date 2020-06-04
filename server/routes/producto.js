const express = require("express");

let {
  verificaToken
} = require("../middlewares/autenticacion");

let app = express();

let Producto = require("../models/producto");


// ============================
// Mostrar todos los productos
// ============================

app.get('/productos', verificaToken, (req, res)=>  {
    // tre todos los productos
    // populete
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
  
    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true}, "nombre precioUni descripcion categoria usuario")
    .skip(desde)
    .limit(limite)
    .populate("usuario", "nombre email")
    .populate("categoria", "categoria")
    .exec((err, productoDB) => {
          if (err) {
            return res.status(400).json({
              ok: false,
              err
            });
          }
    
          res.json({
            ok: true,
            productoDB
          });
        }
      );
    

})

// ============================
// Mostrar producto por id
// ============================

app.get('/productos/:id', verificaToken, (req, res)=>  {

    // populete
    let id = req.params.id;

    Producto.findById(id)
            .populate("usuario", "nombre email")
            .populate("categoria", "categoria")
            .exec((err, productoDB) => {
              if(err){
                return res.status(500).json({
                  ok: false,
                  err
                });                
            }
            if(!productoDB){
              return res.status(400).json({
                ok: false,
                err: {
                  message: "ID no existe"
                }
              });
            }
            res.json({
              ok: true,
              producto: productoDB
            });
    });
  });    

// ============================
// Mostrar producto por id
// ============================

app.post('/productos', verificaToken,(req, res)=>  {

    // grabar el usuario
    // grabar una categoria del listado
    let usuario = req.usuario._id;
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: usuario
    })

    producto.save((err, categoria) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: producto
        })
    })

})

// ============================
// Mostrar producto por id
// ============================

app.put('/productos/:id', verificaToken, (req, res) =>  {
    // grabar el usuario
    // grabar una categoria del listado
    let usuario = req.usuario._id;
    let id = req.params.id;
    let body = req.body;

    Producto.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: false },
        (err, productoDB) => {
        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        // if(!productoDB){
        //     return res.status(400).json({
        //         ok: false,
        //         err: {
        //             message: "El ID no existe"
        //         }
        //     });
        // }
        res.json({
            ok: true,
            producto: productoDB
        })
    }
    )
});

// ============================
// Borrar un producto
// ============================

app.delete('/productos/:id', (req, res)=>  {
    // grabar el usuario
    // grabar una categoria del listado
    let id = req.params.id;
    let cambiaEstado = {
      disponible: false
    };
  
    Producto.findByIdAndUpdate(id, cambiaEstado, (err, productoBorrado) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
  
      if (!productoBorrado) {
        return res.status(400).json({
          ok: false,
          error: {
            message: "Producto no encontrado"
          }
        });
      }
  
      res.json({
        ok: true,
        producto: productoBorrado,
        mensaje: 'Poducto Borrado'
      });
    });    

})

app.get('/productos/buscar/:termino',verificaToken, (req, res) => {

  let termino = req.params.termino;
  
  let regex = new RegExp(termino, 'i');

  Producto.find({ nombre: regex })
          .populate("categoria", "categoria")
          .exec((err,productos)=> {
            if(err){
              return res.status(500).json({
                ok: false,
                err
              })
            }
            res.json({
              ok: true,
              productos
            })
          }
          )
})

module.exports = app;