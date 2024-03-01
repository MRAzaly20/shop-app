const express = require('express');
const router = express.Router();
const Shop = require('../scheme/shopSchema');
const amqp = require('amqplib/callback_api'); // Import library untuk menggunakan RabbitMQ

// Buat koneksi ke RabbitMQ server
amqp.connect('amqp://localhost', (error, connection) => {
  if (error) {
    throw error;
  }

  // Buat channel untuk mengirim dan menerima pesan
  connection.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    // Buat antrian bernama 'shop' untuk menampung pesan
    const queue = 'shop';

    channel.assertQueue(queue, {
      durable: false
    });

    // Endpoint untuk menambahkan toko baru
    router.post('/createShop', async (req, res) => {
      // Check if req.body exists
      if (!req.body) {
        return res.status(400).json({
          error: 'Invalid request. No data in the request body.'
        });
      }

      const {
        email,
        shopName,
        address,
        province,
        city,
        postalCode
      } = req.body;

      try {
        const existingShop = await Shop.findOne({
          'shopName.NameShop': shopName
        });

        if (existingShop) {
          return res.status(400).json({
            error: 'Toko dengan nama tersebut sudah ada.'
          });
        }

        const newShop = new Shop({
          email,
          shopName: [{
            NameShop: shopName,
            product: []
          }], // Initialize with an empty product array
          address,
          province,
          city,
          postalCode
        });

        await newShop.save();

        // Kirim pesan ke antrian 'shop' dengan data toko baru
        const message = JSON.stringify(newShop);
        channel.sendToQueue(queue, Buffer.from(message));

        res.status(201).json({
          message: 'Toko baru berhasil dibuat.'
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: 'Terjadi kesalahan server.'
        });
      }
    });


    // ... (other routes)

    // Endpoint untuk menambahkan tipe produk baru ke dalam toko
    router.post('/addProductType/:shopName', async (req, res) => {
      const {
        shopName
      } = req.params;
      const {
        typeProduct
      } = req.body;

      try {
        // Temukan toko berdasarkan nama
        const shopIndex = shopName.indexOf(':');
        const email = shopName.substring(0, shopIndex);
        const shopNameValue = shopName.substring(shopIndex + 1);

        const shop = await Shop.findOne({
          'shopName.NameShop': shopNameValue
        });

        if (!shop) {
          return res.status(404).json({
            error: 'Toko tidak ditemukan.'
          });
        }

        // Periksa apakah tipe produk sudah ada
        const existingProductType = shop.shopName.find(shop => shop.NameShop === shopNameValue).product.some(product => product.typeProduct === typeProduct);

        if (existingProductType) {
          return res.status(400).json({
            error: 'Tipe produk sudah ada di dalam toko.'
          });
        }

        // Tambahkan tipe produk ke dalam toko
        const shopToUpdate = shop.shopName.find(shop => shop.NameShop === shopNameValue);
        shopToUpdate.product.push({
          typeProduct, productType: []
        });

        await shop.save();

        // Kirim pesan ke antrian 'shop' dengan data toko yang diperbarui
        const message = JSON.stringify(shop);
        channel.sendToQueue(queue, Buffer.from(message));

        res.status(201).json({
          message: 'Tipe produk baru berhasil ditambahkan ke dalam toko.'
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: 'Terjadi kesalahan server.'
        });
      }
    });

    router.post('/addProduct/:shopName', async (req, res) => {
      const {
        shopName
      } = req.params;
      const {
        name,
        desc,
        price,
        typeProduct
      } = req.body;

      try {
        // Temukan toko berdasarkan nama
        const shop = await Shop.findOne({
          'shopName.NameShop': shopName
        });

        if (!shop) {
          return res.status(404).json({
            error: 'Toko tidak ditemukan.'
          });
        }

        // Temukan tipe produk di dalam toko
        const productTypeIndex = shop.shopName.findIndex(shop => shop.NameShop === shopName);
        if (productTypeIndex === -1) {
          return res.status(404).json({
            error: 'Tipe produk tidak ditemukan di toko.'
          });
        }

        // Periksa apakah tipe produk sudah ada
        // Tambahkan produk ke dalam tipe produk yang sesuai
        const newProduct = {
          name,
          desc,
          price
        };

        // Cari tipe produk yang sesuai
        const typeProductIndex = shop.shopName[productTypeIndex].product.findIndex(product => product.typeProduct === typeProduct);

        if (typeProductIndex === -1) {
          // Tipe produk belum ada, tambahkan tipe produk dan produk baru
          shop.shopName[productTypeIndex].product.push({
            typeProduct,
            productType: [newProduct]
          });
        } else {
          // Tipe produk sudah ada, tambahkan hanya produk baru
          shop.shopName[productTypeIndex].product[typeProductIndex].productType.push(newProduct);
        }

        await shop.save();

        // Kirim pesan ke antrian 'shop' dengan data toko yang diperbarui
        const message = JSON.stringify(shop);
        channel.sendToQueue(queue, Buffer.from(message));

        res.status(201).json({
          message: 'Produk baru berhasil ditambahkan ke dalam toko.'
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: 'Terjadi kesalahan server.'
        });
      }
    });
  });
});

module.exports = router;
