// const axios = require('axios');
// const fs = require('fs');

// const formData = new FormData();
// formData.append('avatar', fs.createReadStream('/storage/emulated/0/back.png'));
// formData.append('email', 'muhammadrazaly4@gmail.com');
// formData.append('shopName[0][NameShop]', 'Shop56');
// formData.append('typeProduct', 'NewElectronics');

// axios.post('http://localhost:3000/upload/image', formData, {
//   headers: {
//     ...formData.getHeaders(),
//   },
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error.message);
// });

// const axios = require('axios');
// const fs = require('fs');

// const data = {
//   email: 'muhammadrazaly4@gmail.com',
//   shopName: [{
//     NameShop: 'Shop56'
//   }],
//   typeProduct: 'NewElectronics',
// };

// axios.post('http://localhost:3000/upload/image', data)
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error.message);
// });

const axios = require("axios");

const apiUrl = "http://localhost:3000"; // Ganti dengan URL yang sesuai

async function getCartDataByEmail(email) {
    try {
        const response = await axios.get(`${apiUrl}/cart/getCart`, {
            params: {
                email: email
            }
        });
        return response.data;
    } catch (error) {
        console.error("Terjadi kesalahan:", error.response.data);
        throw new Error("Gagal mendapatkan data keranjang belanja");
    }
}

// Contoh penggunaan
const customerEmail = "muhammadrazaly19@gmail.com";
getCartDataByEmail(customerEmail)
    .then(data => {
        console.log("Data keranjang belanja:", data);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
