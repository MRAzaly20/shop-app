const express = require('express');
const path = require('path');
const fs = require('fs');
let reload = require('reload');

const app = express();
const port = 3000; // Ganti dengan port yang Anda inginkan
const folderGambar = 'Image_Ex'; // Ganti dengan lokasi folder gambar Anda

app.use(express.static(path.join(__dirname, folderGambar)));

app.get('/', (req, res) => {
  const gambarDir = path.join(__dirname, folderGambar);
  fs.readdir(gambarDir, (err, files) => {
    if (err) {
      console.error('Error membaca direktori gambar:', err);
      return res.status(500).send('Terjadi kesalahan saat membaca gambar.');
    }

    const gambarHTML = files
    .filter((file) => file.match(/\.(jpg|jpeg|png|gif)$/))
    .map((file) => `
      <a href="/gambar/${file}" target="_blank">
      <img src="/${folderGambar}/${file}" alt="${file}">
      </a>
      `)
    .join('<br>');

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
      <title>Galeri Gambar</title>
      </head>
      <body>
      ${gambarHTML}
      </body>
      </html>
      `);
  });
});

app.get('/gambar/:namaGambar', (req, res) => {
  const namaGambar = req.params.namaGambar;
  res.sendFile(path.join(__dirname, folderGambar, namaGambar));
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
reload(app);