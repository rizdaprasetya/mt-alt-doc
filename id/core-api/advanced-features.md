Pada halaman ini akan menjelaskan opsional parameter yang ada pada layanan Core API. Core API dapat membantu anda dalam integrasi dengan Midtrans sesuai dengan alur bisnis pembayaran yang anda inginkan.

## Umum
### Parameter Rekomendasi
Kami sangat menyarankan anda untuk mengirim detail-detail informasi mengenai transaksi yang anda kirim ke Midtrans. Dengan begitu data dashboard dan laporan transaksi anda akan sangat informatif dan memudahkan anda dalam membaca detail setiap transaksi.

Anda dapat menambahkan data `transaction_details` seperti data `customer_details` dan `item_details`. 

Dibawah ini akan menjelaskan bagaimana cara menambahkan detail informasi pada parameter JSON yang akan dikrim melalui [Langkah Request API](/id/core-api/credit-card.md?id=request-charge-api)):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "order102",
    "gross_amount": 13000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}
```

#### **Contoh dalam CURL**

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "order102",
    "gross_amount": 13000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}'
```
<!-- tabs:end -->

Detail Referensi [Dokumentasi Core API](https://api-docs.midtrans.com/#json-object).

### Kustomisasi Waktu Expire Transaksi
Salah satu fitur Core API yang ada pada transaksi adalah melakukan perubahan waktu expire transaksi sesuai dengan kebutuhan anda. Transaksi yang telah melewati batas waktu yang telah ditentukan sebelumnya akan berubah status secara otomatis menjadi `expire` dan pelanggan tidak dapat melakukan pembayaran pada transaksi tersebut. Dibawah ini adalah cara melakukan custom expiry pada semua transaksi, kecuali transaksi kartu kredit:

Berikut adalah contoh Parameter JSONeter yang dikirim pada [Langkah Request API](/id/core-api/bank-transfer.md?id=_1-kirim-data-traksaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
...
  "custom_expiry": {
      "order_time": "2016-12-07 11:54:12 +0700",
      "expiry_duration": 60,
      "unit": "minute"
  }
...
```
#### **Dalam format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "gopay",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "custom_expiry": {
      "order_time": "2016-12-07 11:54:12 +0700",
      "expiry_duration": 60,
      "unit": "minute"
  }
}'
```
<!-- tabs:end -->

| Parameter | Type | Description |
---|---|---
`order_time` | String(50)<br>**optional** |  Format timestamp `yyyy-MM-dd hh:mm:ss Z`. <br>Jika tidak diisi, secara default akan menggunakan nilai pada parameter transaction time sebagai nilai parameter `order_time`
`expiry_duration` | String(50)<br>**required** | Durasi waktu expiry
`unit` | String(50) <br> **required** | Expiry unit. Seperti: `day, hour, minute`. <br>**NOTE:** Jika anda tidak mengisi nilai parameter unit, maka nilai default pada paramaeter unit adalah minute 

### Custom Fields
Fitur Custom field memberikan kebebasan bagi anda yang membutuhkan parameter data / nilai tertentu yang akan dikirim ke *backend* anda melalui HTTP Notifikasi midtrans. Nilai custom field juga akan tampil pada halaman detail transaksi Dashboard Midtrans. Anda dapat mengirim parameter Custom Fields pada saat melakukan API Request ke Midtrans.

Berikut adalah contoh Parameter JSONeter yang dikirim pada [Langkah Request API](/id/core-api/bank-transfer.md?id=_1-kirim-data-traksaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
...
  "custom_field1": "1 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field2": "2 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field3": "3 Anda dapat mengisi dengan nilai yang anda inginkan"
...
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "custom_field1": "1 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field2": "2 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field3": "3 Anda dapat mengisi dengan nilai yang anda inginkan"
}'
```
<!-- tabs:end -->

| Parameter | Tipe | Deskripsi |
--- | --- | ---
custom_field1 | String(255)<br>(***optional***) | Custom field 1 anda dapat mengisi dengan data/nilai yang anda inginkan
custom_field2 | String(255)<br>(***optional***) | Custom field 2 anda dapat mengisi dengan data/nilai yang anda inginkan
custom_field3 | String(255)<br>(***optional***) | Custom field 3 anda dapat mengisi dengan data/nilai yang anda inginkan

### Metadata
Fitur metadata merupakan fitur yang mirip dengan custom filed. Fitur metadata mengizinkan anda untuk menambahkan objek JSON berupa string. Anda juga dapat menggunakan fitur metadata untuk tag transaksi yang didapatkan melalui API get status, atau menambahkan nilai konfigurasi sistem deteksi fraud internal anda.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/bank-transfer.md?id=_1-kirim-data-traksaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
...
  "metadata": {
	"you": "can",
	"put": "any",
	"parameter": "you like"
   }
...
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "metadata": {
	"you": "can",
	"put": "any",
	"parameter": "you like"
   }
}'
```
<!-- tabs:end -->

| Parameter | Tipe | Deskripsi |
--- | --- | ---
metadata | Objek JSON | Object yang menjadi nilai untuk metadata

## Kartu Kredit
### 3 Domain Secure (3DS)
Dalam transaksi kartu kredit terdapat fitur otentikasi kemananan yaitu Three Domain Secure (3DS), anda dapat meng-aktifkan/nonaktifkan 3DS pada transaksi kartu kredit yang dikirim ke Midtrans. Secara default kami sangat menyarankan anda untuk tetap mengaktifkan fitur tersebut demi keamanan transaksi yang lebih baik. Namun jika anda ingin me-nonaktifkan fitur 3DS anda membutuhkan perjanjian khusus kepada Bank Aquiring yang akan menampung transksi kartu kredit Non-3DS anda. Silahkan konsultasikan dengan team Aktivasi Midtrans anda.

Berikut cara mengaktifkan/nonaktifkan fitur 3DS:
* Untuk mengaktifkan fitur 3DS, anda dapat mengisi nilai parameter `authentication` dengan nilai `true`
* Untuk menonaktifkan fitur 3DS, anda dapat mengisi nilai parameter  `authentication` dengan nilai `false`

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
...
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true
  }
...
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true
  }
}'
```
<!-- tabs:end -->

### Mengarahkan Transaksi ke Bank Acquiring Spesifik
Anda dapat menentukan Bank Acquring mana yang dipilih untuk digunakan setiap transaksi tertentu. Dana transaksi akan dialihkan ke acquiring bank tersebut. Silakan konsultasikan dengan Tim Aktivasi Midtrans untuk pemilihan bank yang ingin anda gunakan sebagai acquiring bank.

* Anda dapat menentukan nama bank didalam parameter `bank`

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
	"bank": "bca"
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
	"bank": "bca"
}'
```
<!-- tabs:end -->
> Nilai Valid **bank** : `mandiri, bni, cimb, bca, maybank, bri, or mega`

