const Shop = require("../../../scheme/shopSchema");

async function getOneProduct(customerEmail, Product) {
  let data;

  try {
    const shop = await Shop.findOne({
      email: customerEmail
    });

    const found = shop.order.wishlist.find(
      (pt) => pt.ProductName === Product
    );
    if (shop && found) {
     // console.log(found);
      data = found.wishListUser[0].isWish;
      return data;
      //console.log(found.wishListUser[0].isWish);
    }
    if (!shop || !found) {
      data = false;
      return data;
    }

    // const wishData = shop.order.wishlist;
    //console.log(shop);
    console.log('data :', data)
    
  } catch (error) {
    console.error(error);
    throw new Error("Terjadi kesalahan saat mengambil data product");
  }
}

module.exports = {
  getOneProduct
};
