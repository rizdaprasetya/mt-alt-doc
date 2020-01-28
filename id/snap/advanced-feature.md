Kami memahami akan kebutuhan anda dalam melayani pelanggan. Midtrans selalu berusaha menghadirkan pembayaran yang dapat memenuhi kebutuhan anda. Pada halaman ini kami memberikan panduan yang lebih detail terhadap pengaturan yang dapat dilakukan terhadap Midtrans Snap.

## Fitur Umum

### Parameter rekomendasi
Kami sangat menyarankan anda untuk mengirim detail-detail informasi mengenai transaksi yang anda kirim ke Midtrans. Dengan begitu data dashboard dan laporan transaksi anda akan sangat informatif dan memudahkan anda dalam membaca detail setiap transaksi.

Anda dapat menambahkan data `transaction_details` seperti data `customer_details` dan `item_details`. 

Dibawah ini akan menjelaskan bagaimana cara menambahkan detail informasi pada parameter JSON yang akan dikrim melalui [Langkah Request API](/id/snap/integration-guide.md?id=api-request)

<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
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

#### **As CURL**

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
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

Detail Referensi [Dokumentasi Snap](https://snap-docs.midtrans.com/#json-objects).

### Fungsi dan Opsi pada Snap.js

Snap.js mendukung bebrapa jenis opsi yang dapat diatur seperti pengaturan bahasa yang ditampilkan, mode gopay deeplink / QR dan lainya. 

Penjelasan detail mengenai Snap.js dapat anda kunjungi halaman [Snap.js Docs](https://snap-docs.midtrans.com/#frontend-integration)

Catatan: Jika anda menggunakan Snap mode Redirect, pada saat diarahkan ke halaman Snap anda akan mendapatkan beberapa setting melalui beberapa parameter yang disematkan dalam URL Redirect.

seperti berikut:
```
https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?language=en&gopayMode=deeplink
```

### Callback Javascript

Snap.js mendukung callback javascript, dengan begitu anda dapat melakukan kustomisasi pada implementasi Snap dihalaman frontend anda sesuai dengan logic yang anda inginkan. Berikut options yang tersedia pada Snap.js

* `onSuccess`: Fungsi ini akan dipanggil ketika pembayaran sukses dilakukan.
* `onPending`: Fungsi ini akan dipanggil ketika status transaksi bernilai pending, seperti yang terjadi pada metode pembayaran bank_transfer / VA.
* `onError`: Fungsi ini akan dipanggil ketika terjadi kegagalan selama beberapa kali percobaan.
* `onClose`: Fungsi ini akan dipanggil ketika pelanggan melakukan close pada halaman Snap Popup.

Contoh implementasi option callback pada saat memanggil fungsi `snap.pay()` Snap.js. fungsi ini dapat anda lihat juga pada saat melakukan [Implementasi Snap frontend](/id/snap/integration-guide.md?id=_2-menampilkan-snap-popup-ke-halaman-frontend)

<!-- tabs:start -->
#### **Frontend JS**
```javascript
snap.pay('SNAP_TRANSACTION_TOKEN', {
  onSuccess: function(result){
    /* Anda dapat melakukan implementasi yang anda inginkan pada saat onSuccess dipanggil */
    alert("payment success!"); console.log(result);
  },
  onPending: function(result){
    /* Anda dapat melakukan implementasi yang anda inginkan pada saat onPending dipanggil */
    alert("wating your payment!"); console.log(result);
  },
  onError: function(result){
    /* Anda dapat melakukan implementasi yang anda inginkan pada saat onError dipanggil */
    alert("payment failed!"); console.log(result);
  },
  onClose: function(){
    /* Anda dapat melakukan implementasi yang anda inginkan pada saat onClose dipanggil */
    alert('you closed the popup without finishing the payment');
  }
})
```
<!-- tabs:end -->

### Kustomisasi Finish URL
Secara default setelah selesai, Snap akan redirect ke halaman [URL Finish](/id/snap/preparation.md?id=konfigurasi-redirect-url) yang telah anda konfigurasi sebelumnya pada Dashboard Midtrans. Namun anda dapat override Finish URL melalui parameter`callback.finish` pada saat request API ke Midtrans, dengan begitu anda dapat melakukan custom finish redirect pada metode pembayaran yang berbeda.

Berikut ini adalah contoh parameter JSON yang harus anda kirim saat melakukan [Request API](/id/snap/integration-guide.md?id=api-request):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}'
```
<!-- tabs:end -->

### Mengatur Metode Pembayaran Spesifik
Pada saat halaman Snap muncul anda dapat melihat berbagai macam metode pembayaran yang tersedia. Namun dalam kondisis tertentu anda menginginkan hanya beberapa metode pembayaran yang tampil dalam halam snap. Midtrans memberikan dua solusi bagi anda yang ingin menyaring metode pembayaran pada halaman Snap, anda dapat memilih salah satunya sesuai dengan kebutuhan dan gaya anda dalam integrasi.

#### A) Mengatur Metode Pembayaran Spesifik Melalui Dashborad Midtrans
Anda dapat mengaktifkan metode pembayaran pada Snap Preference didalam Dashboard Midtrans. Cara ini akan berpengaruh pada semua transaksi pada tampilan halaman Snap, khususnya tampilan metode pembayaran

1. Masuk ke [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com/settings/snap_preference)
2. Pilih menu **(1) Settings -> (2) Snap Preferences -> (3) Payment Channels Tab**
3. Klik ikon **[x]** untuk menonaktifkan metode pembayaran
4. Klik ikon **[+]** untuk mengaktifkan metode pembayaran
5. Agar pengalaman pelanggan anda lebih baik, kami merekomendasikan untuk menggunakan fitur *recommendation sorting* dalam mengatur daftar metode pembayaran yang tampil. Silahkan klik tombol "Apply Recommended Sorting".
6. Klik tombol **Save**

![snap preference payment channels](./../../asset/image/snap-adv-enabled-payment-dash.png)

#### B) Mengatur Metode Pembayaran Spesifik melalui Request API
Alternatif lain dalam membatasi metode pembayaran yang akan tampil adalah dengan mengirim parameter `enable_payments` pada saat melakukan Request API ke Midtrans.

Berikut adalah contoh JSON parameter yang dikirim pada saat [Request API](/id/snap/integration-guide.md?id=api-request)
<!-- tabs:start -->
#### **JSON Param**
```json
...
"enabled_payments": [
    "credit_card",
    "gopay",
    "permata_va",
    "bca_va",
    "bni_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
]
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "enabled_payments": [
    "credit_card",
    "gopay",
    "permata_va",
    "bca_va",
    "bni_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
  ],
  "credit_card": {
    "secure": true
  },
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789"
  }
}'
```
<!-- tabs:end -->
Nilai alias seperti `bank_transfer` , `store` pada parameter `enable_payments` ​​merujuk ke metode pembayaran yang akan muncul dihalaman Snap. Menambahkan alias sama saja dengan menambahkan semua metode pembayaran yang dimaksud.

Daftar alias yang didukung:

* `bank_transfer` = `permata_va, bca_va, bni_va, echannel`
* `store` = `kioson, indomaret, alfamart`.

Contoh penggunaan:
<!-- tabs:start -->
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "enabled_payments": [
    "credit_card"
  ],
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

Contoh kode program diatas hanya untuk menampilkan metode pebayaran kartu kredit:

![enabled payment card](./../../asset/image/snap-adv-enabled-payment.png)

### Mengubah Waktu Expire Transaksi
Salah satu fitur yang ada pada transaksi adalah melakukan perubahan waktu expire transaksi sesuai dengan kebutuhan anda. Transaksi yang telah melewati batas waktu yang telah ditentukan sebelumnya akan berubah status secara otomatis menjadi `expire` dan pelanggan tidak dapat melakukan pembayaran pada transaksi tersebut. Terdapat dua cara dalam melakukan custom expiry:

#### A) Mengubah Waktu Expire Transaksi Melalui Dashboard Midtrans
Anda dapat melakukan kustomisasi waktu expiry melalui halaman Snap Preference. Cara ini akan berpengaruh pada semua transaksi snap yang dikirim.
1. Masuk ke [Midtrans Dashboard](https://dashboard.sandbox.midtrans.com/settings/snap_preference)
2. Pilih menu **(1) Settings -> (2) Snap Preferences -> (3) System Settings** Tab
3. Klik Checkbox (4)
4. Masukan durasi expire yang anda inginkan (5).
5. Pilih satuan waktu pada menu dropdown (6)
6. Klik tombol **Save**

![snap preference expiry](./../../asset/image/snap-adv-custom-expiry-dash.png)

#### B) Mengubah Waktu Expire Transaksi Melalui Request API 
Alternatif lain dalam melakukan kustomisasi waktu expire transaksi adalah dengan mengirim parameter `expiry` pada saat melakukan Request API. Dengan cara ini anda dapat melakukan kustomisasi waktu expire pada transaksi tertentu. 

Berikut adalah contoh JSON parameter yang dikirim pada saat [Request API](/id/snap/integration-guide.md?id=api-request)

<!-- tabs:start -->
#### **JSON Param**
```json
...
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
}'
```
<!-- tabs:end -->

| Parameter | Type | Required? | Description |
---|---|---|---
`start_time` | String(255) | (optional) |  Format timestamp `yyyy-MM-dd hh:mm:ss Z`. <br>Jika tidak diisi, secara default akan menggunakan nilai pada parameter transaction time sebagai nilai parameter `start time`
`duration` | Integer | (required) | Durasi waktu expiry
`unit` | String | (required) | Expiry unit. Seperti: `day, hour, minute`

### Custom Fields

Fitur Custom field memberikan kebebasan bagi anda yang membutuhkan parameter data / nilai tertentu yang akan dikirim ke *backend* anda melalui HTTP Notifikasi midtrans. Nilai custom field juga akan tampil pada halaman detail transaksi Dashboard Midtrans. Anda dapat mengirim parameter Custom Fields pada saat melakukan API Request ke Midtrans.

Berikut adalah contoh JSON parameter yang dikirim pada saat [Request API](/id/snap/integration-guide.md?id=api-request)

<!-- tabs:start -->
#### **JSON Param**
```json
...
  "custom_field1": "1 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field2": "2 Anda dapat mengisi dengan nilai yang anda inginkan",
  "custom_field3": "3 Anda dapat mengisi dengan nilai yang anda inginkan"
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
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

