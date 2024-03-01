const Shop = require('../../../scheme/shopSchema');

async function deleteCollection(shopOwnerEmail, collectionName) {
	try {
		// Temukan toko berdasarkan email
		const shop = await Shop.findOne({
			email: shopOwnerEmail
		});

		if (!shop) {
			return res.status(404).json({
				error: 'Toko tidak ditemukan.'
			});
		}

		// Temukan indeks toko berdasarkan nama toko
		const Index = shop.order.wishlistCollect.findIndex(
			shop => shop.collectionWish === collectionName
		);

		if (Index === -1) {
			return res.status(404).json({
				error: 'Collection tidak ditemukan.'
			});
		}

		// Hapus toko berdasarkan indeks
		shop.order.wishlistCollect.splice(Index, 1);

		// Simpan perubahan
		await shop.save();

		return 'Collection berhasil dihapus.';
	} catch (error) {
		console.error(error);

		return 'Terjadi kesalahan server.';
	}
}
async function deleteProductCollect(
	shopOwnerEmail,
	shopName,
	typeProduct,
	productName,
	customerEmail,
	collectionName
) {
	try {
		// Temukan toko berdasarkan email
		const shop = await Shop.findOne({
			email: shopOwnerEmail
		});

		if (!shop) {
			return 'Toko tidak ditemukan.';
		}

		// Temukan indeks toko berdasarkan nama toko
		const Index = shop.order.wishlistCollect.findIndex(
			shop => shop.collectionWish === collectionName
		);

		if (Index === -1) {
			return 'Collection tidak ditemukan.';
		}

		// Temukan indeks produk berdasarkan typeProduct
		const productIndex = shop.order.wishlistCollect[Index].item.findIndex(
			product => product.ProductName === productName
		);

		if (productIndex === -1) {
			return 'Produk tidak ditemukan.';
		}

		// Hapus produk berdasarkan indeks
		shop.order.wishlistCollect[Index].item.splice(productIndex, 1);

		// Simpan perubahan
		await shop.save();

		return 'Produk berhasil dihapus.';
	} catch (error) {
		console.error(error);
		return 'Terjadi kesalahan server.';
	}
}
module.exports = {
	deleteProductCollect,
	deleteCollection
};
