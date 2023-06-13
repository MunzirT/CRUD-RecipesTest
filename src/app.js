const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const app = express();
const recipeRoutes = require("./routes/recipes");

app.use("/recipes", recipeRoutes);
app.use(express.json());

// Konfigurasi multer untuk mengunggah gambar
const upload = multer({ dest: "uploads/" });

// Menghubungkan ke MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Terhubung ke MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Koneksi MongoDB gagal:", error);
  });

// Jalankan server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