## Credit Card
### 3 Domain Secure (3DS)
Dalam transaksi kartu kredit terdapat fitur otentikasi kemananan yaitu Three Domain Secure (3DS), anda dapat meng-aktifkan/nonaktifkan 3DS pada transaksi kartu kredit snap yang dikirim ke Midtrans. Secara default kami sangat menyarankan anda untuk tetap mengaktifkan fitur tersebut demi keamanan transaksi yang lebih baik. Namun jika anda ingin me-nonaktifkan fitur 3DS anda membutuhkan perjanjian khusus kepada Bank Aquiring yang akan menampung transksi kartu kredit Non-3DS anda. Silahkan konsultasikan dengan team Aktivasi Midtrans anda.

Berikut cara mengaktifkan/nonaktifkan fitur 3DS:
* Untuk mengaktifkan fitur 3DS, anda dapat mengisi nilai parameter `secure` dengan nilai `true`
* Untuk menonaktifkan fitur 3DS, anda dapat mengisi nilai parameter  `secure` dengan nilai `false`

Contoh parameter JSON pada saat melakukan [Request API](/id/snap/integration-guide.md?id=api-request):
<!-- tabs:start -->
#### **JSON Param**
```json
...
  "credit_card": {
    "secure": true
  }
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

### Simpan kartu
Midtrans sangat peduli akan kemudahan anda dalam memberikan kepuasan pelanggan. Pada halaman snap transaksi kartu kredit terdapat fitur untuk menyimpan informasi kartu kredit pelanggan. Informasi kartu kredit yang telah disimpan dapat digunakan pada transaksi selanjutnya tanpa harus memasukanya kembali.

Untuk menggunakan fitur simpan kartu anda tidak perlu menyimpan data informasi kartu, midtrans akan menyimpannya dengan aman, anda hanya perlu menambahkan parameter `"save_card" : true` dan `user_id` dengan nilai unik pada saat API Request ke Midtrans.

Anda juga diharuskan menyimpan nilai balik / repson dari parameter `user_id` yang telah anda kirim pada saat Request API sebelumnya ke Midtrans, sebagai kunci pada saat ingin menggunakan informasi kartu kredit yang telah disimpan sebelumnya.

Contoh parameter JSON pada saat melakukan [Request API](/id/snap/integration-guide.md?id=api-request):
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
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->
Pastikan untuk menggunakan `user_id` yang sama untuk pelanggan yang menggunakan fitur simpan kartu pada transaksi selanjutnya. Kartu pelanggan anda yang telah disimpan akan muncul pada halaman kartu kredit snap.

![enabled payment card](./../../asset/image/snap-adv-save-card-preview.jpg)

Untuk detail informasi menganai simpan kartu, anda dapat membaca [artikel](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction) berikut ini.

### Transaksi Recurring / Subscription
Snap juga dapat digunakan untuk melakukan transaksi langganan/*subscription* atau pembayaran berulang /*recurring*. Namun ada beberapa persyaratan yang harus dipenuhi:

* Untuk melakukan transaksi recurring, Anda memerlukan layanan Core API Midtrans.
* Saat ini transaksi recurring hanya didukung dengan metode kartu kredit.

Anda dapat melihat proses transaksi secara detail melalui diagram sequence dibawah ini:

<input id="seq-diag" class="collaps-toggle" type="checkbox">
<label for="seq-diag" class="collaps-label"><strong>Diagram Sequence Snap Recurring</strong></label>
<div class="collaps-content">

![snap recurring sequence](./../../asset/image/snap-adv-snap-recurring-sequence.png)
</div> 

Melakukan transaksi pertama pada recurring/subscription. Contoh parameter JSON pada saat melakukan [Request API](/id/snap/integration-guide.md?id=api-request):
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
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->

Respon API Request transaksi recurring pertama anda akan mendapatkan parameter `saved_token_id` yang dikirim melalui HTTP notifikasi. Nilai `saved_token_id` dari setiap kartu kredit adalah unik, anda harus menyimpan `saved_token_id` kedalam databse anda.

Ketika Anda ingin melakukan penagihan/recurring kepada pelanggan terkait dengan kartu kredit yang disimpan sebelumnya. Anda dapat menggunakan Core API `/charge` Midtrans untuk memotong dana pelanggan. Perlu diingat transaksi recurring merupakan transaksi non 3DS, jadi kartu kredit pelanggan anda akan secara otomatis terpotong saat melakukan `/charge` tanpa harus melakukan otenntikasi 3DS.

Untuk detail informasi menganai subscription/recurring, anda dapat membaca [artikel](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction) berikut.

### Mengarahkan Transaksi ke Bank Acquiring Spesifik
Anda dapat menentukan Bank Acquring mana yang dipilih untuk digunakan setiap transaksi Snap tertentu. Dana transaksi akan dialihkan ke acquiring bank tersebut. Silakan konsultasikan dengan Tim Aktivasi Midtrans untuk pemilihan bank yang ingin anda gunakan sebagai acquiring bank.

* Anda dapat menentukan nama bank didalam parameter `bank`

Contoh param JSON (param ini digunakan pada panduan [API Request](/id/snap/integration-guide.md?id=api-request)):
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
    "bank": "bca"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "bank": "bca"
  }
}'
```
<!-- tabs:end -->