### Transaksi Recurring / One Click
Melalui fitur recurring / one click memungkinkan pelanggan dan anda memiliki opsi untuk menyimpan informasi kartu kredit yang dapat digunakan secara cepat untuk transaksi berikutnya. Anda tidak perlu khawatir, Midtrans akan menyimpan informasi kartu kredit dengan aman. Untuk menggunakan fitur one click /recurring anda hanya perlu menyimpan nilai `saved_token_id` yang didapatkan melalui respon notifikasi Midtrans dan mengasosiasikan dengan data pelanggan anda.

<details>
<summary><b>Diagram Sequence</b></summary>
<article>
Seluruh ilustrasi proses transaksi Recurring/One Click dapat anda lihat pada diagram sequence dibawah ini:

![one click sequence diagram](../../asset/image/core_api-sequence_one_click.png)
</article>
</details>

#### Mendapatkan *token_id*
Untuk menggunakan fitur one click, Anda membutuhkan nilai dari parameter `token_id` melalui langkah [Mendapatkan Token Kartu](/id/core-api/credit-card.md?id=_1-mendapatkan-token-kartu)

#### Inisialisasi Charge Request Transaksi One Click 
Saat melakukan inisialisasi transaksi one click, Anda dapat menambahkan beberapa atribut pada objek `credit_card`

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<token_id from Get Card Token Step>",
	"authentication": true,
	"save_token_id": true     // <-- Flag untuk mengaktifkan simpan token kartu kredit
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
	"token_id": "<token_id from Get Card Token Step>",
	"authentication": true,
	"save_token_id": true
  }
}'
```
<!-- tabs:end -->

#### Respon Charge One Click
```json
{
    "status_code": "201",
    "status_message": "Success, Credit Card transaction is successful",
    "transaction_id": "47df99ca-f997-41bd-864e-8598ccf2fc27",
    "order_id": "Order-123-1578978260",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v2/token/rba/redirect/481111-1114-47df99ca-f997-41bd-864e-8598ccf2fc27",
    "merchant_id": "G816197673",
    "gross_amount": "10000.00",
    "currency": "IDR",
    "payment_type": "credit_card",
    "transaction_time": "2020-01-14 12:04:20",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "masked_card": "481111-1114",
    "bank": "mandiri",
    "card_type": "credit"
}
```

#### Inisialisasi Membuka Halaman 3DS Transaksi One Click
Pada saat anda mendapatkan repson request transaksi pertama one click anda akan mendapatkan parameter `redirect_url`. Anda diwajibkan untuk menampilkan halaman `redirect_url` kepada pelanggan anda. Untuk menampilkan halaman Otentikasi 3DS pada website anda dengan mudah, Anda dapat menggunakan library javascript [MidtransNew3ds](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js).

Dengan menggunakan salah satu fungsi pada midtrans js `MidtransNew3ds.authenticate` atau `MidtransNew3ds.redirect`. Lalu berikan nilai yang ada pada atribut `redirect_url`. Untuk penjelasan lebih detail silahkan mengunjungi halaman [Implementasi JS 3DS Authenticate](/id/core-api/credit-card.md?id=_3-Membuka-halaman-3DS)

#### Respon JSON pada transaksi pertama One Click 3DS
Atribut JSON | Deskripsi |
--- | --- 
saved_token_id | Token ID dari kartu kredit yang akan digunakan untuk transaksi berikutnya
saved_token_id_expired_at | Masa expire token ID.

Pada saat pertama kali melakukan charge transaksi one click, Anda akan mendapatkan **respon dan notifikasi** seperti dibawah ini:
```json
{
  "status_code": "200",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "0cc39431-4f74-4605-8b6c-4363822fb398",
  "order_id": "1578977094",
  "merchant_id": "G816197673",
  "gross_amount": "200000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2020-01-14 11:44:55",
  "transaction_status": "capture",
  "fraud_status": "accept",
  "approval_code": "1578977095472",
  "eci": "05",
  "masked_card": "481111-1114",
  "bank": "mandiri",
  "card_type": "credit",
  "saved_token_id":"481111xDUgxnnredRMAXuklkvAON1114",
  "saved_token_id_expired_at": "2020-12-31 07:00:00",
  "channel_response_code": "00",
  "channel_response_message": "Approved"
}
```
Anda dapat menyimpan nilai dari parameter `saved_token_id` kedalam database anda.

#### Request Charge Transaksi One Click Selanjutnya
Untuk melakukan charge transaksi one click kedua dan berikutnya, anda harus menambahkan nilai dari parameter `saved_token_id` kedalam parameter `token_id`.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge)):
<!-- tabs:start -->
##### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-103",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "481111xDUgxnnredRMAXuklkvAON1114" // <-- nilai token_id didapatkan dari parameter saved_token_id, respon transaksi pertama one click
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-103",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<nilai saved_token_id dari respon tansaksi pertama One Click>",
  }
}'
```
<!-- tabs:end -->

