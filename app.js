const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/api/account/create/controllerRoute');
const secondRoutes = require('./src/api/account/update/controllerRoute'); // Import secondRoutes
const deleteRoute = require('./src/api/account/deleteShopData/controllerRoute'); // Import secondRoutes
const getRouteData = require('./src/api/account/getShopData/controllerRoute');
const createOrderList = require('./src/api/order/orderList/controllerRoute');
const createOrderStory = require('./src/api/order/orderStory/controllerRoute');
const createWishList = require('./src/api/order/wishList/controllerRoute');
const createCollection = require('./src/api/order/wishlist-collect/controllerRoute');
const createCart = require('./src/api/order/cart/controllerRoute');

const app = express();

// Koneksi ke MongoDB
mongoose.connect(
	'mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

app.use(bodyParser.json());

// Menggunakan routes
app.use('/', routes);

// Menambahkan route kedua
app.use('/api', secondRoutes);
app.use('/apiv1', deleteRoute);
app.use('/apiv2', getRouteData);
app.use('/order', createOrderList);
app.use('/story', createOrderStory);
app.use('/wishlist', createWishList);
app.use('/cart', createCart);
app.use('/collect', createCollection);

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server berjalan di port ${port}`);
});
