const Shop = require('../../../scheme/shopSchema');

async function getShopInfo(req, res) {
  const { email } = req.body;

  try {
    const shop = await Shop.findOne({
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    const { address, city, province, postalCode } = shop;

    res.status(200).json({
      email,
      address,
      city,
      province,
      postalCode
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

async function getShopAddress(req, res) {
  const { email } = req.body;

  try {
    const shop = await Shop.findOne({
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    res.status(200).json({
      address: shop.address
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

async function getShopCity(req, res) {
  const { email } = req.body;

  try {
    const shop = await Shop.findOne({
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    res.status(200).json({
      city: shop.city
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

async function getShopProvince(req, res) {
  const { email } = req.body;

  try {
    const shop = await Shop.findOne({
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    res.status(200).json({
      province: shop.province
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

async function getShopPostal(req, res) {
  const { email } = req.body;

  try {
    const shop = await Shop.findOne({
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    res.status(200).json({
      postalCode: shop.postalCode
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

async function getProductInfo(req, res) {
  const { email, nameShop, typeProduct } = req.body;

  try {
    const shop = await Shop.findOne({ email });

    if (!shop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    const selectedShop = shop.shopName.find(
      (shop) => shop.NameShop === nameShop
    );

    if (!selectedShop) {
      return res.status(404).json({
        error: 'Toko tidak ditemukan.'
      });
    }

    const selectedProducts = selectedShop.product
      .filter((product) => product.typeProduct === typeProduct)
      .map((product) => ({
        typeProduct: product.typeProduct,
        products: product.productType.map((productType) => ({
          name: productType.name,
          desc: productType.desc,
          price: productType.price,
          stock: productType.stock,
          discount: productType.discount,
          base64Data: productType.base64Data,
          imageList: productType.imageList
        }))
      }));

    if (selectedProducts.length === 0) {
      return res.status(404).json({
        error: 'Produk tidak ditemukan.'
      });
    }

    res.status(200).json(selectedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Terjadi kesalahan server.'
    });
  }
}

module.exports = {
  getShopInfo,
  getShopAddress,
  getShopCity,
  getShopProvince,
  getShopPostal,
  getProductInfo
};

