const jwt = require("jsonwebtoken");

// ===============================
// Verificar token
// ===============================

let verificaToken = (req, res, next) => {
  let token = req.get("token");
  let SEED = process.env.SEED;

  jwt.verify(token, SEED, (err, decode) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: "Token no valido"
        }
      });
    }

    req.usuario = decode.usuario;

    next();
  });
};

// ===============================
// Verificar admin role
// ===============================

let verificaAdmin_Role = (req, res, next) => {
  let usuario = req.usuario;

  if (usuario.role != "ADMIN_ROLE") {
    return res.json({
      ok: false,
      err: {
        message: "El usuario no es administrador"
      }
    });
  }
  next();
};

module.exports = {
  verificaToken,
  verificaAdmin_Role
};