#### Respon Charge dan Notifikasi Transaksi One Click
Untuk detail respon pada transaksi one click anda dapat mengunjungi halaman [Respon Charge dan Respon Pembayaran Kartu](https://api-docs.midtrans.com/#card-payment-charge-response-and-notifications). Transaksi one click dapat dikatakan berhasi jika sudah mendapatkan status transaksi `capture` dan akan siap menjadi `settlement` pada hari berikutnya.

Anda akan mendapatkan **respon dan notifikasi** seperti dibawah ini:
```json
{
  "status_code": "200",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "139c7a0f-204e-4c88-9c8c-63348b545b99",
  "order_id": "Order-123-1578977940",
  "merchant_id": "G816197673",
  "gross_amount": "10000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2020-01-14 11:58:59",
  "transaction_status": "capture",
  "fraud_status": "accept",
  "approval_code": "1578977940108",
  "masked_card": "481111-1114",
  "bank": "bni",
  "card_type": "credit",
  "channel_response_code": "00",
  "channel_response_message": "Approved"
}
```

Untuk lebih memahami beberapa use case yang dapat terjadi pada transaksi one click, anda dapat [membaca artikel berikut ini](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction).

### Transaksi Recurring Menggunakan API Register Kartu
Melalui fitur recurring memungkinkan pelanggan dan anda memiliki opsi untuk menyimpan informasi kartu kredit yang dapat digunakan secara cepat untuk transaksi berikutnya. Anda tidak perlu khawatir, Midtrans akan menyimpan informasi kartu kredit dengan aman. Untuk menggunakan fitur recurring anda hanya perlu menyimpan nilai `saved_token_id` yang didapatkan melalui respon notifikasi Midtrans dan mengasosiasikan dengan data pelanggan anda.

<details>
<summary><b>Diagram Sequence</b></summary>
<article>
Secara keseluruhan proses pembayaran menggunakan API Register Card dapat anda lihat melalui diagram squence dibawah ini:

![one click sequence diagram](../../asset/image/core_api-sequence_register_card.png)
</article>
</details>

#### Status Metode Register Card
Metode HTTP | API Endpoint |
--- | ---
GET | `https://api.sandbox.midtrans.com/v2/card/register`

#### HTTP Request Register Card
```bash
curl -X GET \
  'https://api.sandbox.midtrans.com/v2/card/register?card_number=5211111111111117&card_exp_month=12&card_exp_year=2021&client_key=<YOUR CLIENT KEY HERE>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'
```
#### Respon API Register Card
Anda akan mendapatkan **Respon API** seperti dibawah ini:

```json
{
    "status_code": "200",
    "saved_token_id": "521111nHlLvTuKywNOOLhTlHZcab1117",
    "transaction_id": "cbd3ff55-2ead-43e9-84c5-5c3b7a8a1814",
    "masked_card": "521111-1117"
}
```
Anda dapat menyimpan nilai dari parameter `saved_token_id` ke dalam database anda.

#### Inisialisasi Untuk Mendapatkan Token Kartu Melalui Register Card
Anda membutuhkan nilai dari parameter `saved_token_id` yang didaptkan dari respon pada saat melakukan [Register Kartu](/id/core-api/advanced-features.md?id=respon-api-register-card).

Untuk mendapatkan `token_id` kartu, kita akan menggunakan fungsi `MidtransNew3ds.getCardToken` pada [MidtransNew3ds JS library](/id/core-api/credit-card.md?id=include-midtrans-js). Yang diimplementasi dengan javascript pada halaman website anda.
```javascript
// contoh input data kartu kredit dari halaman pelanggan
var cardData = {
  "token_id": <saved_token_id from Register Card API Response Step>,
  "card_cvv": 123,
};

// callback functions
var options = {
  onSuccess: function(response){
    // Success to get card token_id, implement as you wish here
    console.log('Success to get card token_id, response:', response);
    var token_id = response.token_id;
    console.log('This is the card token_id:', token_id);
  },
  onFailure: function(response){
    // Fail to get card token_id, implement as you wish here
    console.log('Fail to get card token_id, response:', response);
  }
};

// trigger `getCardToken` function
MidtransNew3ds.getCardToken(cardData, options);
```
Jika semua berjalan dengan baik, maka anda akan mendapatkan nilai `token_id` kartu pada fungsi `onSuccess` yang akan gunakan sebagai salah satau parameter pada saat melakukan [request API `/charge`](/id/core-api/advanced-features.md?id=register-card-initials-send-transaction-data-to-api-charge).

#### Insisialisasi Mengirim Data Transaksi ke API Charge menggunakan Token Register Card.
Permintaan API harus dilakukan dari **backend Merchant** untuk mendapatkan `redirect_url` yang perlu melanjutkan ke langkah berikutnya, membuka halaman otentikasi 3DS dengan memberikan informasi pembayaran. Ada beberapa komponen yang diperlukan:

<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "order102",
    "gross_amount": 789000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  	"payment_type": "credit_card",
  	"transaction_details": {
    	"order_id": "order102",
    	"gross_amount": 789000
  	},
  	"credit_card": {
    	"token_id": "<token_id from Get Card Token Step>",
    	"authentication": true,
  	}
}'
```
<!-- tabs:end -->

Requirement | Deskripsi |
--- | ---
Server Key | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md?id=melihat-informasi-access-keys)
`order_id` | Order ID transaksi yang dapat anda isi sesuai dengan kebutuhan anda
`gross_amount` | Total nilai transaksi
`token_id` | Representasi informasi kartu kredit pelanggan anda yang didapatkan dari [Mendapatkan Respon Token](/id/core-api/advanced-features.md?id=inisialisasi-untuk-mendapatkan-token-kartu-melalui-register-card)
`authentication` | Atribut sebagai penanda bahwa transaki yang diminta adalah trasaksi 3D Secure

#### Inisialisasi Membuka Halaman Otentikasi 3DS Register Kartu
Setelah anda mendapatkan parameter `redirect_url` dari Respon API, Pelanggan anda diwajibkan untuk membuka halaman 3ds dari nilai parameter `redirect_url` pada halaman website anda dengan menggunakan [MidtransNew3ds JS library](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js).

Untuk membuka halaman 3DS anda dapat  menggunakan fungsi `MidtransNew3ds.authenticate` atau `MidtransNew3ds.redirect` dengan memberikan input parameter `redirect_url`. Untuk lebih detail Anda dapat mengunjungi halaman [Membuka Halaman Otentikasi 3DS Dengan Implementasi JS](/id/core-api/credit-card.md?id=_3-membuka-halaman-3ds)

#### Register Card Following Transaction
Saat anda ingin melakukan transaksi berikutnya, ada dapat menggunakan nilai `saved_token_id` yang telah anda simpan di database anda sebelumnya. ([Respon API Register Card](/id/core-api/advanced-features.md?id=respon-api-register-card)).

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge)):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<saved_token_id from Get Card Token Step>"
  }
}
```

