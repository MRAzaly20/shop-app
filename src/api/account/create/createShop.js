const Shop = require("../../../scheme/shopSchema");

async function createShop(req, res) {
  if (!req.body) {
    return res.status(400).json({
      error: "Invalid request. No data in the request body."
    });
  }

  const { email, password, address, province, city, postalCode } = req.body;

  try {
    const existingShop = await Shop.findOne({
      email
    });

    if (existingShop) {
      return res.status(400).json({
        error: "Akun dengan nama tersebut sudah ada."
      });
    }

    const newAcc = new Shop({
      email,
      password: password,
      address,
      province,
      city,
      postalCode,
      userID: ""
    });

    await newAcc.save();

    res.status(201).json({
      message: "Toko baru berhasil dibuat."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Terjadi kesalahan server."
    });
  }
}

async function addProductType(req, res) {
  const { shopName } = req.params;
  const { typeProduct, email } = req.body;

  try {
    const shopIndex = shopName.indexOf(":");
    const email2 = shopName.substring(0, shopIndex);
    const shopNameValue = shopName.substring(shopIndex + 1);

    const shop = await Shop.findOne({
      email,
      "shopName.NameShop": shopNameValue
    });

    if (!shop) {
      return res.status(404).json({
        error: "Toko tidak ditemukan."
      });
    }

    const existingProductType = shop.shopName
      .find(shop => shop.NameShop === shopNameValue)
      .product.some(product => product.typeProduct === typeProduct);

    if (existingProductType) {
      return res.status(400).json({
        error: "Tipe produk sudah ada di dalam toko."
      });
    }

    const shopToUpdate = shop.shopName.find(
      shop => shop.NameShop === shopNameValue
    );

    shopToUpdate.product.push({
      typeProduct,
      productType: []
    });

    await shop.save();

    res.status(201).json({
      message: "Tipe produk baru berhasil ditambahkan ke dalam toko."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan server."
    });
  }
}

async function addProduct(req, res) {
  const { shopName } = req.params;
  const {
    email,
    name,
    desc,
    price,
    typeProduct,
    stock,
    discount,
    base64Data,
    imageList
  } = req.body;

  try {
    const shop = await Shop.findOne({
      "shopName.NameShop": shopName,
      email
    });

    if (!shop) {
      return res.status(404).json({
        error: "Toko tidak ditemukan."
      });
    }

    const productTypeIndex = shop.shopName.findIndex(
      shop => shop.NameShop === shopName
    );

    if (productTypeIndex === -1) {
      return res.status(404).json({
        error: "Tipe produk tidak ditemukan di toko."
      });
    }

    const newProduct = {
      name,
      desc,
      price,
      stock,
      discount,
      base64Data,
      imageList
    };

    const typeProductIndex = shop.shopName[productTypeIndex].product.findIndex(
      product => product.typeProduct === typeProduct
    );

    if (typeProductIndex === -1) {
      shop.shopName[productTypeIndex].product.push({
        typeProduct,
        productType: [newProduct]
      });
    } else {
      shop.shopName[productTypeIndex].product[
        typeProductIndex
      ].productType.push(newProduct);
    }

    await shop.save();

    res.status(201).json({
      message: "Produk berhasil ditambahkan ke dalam toko."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan server."
    });
  }
}

async function addShop(req, res) {
  if (!req.body) {
    return res.status(400).json({
      error: "Invalid request. No data in the request body."
    });
  }

  const {
    email,
    shopName,
    address,
    province,
    city,
    postalCode,
    street,
    phone,
    desc
  } = req.body;

  try {
    const existingShop = await Shop.findOne({
      email
    });

    if (existingShop) {
      existingShop.shopName.push({
        NameShop: shopName,
        description: desc,
        address: {
          street: street,
          city: city,
          province: province,
          postalCode: postalCode
        },
        contact: {
          phone: phone,
          email: email
        }
      });

      await existingShop.save();

      res.status(200).json({
        message: "Berhasil menambahkan toko."
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan server."
    });
  }
}

async function createUID(req, res) {
  // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({
      error: "Invalid request. No data in the request body."
    });
  }

  const { email, uid } = req.body;

  try {
    // Temukan toko berdasarkan email
    const account = await Shop.findOne({
      email
    });

    if (account) {
      // Jika toko dengan nama yang sama belum ada dalam array existingShop.shopName, tambahkan toko baru
      account.userID = uid;
      await account.save();

      res.status(200).json({
        message: "uid di buat."
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan server."
    });
  }
}

// ... (other routes)

module.exports = { createShop, addProductType, addProduct, addShop, createUID };
