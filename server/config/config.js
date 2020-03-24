// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Entorno
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ===============================
// Vencimiento del token
// ===============================
//  60 Segundos
//  60 Minutos
//  24 Horas
//  30 Dias

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===============================
// SEED del token
// ===============================

process.env.SEED = process.env.SEED || "este-es-el-seed-desarrollo";

// ===============================
// Base de datos
// ===============================

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