### Filter BIN
Filter BIN Bank Identifier Number adalah fitur yang memungkinkan anda hanya menerima pembayaran dengan Kartu Kredit yang telah diset pada parameter BIN. Biasanya BIN digunakan untuk pembayaran promo / diskon tertentu yang hanya dapat menerima pembayaran dengan kartu kredit bank tersebut. BIN mempunyai panjang 1-6 digit angka, yang mengidentifikasi bank penerbit kartu. Pada umumnya Bank memiliki lebih dari satu BIN.

Untuk menggunakan fitur BIN, anda harus menuliskan daftar BIN atau bisa juga dengan menggunakan nama bank penerbit yang kemudian kumupulan daftar nilai bin tersebut dimasukan kedalam parameter `whitelist_bins`. Sehingga transaksi tersebut hanya dapat dibayar secara eksklusif, sesuai dengan kartu kredit yang telah didaftarkan didalam parameter `whitelist_bins`.

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}'
```
<!-- tabs:end -->

?> Catatan: Kami sudah melakukan automasi nomor BIN untuk sebagian besar bank seperti bni, mandiri, cimb, bca, dan bank mitra lainnya. Anda dapat menambahkan nama bank sebagai nilai pada parameter `whitelist_bins`

Pada gambar dibawah ini Anda akan melihat halaman snap yang menggunakan fitur Filter BIN:
![snap bin filter](./../../asset/image/snap-adv-bin-filter.png)

### Fitur Cicilan / *Installment*
#### Cicilan Online / *Online Installment*
Installment Online adalah pembayaran angsuran/cicilan dimana bank penerbit kartu dan Acquiring Bank adalah entitas yang sama (mis: Kartu BNI dan Acquiring Bank BNI)

Untuk mengaktifkan fitur Online Installment, anda harus memiliki perjanjian dengan bank. Bank akan mengeluarkan MID khusus untuk cicilan / Online Installment. Dengan menggunakan MID ini, transaksi akan dikonversi secara otomatis menjadi cicilan/Online Installment. Silakan berkonsultasi dengan Tim Aktivasi Midtrans untuk MID Online Installment. Jika MID sudah siap, anda hanya perlu menambahkan parameter Online Installment pada saat Request API.

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": [
        "bca": [6,12],
        "bni": [6,12],
        "mandiri": [3,6,12]
      ]
    }
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": [
        "bca": [6,12],
        "bni": [6,12],
        "mandiri": [3,6,12]
      ]
    }
  }
}'
```
<!-- tabs:end -->

