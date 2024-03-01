const express = require('express');
const router = express.Router();
const accountEditFunctions = require('./updateShop');

router.put('/account/edit/', accountEditFunctions.editAccountInfo);
router.put('/account/edit/shop', accountEditFunctions.editShopInfo);
router.put('/account/edit/product-type', accountEditFunctions.editProductType);
router.put('/account/edit/product', accountEditFunctions.editProductInfo);

module.exports = router;
