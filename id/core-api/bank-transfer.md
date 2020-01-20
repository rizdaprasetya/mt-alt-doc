<H2> Integrasi Transfer Bank </H2>
Salah satu metode pembayaran yang ditawarkan Midtrans adalah Transfer Bank. Dengan menggunakan metode pembayaran ini, customer akan mempunyai pilihan untuk melakukan pembayaran melalui transfer bank dan Midtrans akan mengirimkan notifikasi pemberitahuan secara real time setelah customer menyelesaikan pembayarannya.

Saat ini, Midtrans telah terintegrasi dengan 4 metode pembayaran transfer bank yang berbeda:


<img width="140px" height="50px" src="./../../asset/image/coreapi/BCA_logo.svg" /> <img width="140px" height="50px" src="./../../asset/image/coreapi/BNI_logo.svg" /> <br>
<img width="170px" height="50px" src="./../../asset/image/coreapi/Bank_Mandiri_logo.svg" /> <img width="180px" height="50px" src="./../../asset/image/coreapi/PermataBank_logo.svg" />

Proses integrasi dasar untuk pembayaran Tranfer Bank akan dijelaskan di bawah.

?> Sebelum melakukan proses integrasi, pastikan anda sudah memiliki [Akun Midtrans](/id/midtrans-account/overview).

## Langkah-langkah integrasi
1. Kirim data traksaksi ke API Charge.
2. Tampilkan nomor virtual account dan waktu expire.
3. Terima notifikasi transaksi.

<details>
<summary><b>Diagram Sequence</b></summary>
<article>
Gambaran dari flow transaksi dalam sequence diagram:

![bank transfer sequence diagram](./../../asset/image/core_api-sequence_bank_transfer.png)
</article>
</details>

## 1. Kirim Data Traksaksi ke API Charge
Untuk mendapatkan *virtual account* *Request API charge* akan dilakukan melalui *backend Merchant*. *Server Key* (dari [Dashboard](https://dashboard.midtrans.com/) Anda) akan dibutuhkan untuk meng-otentikasi request.


### Charge API request
Berikut contoh dari request API `/charge` dalam CURL, silahkan implementasikan sesuai bahasa pemrograman backend Anda (Anda juga bisa cek [library-library pemrograman yang tersedia](/en/developer_resource/library_plugin)).

#### Request Details
Tipe | Nilai
---- | -----
HTTP Method | `POST`
API endpoint | `https://api.sandbox.midtrans.com/v2/charge`

#### Header HTTP
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Request HTTP dengan menggunakan metode Basic Otentikasi. Username diisi dengan data server key Anda. Sedangkan kata sandi dibiarkan kosong. Nilai header *Authorization* diwakili oleh nilai AUTH_STRING. AUTH_STRING adalah string dari Base-64 dimana terdiri dari gabungan antara nama pengguna & kata sandi Anda yang dipisahkan oleh **:** (simbol titik dua).


Atribut          | Deskripsi
---------------- | ---
Server Key       | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md)
`order_id`       | Order ID transaksi yang dapat anda isi sesuai dengan kebutuhan anda
`gross_amount`   | Total nilai transaksi
`payment_type`   | Berikan nilai `bank_transfer` sebagai metode pembayaran

<!-- tabs:start -->
#### **BCA**

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bank_transfer":{
      "bank": "bca"
  }
}'
```

#### **BNI**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bank_transfer":{
      "bank": "bni"
  }
}'
```

#### **Mandiri Bill**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "echannel",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```

#### **Permata**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "permata",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
<!-- tabs:end -->

?> **Opsional:** Anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.

### Charge API response
Anda akan mendapatkan Respon **API** persis seperti dibawah ini:

<!-- tabs:start -->
#### **BCA**
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "be03df7d-2f97-4c8c-a53c-8959f1b67295",
    "order_id": "1571823229",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:33:49",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bca",
            "va_number": "812785002530231"
        }
    ],
    "fraud_status": "accept"
}
```
Anda akan mendapatkan atribut `va_numbers` yang dapat digunakan untuk melakukan transaksi.


#### **BNI**
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "2194a77c-a412-4fd8-8ec8-121ff64fbfee",
    "order_id": "1571823369",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:08",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bni",
            "va_number": "9888500212345678"
        }
    ],
    "fraud_status": "accept"
}
```
Anda akan mendapatkan atribut `va_numbers` yang dapat digunakan untuk melakukan transaksi.

#### **Mandiri Bill**
```json
{
    "status_code": "201",
    "status_message": "OK, Mandiri Bill transaction is successful",
    "transaction_id": "abb2d93f-dae3-4183-936d-4145423ad72f",
    "order_id": "1571823332",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "echannel",
    "transaction_time": "2019-10-23 16:35:31",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "bill_key": "778347787706",
    "biller_code": "70012"
}
```
Anda akan mendapatkan atribut `bill_key` dan `bill_code` yang dapat digunakan untuk melakukan transaksi.


