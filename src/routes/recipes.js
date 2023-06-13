const express = require("express");
const multer = require("multer");
const Recipe = require("../models/recipe");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Endpoint untuk menambahkan resep baru
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, ingredient, instruction } = req.body;
    const image = req.file.path;

    const recipe = new Recipe({ title, ingredient, instruction, image });
    await recipe.save();

    res.status(201).json({ message: "Resep berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan resep" });
  }
});

// Endpoint untuk menampilkan semua resep
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil resep" });
  }
});

// Endpoint untuk mencari resep berdasarkan nama atau bahan
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat mencari resep" });
  }
});

// Endpoint untuk menghapus resep
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Recipe.findByIdAndRemove(id);
    res.json({ message: "Resep berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus resep" });
  }
});

module.exports = router;
