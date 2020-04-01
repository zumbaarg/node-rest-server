const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
  categoria: {
    type: String,
    required: [true, "El nombre de la categoria es necesario"],
    unique: true
  },
  usuarioAlta: {
    type: String,
    required: [true, "Usuario de alta es necesario"]
  },
  estado: {
    type: Boolean,
    required: false
  }
});

categoriaSchema.methods.toJSON = function() {
  let user = this;
  let userObjet = user.toObject();

  return userObjet;
};

categoriaSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });

module.exports = mongoose.model("Categoria", categoriaSchema);
