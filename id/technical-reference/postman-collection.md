[Postman](https://www.getpostman.com/) adalah aplikasi yang memudahkan Anda mengirim dan menguji permintaan REST API dengan cepat tanpa harus mengerti bahasa pemrograman yang rumit.

Midtrans menyediakan Koleksi API Postman yang dapat Anda impor kemudian Anda dapat mencoba API Midtrans dalam waktu yang singkat.

## Koleksi API Postman Midtrans
Koleksi Postman berikut akan mencakup API berikut: 
* [Snap API](http://snap-docs.midtrans.com)
* [Core API](http://api-docs.midtrans.com)

### Link Download
- [Download dari Postman](https://app.getpostman.com/run-collection/af068be08b5d1a422796)
- Github : [Link Repositori](https://github.com/midtrans/Midtrans-Payment-API-Postman-Collections)


### Cara Penggunaan

1. Download dan buka aplikasi [Postman](https://www.getpostman.com)
2. Lakukan Impor:
    - Gunakan alamat URL dibawah ini untuk melakukan impor/download koleksi Postman:

        [![Jalankan di aplikasi Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/af068be08b5d1a422796)
3. [Daftar akun Midtrans](/en/midtrans-account/overview)
4. [Login](http://dashboard.midtrans.com) ke akun Midtrans, pindah ke environment **Sandbox**, Lalu pilih menu `Settings > Access Keys`. Salin **Server Key** anda
5. Pada aplikasi Postman, buka folder **Midtrans Payment API** lalu pilih salah satu API request yang ingin anda coba, Klik tab `Authorization`
6. Pilih **Type** menjadi `Basic Auth`, isi **Username** menggunakan **Server Key** anda (seperti `SB-Mid-server-abc123cde456`). Anda dapat mengkosongkan kolom **Password**, Lalu klik tombol **Update Request**

![Postman Usage](./../../asset/image/tech-ref-postman-collection.png)

7. Sekarang anda bisa menekan tombol `Save` dan menekan tombol `Send` pada request. Jika anda lakukan benar, anda akan mendapatkan repon dari Midtrans.

### Mode Production

Semua request URL Endpoint yang ada pada koleksi Postman adalah untuk transaksi Sandbox. Jika anda ingin merubah ke mode `Productions` anda dapat mengganti URL Endpoint pada kolom URL di aplikasi Postman.

`https://api.sandbox.midtrans.com/../..`
menjadi `https://api.midtrans.com/../..`

Cukup dengan menghapus kata `sandbox.` pada kolom URL. Kemudian update Server Key anda dengan Server Key akun production.

### Troubleshooting

Jika anda mendapatkan pesan seperti dibawah ini: 
```javascript
{
  "error_messages": [
    "Access denied due to unauthorized transaction, please check client or server key",
    "Visit https://snap-docs.midtrans.com/#request-headers for more details"
  ]
}
```
- Pastikan kembali langkah yang anda lakukan pada 4-7 sudah sesuai dengan instruksi seperti pada halaman berikut **[Instruksi Penggunaan](#cara-penggunaan)**
- Pastikan kembali anda menggunakan **Server Key** yang sesuai dengan environment yang akan anda gunakan Production/Sandbox.

## Koleksi API Postman Midtrans Iris
This Postman collection covers the Iris API

### Cara Penggunaan

1. Download dan buka aplikasi [Postman](https://www.getpostman.com)
2. Import:
    - Gunakan alamat URL dibawah ini untuk melakukan impor/download koleksi Postman:

	[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f05d0d597076943acbb3)
3. [Login](https://app.sandbox.midtrans.com/iris/) ke Iris Midtrans Sandbox, click username/email anda di kanan atas. Copy **API KEY** anda.
4. Di dalam aplikasi Postman, pilih 1 request yang ingin dicoba, click tab `Authorization` (di samping tab Headers)
5. Pilih **Type** sebagai `Basic Auth`, isi **Username** dengan **API Key** anda (contohnya seperti ini `IRIS-abcdeabc-23ed-2132-xxxx-xxxxxxxxxx`). Biarkan field **Password** kosong, click **Update Request**
6. Sekarang anda bisa menekan tombol `Save` dan menekan tombol `Send` pada request. Jika anda lakukan benar, anda akan mendapatkan repon dari Midtrans.