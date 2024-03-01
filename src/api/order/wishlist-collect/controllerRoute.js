const express = require('express');
const router = express.Router();
const { createCollection, createWishListItem } = require('./wishListCollect');
const {
	deleteCollection,
	deleteProductCollect
} = require('./deleteCollect.js');

// Endpoint untuk membuat orderList
router.post('/collection', async (req, res) => {
	const { shopName, typeProduct, shopOwnerEmail, customerEmail, collection } =
		req.body;

	try {
		const result = await createCollection(
			shopName,
			typeProduct,
			shopOwnerEmail,
			customerEmail,
			collection
		);
		res.status(200).json({
			message: result
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan saat membuat wishlist'
		});
	}
});

router.post('/createItem', async (req, res) => {
	const {
		productName,
		shopName,
		typeProduct,
		shopOwnerEmail,
		customerEmail,
		collectionName
	} = req.body;

	try {
		const result = await createWishListItem(
			productName,
			shopName,
			typeProduct,
			shopOwnerEmail,
			customerEmail,
			collectionName
		);
		res.status(200).json({
			message: result
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan saat membuat wishlist'
		});
	}
});

router.delete('/deleteItem', async (req, res) => {
	const {
		shopOwnerEmail,
		shopName,
		typeProduct,
		productName,
		customerEmail,
		collectionName
	} = req.body;

	try {
		const result = await deleteProductCollect(
			shopOwnerEmail,
			shopName,
			typeProduct,
			productName,
			customerEmail,
			collectionName
		);
		res.status(200).json({
			message: result
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan saat menghapus wishlist'
		});
	}
});

module.exports = router;