#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<token_id from Get Card Token Step>"
  }
}'
```
<!-- tabs:end -->

### Transaksi Recurring Menggunakan API Subscriptions
[Transaksi Recurring Menggunakan API Subscriptions](https://api-docs.midtrans.com/#recurring-api)

<!-- <TODO: elaborate Subscriptions API> -->

### Transaksi Two Clicks
Melalui two click memungkinkan pelanggan dan anda memiliki opsi untuk menyimpan informasi kartu kredit **kecuali cvv** yang dapat digunakan secara cepat untuk transaksi berikutnya. Anda tidak perlu khawatir, Midtrans akan menyimpan informasi kartu kredit dengan aman. Untuk menggunakan fitur two click anda hanya perlu menyimpan nilai `saved_token_id` yang didapatkan melalui respon notifikasi Midtrans dan mengasosiasikan dengan data pelanggan anda.

<details>
<summary><b>Diagram Sequence</b></summary>
<article>
Seluruh ilustrasi proses transaksi Two Click dapat anda lihat pada diagram sequence dibawah ini:

![two click sequence diagram](../../asset/image/core_api-sequence_two_clicks.png)
</article>
</details>

#### Mendapatkan *token_id*
Untuk charge menggunakan fitur two click, Anda membutuhkan nilai dari parameter `token_id` yang didapatkan dari langkah [Mendapatkan Card Token](/en/core-api/credit-card.md?id=get-card-token).

#### Inisialisasi Request Charge Transaksi Two Clicks
Untuk mendapatkan nilai `saved_token_id` transaksi two click melalui respon/notifikasi, anda dapat menambahkan paramater seperti dibawah ini.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge)):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<token_id from Get Card Token Step>",
	"authentication": true,
	"save_token_id": true     // <--Flag untuk mengaktifkan simpan token kartu kredit selama transaksi
  }
}
```

