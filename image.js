const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

// Koneksi ke MongoDB
mongoose.connect('mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true, useUnifiedTopology: true
  });

// Skema MongoDB
const imageSchema = new mongoose.Schema({
  imagePath: String,
  // tambahkan field lain sesuai kebutuhan
});

const Image = mongoose.model('Image', imageSchema);

// Konfigurasi Multer untuk mengelola upload file
const storage = multer.diskStorage({
  destination: 'Image_Ex/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage
});

// Endpoint untuk upload gambar
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Simpan path gambar di MongoDB
    const newImage = new Image({
      imagePath: req.file.path,
    });
    await newImage.save();

    res.status(201).json({
      message: 'Gambar berhasil diupload.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});