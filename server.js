// const mariadb = require('mariadb');
// const fs = require('fs');

// const pool = mariadb.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'EComApp',
//   connectionLimit: 5
// });

// async function createDatabase() {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     await conn.query('CREATE DATABASE IF NOT EXISTS EComApp');
//     console.log('Database created successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }
// async function createTable() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Definisi struktur tabel
//     const tableQuery = `
//     CREATE TABLE IF NOT EXISTS MyApp (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     column1 VARCHAR(255),
//     column2 INT
//     ) 
//     `;

//     await conn.query(tableQuery);
//     console.log('Table created successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }

// async function insertData() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Data yang akan dimasukkan
//     const data = {
//       title: 'Silver Product',
//       desc: 'Amazing Silver'
//     };

//     // Perintah SQL untuk memasukkan data
//     const insertQuery = `
//     INSERT INTO MyApp (title, \`desc\`)
//     VALUES (?, ?)
//     `;

//     await conn.query(insertQuery, [data.title, data.desc]);
//     console.log('Data inserted successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }



// async function addColumn() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Nama kolom baru yang ingin ditambahkan
//     const newColumnName = 'harga';

//     // Tipe data untuk kolom baru
//     const newColumnType = 'VARCHAR(255)';

//     // Perintah SQL untuk menambahkan kolom baru
//     const alterQuery = `
//     ALTER TABLE MyApp
//     ADD COLUMN ${newColumnName} ${newColumnType}
//     `;

//     await conn.query(alterQuery);
//     console.log('Column added successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }

// async function renameColumns() {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const alterQuery = `
//     ALTER TABLE MyApp
//     MODIFY COLUMN title VARCHAR(255),
//     MODIFY COLUMN \`desc\` VARCHAR(255),
//     MODIFY COLUMN harga VARCHAR(255)
//     `;

//     await conn.query(alterQuery);
//     console.log('Columns renamed successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }

// async function deleteRow() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // ID baris yang ingin dihapus
//     const rowId = 1;

//     // Perintah SQL untuk menghapus baris
//     const deleteQuery = `
//     DELETE FROM MyApp
//     WHERE id = ?
//     `;

//     await conn.query(deleteQuery, [rowId]);
//     console.log('Row deleted successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }


// async function autoIncrementId() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Perintah SQL untuk mengubah kolom id menjadi AUTO_INCREMENT
//     const alterQuery = `
//     ALTER TABLE MyApp
//     MODIFY COLUMN id INT AUTO_INCREMENT
//     `;

//     await conn.query(alterQuery);
//     console.log('ID column set to AUTO_INCREMENT successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }


// async function updateRow() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // ID baris yang ingin diubah
//     const rowId = 4;

//     // Nilai baru untuk kolom title, desc, dan harga
//     const newTitle = 'New Title';
//     const newDesc = 'New Description';
//     const newHarga = 'Rp 100.000';

//     // Perintah SQL untuk mengupdate nilai pada baris dengan id tertentu
//     const updateQuery = `
//     UPDATE MyApp
//     SET title = ?, \`desc\` = ?, harga = ?
//     WHERE id = ?
//     `;

//     await conn.query(updateQuery, [newTitle, newDesc, newHarga, rowId]);
//     console.log('Row updated successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }



// async function readRow() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // ID baris yang ingin dibaca
//     const rowId = 4;

//     // Perintah SQL untuk membaca nilai pada baris dengan id tertentu
//     const selectQuery = `
//     SELECT title, \`desc\`
//     FROM MyApp
//     WHERE id = ?
//     `;

//     const result = await conn.query(selectQuery, [rowId]);

//     // Mencetak nilai ke konsol
//     console.log('Title:', result[0].title);
//     console.log('Description:', result[0].desc);
//     //console.log('Harga:', result[0].harga);
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }



// async function createImageColumn() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Perintah SQL untuk menambahkan kolom image
//     const alterQuery = `
//     ALTER TABLE MyApp
//     ADD COLUMN image LONGTEXT
//     `;

//     await conn.query(alterQuery);
//     console.log('Image column added successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }

// async function insertImage() {
//   let conn;
//   try {
//     conn = await pool.getConnection();

//     // Baca dan konversi gambar ke base64
//     const imageBuffer = fs.readFileSync('uploads/bot.jpg');
//     const base64Image = imageBuffer.toString('base64');

//     // Perintah SQL untuk menyimpan gambar
//     const insertQuery = `
//     INSERT INTO MyApp (image)
//     VALUES (?)
//     `;

//     await conn.query(insertQuery, [base64Image]);
//     console.log('Image inserted successfully.');
//   } catch (err) {
//     throw err;
//   } finally {
//     if (conn) conn.release();
//   }
// }