#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "<token_id from Get Card Token Step>",
	"authentication": true,
	"save_token_id": true
  }
}'
```
<!-- tabs:end -->

#### Respon Charge Inisialisasi Transaksi Two Click
```json
{
    "status_code": "201",
    "status_message": "Success, Credit Card transaction is successful",
    "transaction_id": "47df99ca-f997-41bd-864e-8598ccf2fc27",
    "order_id": "Order-123-1578978260",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v2/token/rba/redirect/481111-1114-47df99ca-f997-41bd-864e-8598ccf2fc27",
    "merchant_id": "G816197673",
    "gross_amount": "10000.00",
    "currency": "IDR",
    "payment_type": "credit_card",
    "transaction_time": "2020-01-14 12:04:20",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "masked_card": "481111-1114",
    "bank": "mandiri",
    "card_type": "credit"
}
```

#### Membuka Halaman Otentikasi 3DS Pada Transksi Insialisasi Two Cick 33333
Pada saat anda mendapatkan repson request transaksi pertama two click anda akan mendapatkan parameter `redirect_url`. Anda diwajibkan untuk menampilkan halaman `redirect_url` kepada pelanggan anda. Untuk menampilkan halaman Otentikasi 3DS pada website anda dengan mudah, Anda dapat menggunakan library javascript [MidtransNew3ds](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js).

Dengan menggunakan salah satu fungsi pada midtrans js `MidtransNew3ds.authenticate` atau `MidtransNew3ds.redirect`. Lalu berikan nilai yang ada pada atribut `redirect_url`. Untuk penjelasan lebih detail silahkan mengunjungi halaman [Implementasi JS 3DS Authenticate](/id/core-api/credit-card.md?id=_3-Membuka-halaman-3DS)

#### Respon JSON pada Inisialisasi Transaksi Two Click 3DS
Atribut JSON | Deskripsi |
--- | --- 
saved_token_id | Token ID dari kartu kredit yang akan digunakan untuk transaksi berikutnya
saved_token_id_expired_at | Masa expire token ID.

Pada saat pertama kali/inisialisasai charge transaksi two click, Anda akan mendapatkan **respon dan notifikasi** seperti dibawah ini:
```json
{
  "status_code": "200",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "0cc39431-4f74-4605-8b6c-4363822fb398",
  "order_id": "1578977094",
  "merchant_id": "G816197673",
  "gross_amount": "200000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2020-01-14 11:44:55",
  "transaction_status": "capture",
  "fraud_status": "accept",
  "approval_code": "1578977095472",
  "eci": "05",
  "masked_card": "481111-1114",
  "bank": "mandiri",
  "card_type": "credit",
  "saved_token_id":"481111xDUgxnnredRMAXuklkvAON1114",
  "saved_token_id_expired_at": "2020-12-31 07:00:00",
  "channel_response_code": "00",
  "channel_response_message": "Approved"
}
```
Anda dapat menyimpan nilai dari parameter `saved_token_id` kedalam database anda.

#### Inisialisasi Untuk Mendapatkan Token Kartu Melalui Transaksi Two CLick
Anda membutuhkan nilai dari parameter `saved_token_id` yang didapatkan dari [Respon Insialisasi Charge Transaksi Two Click](/id/core-api/advanced-features.md?id=respon-json-pada-inisialisasi-transaksi-two-click-3ds).

Untuk mendapatkan `token_id` kartu, kita akan menggunakan fungsi `MidtransNew3ds.getCardToken` pada [MidtransNew3ds JS library](/id/core-api/credit-card.md?id=include-midtrans-js). Yang diimplementasi dengan javascript pada halaman website anda.
```javascript
// contoh input data kartu kredit dari halaman pelanggan
var cardData = {
  "token_id": <saved_token_id from Two Clicks Initials Charge Response>,
  "card_cvv": 123,
};

