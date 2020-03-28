const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol valido"
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es necesario"]
  },
  email: {
    type: String,
    required: [true, "El email es necesario"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "La constraseña es obligatoria"]
  },
  img: {
    type: String,
    default: "sin imagen"
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    required: false
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObjet = user.toObject();
  delete userObjet.password;

  return userObjet;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Usuario", usuarioSchema);