// // Panggil fungsi untuk membuat kolom image
// createImageColumn();

// // Panggil fungsi untuk menyimpan gambar
// insertImage();


// //readRow();
// //autoIncrementId();
// //deleteRow();
// //renameColumns();
// //insertData();
// //addColumn();
// //createTable();
// //createDatabase();
// //updateRow();

// const mongoose = require('mongoose');

// const url = "mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority";

// const connectionParams = {
//   useNewUrlParser: true,
// }

// mongoose.connect(url, connectionParams)
// .then(() => {
//   console.log("Connected to MongoDB database successfully!");

//   // Definisikan skema (Schema) untuk koleksi (Collection) Anda
//   const userSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     // tambahkan parameter lain yang Anda inginkan
//   });

//   // Buat model berdasarkan skema
//   const User = mongoose.model('User', userSchema);

//   // Buat objek User baru dan simpan ke dalam database
//   const newUser = new User({
//     username: 'john_doe',
//     email: 'john@example.com',
//     // tambahkan nilai lain sesuai kebutuhan
//   });

//   return newUser.save();
// })
// .then(() => {
//   console.log('User berhasil disimpan ke dalam database.');
// })
// .catch((err) => {
//   console.error(`Gagal menyimpan user ke dalam database: ${err}`);
// });


const mongoose = require('mongoose');

// Koneksi ke MongoDB
const url = "mongodb://owner:74UQqwEYvXLY9c5i@ac-dtb0roa-shard-00-00.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-01.utvhlwq.mongodb.net:27017,ac-dtb0roa-shard-00-02.utvhlwq.mongodb.net:27017/data?ssl=true&replicaSet=atlas-emoj2q-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
}

mongoose.connect(url, connectionParams)
.then(async () => {
  console.log("Connected to MongoDB database successfully!");

  // Definisikan skema (Schema) untuk koleksi (Collection)
  const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    location: String,
    shopName: String,
    products: [productSchema], // Relasi dengan koleksi produk
  });

  // Buat model berdasarkan skema
  const User = mongoose.model('User', userSchema);
  const Product = mongoose.model('Product', productSchema);
  // Mengganti data pada dokumen pengguna
  try {
    // Temukan pengguna berdasarkan kriteria tertentu (misalnya, berdasarkan ID)
    const userToUpdate = await User.findOne({
      /* Kriteria pencarian, misalnya berdasarkan ID */
    });

    // Ubah nilai age, location, dan shopName
    userToUpdate.age = 26; // Ubah umur
    userToUpdate.location = 'Yogyakarta'; // Ubah lokasi
    userToUpdate.shopName = 'Toko Saya'; // Ubah nama toko

    // Ubah nilai produk tertentu
    const productToUpdate = userToUpdate.products.find(product => product.name === 'Product Red');
    if (productToUpdate) {
      productToUpdate.name = 'New Product Ref'; // Ubah nama produk
      productToUpdate.price = 60; // Ubah harga produk
    }

    // Simpan perubahan ke dalam database
    await userToUpdate.save();
    console.log('Data pengguna berhasil diperbarui.');
    try {
      const allUsers = await User.find({});
      // Cetak hasilnya di konsol
      console.log('Semua data pengguna:');
      console.log(allUsers);
      const usersWithAgeAbove25 = await User.find({
        age: {
          $gt: 25
        }
      });
      // Cetak hasilnya di konsol
      console.log('Data pengguna dengan umur di atas 25:');
      console.log(usersWithAgeAbove25);

    } catch (error) {
      console.error(`Gagal mendapatkan data pengguna: ${error}`);
    }
  } catch (error) {
    console.error(`Gagal mengupdate data pengguna: ${error}`);
  }
})
// Buat objek User baru dengan informasi yang diberikan
//   const newUser = new User({
//     name: "Muhammad Ranah Azaly"
//     email: "muhammadrazaly4@gmail.com",
//     age: 25,
//     location: 'Jakarta',
//     shopName: 'Toko Maju',
//     products: [{
//       name: 'Product Red', price: 50
//     },
//       {
//         name: 'Product Dark', price: 75
//       },
//       // Tambahkan produk lain sesuai kebutuhan
//     ],
//   });

//   // Simpan user dan produknya ke dalam database
//   newUser.save()
//   .then(() => {
//     console.log('User berhasil disimpan ke dalam database.');
//   })
//   .catch((err) => {
//     console.error(`Gagal menyimpan user ke dalam database: ${err}`);
//   });
// })
// .catch((err) => {
//   console.error(`${err}`);
// });