// callback functions
var options = {
  onSuccess: function(response){
    // Success to get card token_id, implement as you wish here
    console.log('Success to get card token_id, response:', response);
    var token_id = response.token_id;
    console.log('This is the card token_id:', token_id);
  },
  onFailure: function(response){
    // Fail to get card token_id, implement as you wish here
    console.log('Fail to get card token_id, response:', response);
  }
};

// trigger `getCardToken` function
MidtransNew3ds.getCardToken(cardData, options);
```
Jika semua berjalan dengan baik, maka anda akan mendapatkan nilai `token_id` kartu pada fungsi `onSuccess` yang akan gunakan sebagai salah satau parameter pada saat melakukan [request API `/charge`](/id/core-api/credit-card.md?id=request-charge-api).


### Filter BIN
Filter BIN Bank Identifier Number adalah fitur yang memungkinkan anda hanya menerima pembayaran dengan Kartu Kredit yang telah diset pada parameter BIN. Biasanya BIN digunakan untuk pembayaran promo / diskon tertentu yang hanya dapat menerima pembayaran dengan kartu kredit bank tersebut. BIN mempunyai panjang **1-6 digit angka**, yang mengidentifikasi bank penerbit kartu. Pada umumnya Bank memiliki lebih dari satu BIN.

Untuk menggunakan fitur filter BIN, anda harus menuliskan daftar BIN atau bisa juga dengan menggunakan nama bank penerbit yang kemudian kumupulan daftar nilai bin tersebut menjadi nilai untuk parameter `bins`. Sehingga transaksi tersebut hanya dapat dibayar secara eksklusif, sesuai dengan kartu kredit yang telah didaftarkan didalam parameter `bins`.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card.md?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "bank": "bni",
    "bins": ["48111111", "bni", "5"]
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "bank": "bni",
    "bins": ["48111111", "bni", "5"]
  }
}'
```
<!-- tabs:end -->

?> Catatan: Kami sudah melakukan automasi nomor BIN untuk sebagian besar bank seperti bni, mandiri, cimb, bca, dan bank mitra lainnya. Anda dapat menambahkan nama bank sebagai nilai pada parameter `bins`


### Fitur Cicilan
#### Cicilan Online / Online Installment
Installment Online adalah pembayaran angsuran/cicilan dimana bank penerbit kartu dan Acquiring Bank adalah entitas yang sama (mis: Kartu BNI dan Acquiring Bank BNI)

Untuk mengaktifkan fitur Online Installment, anda harus memiliki perjanjian dengan bank. Bank akan mengeluarkan MID khusus untuk cicilan / Online Installment. Dengan menggunakan MID ini, transaksi akan dikonversi secara otomatis menjadi cicilan/Online Installment. Silakan berkonsultasi dengan Tim Aktivasi Midtrans untuk MID Online Installment. Jika MID sudah siap, anda hanya perlu menambahkan parameter Online Installment pada saat Request API.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "bank": "bni",
    "installment_term": 3
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "bank": "bni",
    "installment_term": 3
  }
}'
```
<!-- tabs:end -->

#### Cicilan Offline / Offline Installment
Offline Installment adalah jenis installment dimana Penerbit Kartu dan Acquiring Bank bukan entitas yang sama (mis: Kartu BNI dan Acquiring Bank Mandiri).

Offline Installment memungkinkan fitur cicilan / installment dengan bank yang tidak mengeluarkan MID Installment. Dengan fitur installment offline, transaksi akan dibebankan dalam jumlah penuh dan nantinya transaksi akan diubah menjadi angsuran. Silakan berkonsultasi dengan Tim Aktivasi Midtrans untuk perjanjian offline installment

Untuk mengaktifkan fitur offline installment, anda hanya perlu menambahkan `installment` dengan kombinasi fitur filter bin. Tujuan bin filter adalah untuk membatasi kartu tertentu yang dapat melakukan cicilan offline, berdasarkan perjanjian antara anda dan acquiring bank.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "installment_term": 12,          
    "bins": ["48111111", "3111", "5"]
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "installment_term": 12,
    "bins": ["48111111", "3111", "5"]
  }
}'
```
<!-- tabs:end -->

#### Definisi Parameter
| Parameter | Tipe | Deskripsi |
--- | --- | ---
token_id | String | Representasi informasi kartu kredit pelanggan yang didapatkan dari [Mendapatkan Respo Token Kartu](/en/core-api/credit-card.md?id=get-card-token-response).
authentication | Boolean | Flag untuk mengaktifkan autentikasi 3D secure.
bank | String | Bank acquiring. Untuk memastikan transaksi masuk ke dalam acquirnig bank yang sesuai.<br>Jika tidak maka transaksi akan ditandai sebagai transaksi offline installment.
installment_term | Integer | Tenor Cicilan.
bins | Array | Daftar informasi BIN (Bank Identification Number) kartu kredit yang diperbolehkan untuk digunakan pada transaksi.

