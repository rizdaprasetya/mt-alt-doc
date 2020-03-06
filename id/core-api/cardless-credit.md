<H1> Integrasi Cardless Credit </H1>
Dengan menggunakan metode pembayaran cardless credit, pelanggan anda akan mempunyai pilihan untuk melakukan pembayaran kredit tanpa harus memiliki kartu kredit. Midtrans akan mengirimkan notifikasi pemberitahuan secara real time setelah pelanggan anda menyelesaikan pembayarannya pada halaman website penyedia layanan kredit tanpa kartu.

Saat ini Midtrans telah bekerja sama dengan layanan kredit tanpa kartu, diantaranya adalah

<img width="242px" height="127px" src="./../../asset/image/coreapi/akulaku_logo.svg" />
   
Proses intergarsi akan dijelaskan berikut ini.
<details>
<summary><b>Diagram sequence alur transaksi</b></summary>
<article>

![Carless Credit Payment Flow](./../../asset/image/coreapi/seq_cardless_credit.png)
</article>
</details>

#### Mode Sandbox
Untuk memudahkan testing proses integrasi, semua langkah di bawah menggunakan mode [Sandbox Midtrans](https://account.midtrans.com/), bukan mode Production. Pastikan Anda sudah mengubah mode Sandbox pada dashboard Midtrans anda sebelum mendapatkan Server Key dan Client Key. Dijelaskan pada Langkah [`Getting Started - Preparation`](/id/midtrans-account/overview.md)

Server Key dan Client Key bisa didapatkan melalui menu `Settings` **->** `Access Keys`.

?>**Info:**
[Melihat informasi Access key](/id/midtrans-account/overview?id=retrieving-api-access-keys)

### Langkah Integrasi
1. Kirim data traksaksi ke API Charge.
2. Mengarahkan pelanggan anda menuju website penyedia layanan.
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
#### **Akulaku**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "akulaku",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
<!-- tabs:end -->

?>**Opsional:**
anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.

#### Response Charge API
Anda akan mendapat response API seperti berikut:
<!-- tabs:start -->
#### **Akulaku**
```json
{
    "status_code": "201",
    "status_message": "Success, Akulaku transaction is created",
    "transaction_id": "fa05cba0-8ea3-4e46-a2b1-daea2a01785c",
    "order_id": "order-101-1578567480",
    "redirect_url": "https://api.sandbox.midtrans.com/v2/akulaku/redirect/fa05cba0-8ea3-4e46-a2b1-daea2a01785c",
    "merchant_id": "G812785002",
    "gross_amount": "11000.00",
    "currency": "IDR",
    "payment_type": "akulaku",
    "transaction_time": "2020-01-09 17:58:00",
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
    \"status_code\": \"201\",
    \"status_message\": \"Success, Akulaku transaction is created\",
    \"transaction_id\": \"fa05cba0-8ea3-4e46-a2b1-daea2a01785c\",
    \"order_id\": \"order-101-1578567480\",
    \"redirect_url\": \"https://api.sandbox.midtrans.com/v2/akulaku/redirect/fa05cba0-8ea3-4e46-a2b1-daea2a01785c\",
    \"merchant_id\": \"G812785002\",
    \"gross_amount\": \"11000.00\",
    \"currency\": \"IDR\",
    \"payment_type\": \"akulaku\",
    \"transaction_time\": \"2020-01-09 17:58:00\",
    \"transaction_status\": \"pending\",
    \"fraud_status\": \"accept\"
}
```
Jika response yang didapatkan seperti itu, maka perlu dibersihkan terlebih dahulu sehingga menjadi seperti ini.

```json
{
    "status_code": "201",
    "status_message": "Success, Akulaku transaction is created",
    "transaction_id": "fa05cba0-8ea3-4e46-a2b1-daea2a01785c",
    "order_id": "order-101-1578567480",
    "redirect_url": "https://api.sandbox.midtrans.com/v2/akulaku/redirect/fa05cba0-8ea3-4e46-a2b1-daea2a01785c",
    "merchant_id": "G812785002",
    "gross_amount": "11000.00",
    "currency": "IDR",
    "payment_type": "akulaku",
    "transaction_time": "2020-01-09 17:58:00",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
Kemudian dilakukan decode dari json tersebut sehingga bisa di baca oleh PHP. Berikut hasil `decode_response` tersebut:

```json
(
    [status_code] => 201
    [status_message] => Success, Akulaku transaction is created
    [transaction_id] => fa05cba0-8ea3-4e46-a2b1-daea2a01785c
    [order_id] => order-101-1578567480
    [redirect_url] => https://api.sandbox.midtrans.com/v2/akulaku/redirect/fa05cba0-8ea3-4e46-a2b1-daea2a01785c
    [merchant_id] => G812785002
    [gross_amount] => 11000.00
    [currency] => IDR
    [payment_type] => akulaku
    [transaction_time] => 2020-01-09 17:58:00
    [transaction_status] => pending
    [fraud_status] => accept
)
```

Sekarang kita dapat menggunakan response tersebut untuk memberikan informasi kepada customer.



### 4. Menerima Notifikasi HTTP
Notifikasi HTTP dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan `transaction_status`, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi *success* atau *expired* (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.

Request HTTP POST dengan body JSON akan dikirimkan ke `notification url` Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), berikut contoh body JSON yang akan diterima Merchant:
<!-- tabs:start -->
#### **Akulaku**
```json
{
  "transaction_time": "2020-01-09 17:58:00",
  "transaction_status": "settlement",
  "transaction_id": "fa05cba0-8ea3-4e46-a2b1-daea2a01785c",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "331d8619f0c53ce97abf4cfc91fae8d8d0b11da1640b5bb136b0cfbc0da161d50fc6d0dd0d7f893977881710a2d2c174d9e036aaaa772e80fdeac6e9fb60e6b9",
  "settlement_time": "2020-01-09 18:00:48",
  "payment_type": "akulaku",
  "order_id": "order-101-1578567480",
  "merchant_id": "G812785002",
  "gross_amount": "11000.00",
  "fraud_status": "accept",
  "currency": "IDR"
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
