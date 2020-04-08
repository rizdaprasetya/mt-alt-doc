# Kode Kesalahan dan Kode Respon

### Definisi

Anda dapat melihat seluruh daftar kode kesalahan dan kode respon yang didefinisikan pada halaman dibawah ini:

<div class="my-card">

#### [Kode Kesalahan dan Kode Respon](https://api-docs.midtrans.com/#status-code)
</div>

### Kode kesalahan yang sering muncul

#### `401`, `Access denied due to unauthorized transaction, please check client or server key`

**Solusi:**
- Request API tidak dapat dilakukan, karena kesalahan pada Authorization. Anda bisa mengunjungi halaman berikut [Authorization header](/id/technical-reference/api-header)
- Anda salah menggunakan Server Key, mohon cek kembali server key anda. Apakah sudah sesuai dengan yang ada pada [Dashboard Midtrans](/id/midtrans-account/overview?id=melihat-informasi-access-keys)
- Salah penggunaan environment yang digunakan (Sandbox/Production). Mohon pastikan kembali server key yang digunakan sudah sesuai dengan environment yang anda gunakan
- Periksa kembali API URL yang digunakan. Jika URL API yang anda gunakan seperti `.sandbox.midtrans.com` maka anda menggunakan API URL mode Sandbox. Pastikan juga variable `isProduction` pada library yang anda gunakan.

#### `406`, `order_id has been paid and utilized, please use another order ID`

**Solusi:**
- Anda telah menggunakan order ID yang sama pada transaksi yang masih aktif atau sudah dibayar. Nilai pada order ID per transaksi harus unik, nilai order ID yang sama tidak dapat digunakan kembali jika terdapat pada transaksi yang masih aktif atau sudah dibayar.
- Anda dapat menggunakan API `/cancel` jika terdapat transaksi yang pending dengan order ID yang ingin anda gunakan, setelah itu anda dapat menggunakan order ID tersebut.
- Atau anda dapat menambahkan suffix seperti timestamp untuk memastikan bahwa order ID yang anda kirim ke Midtrans unik. mis: `order123-1579080643`, `order123-12012020145221`

#### `503`, `Bank/partner is experiencing connection issue.`

**Solusi:**
- Terdapat kesalahan pada bank / payment provider. Anda dapat mencoba kembali setelah beberapa saat.

#### Deny by bank with code `05`, `Do not honor`

**Solusi:**

Pesan kesalahan **Do not Honor (05)** adalah yang paling sering muncul pada transaksi kartu. Pesan terebut menandakan bahwa transaksi yang anda lakukan ditolak oleh bank. Ini menandakan bahwa bank penerbit tidak memvalidasi transaksi anda, biasanya terjadi dikarenakan banyak faktor seperti kesalahan masukan, atau dana nasabah tidak mencukupi, dll

Untuk memperbaiki isu tersebut, pelanggan harus menghubungi bank penerbit dan menjelaskan secara detil apa yang terjadi. Jika masalah sudah selsai pelanggan dapat melakukan kembali transaksi.

#### Gopay failure with response code `900`, `GENERIC_SERVICE_ERROR`

**Solusi:**

Kesalahan pada sisi penyedia layanan pembayaran. Untuk sebagian besar kasus, dapat dipulihkan. Coba lagi nanti.

<hr>

Untuk detail kode kesalahan anda dapat mengunjungi halaman [Kode Kesalahan dan Kode Respon](https://api-docs.midtrans.com/#status-code)