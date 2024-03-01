const express = require("express");
const multer = require("multer");
const {
  GridFsStorage
} = require("multer-gridfs-storage");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
require("dotenv").config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;

const url =
"mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongoClient = new MongoClient(url);

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    const {
      email, shopName, typeProduct
    } = req.body;
    console.log(req.body)
    const shop = req.body.shopName && req.body.shopName.find((shop) => shop.NameShop === "Shop56");
    if (!shop) {
      throw new Error("Shop not found");
    }



    const product = shop && shop.product && shop.product.find(
      (product) => product.typeProduct === req.body.typeProduct
    );
    if (!product) {
      throw new Error("Product not found");
    }

    const userEmail = email || 'unknown';
    const shopNameValue = shop && shop.NameShop || 'unknown';
    const typeProductValue = product && product.typeProduct || 'unknown';

    return {
      bucketName: "product_images",
      filename: `${userEmail}_${shopNameValue}_${typeProductValue}_${Date.now()}_${file.originalname}`,
    };
  },

});


const upload = multer({
  storage
});

app.post("/upload/image", upload.single("avatar"), (req, res) => {
  console.log(req.body)
  const file = req.file;
  // Respond with the file details
  res.send({
    message: "Uploaded",
    id: file.id,
    name: file.filename,
    contentType: file.contentType,
  });
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});