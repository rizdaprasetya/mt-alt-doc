<H1> Integrasi Direct Debit </H1>
Dengan menggunakan metode pembayaran Direct Debit, pelanggan akan mempunyai pilihan untuk melakukan pembayaran melalui website bank dan Midtrans akan mengirimkan notifikasi pemberitahuan secara real time setelah pelanggan menyelesaikan pembayarannya.

Saat ini, Midtrans telah terintegrasi dengan 4 metode pembayaran Direct Debit yang berbeda:

<img width="170px" height="50px" src="./../../asset/image/coreapi/bca_klikpay.svg" /> <img width="170px" height="50px" src="./../../asset/image/coreapi/cimb_clicks.svg" /> <br>
<img width="170px" height="50px" src="./../../asset/image/coreapi/danamon.png" /> <img width="180px" height="40px" src="./../../asset/image/coreapi/epay_bri.png" />
   
Proses integrasi dasar untuk pembayaran Direct Debit akan dijelaskan di bawah.
<details>
<summary><b>Diagram sequence alur transaksi</b></summary>
<article>

![Direct Debit Payment Flow](./../../asset/image/coreapi/direct_debit.png)
</article>
</details>

#### Mode Sandbox
Untuk memudahkan testing proses integrasi, semua langkah di bawah menggunakan mode [Sandbox Midtrans](https://account.midtrans.com/), bukan mode Production. Pastikan Anda sudah mengubah mode Sandbox pada dashboard Midtrans anda sebelum mendapatkan Server Key dan Client Key. Dijelaskan pada Langkah [`Getting Started - Preparation`](/id/midtrans-account/overview.md)

Server Key dan Client Key bisa didapatkan melalui menu `Settings` **->** `Access Keys`.

?>**Info:**
[Melihat informasi Access key](/id/midtrans-account/overview?id=retrieving-api-access-keys)

### Langkah Integrasi
1. Kirim data traksaksi ke API Charge.
2. Mengarahkan pelanggan anda menuju website bank.
3. Membuat landing page setelah pelanggan anda menyelesaikan pembayaran.
4. Terima notifikasi transaksi.


Request API charge akan dilakukan melalui backend Merchant. Server Key (dari Dashboard Anda) akan dibutuhkan untuk meng-[otentikasi request](https://api-docs.midtrans.com/#http-s-header).

#### Request Details
Tipe | Nilai
---- | -----
HTTP Method | `POST`
API endpoint (Sandbox) | `https://api.sandbox.midtrans.com/v2/charge`
API endpoint (Production) | `https://api.midtrans.com/v2/charge`

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
#### **BCA Kilkpay**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bca_klikpay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bca_klikpay": {
      "description": "Pembelian Barang"
  }
}'
```

#### **CIMB Clicks**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "cimb_clicks",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "cimb_clicks": {
      "description": "Purchase of a Food Delivery"
  }
}'
```

#### **Danamon Online Banking**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "danamon_online",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
#### **e-Pay BRI**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bri_epay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
<!-- tabs:end -->

?>**Opsional:**
Anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.

#### Response Charge API
Anda akan mendapat response API seperti berikut:
<!-- tabs:start -->
#### **BCA Kilkpay**
```json
{
    "status_code": "201",
    "status_message": "OK, BCA KlikPay transaction is successful",
    "transaction_id": "d19a4bcd-ae30-49dc-bde7-57749aede090",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bca/klikpay/redirect/d19a4bcd-ae30-49dc-bde7-57749aede090",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bca_klikpay",
    "transaction_time": "2019-12-12 11:03:55",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "redirect_data": {
        "url": "https://simulator.sandbox.midtrans.com/bca/klikpay/index",
        "method": "post",
        "params": {
            "klikPayCode": "03KHAN816197673",
            "transactionNo": "92396",
            "totalAmount": "44000",
            "currency": "IDR",
            "payType": "01",
            "callback": "https://example.com?id=d19a4bcd-ae30-49dc-bde7-57749aede090",
            "transactionDate": "11/11/2019 11:03:55",
            "descp": "Pembelian Barang",
            "miscFee": "0.00",
            "signature": "239297204"
        }
    }
}
```

