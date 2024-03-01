const express = require("express");
const router = express.Router();
const { createCart, deleteProductNameFromCart } = require("./cartUser");
const { getAllCartData } = require("./getCartList");
// Endpoint untuk membuat orderList
router.post("/createCart", async (req, res) => {
  const {
    productName,
    shopName,
    typeProduct,
    shopOwnerEmail,
    price,
    discount,
    rating,
    description,
    stock,
    brand,
    customerEmail,
    base64data,
    useImageList
  } = req.body;

  try {
    const result = await createCart(
      productName,
      shopName,
      typeProduct,
      shopOwnerEmail,
      price,
      discount,
      rating,
      description,
      stock,
      brand,
      customerEmail,
      base64data,
      useImageList
    );
    res.status(200).json({
      message: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat cart"
    });
  }
});

router.get("/getCart", async (req, res) => {
  const customerEmail = req.query.email; // Ambil email pelanggan dari query parameter
  try {
    const cartData = await getAllCartData(customerEmail);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/deleteCart", async (req, res) => {
  const { productName, shopName, typeProduct, shopOwnerEmail, customerEmail } =
    req.body;

  try {
    const result = await deleteProductNameFromCart(
      shopOwnerEmail,
      shopName,
      typeProduct,
      productName,
      customerEmail
    );
    res.status(200).json({
      message: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menghapus cart"
    });
  }
});

module.exports = router;