#### **Permata**
```json
{
    "status_code": "201",
    "status_message": "Success, PERMATA VA transaction is successful",
    "transaction_id": "035ca76c-b814-4264-9e63-68142351df83",
    "order_id": "1571823410",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:49",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "permata_va_number": "850003072869607",
    "merchant_id": "G812785002"
}
```
Anda akan mendapatkan atribut `permata_va_number` yang dapat digunakan untuk melakukan transaksi.

<!-- tabs:end -->
## 2. Tampilkan Nomor Virtual Account dan Waktu Expire.
Anda bisa menggunakan `va_number` yang didapatkan dari respon API untuk menampilkan nomor virtual account.

Secara default expiry time untuk Transfer Bank / VA adalah 24jam, periksa halaman dibawah ini jika anda ingin mengkustomisasi expiry time sesuai kehendak anda.

<div class="my-card">

#### [Set Custom Expiry &#187;](/en/core-api/advanced-features.md?id=)
</div>

## 3. Terima notifikasi transaksi
HTTP notification dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan transaction_status, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi success atau expired (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.
      
Request HTTP POST dengan body JSON akan dikirimkan ke notification url Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), Untuk lebih detail silahkan ikuti panduan dibawah ini:

<div class="my-card">

#### [Handling Webhook HTTP Notification &#187;](/en/)
</div>

## Specify VA Number
Nomor virtual account berisi company code dan unique code. Contoh VA Number : `{91012}{12435678}` bagian pertama adalah *company code* dan bagian kedua adalah *unique code*. Hanya unique code yang bisa di kustomisasi untuk pembayaran bank **BCA**, **BNI** dan **Permata** (hanya untuk transaksi b2b).

* Nilai unique code hanya dapat diisi dengan angka.
* Setiap bank memiliki aturan dan spesifikasi custom VA yang berbeda. Mohon untuk melihat dokumentasi bank yang akan digunakan sebelum melakukan custom va.
* Jika nomor VA yang direquest sudah digunakan untuk transaksi lain, maka akan ditampilkan unique code secara random.
* Jika nomor VA yang direquest lebih panjang dari yang dibutuhkan, maka angka yang tidak perlu akan dipangkas.
* Jika nomor VA yang direquest lebih pendek dari yang dibutuhkan, maka nomor tersebut akan diawali dengan nol.
* Jika anda melakukan request charge dengan custom VA sebelumnya dan transaksi sebelumnya belum dilakukan pembayaran atau `/cancel` transaksi, maka Midtrans akan memberikan random unique VA Number.

Untuk bank transfer secara default Midtrans akan memberikan nomor virtual account secara acak. Dalam beberapa situasi anda memerlukan custom VA silahkan menambahkan parameter dibawah ini pada saat melakukan [API Request](/en/core-api/bank-transfer.md?id=charge-api-request).

<!-- tabs:start -->
#### **BCA**
```javascript
...
  "bank_transfer":{
    "bank": "bca",
    "va_number": "12345678911",
    "sub_company_code": "00000" //NOTE: Don't use it if you don't know
  }
...
```

#### **BNI**
```javascript
...
  "bank_transfer":{
    "bank": "bni",
    "va_number": "12345678"
  }
...
```

#### **Permata**
```javascript
...
  "bank_transfer":{
    "bank": "permata",
    "va_number": "1234567890"
  }
...
```
<!-- tabs:end -->

Parameter | Type | Required? | Description
--- | --- | --- | ---
BCA `va_number`| String | (optional) | Panjang nilai custom VA harus 1 - 11 digit angka.
BCA `sub_company_code` | String | (optional) | Kode untuk BCA sub company <br>Catatan: Abaikan jika anda tidak mengetahuinya.
Permata `va_number` | String | (optional) | Panjang nilai custom VA harus 10 digit angka. Hanya untuk tipe VA B2B.
BNI `va_number` | String | (optional)| Panjang nilai custom VA harus 1 - 8 digit angka

?> Pada mode Production, tidak semua Bank dapat dilakukan custom VA. Fitur custom VA bergantung dengan perjanjian kerjasama yang anda lakukan dengan team Midtrans. Silahkan konsultasikan dengan team bisnis kami.

## Deskripsi

Nilai `transaction_status` dalam transaksi transfer bank:


| Transaction Status | Description |
| ------------------ | ----------- |
| `settlement` | Transaksi sukses, customer telah berhasil menyelesaikan/membayar transaksi. |
| `pending` | Transaksi telah berhasil dibuat VAnya tetapi belum dibayarkan oleh customer.|
| `expire` | Transaksi gagal karena customer tidak menyelesaikan pembayaran dalam waktu tertentu. |
| `cancel` | Transaksi dibatalkan oleh Merchant. |
| `deny` | Bank menolak transaksi tersebut. |

Link: [*Definisi lebih detail mengenai transaction_status*](https://api-docs.midtrans.com/#transaction-status)

## Langkah selanjutnya:

<div class="my-card">

#### [Fitur lain Core API &#187;](/en/core-api/advanced-feature)
</div>

For more detail: [Dokumentasi lengkap Core API &#187;](https://api-docs.midtrans.com/)