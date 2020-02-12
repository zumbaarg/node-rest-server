// ===============================
// Puerto
// ===============================
process.env.PORT = process.env.PORT || 3000;

// ===============================
// Entorno
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ===============================
// Base de datos
// ===============================

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB =
    "mongodb+srv://zumba:r1CV1DxRxKOfK4gk@cluster0-tgra1.mongodb.net/cafe";
}

process.env.URLDB = urlDB;
