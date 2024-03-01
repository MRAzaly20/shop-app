const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
	product: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	address: String,
	province: String,
	city: String,
	postalCode: String,
	userID: String,
	shopName: [productSchema],
	order: {
		orderList: [orderListType],
		orderHistory: [orderHistoryType],
		wishlist: [wishList],
		wishlistCollect: [wishlistCollect],
		cart: [cart]
	}
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