### Pembayaran Pre-Authorization
Fitur Pre-Authorization memungkinkan dana kartu kredit pelanggan tidak akan langsung dipotong setelah transaksi selesai, tetapi jumlah limit kartu sementara akan ditahan (reserved). Kemudian anda dapat melakukan "capture" melalui [Core API](https://api-docs.midtrans.com/#capture-transaction) Midtrans yang akan melepas dana yang telah di-reserved masuk ke acquiring bank. Jika tidak ada tindakan "capture" untuk transaksi Pre-Authorization, secara default setelah 7 hari dana reserved akan dirilis otomatis.

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge):

<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "authentication": true,
    "type": "authorize"
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "token_id": "<token_id from Get Card Token Step>",
    "authentication": true,
    "type": "authorize"
  }
}'
```
<!-- tabs:end -->

#### Definisi Parameter
| Parameter | Tipe | Deskripsi |
--- | --- | ---
token_id | String | Representasi informasi kartu kredit pelanggan yang didapatkan dari [Mendapatkan Respo Token Kartu](/en/core-api/credit-card.md?id=get-card-token-response).
bank | String | Bank acquiring. Untuk memastikan transaksi masuk ke dalam acquirnig bank yang sesuai.<br>Jika tidak maka transaksi akan ditandai sebagai transaksi offline installment.
authentication | Boolean | Flag untuk mengaktifkan autentikasi 3D secure.
type | String | Atribut untuk mengaktifkan fitur pre-authorizatio. Nilai valid adalah `authorize`.

## Credit Card - Full PAN
[Credit Card - Full PAN](https://api-docs.midtrans.com/#credit-card-full-pan)

<!-- <TODO: elaborate Full PAN> -->

## GoPay
### Redirect Pelanggan Anda Dari Aplikasi Gojek
Setelah pembayaran dengan Gopay selesai, secara default pelanggan anda akan tetap berada di aplikasi Gojek, perlu secara manual untuk kembali ke halaman website atau aplikasi anda. Namun untuk dapat kembali secara otomatis ke halaman web atau aplikasi anda, bisa menggunakan parameter `gopay.callback_url` 

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/e-wallet.md?id=charge-api-request)):
<!-- tabs:start -->
#### **Parameter JSON**
```json
{
  "payment_type": "gopay",
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/finish"
  }
}
```
#### **Format CURL**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/finish"
  }
}'
```
<!-- tabs:end -->

Anda dapat menambahkan nilai pada parameter `callback_url` dengan alamat URL website menggunakan protokol http/https atau bisa juga dengan protokol Deeplink untuk kembali ke aplikasi mobile anda seperti berikut ini `"callback_url": "tokoecommerce://gopay_finish/"`

> **Catatan**: 
> Alamat URL yang telah anda tambahkan pada parameter `callback_url` secara otomatis akan ditambahkan parameter `?order_id=xx&result=success`.  Nilai parameter `result` dapat bernilai success atau failure.
> 
> Sebagai contoh URL anda akan terlihat sebagai berikut ini: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102&result=success`.
> 
> Anda dapat memanfaatkan nilai yang ditambakan pada parameter untuk menampilkan pesan tertentu kepada pelanggan anda.

## Bank Transfer / VA
### Spesifik VA Number and VA Description
Untuk bank transfer secara default Midtrans akan memberikan nomor virtual account secara acak. Dalam beberapa situasi anda memerlukan kustomisasi nomor VA silahkan menambahkan parameter dibawah ini pada saat melakukan [API Request](/id/core-api/bank-transfer.md?id=charge-api-request).

<!-- tabs:start -->
#### **BCA**
```json
...
   "bank_transfer":{
     "bank": "bca",
     "va_number": "111111",
     "free_text": {
          "inquiry": [
                {
                    "id": "Free Text ID Free Text ID Free Text ID",
                    "en": "Free Text EN Free Text EN Free Text EN"
                }
          ],
          "payment": [
               {
                    "id": "Free Text ID Free Text ID Free Text ID",
                    "en": "Free Text EN Free Text EN Free Text EN"
                }
          ]
     },
     "bca": {
        "sub_company_code": "00000"
     }
   }
