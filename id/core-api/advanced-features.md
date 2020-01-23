Pada halaman ini akan menjelaskan opsional parameter yang ada pada layanan Core API. Core API dapat membantu anda dalam integrasi dengan Midtrans sesuai dengan alur bisnis pembayaran yang anda inginkan.

## Umum
### Parameter Rekomendasi
ami sangat menyarankan anda untuk mengirim detail-detail informasi mengenai transaksi yang anda kirim ke Midtrans. Dengan begitu data dashboard dan laporan transaksi anda akan sangat informatif dan memudahkan anda dalam membaca detail setiap transaksi.

Anda dapat menambahkan data `transaction_details` seperti data `customer_details` dan `item_details`. 

Dibawah ini akan menjelaskan bagaimana cara menambahkan detail informasi pada parameter JSON yang akan dikrim melalui [Langkah Request API](/id/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

Berikut adalah contoh JSON parameter yang dikirim pada [Langkah Request API](/id/core-api/bank-transfer.md?id=_1-kirim-data-traksaksi-ke-api-charge):
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

Berikut adalah contoh JSON parameter yang dikirim pada [Langkah Request API](/id/core-api/bank-transfer.md?id=_1-kirim-data-traksaksi-ke-api-charge):
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

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge):
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

Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge):
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
	"save_token_id": true     // <-- To flag that token is saved during initial charge
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

#### Inisilisasai Membuka Halaman 3DS Transaksi One Click
Pada saat anda mendapatkan repson request transaksi pertama one click anda akan mendapatkan parameter `redirect_url`. Anda diwajibkan untuk menampilkan halaman `redirect_url` kepada pelanggan anda. Untuk menampilkan halaman Otentikasi 3DS pada website anda dengan mudah, Anda dapat menggunakan library javascript [MidtransNew3ds](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js).

Dengan menggunakan salah satu fungsi pada midtrans js `MidtransNew3ds.authenticate` atau `MidtransNew3ds.redirect`. Lalu berikan nilai yang ada pada atribut `redirect_url`. Untuk penjelasan lebih detail silahkan mengunjungi halaman [Implementasi JS 3DS Authenticate](/id/core-api/credit-card?id=_3-Membuka-halaman-3DS)

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

#### Request Charge Transaksi One Click
Untuk melakukan charge transaksi one click kedua dan berikutnya, anda harus menambahkan nilai dari parameter `saved_token_id` kedalam parameter `token_id`.
Berikut adalah contoh parameter JSON pada saat melakukan [Request API](/id/core-api/credit-card?id=_2-kirim-data-transaksi-ke-api-charge)):
<!-- tabs:start -->
##### **JSON Param**
```json
{
  "payment_type": "credit_card",
  "transaction_details": {
    "order_id": "CustOrder-103",
    "gross_amount": 10000
  },
  "credit_card": {
	"token_id": "481111xDUgxnnredRMAXuklkvAON1114" // <-- nilai saved_token_id didapatkan dari respon transaksi pertama one click
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
	"token_id": "<saved_token_id from One Click Initial Transaction Response>",
  }
}'
```
<!-- tabs:end -->

