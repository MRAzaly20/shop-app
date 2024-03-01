const mongoose = require("mongoose");

const dataList = new mongoose.Schema({
    isOrder: Boolean,
    inProcess: Boolean,
    CustomerEmail: String,
    price: Number,
    brand: String,
    rating: String,
    desc: String,
    NameShop: String,
    TypeProduct: String,
    emailShopOwner: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    Base64ImageData: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    },

    dateCreate: {
        type: Date,
        default: Date.now
    }
});

const dataHistory = new mongoose.Schema({
    DateOrder: Date,
    CustomerEmail: String,
    price: Number,
    brand: String,
    desc: String,
    rating: String,
    NameShop: String,
    TypeProduct: String,
    emailShopOwner: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    Base64ImageData: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    },

    dateCreate: {
        type: Date,
        default: Date.now
    }
});

const wishListUser = new mongoose.Schema({
    isWish: Boolean,
    CustomerEmail: String,
    price: Number,
    stock: Number,
    brand: String,
    rating: Number,
    desc: String,
    NameShop: String,
    TypeProduct: String,
    emailShopOwner: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    Base64ImageData: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
const CartUser = new mongoose.Schema({
    isCart: Boolean,
    CustomerEmail: String,
    price: Number,
    brand: String,
    stock: Number,
    rating: String,
    NameShop: String,
    TypeProduct: String,
    emailShopOwner: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    Base64ImageData: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
const wishListItem = new mongoose.Schema({
    isWish: Boolean,
    CustomerEmail: String,
    price: Number,
    stock: Number,
    brand: String,
    rating: String,
    NameShop: String,
    TypeProduct: String,
    emailShopOwner: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    Base64ImageData: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});

const orderListType = new mongoose.Schema({
    ProductName: String,
    dataList: [dataList]
});

const orderHistoryType = new mongoose.Schema({
    ProductName: String,
    dataHistory: [dataHistory]
});

const wishList = new mongoose.Schema({
    ProductName: String,
    wishListUser: [wishListUser]
});

const cart = new mongoose.Schema({
    ProductName: String,
    cartListUser: [CartUser]
});

const productListType = new mongoose.Schema({
    name: String,
    desc: String,
    price: {
        type: Number,
        min: 0.0
    },
    stock: Number,
    brand: String,
    rating: String,
    typeProduct: String,
    discount: {
        type: Number,
        min: 0.0,
        max: 100.0
    },
    base64Data: String,
    imageList: {
        type: [String],
        validate: {
            validator: function (v) {
                // Maksimum 10 elemen di dalam array imageList
                return v.length <= 10;
            },
            message: "Image list can have a maximum of 10 items."
        }
    }
});

const productList = new mongoose.Schema({
    typeProduct: String,
    productType: [productListType]
});
const productCollection = new mongoose.Schema({
    ProductName: String,
    wishListUser: {
        isWish: Boolean,
        CustomerEmail: String,
        price: Number,
        stock: Number,
        brand: String,
        rating: String,
        NameShop: String,
        TypeProduct: String,
        emailShopOwner: String,
        discount: {
            type: Number,
            min: 0.0,
            max: 100.0
        },
        Base64ImageData: String,
        imageList: {
            type: [String],
            validate: {
                validator: function (v) {
                    // Maksimum 10 elemen di dalam array imageList
                    return v.length <= 10;
                },
                message: "Image list can have a maximum of 10 items."
            }
        },
        dateCreate: {
            type: Date,
            default: Date.now
        }
    }
});

const productSchema = new mongoose.Schema({
    NameShop: {
        type: String,
        required: true
    },
    description: String,
    address: {
        street: String,
        city: String,
        province: String,
        postalCode: String
    },
    contact: {
        phone: String,
        email: String
    },
    product: [productList]
});

const wishlistCollect = new mongoose.Schema({
    collectionWish: String,
    item: [productCollection]
});

const shopSchema = new mongoose.Schema({
    email: {
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

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
