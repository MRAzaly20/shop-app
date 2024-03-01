const express = require("express");
const router = express.Router();
const { createWishList, deleteProductNameFromWish } = require("./wishListUser");
const { getAllWIshData } = require("./getWishList");
const { getOneProduct } = require("./getOneProduct");

// Endpoint untuk membuat orderList
router.post("/createWishlist", async (req, res) => {
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
    const result = await createWishList(
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

    if (result === "wishlist berhasil dibuat")
      res.status(200).json({ message: result });
    if (result === "wishlist tidak dibuat, product sudah ada")
      res.status(409).json({ message: result });
    if (result === "gagal membuat wish list, toko atau account tidak ditemukan")
      res.status(404).json({ message: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat wishlist"
    });
  }
});

router.delete("/deleteWishlist", async (req, res) => {
  const { productName, shopName, typeProduct, shopOwnerEmail, customerEmail } =
    req.body;

  try {
    const result = await deleteProductNameFromWish(
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
      error: "Terjadi kesalahan saat menghapus wishlist"
    });
  }
});

router.get("/getWish", async (req, res) => {
  const customerEmail = req.query.email; // Ambil email pelanggan dari query parameter
  try {
    const cartData = await getAllWIshData(customerEmail);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/getOneProduct", async (req, res) => {
  const customerEmail = req.query.email;
  const product = req.query.product;
  console.log(customerEmail, product);
  try {
    const cartData = await getOneProduct(customerEmail, product);
    res.status(200).json({ success: true, data: cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
