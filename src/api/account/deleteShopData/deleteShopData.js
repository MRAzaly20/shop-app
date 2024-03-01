const Shop = require('../../../scheme/shopSchema');

async function deleteShop(req, res) {
	const { email, nameShop } = req.body;

	try {
		const shop = await Shop.findOne({
			email
		});

		if (!shop) {
			return res.status(404).json({
				error: 'Toko tidak ditemukan.'
			});
		}

		const shopIndex = shop.shopName.findIndex(
			shop => shop.NameShop === nameShop
		);

		if (shopIndex === -1) {
			return res.status(404).json({
				error: 'Toko tidak ditemukan.'
			});
		}

		shop.shopName.splice(shopIndex, 1);

		await shop.save();

		res.status(200).json({
			message: 'Toko berhasil dihapus.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

async function deleteProduct(req, res) {
	const { email, nameShop, typeProduct, productName } = req.body;

	try {
		const shop = await Shop.findOne({
			email
		});

		if (!shop) {
			return res.status(404).json({
				error: 'Toko tidak ditemukan.'
			});
		}

		const shopIndex = shop.shopName.findIndex(
			shop => shop.NameShop === nameShop
		);

		if (shopIndex === -1) {
			return res.status(404).json({
				error: 'Toko tidak ditemukan.'
			});
		}

		const productTypeIndex = shop.shopName[shopIndex].product.findIndex(
			product => product.typeProduct === typeProduct
		);

		if (productTypeIndex === -1) {
			return res.status(404).json({
				error: 'Tipe produk tidak ditemukan di toko.'
			});
		}

		const productIndex = shop.shopName[shopIndex].product[
			productTypeIndex
		].productType.findIndex(product => product.name === productName);

		if (productIndex === -1) {
			return res.status(404).json({
				error: 'Produk tidak ditemukan.'
			});
		}

		shop.shopName[shopIndex].product[productTypeIndex].productType.splice(
			productIndex,
			1
		);

		await shop.save();

		res.status(200).json({
			message: 'Produk berhasil dihapus.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

module.exports = { deleteShop, deleteProduct };
