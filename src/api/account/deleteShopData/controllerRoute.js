const express = require('express');
const router = express.Router();
const shopDeleteFunctions = require('./deleteShopData');

router.delete('/deleteShop', shopDeleteFunctions.deleteShop);
router.delete('/deleteProduct', shopDeleteFunctions.deleteProduct);

module.exports = router;
