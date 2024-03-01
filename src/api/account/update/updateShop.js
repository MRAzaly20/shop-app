const Shop = require('../../../scheme/shopSchema');

async function editAccountInfo(req, res) {
	const { email, address, city, province, postalCode } = req.body;

	try {
		const shop = await Shop.findOne({
			email: email
		});

		if (!shop) {
			return res.status(404).json({
				error: 'account tidak ditemukan.'
			});
		}

		shop.email = email || shop.email;
		shop.address = address || shop.address;
		shop.city = city || shop.city;
		shop.province = province || shop.province;
		shop.postalCode = postalCode || shop.postalCode;

		await shop.save();

		res.json({
			message: 'Informasi account berhasil diperbarui.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

async function editShopInfo(req, res) {
	const { email, oldShopName, newShopInfo } = req.body;

	try {
		const shop = await Shop.findOne({
			email
		});

		if (!shop) {
			return res.status(404).json({
				error: 'toko atau account tidak ditemukan'
			});
		}

		const shopIndex = shop.shopName.findIndex(
			shop => shop.NameShop === oldShopName
		);

		if (shopIndex === -1) {
			return res.status(404).json({
				error: 'Shop tidak ditemukan.'
			});
		}

		shop.shopName[shopIndex] = {
			...shop.shopName[shopIndex],
			...newShopInfo
		};

		await shop.save();

		res.status(200).json({
			message: 'Informasi shop berhasil diperbarui.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

async function editProductType(req, res) {
	const { email, shopName, typeProduct, newName } = req.body;

	try {
		const shop = await Shop.findOne({
			email: email,
			'shopName.NameShop': shopName,
			'shopName.product.typeProduct': typeProduct
		});

		if (!shop) {
			return res.status(404).json({
				error: 'account atau tipe produk tidak ditemukan.'
			});
		}

		const productType = shop.shopName
			.find(shop => shop.NameShop === shopName)
			.product.find(product => product.typeProduct === typeProduct);

		productType.typeProduct = newName;

		await shop.save();

		res.status(200).json({
			message: 'Nama tipe produk berhasil diubah.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

async function editProductInfo(req, res) {
	const {
		email,
		shopName,
		typeProduct,
		oldProductName,
		newProductName,
		newProductDesc,
		newProductPrice,
		newProductStock,
		newProductDiscount
	} = req.body;

	try {
		const shop = await Shop.findOne({
			email,
			'shopName.NameShop': shopName
		});

		if (!shop) {
			return res.status(404).json({
				error: 'account tersebut tidak ditemukan.'
			});
		}

		const productTypeIndex = shop.shopName.findIndex(
			shopItem => shopItem.NameShop === shopName
		);

		if (productTypeIndex === -1) {
			return res.status(404).json({
				error: 'account tersebut tidak ditemukan.'
			});
		}

		const productIndex = shop.shopName[
			productTypeIndex
		].product[0].productType.findIndex(
			product => product.name === oldProductName
		);

		if (productIndex === -1) {
			return res.status(404).json({
				error: 'Produk tidak ditemukan di tipe produk.'
			});
		}

		shop.shopName[productTypeIndex].product[0].productType[
			productIndex
		].name = newProductName;
		shop.shopName[productTypeIndex].product[0].productType[
			productIndex
		].desc = newProductDesc;
		shop.shopName[productTypeIndex].product[0].productType[
			productIndex
		].price = newProductPrice;
		shop.shopName[productTypeIndex].product[0].productType[
			productIndex
		].stock = newProductStock;
		shop.shopName[productTypeIndex].product[0].productType[
			productIndex
		].discount = newProductDiscount;

		await shop.save();

		res.status(200).json({
			message: 'Informasi produk berhasil diperbarui.'
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: 'Terjadi kesalahan server.'
		});
	}
}

module.exports = {
	editAccountInfo,
	editShopInfo,
	editProductType,
	editProductInfo
};