Pada gambar dibawah ini Anda akan melihat halaman snap yang menggunakan fitur Online Installment:
![snap online installment](./../../asset/image/snap-adv-online-installment.png)

?> Catatan: Setelah pelanggan memasukkan nomor kartu kredit, Tenor cicilan akan muncul pada halaman pembayaran Snap. 


#### Offline Installment
Offline Installment adalah jenis installment dimana Penerbit Kartu dan Acquiring Bank bukan entitas yang sama (mis: Kartu BNI dan Acquiring Bank Mandiri).

Offline Installment memungkinkan fitur cicilan / installment dengan bank yang tidak mengeluarkan MID Installment. Untuk mengaktifkan fitur offline installment, anda hanya perlu menambahkan `installment` dengan kombinasi fitur filter bin `whitelist_bins`. Tujuan bin filter adalah untuk membatasi kartu tertentu yang dapat melakukan cicilan offline, berdasarkan perjanjian antara anda dan acquiring bank.

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": [
        "offline": [3,6,12]
      ]
    },
    "whitelist_bins": [ 
      481111,
      410505
    ]
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": [
        "offline": [3,6,12]
      ]
    },
    "whitelist_bins": [ 
      481111,
      410505
    ]
  }
}'
```
<!-- tabs:end -->

Pada gambar dibawah ini Anda akan melihat halaman snap yang menggunakan fitur Offline Installment:
![snap offline installment](./../../asset/image/snap-adv-offline-installment.png)

#### Definisi

Parameter | Deskripsi
--- | ---
`required` | Jika nilai parameter `required` adalah `true` transaksi tersebut wajib installmaent. <br>Jika `false` pelanggan dapat memilih untuk menjadikan transaksi intallment atau regular full payment
`terms` | Pada parameter `terms` online installment, anda dapat menambahkan nama bank <br>(mis: bni, bca, cimb, mandiri)

### Fitur Pre-Authorization
Fitur Pre-Authorization memungkinkan dana pelanggan tidak akan langsung dipotong setelah transaksi selesai, tetapi jumlah limit kartu sementara akan ditahan (reserved). Kemudian anda dapat melakukan "capture" melalui [Core API](https://api-docs.midtrans.com/#capture-transaction) Midtrans yang akan melepas dana yang telah di-reserved masuk ke acquiring bank. Jika tidak ada tindakan "capture" untuk transaksi Pre-Authorization, secara default setelah 7 hari dana reserved akan dirilis otomatis.

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
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
    "type": "authorize"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "type": "authorize"
  }
}'
```
<!-- tabs:end -->

