const express = require('express');
const router = express.Router();
const shopInfoFunctions = require('./getShopData');

router.post('/getShopInfo', shopInfoFunctions.getShopInfo);
router.post('/getShopAddress', shopInfoFunctions.getShopAddress);
router.post('/getShopCity', shopInfoFunctions.getShopCity);
router.post('/getShopProvince', shopInfoFunctions.getShopProvince);
router.post('/getShopPostal', shopInfoFunctions.getShopPostal);
router.post('/getProductInfo', shopInfoFunctions.getProductInfo);

module.exports = router;
