const Shop = require('../../../scheme/shopSchema');

async function createCollection(
	shopName,
	typeProduct,
	shopOwnerEmail,
	customerEmail,
	collection
) {
	try {
		const shop = await Shop.findOne({
			email: shopOwnerEmail,
			'shopName.NameShop': shopName
		});

		if (!shop) {
			throw new Error('Toko tidak ditemukan');
		}

		console.log('Shop:', shop);

		const product = shop.shopName[0].product.find(
			p => p.typeProduct === typeProduct
		);

		console.log('Product:', product);

		const orderList = {
			collectionWish: collection,
			item: []
		};

		shop.order.wishlistCollect.push(orderList);
		await shop.save();

		return 'Wishlist berhasil dibuat';
	} catch (error) {
		console.error(error);
		throw new Error('Terjadi kesalahan saat membuat Wishlist');
	}
}

async function createWishListItem(
	productName,
	shopName,
	typeProduct,
	shopOwnerEmail,
	customerEmail,
	collectionName
) {
	try {
		const shop = await Shop.findOne({
			email: shopOwnerEmail,
			'shopName.NameShop': shopName
		});

		if (!shop) {
			throw new Error('Toko tidak ditemukan');
		}

		console.log('Shop:', shop);

		const product = shop.shopName[0].product.find(
			p => p.typeProduct === typeProduct
		);

		console.log('Product:', product);

		const productType = product.productType.find(
			pt => pt.name === productName
		);
		console.log('ProductType:', productType);

		if (!productType) {
			throw new Error('Produk tidak ditemukan');
		}

		const orderList = {
			ProductName: productName,
			wishListUser: {
				isWish: true,
				CustomerEmail: customerEmail,
				price: productType.price,
				stock: productType.stock,
				NameShop: shopName,
				TypeProduct: typeProduct,
				discount: productType.discount,
				emailShopOwner: shopOwnerEmail,
				Base64ImageData: productType.base64Data,
				imageList: productType.imageList
			}
		};

		// Tambahkan tipe produk ke dalam toko
		if (
			!shop.order.wishlistCollect ||
			!Array.isArray(shop.order.wishlistCollect)
		) {
			shop.order.wishlistCollect = [];
		}
		console.log(shop.order.wishlistCollect);
		// Find or create the wishlist collection
		let wishlistCollection = shop.order.wishlistCollect.find(
			collection => collection.collectionWish === collectionName
		);

		wishlistCollection.item.push(orderList);
		await shop.save();

		return 'Wishlist berhasil dibuat';
	} catch (error) {
		console.error(error);
		throw new Error('Terjadi kesalahan saat membuat Wishlist');
	}
}

module.exports = {
	createCollection,
	createWishListItem
};
