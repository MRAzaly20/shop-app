const express = require('express');
const router = express.Router();
//const Image = require('./imageModel');
const multer = require('multer');
const Shop = require("../scheme/shopSchema");
const bodyParser = require('body-parser');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});

router.use(bodyParser.json());

// Middleware for error handling
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

// Handle async functions with try-catch
const asyncHandler = fn => (req, res, next) =>
Promise.resolve(fn(req, res, next)).catch(next);

// Endpoint to add base64 data to the specified product
router.post('/add-base64-data', asyncHandler(async (req, res) => {
  const {
    email, NameShop, typeProduct, name, base64Data
  } = req.body;

  const user = await Shop.findOne({
    email, 'shopName.NameShop': NameShop, 'shopName.product.typeProduct': typeProduct
  });

  if (!user) {
    return res.status(404).json({
      message: 'User, Shop, or Product not found'
    });
  }

  const productIndex = user.shopName.findIndex(shop => shop.NameShop === NameShop);
  const typeProductIndex = user.shopName[productIndex].product.findIndex(product => product.typeProduct === typeProduct);

  const existingProductType = user.shopName[productIndex].product[typeProductIndex].productType.find(product => product.name === name);

  if (existingProductType) {
    // Product type already exists, add base64Data to the existing product type
    existingProductType.base64Data = base64Data;
  } else {
    // Product type does not exist, create a new product type
    user.shopName[productIndex].product[typeProductIndex].productType.push({
      name,
      base64Data,
    });
  }

  await user.save();

  res.status(200).json({
    message: 'Base64 data added successfully'
  });
}));

// Endpoint to upload image
router.post('/uploadImage', upload.single('image'), asyncHandler(async (req, res) => {
  const filename = req.file.originalname;
  const buffer = req.file.buffer;

  // Save image to MongoDB
  const image = new Image({
    filename, buffer
  });
  await image.save();

  res.status(201).json({
    message: 'Image uploaded successfully'
  });
}));

// Endpoint to get base64 data
router.get('/get-base64-data', asyncHandler(async (req, res) => {
  const {
    email,
    NameShop,
    typeProduct,
    name
  } = req.query;

  const user = await Shop.findOne({
    email, 'shopName.NameShop': NameShop, 'shopName.product.typeProduct': typeProduct
  });

  if (!user) {
    return res.status(404).json({
      message: 'User, Shop, or Product not found'
    });
  }

  const productIndex = user.shopName.findIndex(shop => shop.NameShop === NameShop);
  const typeProductIndex = user.shopName[productIndex].product.findIndex(product => product.typeProduct === typeProduct);

  const existingProductType = user.shopName[productIndex].product[typeProductIndex].productType.find(product => product.name === name);

  if (!existingProductType || !existingProductType.base64Data) {
    return res.status(404).json({
      message: 'Base64 data not found'
    });
  }

  // Log base64Data to console
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image</title>
    <style>
    body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh; /* Set the body height to the viewport height */
    margin: 0; /* Remove default margin */
    }

    img {
    max-width: 100%; /* Ensure the image doesn't exceed its container width */
    max-height: 100vh; /* Ensure the image doesn't exceed the viewport height */
    }
    </style>
    </head>
    <body>
    <img src="${existingProductType.base64Data}" alt="Image">
    </body>
    </html>
    `);
}));

// Endpoint to view image by filename
router.get('/view/:filename', asyncHandler(async (req, res) => {
  const {
    filename
  } = req.params;

  // Find image document by filename
  const image = await Image.findOne({
    filename
  });

  if (!image) {
    return res.status(404).json({
      message: 'Image not found'
    });
  }

  // Convert buffer to base64
  const base64Data = image.buffer.toString('base64');

  const dataUrl = `data:image/jpeg;base64,${base64Data}`;

  // Send data URL as response
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image</title>
    <style>
    body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh; /* Set the body height to the viewport height */
    margin: 0; /* Remove default margin */
    }

    img {
    max-width: 100%; /* Ensure the image doesn't exceed its container width */
    max-height: 100vh; /* Ensure the image doesn't exceed the viewport height */
    }
    </style>
    </head>
    <body>
    <img src="${dataUrl}" alt="Image">
    </body>
    </html>
    `);
}));

module.exports = router;