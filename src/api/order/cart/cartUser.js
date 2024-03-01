const Shop = require("../../../scheme/shopSchema");

async function createCart(
  productName,
  shopName,
  typeProduct,
  shopOwnerEmail,
  price,
  discount,
  rating,
  description,
  stock,
  brand,
  customerEmail,
  base64data,
  useImageList
) {


  console.log(customerEmail);
  var name_shop = "";


  try {
    const shop = await Shop.findOne({
      email: shopOwnerEmail,
      "shopName.NameShop": shopName
    });
    const account = await Shop.findOne({
      email: customerEmail
    });
    console.log("account :", account);
    if (shop) {
      

      console.log("Shop:", shop);

      
      const product = await Shop.findOne(
        {
          email: shopOwnerEmail,
          shopName: {
            $elemMatch: {
              NameShop: shopName,
              product: {
                $elemMatch: {
                  typeProduct: typeProduct
                }
              }
            }
          }
          
        },
        {
          
          "shopName.$": 1
        }
      );

      

      
      try {
        const found = product.shopName[0].product.find(
          (p) => p.typeProduct === typeProduct
        );
        
        const productType = found.productType.find(
          (pt) => pt.name === productName
        );

        console.log("ProductType:", productType);

        if (!productType) {
          throw new Error("Produk tidak ditemukan");
        }


        let imageData =
          useImageList && useImageList.length > 0
            ? useImageList
            : productType.imageList;
        let base64dataimg = !productType.base64Data
          ? base64data
          : productType.base64Data;
        let brandData = !productType.brand ? brand : productType.brand;
        let priceData = !productType.price ? price : productType.price;
        let stockData = !productType.stock ? stock : productType.stock;
        let discountData = !productType.discount ? discount : productType.discount;
        let ratingData = !productType.rating ? rating.toString() : productType.rating;
        let descData = !productType.description ? description : productType.description;

        console.log(imageData);
        const orderList = {
          ProductName: productName,
          cartListUser: {
            CustomerEmail: customerEmail,
            price: priceData,
            brand: brandData,
            stock: stockData,
            rating: rating,
            rating: ratingData,
            NameShop: shopName,
            TypeProduct: typeProduct,
            discount:discountData,
            emailShopOwner: shopOwnerEmail,
            Base64ImageData: base64dataimg,
            imageList: imageData
          }
        };

        account.order.cart.push(orderList);

        Promise.all([shop.save(), account.save()]);
      } catch (error) {
        
        console.error(error);
        
        let imageData = useImageList || [];
        const orderList = {
          ProductName: productName,
          cartListUser: {
            CustomerEmail: customerEmail,
            price: price, 
            stock: stock, 
            rating: rating,
            brand: brand,
            NameShop: shopName,
            TypeProduct: typeProduct,
            discount: discount, 
            emailShopOwner: shopOwnerEmail,
            Base64ImageData: base64data, 
            imageList: imageData
          }
        };

        account.order.cart.push(orderList);

        Promise.all([shop.save(), account.save()]);
      }
    } else {
      
      console.log("Toko tidak ditemukan");

      
      let imageData = useImageList || [];
      const orderList = {
        ProductName: productName,
        cartListUser: {
          CustomerEmail: customerEmail,
          price: price, 
          stock: stock, 
          rating: rating,
          brand: brand, 
          NameShop: shopName,
          TypeProduct: typeProduct,
          discount: discount, 
          emailShopOwner: shopOwnerEmail,
          Base64ImageData: base64data, 
          imageList: imageData
        }
      };

      account.order.cart.push(orderList);

      Promise.all([account.save()]);
      return "cart berhasil dibuat";
    }
    return "cart berhasil dibuat";
  } catch (error) {
    console.error(error);
    throw new Error("Terjadi kesalahan saat membuat orderList");
  }
}

async function deleteProductNameFromCart(
  shopOwnerEmail,
  shopName,
  typeProduct,
  productName,
  customerEmail
) {
  try {


    const shop = await Shop.findOne({
      email: shopOwnerEmail,
      "shopName.NameShop": shopName
    });

    if (!shop) {
      throw new Error("Toko tidak ditemukan");
    }

    console.log("Shop:", shop);

    
    let deletedOne = false;

    
    for (let i = 0; i < shop.order.cart.length; i++) {
      const order = shop.order.cart[i];

      
      if (!deletedOne) {
        order.cartListUser = order.cartListUser.filter((data) => {
          if (
            data.TypeProduct === typeProduct &&
            order.ProductName === productName &&
            data.CustomerEmail === customerEmail &&
            !deletedOne
          ) {
            deletedOne = true;
            return false; 
          }
          return true; 
        });
      }

      
      if (order.cartListUser.length === 0) {
        shop.order.cart.splice(i, 1);
        i--; 
      }
    }

    
    await shop.save();

    if (deletedOne) {
      return "Satu instance ProductName berhasil dihapus dari Cart";
    } else {
      throw new Error("Tidak ada instance ProductName yang dihapus");
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      "Terjadi kesalahan saat menghapus ProductName dari orderHistory"
    );
  }
}


module.exports = {
  createCart,
  deleteProductNameFromCart
};