#### Respon Charge dan Notifikasi Transaksi One Click
Untuk detail respon pada transaksi one click anda dapat mengunjungi halaman [Respon Charge dan Respon Pembayaran Kartu](https://api-docs.midtrans.com/#card-payment-charge-response-and-notifications). Transaksi one click dapat dikatakan berhasi jika sudah mendapatkan status transaksi `capture` dan akan siap menjadi `settlement` pada hari berikutnya.

Pada transaksi one click kedua dan seterusnya anda akan mendapatkan **respon dan notifikasi** seperti dibawah ini:
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
Melalui fitur recurring memungkinkan pelanggan dan anda memiliki opsi untuk menyimpan informasi kartu kredit yang dapat digunakan secara cepat untuk transaksi berikutnya. Anda tidak perlu khawatir, Midtrans akan menyimpan informasi kartu kredit dengan aman. Untuk menggunakan fitur recurring anda hanya perlu menyimpan nilai `saved_token_id yang` didapatkan melalui respon notifikasi Midtrans dan mengasosiasikan dengan data pelanggan anda.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall Register Card API end-to-end payment proccess can be illustrated in following sequence diagram:

![one click sequence diagram](../../asset/image/core_api-sequence_register_card.png)
</article>
</details>

#### Register Card Status Method
HTTP Method | API Endpoint |
--- | ---
GET | `https://api.sandbox.midtrans.com/v2/card/register`

#### Register Card HTTP Request
```bash
curl -X GET \
  'https://api.sandbox.midtrans.com/v2/card/register?card_number=5211111111111117&card_exp_month=12&card_exp_year=2021&client_key=<YOUR CLIENT KEY HERE>' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json'
```
#### Register Card API Response
You will get the **API response** like the following:

```json
{
    "status_code": "200",
    "saved_token_id": "521111nHlLvTuKywNOOLhTlHZcab1117",
    "transaction_id": "cbd3ff55-2ead-43e9-84c5-5c3b7a8a1814",
    "masked_card": "521111-1117"
}
```
You need to store `saved_token_id` to your database.

#### Register Card Initials Get Card Token
You need a `saved_token_id` from [Register Card API Response Step](/id/after-payment/advanced-features.mdes.md?id=register-card-api-response).
To retrieve card `token_id`, we will be using `MidtransNew3ds.getCardToken` on [MidtransNew3ds JS library](/en/core-api/credit-card?id=include-midtrans-js). Implement the following Javascript on our payment page.
```javascript
// card data from customer input, for example
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
If all goes well, we will be able to get card `token_id` inside `onSuccess` callback function. It will be used as one of JSON parameter for [`/charge` API request](en/core-api/advanced-features.md?id=register-card-initials-send-transaction-data-to-api-charge).

#### Register Card Initials Send Transaction Data to API Charge
API request should be done from **Merchant’s backend** to acquire `redirect_url` which will need to proceed to next step, opening 3DS authentication page by providing payment information. There are several components that are required:

<!-- tabs:start -->
#### **JSON Param**
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

Requirement | Description |
--- | ---
Server Key | Explained on [previous section](/en/midtrans-account/overview.md)
`order_id` | Transaction order ID, defined from your side
`gross_amount` | Total amount of transaction, defined from your side
`token_id` | Represents customer's credit card information acquired from [Get Card Token Response](/id/after-payment/advanced-features.mdes.md?id=register-card-initials-get-card-token)
`authentication` | Flag to enable the 3D secure authentication.

#### Register Card Initials Open 3DS Authentication Page
As part of API response, we now have `redirect_url`. It should be opened (displayed to customer) using [MidtransNew3ds JS library](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js) on merchant's website frontend.

To open 3DS page we can use `MidtransNew3ds.authenticate` or `MidtransNew3ds.redirect` function. Input the `redirect_url` retrieved previously. Please take a look [Open 3DS Authenticate Page JS Implementation Step](/en/core-api/credit-card?id=open-3ds-authenticate-page-js-implementation) for more details.

#### Register Card Following Transaction
When it's time to charge another transaction, retrieve `saved_token_id` from database ([Register Card API Response](/id/after-payment/advanced-features.mdes.md?id=register-card-api-response)).
Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

### Recurring Transaction with Subscriptions API
[Recurring Transaction with Subscriptions API](https://api-docs.midtrans.com/#recurring-api)

<!-- <TODO: elaborate Subscriptions API> -->

### Two Clicks Transaction
You can allow customer to save their card credentials (**except card cvv**) for easier and faster future transactions. Card credentials will be saved securely on Midtrans side. Merchant will only need to store and associate each unique customer with unique `saved_token_id` from initial Charge Response.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall Two Clicks end-to-end payment proccess can be illustrated in following sequence diagram:

![one click sequence diagram](../../asset/image/core_api-sequence_two_clicks.png)
</article>
</details>

#### Retrieve *token_id*
You need a `token_id` from [Get Card Token Step](/en/core-api/credit-card.md?id=get-card-token) to charge with One Click feature.

#### Two Clicks Initials Charge Request
Add additional attribute in charge request credit_card object when charging the initial transaction for Two Clicks feature.
Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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
	"save_token_id": true     // <-- To flag that token is saved during initial charge
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

#### Two Clicks InitialsTwo Clicks Initials  Charge Response
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

#### Two Clicks Initials Open 3DS Authentication Page
As part of API response, we now have `redirect_url`. It should be opened (displayed to customer) using [MidtransNew3ds JS library](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js) on merchant's website frontend.

To open 3DS page we can use `MidtransNew3ds.authenticate` or `MidtransNew3ds.redirect` function. Input the `redirect_url` retrieved previously. Please take a look [Open 3DS Authenticate Page JS Implementation Step](/en/core-api/credit-card?id=open-3ds-authenticate-page-js-implementation) for more details.

#### Two Clicks Initials 3DS Authenticate JSON Response
JSON Attribute | Description |
--- | --- 
saved_token_id | Token ID of a credit card to be charged for the following transaction	
saved_token_id_expired_at | Expiry date of the Token ID

You will get the **response and notifications** like the following:
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
You need to store `saved_token_id` to your Database.

#### Two Clicks Following Transaction Get Card Token
You need `saved_token_id` which you can get from [Two Clicks Initial Charge Response](/id/after-payment/advanced-features.mdes.md?id=two-clicks-initials-3ds-authenticate-json-response).

To retrieve card `token_id`, we will be using `MidtransNew3ds.getCardToken` function. Implement the following Javascript on our payment page.
```javascript
// card data from customer input, for example
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
If all goes well, we will be able to get card `token_id` inside `onSuccess` callback function. It will be used as one of JSON parameter for [`/charge` API request](en/core-api/credit-card.md?id=charge-api-request).

### BIN Filter
BIN filter is a feature that allows the merchant to accept only Credit Cards within specific set of BIN numbers, it is useful for certain bank promo/discount payment by accepting only credit cards issued by that bank. BIN (Bank Identification Number) is the **first 1-6 digits of a card number**, which identifies the bank that issues the card. A bank generally has more than one BIN.

To use this feature, merchant needs to accumulate the list of BIN that accepts the promotion or simply uses the issuing bank's name. This transaction can only be performed exclusively by using the credit card that is included in the BIN list or BIN under the particular defined issuing bank.

Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

?> Note: We already populate BIN number for bni, mandiri, cimb, bca, and other partner bank. You can add the bank name as bins value.

### Installment Payment
#### Online Installment
This is the type of Installment where the Card Issuer and Acquiring Bank is the same entity (e.g: BNI Card and BNI Acquiring bank).

To activate the installment feature, merchant are required to have agreement with the bank. For online installments, the bank will issue special MID for installment. By using this installment MID, the transaction will be converted automatically into an installment. Please consult to Midtrans Activation Team for installment MID. If MID is ready, merchant simply need to add the installment parameter.

Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

#### Offline Installment
This is the type of Installment where the Card Issuer and Acquiring Bank don't have to be same entity (e.g: BNI Card and Mandiri Acquiring Bank).

To allow installment feature with banks which do not issue MID Installment, merchant can use offline installment feature. With offline installment feature, the transaction will be charged in full amount and the transaction will be converted into installment later. Please consult to Midtrans Activation Team for installment agreement first.

Merchant simply need to add the `installment` parameter with combination of bin filter feature. The purpose of bin filter is to limit certain cards from being allowed to do offline installment, based on the agreement between merchant and issuing banks.

Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

#### Definition
Param | Type | Description |
--- | --- | ---
token_id | String | Represents customer's credit card information acquired from [Get Card Token Response](/en/core-api/credit-card.md?id=get-card-token-response).
authentication | Boolean | Flag to enable the 3D secure authentication.
bank | String | Acquiring bank. To make sure transaction is going on-us.<br>Else, it will be treated as offline installment.
installment_term | Integer | Installment Tenor.
bins | Array | List of credit card's BIN (Bank Identification Number) that is allowed for transaction.

### Pre-Authorization Payment
Pre-authorization feature means customer's fund will not directly deducted after transaction, but it's amount/limit will be temprorary reserved (blocked). Then merchant can initiate "capture" action later via [capture API](https://api-docs.midtrans.com/#capture-transaction). By default fund reservation will be released after 7 days if there is no "capture" action for that transaction.

Example of the JSON param (this param is used during [API Request Step](/en/core-api/credit-card.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

#### Definition
Param | Type | Description |
--- | --- | ---
token_id | String | Represents customer's credit card information acquired from [Get Card Token Response](/en/core-api/credit-card.md?id=get-card-token-response).
bank | String | Acquiring bank. To make sure transaction is going on-us.<br>Else, it will be treated as offline installment.
authentication | Boolean | Flag to enable the 3D secure authentication.
type | String | Attribute to enable the pre-authorization feature. Valid value `authorize`.

## Credit Card - Full PAN
[Credit Card - Full PAN](https://api-docs.midtrans.com/#credit-card-full-pan)

<!-- <TODO: elaborate Full PAN> -->

## GoPay
### Redirect Customer From Gojek App
After GoPay payment completed, by default customer will remain on Gojek app, so they need to manually close Gojek app to switch back to merchant web/app. Using parameter `gopay.callback_url` will allow customer to be automatically redirected to merchant web/app from Gojek app.

Example of the JSON param (this param is used during [API Request Step](/en/core-api/e-wallet.md?id=charge-api-request)):
<!-- tabs:start -->
#### **JSON Param**
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

You can input `callback_url` value with http/https url protocol for website, or Deeplink protocol for mobile App. For example, you can specify deeplink to your app: `"callback_url": "tokoecommerce://gopay_finish/"`

> **Note**: 
> The final redirect url will be appended with query parameter like `?order_id=xx&result=success`. Possible `result` values: success or failure.
> 
> For example the final redirect url might looks like this: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102&result=success`. 
> 
> You could utilize those information to display custom message to your customer on your finish url.

## Bank Transfer / VA
### Specify VA Number and VA Description
By default Midtrans will randomize VA number used for bank transfer transaction. In some cases, you might want to specify/customize VA Number for Bank Transfer payment channels. You can do that with the following parameters.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md?id=api-request)):
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
| Parameter | Type | Description |
--- | --- | ---
bank | String(255)<br>(***required***) | Bank name which process bank transfer transaction.
va_number | String(255)<br>(***optional***) | Custom va number assigned by merchant.<br>**Length should be within 1 to 11**.
inquiry	| JSON Array(10)<br>(***optional***) | Free texts will be displayed on ATM (if supported)<br>when customer attempt to check/inquire the VA number.
payment	| JSON Array(10)<br>(***optional***) | Free texts will be displayed on ATM (if supported)<br>when customer attempt to pay the VA number.
id | String(50)<br>(***required***)	| Free text message in Bahasa Indonesia.
en | String(50)<br>(***required***) | Free text message in English.
sub_company_code | String<br>(***optional***) | BCA sub company code directed for this transactions<br>**NOTE:** Default is 00000.

#### **BNI**
```json
...
  "bank_transfer":{
     "bank": "bni",
     "va_number": "111111"
  }
...
```
| Parameter | Type | Description |
--- | --- | ---
bank | String(255)<br>(***required***) | Bank name which process bank transfer transaction.
va_number | String(255)<br>(***optional***) | Custom va number assigned by merchant. **Length should be within 1 to 8**.

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
| JSON Attribute | Type | Description |
--- | --- | ---
bill_info1 | String<br>(***required***) | Label 1. Mandiri only allows 10 characters.<br>Exceeding characters will be **truncated**.
bill_info2 | String<br>(***required***) | Value for Label 1. Mandiri only allows 30 characters.<br>Exceeding characters will be **truncated**.
bill_info3 | String<br>(***optional***) | Label 2. Mandiri only allows 10 characters.<br>Exceeding characters will be **truncated**.
bill_info4 | String<br>(***optional***) | Value for Label 2. Mandiri only allows 30 characters.<br>Exceeding characters will be **truncated**.
bill_info5 | String<br>(***optional***) | Label 3. Mandiri only allows 10 characters.<br>Exceeding characters will be **truncated**.
bill_info6 | String<br>(***optional***) | Value for Label 3. Mandiri only allows 30 characters.<br>Exceeding characters will be **truncated**.
bill_info7 | String<br>(***optional***) | Label 4. Mandiri only allows 10 characters.<br>Exceeding characters will be **truncated**.
bill_info8 | String<br>(***optional***) | Value for Label 4. Mandiri only allows 30 characters.<br>Exceeding characters will be **truncated**.

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
| Parameter | Type | Description |
--- | --- | ---
bank | String(255)<br>(***required***) | Bank name which process bank transfer transaction.
va_number | String(10)<br>(***optional***) | Custom va number assigned by merchant. **Length should be 10**.<br>Only supported for b2b VA type.
recipient_name | String(20)<br>(***optional***) | Recipient name shown on the payment details.<br>**NOTE:** Default is merchant name.
<!-- tabs:end -->

Virtual Account number displayed to customer contains two parts. for example, in `{91012}{12435678}` , the first part is the company code and the second part is a unique code. The second part is the part that can be customized.

* Only digits are allowed.
* Different banks have different specs on their custom VA numbers. Please see the documentation on the respective banks.
* If the number provided is already utilized for another order, then a different unique number will be used instead.
* If the number provided is longer than required, then the unnecessary digits in the end will be trimmed.
* If the number provided is shorter than required, then the number will be prefixed with zeros.

Note: On Production mode, not all Bank support custom VA number, it depends on the agreement, please consult with Midtrans Activation team for further info.