<!-- ### Enabling Payments using Card Loyalty Points // TODO Is it available on Snap ???-->

## GoPay
### Redirect Customer From Gojek App
Setelah pembayaran GoPay selesai, secara default pelanggan akan tetap berada pada aplikasi Gojek, sehingga mereka harus menutup aplikasi Gojek secara manual untuk kembali ke web / aplikasi anda. Untuk menanggulangi masalah tersebut, anda dapat menggunakan parameter `gopay.callback_url` untuk mengarahkan pelanggan secara otomatis dari aplikasi Gojek ke web / aplikasi anda 

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
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
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
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

Anda dapat meberikan nilai pada parameter `callback_url` dengan URL prtocol http/https atau protokol Deeplink untuk aplikasi mobile. Sebagai contoh mengisi parameter `callback_url` dengan deeplink `"callback_url": "tokoecommerce://gopay_finish/"`

> **Note**: 
> Pada Url redirect akan ditambahkan secara otomatis dengan parameter seperti `?order_id=xxx&status_code=xxx&transaction_status=xxx`. 
> 
> Sebagai contoh, redirect_url akan terlihat seperti berikut: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102123123&status_code=200&transaction_status=capture`. 
> 
> Anda dapat menggunakan informasi pada parameter untuk menampilkan pesan khusus kepada pelanggan Anda di url Anda.

Catatan: `gopay.callback_url` hanya akan bekerja kepada pelanggan yang membayar dengan mode Deeplink, pelanggan yang membayar dengan mode Scan QR, akan diarahkan ke Snap finish redirect url. Yang bisa Anda konfigurasi di [sini](http://localhost:8000/#/id/snap/advanced-feature?id=custom-finish-url)

### Mengubah Mode GoPay
Secara default snap.js mendeteksi device apa yang anda gunakan:

* Jika anda menggunakan mobile device, Snap akan menggunakan mode Deeplink untuk mengarahkan pelanggan anda membuka aplikasi gojek secara otomatis.
* Jika anda menggunakan mobile device, Snap akan menampilkan QR Code untuk pelanggan anda.

Anda dapat menspesifik media pembayaran pada gopay untuk menggunakan Scan QR atau deeplink melalui parameter `gopayMode` pada Snap.js. 

Option | Type | Required? | Description
--- | --- | --- | ---
gopayMode | String | (optional) | Memilih media pembayaran gopay. <br>Mendukung nilai `deeplink`, `qr`, dan `auto`. Secara default nilai gopayMode adalah auto.

Contoh penggunaan Snap.js callback option (parameter tersebut digunakan selama implementasi [Snap frontend](/id/snap/integration-guide.md?id=_2-menampilkan-snap-popup-ke-halaman-frontend)), pada saat memanggil fungsi `snap.pay(...)`:

<!-- tabs:start -->
#### **Frontend JS**
```javascript
snap.pay('SNAP_TRANSACTION_TOKEN', {
  gopayMode: "deeplink"
})
```
#### **Snap Redirect Mode**
Jika anda menggunakan Mode Snap Redirect, anda dapat menambahkan parameter `?gopayMode=deeplink` pada bagian akhir URL
```
https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?gopayMode=deeplink
```
<!-- tabs:end -->

Untuk informasi lebih detail anda dapat mengunjungi [halaman berikut](https://snap-docs.midtrans.com/#gopay)


## Bank Transfer / VA
### Specify VA Number
Untuk bank transfer secara default Midtrans akan memberikan nomor virtual account secara acak. Dalam beberapa situasi anda memerlukan custom VA silahkan menambahkan parameter dibawah ini pada saat melakukan [API Request](/id/core-api/bank-transfer.md?id=charge-api-request).

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000"
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000"
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}'
```
<!-- tabs:end -->

