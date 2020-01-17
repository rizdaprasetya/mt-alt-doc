<H1> Integrasi Convenience Store </H1>
Dengan menggunakan metode pembayaran Convenience Store, pelanggan anda akan mempunyai pilihan untuk melakukan pembayaran melalui kasir convenience store. Midtrans akan mengirimkan notifikasi pemberitahuan secara real time setelah pelanggan anda menyelesaikan pembayarannya.

Saat ini Midtrans telah bekerja sama dengan beberapa Convenience Store, diantaranya adalah

<img width="170px" height="50px" src="./../../asset/image/coreapi/alfamart_logo.svg" />
<img width="170px" height="50px" src="./../../asset/image/coreapi/indomaret_logo.png" />
   

Proses intergarsi akan dijelaskan berikut ini.
<details>
<summary><b>Diagram sequence alur transaksi</b></summary>
<article>

![Direct Debit Payment Flow](./../../asset/image/coreapi/seq_cstore.png)

</article>
</details>

#### Mode Sandbox
Untuk memudahkan testing proses integrasi, semua langkah di bawah menggunakan mode [Sandbox Midtrans](https://account.midtrans.com/), bukan mode Production. Pastikan Anda sudah mengubah mode Sandbox pada dashboard Midtrans anda sebelum mendapatkan Server Key dan Client Key. Dijelaskan pada Langkah [`Getting Started - Preparation`](/id/midtrans-account/overview.md)

Server Key dan Client Key bisa didapatkan melalui menu `Settings` **->** `Access Keys`.

?>**Info:**
[Melihat informasi Access key](/id/midtrans-account/overview?id=retrieving-api-access-keys)

### Langkah Integrasi
1. Kirim data traksaksi ke API Charge.
2. Menampilkan `payment_code` ke halaman *frontend*.
3. Terima notifikasi transaksi.


Request API charge akan dilakukan melalui backend Merchant. Server Key (dari Dashboard Anda) akan dibutuhkan untuk meng-[otentikasi request](https://api-docs.midtrans.com/#http-s-header).

#### Request Details
Tipe | Nilai
---- | -----
HTTP Method | `POST`
API endpoint | `https://api.sandbox.midtrans.com/v2/charge`

#### Headers HTTP
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Request HTTP dengan menggunakan metode Basic Otentikasi. Username diisi dengan data server key Anda. Sedangkan kata sandi dibiarkan kosong. Nilai header *Authorization* diwakili oleh nilai AUTH_STRING. AUTH_STRING adalah string dari Base-64 dimana terdiri dari gabungan antara nama pengguna & kata sandi Anda yang dipisahkan oleh **:** (simbol titik dua).

### 1. Mengirim Data Traksaksi ke API Charge

#### Request API Charge
Berikut contoh dari request API `/charge` dalam Curl, silahkan implementasikan sesuai bahasa pemrograman backend Anda (Anda juga bisa cek library-library pemrograman yang tersedia).
<!-- tabs:start -->
#### **Alfamart**

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "cstore",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "cstore" : {
    "store" : "alfamart",
    "message" : "Messeage ",
    "alfamart_free_text_1": "1st row of receipt,",
    "alfamart_free_text_2": "This is the 2nd row,",
    "alfamart_free_text_3": "3rd row. The end."
  }
}'
```
#### Table deskripsi body JSON Alfamart
Atribut JSON         | Tipe data  | Wajib  | Deskripsi
---------------------| ---------- | ------ | -----------
store                | String(20) | Ya     | Nama store                                      
message              | String(20) | Tidak  | Untuk menampilkan pesan pada komputer kasir
alfamart_free_text_1 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart
alfamart_free_text_2 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart
alfamart_free_text_2 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart



#### **Indomaret**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "cstore",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "cstore" : {
    "store" : "indomaret",
    "message" : "Message to display"
  }
}'
```
#### Table deskripsi body JSON Indomaret
Atribut JSON         | Tipe data  | Wajib  | Deskripsi
---------------------| ---------- | ------ | -----------
store                | String(20) | Ya     | Nama store                                      
message              | String(20) | Tidak  | Untuk menampilkan pesan pada komputer kasir

<!-- tabs:end -->

?>**Opsional:**
anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.

#### Response Charge API
Anda akan mendapat response API seperti berikut:
<!-- tabs:start -->
#### **Alfamart**
```json
{
    "status_code": "201",
    "status_message": "Success, cstore transaction is successful",
    "transaction_id": "d615df87-c96f-4f5c-9d35-2d740d54c1a9",
    "order_id": "order-101o-1578557780",
    "merchant_id": "G812785002",
    "gross_amount": "162500.00",
    "currency": "IDR",
    "payment_type": "cstore",
    "transaction_time": "2020-01-09 15:16:19",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "payment_code": "8127740588870520",
    "store": "alfamart"
}
```

#### **Indomaret**
```json
{
  "status_code": "201",
  "status_message": "Success, cstore transaction is successful",
  "transaction_id": "9b3951a4-da50-4089-86df-161d3e9251df",
  "order_id": "order-101n-1578557719",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "payment_type": "cstore",
  "transaction_time": "2020-01-09 15:15:19",
  "transaction_status": "pending",
  "merchant_id": "G812785002",
  "payment_code": "578112341234",
  "store": "indomaret"
}
```
<!-- tabs:end -->
Anda akan mendapatkan atribut `payment_code` yang dapat ditampilkan ke halaman *frontend* sebagai kode pembayaran pada kasir convenince store.

### 2. Menampilkan payment code ke halaman frontend.
Anda dapat menggunakan atribut `payment_code` yang didapatkan dari respons API untuk ditampilkan ke halaman frontend website atau aplikasi anda.

### 3. Menerima Notifikasi HTTP

Notifikasi HTTP dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan `transaction_status`, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi *success* atau *expired* (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.

Request HTTP POST dengan body JSON akan dikirimkan ke `notification url` Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), berikut contoh body JSON yang akan diterima Merchant:
<!-- tabs:start -->
#### **Alfamart**
```json
{
  "transaction_time": "2020-01-09 15:16:19",
  "transaction_status": "settlement",
  "transaction_id": "d615df87-c96f-4f5c-9d35-2d740d54c1a9",
  "store": "alfamart",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "6fd1210e6e4b60d7cc3862780016b110f9d3d56e291172c69b0bbfd60d380be22ad02f1d48bbabeeb81a882d7abbd3d6fa94207bede9132adc1a773489dfd0c8",
  "settlement_time": "2020-01-09 15:20:09",
  "payment_type": "cstore",
  "payment_code": "8127740588870520",
  "order_id": "order-101o-1578557780",
  "merchant_id": "G812785002",
  "gross_amount": "162500.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

#### **Indomaret**
```json
{
  "transaction_time": "2020-01-09 15:15:19",
  "transaction_status": "settlement",
  "transaction_id": "9b3951a4-da50-4089-86df-161d3e9251df",
  "store": "indomaret",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "82faa4ab71128bf8f1b13359003688409e5656bae0bb2f39669f7685e3af26ce6f676384fd05cca9349d155ab8b08789761cb399e5530bf2e68d414b8856be0d",
  "settlement_time": "2020-01-09 15:22:07",
  "payment_type": "cstore",
  "payment_code": "578112341234",
  "order_id": "order-101n-1578557719",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "approval_code": "45682001084123432248"
}
```
<!-- tabs:end -->

### Mengubah ke Prodcution
Untuk menggunakan environment production (menerima pembayaran dari pelanggan sesungguhnya), silahkan pastikan:

   * Ubah domain API URL dari `api.sandbox.midtrans.com` menjadi `api.midtrans.com`
   * Ubah Client Key dan Server Key dari Dashboard sandbox, dengan key dari Dashboard production.


## Langkah selanjutnya:
<br>

<div class="my-card">

#### [Taking Action of Payment &#187;](/en/)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action &#187;](/en/)
</div>

<hr>