...
```
| Parameter | Tipe | Deskripsi |
--- | --- | ---
bank | String(255)<br>(***required***) | Nama bank yang akan memproses transaksi.
va_number | String(255)<br>(***optional***) | Custom va number yand diajukan oleh merchant. **Panjang karakter harus diantara 1 sampai dengan 11**.
inquiry	| JSON Array(10)<br>(***optional***) | Jika support, pada saat pelanggan cek / inquire no VA nilai dari parameter akan tampil dilayar ATM.
payment	| JSON Array(10)<br>(***optional***) | Jika support, pada saat pelanggan melakukan pembayaran dengan no VA, nilai dari parameter tersebut akan tampil dilayar ATM
id | String(50)<br>(***required***)	| Text bebas dalam Bahasa Indonesia.
en | String(50)<br>(***required***) | Text bebas dalam bahasa Inggris.
sub_company_code | String<br>(***optional***) | Kode sub BCA yang diarahkan untuk transaksi ini<br>**Catatan:** Nilai Default adalah 00000.

#### **BNI**
```json
...
  "bank_transfer":{
     "bank": "bni",
     "va_number": "111111"
  }
...
```
| Parameter | Tipe | Deskripsi |
--- | --- | ---
bank | String(255)<br>(***required***) | Nama bank yang akan memproses transaksi.
va_number | String(255)<br>(***optional***) | Custom va number yand diajukan oleh merchant. **Panjang karakter harus diantara 1 sampai dengan 8**.

#### **Mandiri Bill**
```json
...
	"echannel" : {
	    "bill_info1" : "Payment For:",
	    "bill_info2" : "Tuition fee",
	    "bill_info3" : "Name:",
	    "bill_info4" : "Budi Utomo",
	    "bill_info5" : "Class:",
	    "bill_info6" : "Computer Science",
	    "bill_info7" : "ID:",
	    "bill_info8" : "VT-12345"
	}
...
```
| Parameter | Tipe | Deskripsi |
--- | --- | ---
bill_info1 | String<br>(***required***) | Label 1. Panjang karakter yang diperbolehkan hanya 10 karakter.<br>Jika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info2 | String<br>(***required***) | Nilai untuk Label 1. Panjang karakter yang diperbolehkan hanya 30 karakter.<br>ika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info3 | String<br>(***opsional***) | Label 2. Panjang karakter yang diperbolehkan hanya 10 karakter.<br>Jika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info4 | String<br>(***opsional***) | Value for Label 2. Panjang karakter yang diperbolehkan hanya 30 karakter.<br>ika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info5 | String<br>(***opsional***) | Label 3. Panjang karakter yang diperbolehkan hanya 10 karakter.<br>Jika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info6 | String<br>(***opsional***) | Value for Label 3. Panjang karakter yang diperbolehkan hanya 30 karakter.<br>ika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info7 | String<br>(***opsional***) | Label 4. Panjang karakter yang diperbolehkan hanya 10 karakter.<br>Jika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.
bill_info8 | String<br>(***opsional***) | Value for Label 4. Panjang karakter yang diperbolehkan hanya 30 karakter.<br>ika lebih dari yang telah ditentukan akan otomatis **dihilangkan**.

#### **Permata**
```json
...
	"bank_transfer":{
	  "bank": "permata",
	  "va_number": "0123456789",
	  "permata": {
	    "recipient_name": "SUDARSONO"
	  }
	}
...
```
| Parameter | Tipe | Deskripsi |
--- | --- | ---
bank | String(255)<br>(***required***) | Nama bank yang akan memproses transaksi.
va_number | String(10)<br>(***opsional***) | Custom va number yand diajukan oleh merchant. **Panjang karakter harus 10 karakter**.<br>Hanya support untuk tipe VA b2b.
recipient_name | String(20)<br>(***opsional***) | Nama penerima pada detail pembayaran.<br>**NOTE:** Default adalah nama merchant.
<!-- tabs:end -->

Nomor virtual account berisi company code dan unique code. Contoh VA Number : `{91012}{12435678}` bagian pertama adalah *company code* dan bagian kedua adalah *unique code*. Hanya unique code yang bisa di kustomisasi untuk pembayaran bank **BCA**, **BNI** dan **Permata** (hanya untuk transaksi b2b).

* Nilai unique code hanya dapat diisi dengan angka.
* Setiap bank memiliki aturan dan spesifikasi custom VA yang berbeda. Mohon untuk melihat dokumentasi bank yang akan digunakan sebelum melakukan custom va.
* Jika nomor VA yang direquest sudah digunakan untuk transaksi lain, maka akan ditampilkan unique code secara random.
* Jika nomor VA yang direquest lebih panjang dari yang dibutuhkan, maka angka yang tidak perlu akan dipangkas.
* Jika nomor VA yang direquest lebih pendek dari yang dibutuhkan, maka nomor tersebut akan diawali dengan nol.
* Jika anda melakukan request charge dengan custom VA sebelumnya dan transaksi sebelumnya belum dilakukan pembayaran atau `/cancel` transaksi, maka Midtrans akan memberikan random unique VA Number.

Catatan: Pada environment Production, tidak semua Bank terdapat fitur custom VA, beberapa bank bergantung kepada perjanjian yang dilakukan sebelumnya. Untuk info lebih lanjut, anda dapat konsultasiskan dengan TIM Aktivasi Midtrans.