const express = require('express');
const bodyParser = require('body-parser');
const Midtrans = require('midtrans-client');

const route = express();
const port = 3000;

route.use(bodyParser.json());

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.PUBLIC_SECRET,
  clientKey: process.env.PUBLIC_CLIENT
});

route.post('/tokenizer', async (req, res) => {
  const {
    id,
    productName,
    price,
    quantity
  } = req.body;

  let parameter = {
    items_details: {
      name: productName,
      price: price,
      quantity: quantity
    },
    transaction_details: {
      order_id: id,
      gross_amount: price * quantity
    }
  };

  try {
    const token = await snap.createTransactionToken(parameter);
    console.log(token);
    res.json({
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

module.export = route