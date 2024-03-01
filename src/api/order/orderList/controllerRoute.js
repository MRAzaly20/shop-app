const express = require('express');
const router = express.Router();
const {
  createOrderList,
  deleteProductNameFromOrderList
} = require('./orderList');


router.post('/createOrderList', async (req, res) => {
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
      error: 'Terjadi kesalahan saat membuat orderList'
    });
  }
});

router.delete('/deleteOrderList', async (req, res) => {
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
      error: 'Terjadi kesalahan saat menghapus OrderList'
    });
  }
});

module.exports = router;