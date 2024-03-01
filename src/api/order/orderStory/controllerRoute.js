const express = require('express');
const router = express.Router();
const {
  createOrderList,
  deleteProductNameFromOrderList
} = require('./orderStory');

// Endpoint untuk membuat orderList
router.post('/createOrderStory', async (req, res) => {
  const {
    productName, shopName, typeProduct, shopOwnerEmail, customerEmail
  } = req.body;

  try {
    const result = await createOrderList(productName, shopName, typeProduct, shopOwnerEmail, customerEmail);
    res.status(200).json({
      message: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat membuat order history'
    });
  }
});

router.delete('/deleteOrderStory', async (req, res) => {
  const {
    productName, shopName, typeProduct, shopOwnerEmail, customerEmail
  } = req.body;

  try {
    const result = await deleteProductNameFromOrderList(shopOwnerEmail, shopName, typeProduct,
      productName, customerEmail);
    res.status(200).json({
      message: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan saat menghapus Order history'
    });
  }
});

module.exports = router;