#### **CIMB Clicks**
```json
{
    "status_code": "201",
    "status_message": "Success, CIMB Clicks transaction is successful",
    "redirect_url": "https://api.sandbox.veritrans.co.id/cimb-clicks/request?id=2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "transaction_id": "2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "order_id": "order-101i-1576124787",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "cimb_clicks",
    "transaction_time": "2019-11-11 11:26:27",
    "transaction_status": "pending",
    "merchant_id": "G812785002"
}
```

#### **Danamon Online Banking**
```json
{
    "status_code": "201",
    "status_message": "Success, Danamon Online transaction is successful",
    "transaction_id": "9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "order_id": "order-101p-1576124871",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v2/danamon/online/redirect/9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "danamon_online",
    "transaction_time": "2019-11-11 11:27:50",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
#### **e-Pay BRI**
```json
{
    "status_code": "201",
    "status_message": "Success, BRI E-Pay transaction is successful",
    "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bri/epay/redirect/01c03b08-5e77-40d3-b1df-972f20a92e09",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bri_epay",
    "transaction_time": "2019-11-11 15:09:35",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
<!-- tabs:end -->
Anda akan mendapatkan atribut `redirect_url` yang dapat digunakan untuk redirect ke halaman website pembayaran *credit cardless*.

### 2. Menampilkan payment code ke halaman frontend.
Anda dapat menggunakan `redirect_url` yang didapatkan dari respons API untuk mengarahkan pelanggan ke website pembayaran *credit cardless*.

Kemudian pelanggan dapat diarahkan melalui server-side redirect, menggunakan javascript seperti `window.location = [URL REDIRECT]`, atau menggunakan link HTML `<a href="[REDIRECT URL]"> Bayar disini! </a>`.

### 3. Membuat Landing Page setelah pelanggan menyelesaikan pembayaran
Setelah pelanggan menyelesaikan pembayaran melalui halaman website pembayaran *credit cardless* , pelanggan akan diarahkan ke *endpoint Finish Redirect URL* yang dapat dikonfigurasi pada MAP (dashboard Midtrans).

Anda harus login ke MAP. Pilih menu `Setting` **->** `configuration`, dan isi *Finish Redirect URL* dengan *endpoint landing page* Anda.

![Finish redirect url](./../../asset/image/coreapi/direct_debit_map.png)

Midtrans akan mengirimkan response yang perlu didapatkan di script pada Finish Redirect URL. Pastikan endpoint Finish Redirect URL anda dapat menerima POST. Contoh code dibawah dibuat dalam PHP native. Silahkan sesuaikan dengan environment website anda.
```php
<?php
    $raw_response = $_POST['response']; //get the json response
    $response = preg_replace('/\\\\/', '', $_POST['raw_response']); //clean up response from backslash
    $decoded_response = json_decode($response);
    $order_id = $decoded_response->order_id;//how to access
?>
```
Response akan dikirim dalam format JSON, dalam beberapa kasus terjadi adanya penambahakn backslash () dan tanda petik ("). Berikut contoh response yang mungkin diterima.

```json
{
    \"status_code\" : \"200\",
    \"status_message\" : \"Success, transaction is found\",
    \"transaction_id\" : \"58b48d1c-3e51-46f8-a2fb-ad5fa668f534\",
    \"order_id\" : \"34\",
    \"gross_amount\" : \"19999998.00\",
    \"payment_type\" : \"cimb_clicks\",
    \"transaction_time\" : \"2018-01-26 08:57:45\",
    \"transaction_status\" : \"settlement\",
    \"approval_code\" : \"1516957074590\",
    \"signature_key\" : \"30b048ffff95e08c34cf265268224f0b6460d7716b3d70424a7203609a78b335280fe6137a9938cd3af24533fdafcfe8771203f6f30f21fd141a378bba1685fb\"
}
```
Jika response yang didapatkan seperti itu, maka perlu dibersihkan terlebih dahulu sehingga menjadi seperti ini.

```json
{
    "status_code" : "200",
    "status_message" : "Success, transaction is found",
    "transaction_id" : "58b48d1c-3e51-46f8-a2fb-ad5fa668f534",
    "order_id" : "34",
    "gross_amount" : "19999998.00",
    "payment_type" : "cimb_clicks",
    "transaction_time" : "2018-01-26 08:57:45",
    "transaction_status" : "settlement",
    "approval_code" : "1516957074590",
    "signature_key" : "30b048ffff95e08c34cf265268224f0b6460d7716b3d70424a7203609a78b335280fe6137a9938cd3af24533fdafcfe8771203f6f30f21fd141a378bba1685fb"
}
```
Kemudian dilakukan decode dari json tersebut sehingga bisa di baca oleh PHP. Berikut hasil `decode_response` tersebut:

```json
(
   [status_code] => 200
   [status_message] => Success, transaction is found
   [transaction_id] => 58b48d1c-3e51-46f8-a2fb-ad5fa668f534
   [order_id] => 34
   [gross_amount] => 19999998.00
   [payment_type] => cimb_clicks
   [transaction_time] => 2018-01-26 08:57:45
   [transaction_status] => settlement
   [approval_code] => 1516957074590
   [signature_key] => 30b048ffff95e08c34cf265268224f0b6460d7716b3d70424a7203609a78b335280fe6137a9938cd3af24533fdafcfe8771203f6f30f21fd141a378bba1685fb
)
```
Sekarang kita dapat menggunakan response tersebut untuk memberikan informasi kepada customer.



### 4. Menerima Notifikasi HTTP
Notifikasi HTTP dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan `transaction_status`, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi *success* atau *expired* (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.

Request HTTP POST dengan body JSON akan dikirimkan ke `notification url` Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), berikut contoh body JSON yang akan diterima Merchant:
<!-- tabs:start -->
#### **BCA Kilkpay**
```json
{
  "transaction_time": "2019-12-11 16:20:48",
  "transaction_status": "settlement",
  "transaction_id": "34be81bd-1e4f-46b6-80f0-3e0f29776c63",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f75192079b47bb2a55d8307d443388f418d139bd13b447b2521fd9fe7b33ffddf9435afaa212f4ef67452fb2f2f109c1852ddd7567bb2d74cefeb2f5aa995de6",
  "settlement_time": "2019-12-11 16:21:38",
  "payment_type": "bca_klikpay",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "112233"
}
```

#### **CIMB Clicks**
```json
{
  "transaction_time": "2019-12-11 16:23:18",
  "transaction_status": "settlement",
  "transaction_id": "89cb0bfd-675b-4d4a-942c-7e19ba66d442",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "65e02e423cca2618a8d9ec201768438684bbf7218b27ab6f05a2197ce5b3c44fc9f4a157dce5a42d49f3ed6b88ac7a163f7e6b532d876d57a4a9297c5802639c",
  "settlement_time": "2019-12-11 16:24:00",
  "payment_type": "cimb_clicks",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "approval_code": "1576142640542"
}
```

#### **Danamon Online Banking**
```json
{
   "transaction_time": "2019-12-11 16:25:34",
   "transaction_status": "settlement",
   "transaction_id": "e7eb187b-c54c-4960-8558-a995253d61ca",
   "status_message": "midtrans payment notification",
   "status_code": "200",
   "signature_key": "928775783adf67b0578340dc616a30d2c2b307350475fbfbcc5bc1a5ac94892bb6bb972b7fe2394509c32fd431fd3494a358f25e24456f7414b473989ab1e66f",
   "settlement_time": "2019-12-11 16:25:49",
   "payment_type": "danamon_online",
   "order_id": "order-101p-1576142735",
   "merchant_id": "G812785002",
   "gross_amount": "44000.00",
   "fraud_status": "accept",
   "currency": "IDR",
   "approval_code": "uRaSu1XAnIm56i"
 }
```
#### **e-Pay BRI**
```json
{
  "transaction_time": "2019-11-11 15:09:35",
  "transaction_status": "settlement",
  "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f0abe6507f42019839e028f9c5da723ff7c220c962af1f1f8fc25ac5a773c1123fd680602443e7cece83d059b9f9c13078d74cc4a79948214059394ec5d18c4b",
  "settlement_time": "2019-11-11 15:13:51",
  "payment_type": "bri_epay",
  "order_id": "order-101h-1576483775",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "1576483775235"
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
