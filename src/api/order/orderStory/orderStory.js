const Shop = require('../../../scheme/shopSchema');

async function createOrderList(
	productName,
	shopName,
	typeProduct,
	shopOwnerEmail,
	customerEmail,
	timeOrder
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
			dataHistory: {
				DateOrder: timeOrder,
				CustomerEmail: customerEmail,
				price: productType.price,
				NameShop: shopName,
				TypeProduct: typeProduct,
				emailShopOwner: shopOwnerEmail,
				Base64ImageData: productType.base64Data
			}
		};

		shop.order.orderHistory.push(orderList);
		await shop.save();

		return 'OrderList berhasil dibuat';
	} catch (error) {
		console.error(error);
		throw new Error('Terjadi kesalahan saat membuat order history');
	}
}

async function deleteProductNameFromOrderList(
	shopOwnerEmail,
	shopName,
	typeProduct,
	productName,
	customerEmail
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

		// Flag to track if we found and deleted one instance of productName
		let deletedOne = false;

		// Iterate through the orderList to find and remove the specified productName
		for (let i = 0; i < shop.order.orderHistory.length; i++) {
			const order = shop.order.orderHistory[i];

			// Filter out the first dataList with matching typeProduct and ProductName
			if (!deletedOne) {
				order.dataHistory = order.dataHistory.filter(data => {
					if (
						data.TypeProduct === typeProduct &&
						order.ProductName === productName &&
						data.CustomerEmail === customerEmail &&
						!deletedOne
					) {
						deletedOne = true;
						return false; // Exclude the dataList with matching typeProduct and ProductName
					}
					return true; // Keep other dataList
				});
			}

			// Remove the order if all dataList items are removed
			if (order.dataHistory.length === 0) {
				shop.order.orderHistory.splice(i, 1);
				i--; // Adjust the index as we removed an element
			}
		}

		// Menyimpan perubahan ke dalam database
		await shop.save();

		if (deletedOne) {
			return 'Satu instance ProductName berhasil dihapus dari orderHistory';
		} else {
			throw new Error('Tidak ada instance ProductName yang dihapus');
		}
	} catch (error) {
		console.error(error);
		throw new Error(
			'Terjadi kesalahan saat menghapus ProductName dari orderHistory'
		);
	}
}

module.exports = {
	createOrderList,
	deleteProductNameFromOrderList
};
