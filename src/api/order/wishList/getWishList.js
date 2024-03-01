const Shop = require("../../../scheme/shopSchema");

async function getAllWIshData(customerEmail) {
    try {
        
        const shop = await Shop.findOne({
            email: customerEmail
        });

        if (!shop) {
            throw new Error("Toko tidak ditemukan");
        }

        
        const wishData = shop.order.wishlist;
        console.log(wishData);
        return JSON.parse(JSON.stringify(wishData));
    } catch (error) {
        console.error(error);
        throw new Error("Terjadi kesalahan saat mengambil data cart");
    }
}

module.exports = {
    getAllWIshData
};
