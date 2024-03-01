const express = require('express');
const router = express.Router();
const shopFunctions = require('./createShop');

router.post('/create/account', shopFunctions.createShop);
router.post(
	'/account/add/product-type/:shopName',
	shopFunctions.addProductType
);
router.post('/account/add/product/:shopName', shopFunctions.addProduct);
router.post('/account/add/add-shop', shopFunctions.addShop);
router.post('/account/create/uid', shopFunctions.createUID);

module.exports = router;