Nomor virtual account berisi company code dan unique code. Contoh VA Number : `{91012}{12435678}` bagian pertama adalah *company code* dan bagian kedua adalah *unique code*. Hanya unique code yang bisa di kustomisasi untuk pembayaran bank **BCA**, **BNI** dan **Permata** (hanya untuk transaksi b2b).

* Nilai unique code hanya dapat diisi dengan angka.
* Setiap bank memiliki aturan dan spesifikasi custom VA yang berbeda. Mohon untuk melihat dokumentasi bank yang akan digunakan sebelum melakukan custom va.
* Jika nomor VA yang direquest sudah digunakan untuk transaksi lain, maka akan ditampilkan unique code secara random.
* Jika nomor VA yang direquest lebih panjang dari yang dibutuhkan, maka angka yang tidak perlu akan dipangkas.
* Jika nomor VA yang direquest lebih pendek dari yang dibutuhkan, maka nomor tersebut akan diawali dengan nol.
* Jika anda melakukan request charge dengan custom VA sebelumnya dan transaksi sebelumnya belum dilakukan pembayaran atau `/cancel` transaksi, maka Midtrans akan memberikan random unique VA Number.

Parameter | Type | Required? | Description
--- | --- | --- | ---
BCA `va_number`| String | (optional) | Panjang nilai custom VA harus 1 - 11 digit angka.
BCA `sub_company_code` | String | (optional) | Kode untuk BCA sub company <br>Catatan: Abaikan jika anda tidak mengetahuinya.
Permata `va_number` | String | (optional) | Panjang nilai custom VA harus 10 digit angka. Hanya untuk tipe VA B2B.
BNI `va_number` | String | (optional)| Panjang nilai custom VA harus 1 - 8 digit angka


