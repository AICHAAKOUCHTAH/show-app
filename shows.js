const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');

const router = express.Router();

// Configuration Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// POST - Créer un show avec image
router.post('/', upload.single('image'), (req, res) => {
  const { title, description, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  db.run(
    `INSERT INTO shows (title, description, category, imageUrl) 
     VALUES (?, ?, ?, ?)`,
    [title, description, category, imageUrl],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ 
        id: this.lastID,
        title,
        imageUrl 
      });
    }
  );
});

// GET - Récupérer tous les shows
router.get('/', (req, res) => {
  db.all('SELECT * FROM shows', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;