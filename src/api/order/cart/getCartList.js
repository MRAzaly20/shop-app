const Shop = require("../../../scheme/shopSchema");

async function getAllCartData(customerEmail) {
    try {
        
        const shop = await Shop.findOne({
            email: customerEmail
        });

        if (!shop) {
            throw new Error("Toko tidak ditemukan");
        }

        
        const cartData = shop.order.cart;
        console.log(cartData);
        return JSON.parse(JSON.stringify(cartData));
    } catch (error) {
        console.error(error);
        throw new Error("Terjadi kesalahan saat mengambil data cart");
    }
}

module.exports = {
    getAllCartData
};