?> Pada mode Production, tidak semua Bank dapat dilakukan custom VA. Fitur custom VA bergantung dengan perjanjian kerjasama yang anda lakukan dengan tim Midtrans. Silahkan konsultasikan dengan tim aktivasi kami.

### Specify VA Description
Pada beberapa virtual account, anda dapat melakukan kustomisasi nama dan pesan deskripsi

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}'
```
<!-- tabs:end -->

BCA VA:
* **Inquiry** Pesan teks yang dapat diisi dengan kemauan anda, yang akan ditampilkan di ATM (jika didukung) ketika pelanggan mencoba untuk memeriksa nomor VA.
* **Payment** Pesan teks yang dapat diisi dengan kemauan anda, yang akan ditampilkan di ATM (jika didukung) ketika pelanggan mencoba membayar nomor VA.


BCA VA Free Text Array: 

Parameter | Type | Required? | Description
--- | --- | --- | ---
inquiry | Array of FreeTextItem | (optional) | Maximal panjang array adalah 10
payment | Array of FreeTextItem | (optional) | Maximal panjang array adalah 10

BCA VA Free Text Item:

Parameter | Type | Required? | Description
--- | --- | --- | ---
en | String | (required) | Maksimal panjang string tidak lebih dari 50 karakter
id | String | (required) | Maksimal panjang string tidak lebih dari 50 karakter

Permata VA:

Parameter | Type | Required? | Description
--- | --- | --- | ---
recipient_name | String | (optional) | Nama penerima yang ditunjukkan pada halaman payment bank. akan ditampilkan dengan format string huruf besar 20 karakter. Jika text lebih dari 20 karakter akan terpotong. CATATAN: Nilai default adalah nama merchant

## Convenience Store

### Specify Alfamart
Menampilkan pesan pada struk belanja alfamart

Contoh param JSON (param ini digunakan selama [Request API](/id/snap/integration-guide.md?id=api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}'
```
<!-- tabs:end -->

Atribut JSON         | Tipe data  | Wajib  | Deskripsi
---------------------| ---------- | ------ | -----------
alfamart_free_text_1 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart
alfamart_free_text_2 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart
alfamart_free_text_2 | String(40) | Tidak  | Menampilkan pesan pada struk belanja alfamart

## Referensi

Untuk penjelasan yang lebih detail anda dapat mengunjungi halaman [Snap Docs](https://snap-docs.midtrans.com/#json-objects)

<div class="my-card">

#### [Snap Docs &#187;](https://snap-docs.midtrans.com/#json-objects)
</div>