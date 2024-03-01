const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();

mongoose.connect('mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(bodyParser.json());

// Konfigurasi multer untuk menangani upload gambar
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

// Import routes
const routes = require('./imageRoutes');
app.use('/', routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});