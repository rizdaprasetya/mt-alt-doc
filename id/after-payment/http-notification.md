# HTTP(S) Notification / Webhook

Midtrans akan mengirim notifikasi melalui protokol HTTP(S) dengan metode POST ketika customer telah selesai melakukan pembayaran dan status tranasksi berubah menjadi refund, pending, dll. Merchant dapat memanfaatkan notifikasi POST HTTP(S) untuk memperbarui status pembayaran atau mengirim item transaksi secara real time.

Anda dapat melakukan konfigurasi URL notifikasi pada akun Midtrans anda, melalui menu [Settings - Configuration](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration/). Anda wajib menambahkan Protokol URL menggunakan `https://` atau `http://`, namun untuk keamanan yang lebih baik, kami sangat menyarankan anda dapat menggunakan protokol HTTPS.

![HTTP Notification Configuration](./../../asset/image/after-payment-notifurl-dashboard.png)

!> Pastikan URL Notifikasi yang anda isi dapat diakses oleh public. Midtrans tidak dapat mengirim notifikasi ke alamat URL lokal (localhost), URL yang diproteksi oleh username dan password, URL yang hanya dapat diakses melalui VPN, serta penambahan port yang tidak umum. Namun jangan khawatir untuk keamanan anda dapat memanfaatkan parameter `signature_key` metode tersebut akan dijelaskan dibawah ini.

?> **Tips**: Jika aplikasi anda masih dalam tahap pengembangan, untuk dapat menerima notifikasi midtrans anda dapat memanfaatkan beberpa aplikasi yang dapat mengekspos private localhost server anda menjadi public. Anda dapat menggunakan beberapa tool seperti: [Ngrok](https://ngrok.com/), [Serveo](http://serveo.net/), [Localhost.Run](http://localhost.run/)

### Contoh Notifikasi

The HTTP(S) POST notification is HTTP request with:

Key | Type
--- | ---
Kind | HTTP Request
Request Method | `POST`
Request Header | `Content-Type: application/json`
Request Body | `string` of JSON

<details>
<summary><b>Contoh Request Notification dalam CURL</b></summary>
<article>

Berikut ini adalah contoh bagaimana Notifikasi HTTP dikirim oleh Midtrans:
```bash
curl -X POST \
  https://tokoecommerc.com/payment-notification-handler/ \
  -H 'Accept: application/json'\
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "M004123",
  "masked_card": "481111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}'
```
</article>
</details>

Beberapa contoh notifikasi transaksi berhasil berdasarkan payment channel:
<!-- TODO: Update the notification sample with actual test result-->

<!-- tabs:start -->
#### **Card**
```javascript
{
  "transaction_time": "2020-01-09 18:27:19",
  "transaction_status": "capture",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "payment_type": "credit_card",
  "order_id": "Postman-1578568851",
  "merchant_id": "M004123",
  "masked_card": "481111-1114",
  "gross_amount": "10000.00",
  "fraud_status": "accept",
  "eci": "05",
  "currency": "IDR",
  "channel_response_message": "Approved",
  "channel_response_code": "00",
  "card_type": "credit",
  "bank": "bni",
  "approval_code": "1578569243927"
}
```

#### **GoPay**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "1c28dbbb-8596-48e4-85d7-9f1382db8a1f",
  "order_id": "order03",
  "gross_amount": "275000.00",
  "payment_type": "gopay",
  "transaction_time": "2016-06-19 15:54:42",
  "transaction_status": "settlement",
  "signature_key": "973d175e6368ad844b5817882489e6b22934d796a41a0573c066b1e64532dc0001087b87d877a3eac37cba20a733e1305f5e62739e65ff501d5d33c5ac62530f"
}
```

#### **Permata VA**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "6fd88567-62da-43ff-8fe6-5717e430ffc7",
  "order_id": "H17550",
  "gross_amount": "145000.00",
  "payment_type": "bank_transfer",
  "transaction_time": "2016-06-19 18:23:21",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "permata_va_number": "8562000087926752",
  "signature_key": "0c0df82489931602577d9e434966c0540249b7c0aeaae2b718305af89a11e2bf9b4008aba07d1b3b248b15b4fbecdd15e81dbb2648b974efc4e0656e8c976094"
}
```

#### **BCA VA**
```javascript
{
  "va_numbers": [
    {
      "bank": "bca",
      "va_number": "91019021579"
    }
  ],
  "transaction_time": "2016-06-19 19:12:22",
  "gross_amount": "20000.00",
  "order_id": "1466323342",
  "payment_type": "bank_transfer",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "status_code": "200",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **Mandiri Bill**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "883af6a4-c1b4-4d39-9bd8-b148fcebe853",
  "order_id": "tes",
  "gross_amount": "1000.00",
  "payment_type": "echannel",
  "transaction_time": "2016-06-19 15:10:29",
  "transaction_status": "settlement",
  "approval_code": "340093197",
  "signature_key": "bbceb3724b0b2446c59435795039fed2d249d3438f06bf90c999cc9d383b95170b7b58f9412fba25ce7756da8075ab1d78a48800156380a62dc84eb22b3f7de9",
  "bill_key": "990000000260",
  "biller_code": "70012"
}
```

#### **BNI VA**
```javascript
{
  "va_numbers": [
    {
      "bank": "bni",
      "va_number": "8578000000111111"
    }
  ],
  "payment_amounts": [
    {
      "paid_at": "2016-06-19 20:12:22",
      "amount": "20000.00"
    }
  ],
  "transaction_time": "2016-06-19 19:12:22",
  "gross_amount": "20000.00",
  "order_id": "1466323342",
  "payment_type": "bank_transfer",
  "signature_key": "fe5f725ea770c451017e9d6300af72b830a668d2f7d5da9b778ec2c4f9177efe5127d492d9ddfbcf6806ea5cd7dc1a7337c674d6139026b28f49ad0ea1ce5107",
  "status_code": "200",
  "transaction_id": "9aed5972-5b6a-401e-894b-a32c91ed1a3a",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **BCA Klikpay**
```javascript
{
  "approval_code": "91231",
  "transaction_time": "2016-06-19 15:46:16",
  "gross_amount": "11000.00",
  "order_id": "orderid-01",
  "payment_type": "bca_klikpay",
  "signature_key": "35c4111539e184b268b7c1cd62a9c254e5d27c992c8fd55084f930b69b09eaafcfe14b0d512c697648295fdb45de777e1316b401f4729846a91b3de88cde3f05",
  "status_code": "200",
  "transaction_id": "ada84cd9-2233-4c67-877a-01884eece45e",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **KlikBCA**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "c0ba3583-5111-45a5-9f1c-84c9de7cb2f6",
  "order_id": "3176440",
  "gross_amount": "50000.00",
  "payment_type": "bca_klikbca",
  "transaction_time": "2016-06-19 15:58:15",
  "transaction_status": "settlement",
  "approval_code": "YCRHOM160704",
  "signature_key": "ef0f472fa8a5165dc9f2ff6300832eb28657e88b9f3335ae5ebb27c8ef258d203c6da18ac6cd5738d2e38c54dfec860d8e067bdbc759a1268ab04218ccab93cc",
}

```

#### **Mandiri ClickPay**
```javascript
{
  "approval_code": "166JF5644001",
  "transaction_time": "2016-06-19 15:56:45",
  "gross_amount": "156216.00",
  "order_id": "100248319",
  "payment_type": "mandiri_clickpay",
  "signature_key": "1e5d08e7f53cf0d4d07c85ad807fc091e59f579807b5a2e9728cb8d9ab11431d61673450944ef3fa7a87d7d2dbce8e90dc96012fc9950e3eb2d52521d5120a57",
  "status_code": "200",
  "transaction_id": "3bdddabe-a4ea-4233-81cc-09578178909f",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **CIMB Clicks**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "226f042f-020e-4829-8bd7-2de64b8673ce",
  "order_id": "1000156414164125",
  "gross_amount": "392127.00",
  "payment_type": "cimb_clicks",
  "transaction_time": "2016-06-19 16:45:21",
  "transaction_status": "settlement",
  "approval_code": "RB5031388093",
  "signature_key": "3bcdf0700d3c8a288f279e4fe27a4012e916cb44120d541f6e4c48c83a107b605fdb063ae7c8744d15891047aeb1fc8d2e95741c0abc5f67e10e0b60244bc441"
}
```

#### **Danamon Online Banking**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "226f042f-020e-4829-8bd7-2de64b8673ce",
  "order_id": "1000156414164125",
  "gross_amount": "392127.00",
  "payment_type": "danamon_online",
  "transaction_time": "2016-06-19 16:45:21",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "approval_code": "RB5031388093",
  "signature_key": "3bcdf0700d3c8a288f279e4fe27a4012e916cb44120d541f6e4c48c83a107b605fdb063ae7c8744d15891047aeb1fc8d2e95741c0abc5f67e10e0b60244bc441"
}
```

#### **Indomaret**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "order_id": "order04",
  "gross_amount": "162500.00",
  "payment_type": "cstore",
  "transaction_time": "2016-06-20 11:44:07",
  "transaction_status": "settlement",
  "approval_code": "59061607081045705101",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "payment_code": "25709650945026",
  "store": "indomaret"
}
```

#### **Alfamart**
```javascript
{
  "status_code": "200",
  "status_message": "midtrans payment notification",
  "transaction_id": "991af93c-1049-4973-b38f-d6052c72e367",
  "order_id": "order04",
  "gross_amount": "162500.00",
  "payment_type": "cstore",
  "transaction_time": "2016-06-20 11:44:07",
  "transaction_status": "settlement",
  "approval_code": "59061607081045705101",
  "signature_key": "a198f93ac43cf98171dcb4bd0323c7e3afbee77a162a09e2381f0a218c761a4ef0254d7650602971735c486fea2e8e9c6d41ee65d6a53d65a12fb1c824e86f9f",
  "payment_code": "25709650945026",
  "store": "alfamart"
}
```

#### **Akulaku**
```javascript
{
  "transaction_time": "2018-08-24 16:20:36",
  "gross_amount": "11000.00",
  "order_id": "orderid-01",
  "payment_type": "akulaku",
  "signature_key": "35c4111539e184b268b7c1cd62a9c254e5d27c992c8fd55084f930b69b09eaafcfe14b0d512c697648295fdb45de777e1316b401f4729846a91b3de88cde3f05",
  "status_code": "200",
  "transaction_id": "b3a40398-d95d-4bb9-afe8-9a57bc0786ea",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```

#### **BRI Epay**
```javascript
{
  "approval_code": "201373311528",
  "transaction_time": "2016-06-19 16:04:02",
  "gross_amount": "145000.00",
  "order_id": "2014111702",
  "payment_type": "bri_epay",
  "signature_key": "13b6b8a2da46428812e7685463770e3704ece7fc3242a5f016f068b7b135e12a71afd02259fe4dbd8c97d747ae9cf8e13412842325ea8da4cf6d7177e32b7e31",
  "status_code": "200",
  "transaction_id": "f8635cd7-615d-4a6d-a806-c9ca4a56257e",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
}
```
<!-- tabs:end -->

?> Untuk memastikan transaksi anda aman, Anda direkomendasikan untuk selalu cek nilai status transaksi pada parameter `transaction_status`. Transaksi bisa dikatakan berhasil jika nilai parameter `transaction_status` adalah `settlement` (atau `capture` pada transaksi kartu) dan nilai pada parameter `fraud_status` adalah `accept`.

### Definisi Status

<!-- tabs:start -->
#### **Status Transaksi**

transaction_status | 🔍 | deskripsi
--- | --- | ---
`capture` | ✅ | Transaksi kartu berhasil dilakukan. <br>Jika tidak dilakukan manual, Transaksi akan otomatis berubah menjadi settle pada hari selanjutnya. <br> Status transaksi `capture` aman untuk dianggap sebagai pembayaran yang berhasil.
`settlement` | ✅ | Dana telah diterima, Transaksi berhasil.
`pending` | 🕒 | Transaksi berhasil dibuat dan menunggu pembayaran oleh customer melalui (ATM/ebanking/E-wallet app/ store).
`deny` | ❌| Payment provider / Fraud Detection System menolak kredensial yang digunakan untuk pembayaran. Anda dapat melihat detail/alasan transaksi tersebut ditolak pada nilai parameter `status_message`.
`cancel` | ❌| Transaksi dibatalkan. pembatalan transaksi dapat dilakukan oleh Midtrans atau merchant.
`expire` | ❌| Transaksi sudah tidak tersedia / kadaluarsa, dikarenakan tidak ada pembayaran yang diterima atau lewat dari batas waktu yang telah ditentukan.
`refund` | ↩️| Refund dapat dilakuan oleh Merchant. Transaksi akan ditandai sebagai refund.

#### **Status Fraud**

fraud_status | 🔍 | deskripsi
--- | --- | ---
`accept` | ✅ | Transaksi anda aman, tidak ditandai sebagai transaksi fraud.
`deny` | ❌ | Transaksi ditandai sebagai fraud. Untuk kemananan maka transaksi ditolak/deny.
`challenge` | ⚠️ | Transaksi berpotensi farud, tetapi tidak bisa ditentukan dengan tepat. Merchant harus mengambil tindakan untuk menerima atau menolak transaksi melalui Dashboard, atau via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API
<!-- tabs:end -->

### Verifikasi Notifikasi Midtrans

Untuk memastikan integritas keamanan data yang anda terima melalui notifikasi Midtrans, kami sangat merekomendasikan anda untuk memverifikasi setiap notifikasi yang anda terima dengan mekanisme berikut ini:
<!-- tabs:start -->
#### **Verifikasi Parameter Signature Key**

Pada Body JSON Notifikasi yang kami kirim, terdapat parameter `signature_key` yang digenerate salah satunya menggunakan server key. Karena diasumsikan hanya Midtrans dan Merchant yang mengetahui Server Key. `signature_key` dapat digunakan untuk memastikan notifikasi dikirim oleh Midtrans, dan dapat diverifikasi oleh Merchant.

Bagaimana memastikan dan `signature_key` dibuat akan dijelaskan dibawah ini:

```
SHA512(order_id+status_code+gross_amount+serverkey)
```

> Pada dasarnya nilai dari parameter `signature_key` adalah gabungan String dari nilai `order_id`, `status_code`,`gross_amount` dan `ServerKey` menggunakan fungsi hash SHA512. Dengan begitu anda dapat melakukan hal yang sama dan memastikan kesamaan nilai `signature_key` yang dikirim oleh midtrans melalui HTTP Notifikasi.

Anda dapat mencoba membuat signature_key dengan tools dibawah ini:

<details>
<summary><b>Generator Signature Key</b></summary>
<article>

[Signature Key Calculator](https://jsfiddle.net/5amr8cov/6/embedded/result,html/dark ':include :type=iframe width=100% height=800px')
</article>
</details>
<br>

#### **Verifikasi Langsung Notifikasi Melalui API Midtrans**

Alternatif lain untuk memverifikasi notifikasi midtrans adalah dengan memanggil API [Get Status](/en/after-payment/action-payment.md?id=api-get-status). Dengan menggunakan API Get status anda akan mendapatkan respon langsung dari Midrans. Anda akan mendapatkan respon JSON yang sama persis dengan yang ada pada Notifikasi yang dikirim oleh Midtrans. Anda dapat melihat ilustrasi dibawah ini: 


![Verify Notification Diagram](./../../asset/image/after-payment-notif-diag.png)
<!-- tabs:end -->

?> **Tips**: Pada Official Midtrans library dan CMS Plugins midtrans secara otomatis akan melakukan verifikasi secara langsung melalui API Midtrans. Mekanisme tersebut ada pada fungsi/metode `notification`

### Respon HTTP Status

Agar Mindtrans dapat mengetahui bahwa URL Notifikasi anda telah menerima notifikasi yang dikirim, maka pada URL Notifikasi anda / mercahant harus merespons dengan http staus code dengan nilai `200`. Dibeberapa backend / web framework hanya dengan melakukan print String `ok` secara otomatis akan mengirim http status code `200`.

### Praktik Terbaik untuk Menangani Notifikasi Midtrans

<br>
<details>
<summary><b>Best Practice</b></summary>
<article>

- Selalu menggunakan protokol HTTPS. Protokol ini lebih aman dan dapat mencegah penyerangan dengan metode MITM, dikarenakan kami memvalidasi sertifikat yang cocok dengan host. Juga jangan menggunakan sertifikat yang ditandatangani sendiri.
- Pada notifikasi URL gunakan port standar yaitu (80/443)
- Selalu menerapkan notifkasi dengan cara idempoten, dalam kasus yang sangat jarang, kami dapat mengirim beberapa notifikasi untuk transaksi yang sama. Pastikan tidak menyebabkan duplikasi entri pada backend anda, Cara sederhana untuk menanggulangi masalah ini adalah dengan menggunakan orderid sebagai kunci untuk memastikan tidak ada duplikasi data entri.
- Selalu melakukan pengecekan terhadap nilai `signatue_key` yang dapat dijadikan sebagai acuan bahwa notifikasi yang diterima benar-benar dikirim oleh Midtrans. 
- Selalu melakukan pengecekan terhadap tiga parameter yang ada pada transaksi yang sukses
	- `status_code`: Pada transaksi yang sukses, nilai pada parameter harus bernilai `200` 
	- `fraud_status`: ACCEPT
	- `transaction_status` : settlement/capture
- Kami berusaha untuk mengirim pemberitahuan sesegera mungkin setelah perubahan status transaksi terjadi, tetapi dalam kasus yang sangat jarang, dimungkinkan karena lonjakan transaksi yang besar anda akan telat untuk mendapatkan notifikasi transaksi. Jika Anda belum menerima Notifikasi Midtrans, silakan menggunakan API Status untuk memeriksa status transaksi saat ini.
- Sangat Aman untuk memanggil API Status untuk mendapatkan status transaksi / pesanan terbaru pada setiap notifikasi.
- Kami melakukan timeout pada HTTP selama 15 detik. Usahakan untuk selalu menjaga waktu respon notifikasi HTTP dibawah 5 detik. Dalam kasus yang sangat jarang, kami dapat mengirim notifikasi HTTP yang rancu, yaitu mengirim notifikasi status transaksi `settlement`, sebelum mengirimkan notifikasi untuk status transaksi `pending`, penting sekali untuk mengabaikan notifikasi tersebut. Tetapi sekali lagi anda dapat menggunakan API / status untuk mengonfirmasi status transaksi terbaru anda. 
- Kami mengirimkan body notifikasi dengan format JSON. Pastikan anda melakukan parse JSON dengan JSON Parser. Pastikan juga anda dapat menerima penambahan kolom atau parameter baru yang dapat muncul tanpa pemberitahuan sebelumnya agar aplikasi anda tidak berhenti secara tiba-tiba. Ini memungkinkan kami untuk memperluas sistem notifikasi kami tanpa harus merusak implementasi merchant yang sudah berjalan.
- Untuk notifikasi selalu menggunakan kode status HTTP dengan benar, kami akan selalu melakukan pengiriman ulang notifikasi sesuai dengan respon kode status HTTP yang didapatkan 
	- Untuk kode status `2xx`: Tidak ada perulangan, karena transaksi telah dikirim
	- Untuk kode status `500`: Midtrans Akan mengirim ulang notifikasi hanya 1 kali
	- Untuk kode status `503`: Midtrans Akan mengirim ulang notifikasi sebanyak 4 kali
	- Untuk kode status `400/404`: Midtrans Akan mengirim ulang notifikasi sebanyak 2 kali
	- Untuk kode status `301/302/303`: Tidak ada perulangan. Kami menyarankan anda untuk memerika URL endpoint notifikasi yang anda isi pada menu [Settings -> Configuration](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration). Pastikan kembali URL tersebut dapat merespon dengan kode status HTTP yang sesuai.
	- Untuk kode status `307/308`: Mengarahkan dengan URL redirect baru dengan metode POST dan json body notifikasi yang sama. Maximal melakukan redirect sebanyak 5 kali.
	- Untuk semua kegagalan: Midtrans Akan mengirim ulang notifikasi sebanyak 5 kali
- Biasanya Midtrans melakukan percobaan kembali pengiriman notifikasi yang gagal sebanyak 5 kali, sesuai dengan aturan yang ada.
- Perbedaan jarak waktu perulangan notifikasi dari percobaan pertama sampai ke lima adalah 2 menit, 10 menit, 30 menit, 1.5 Jam, 3,5 Jam.
- Midtrans akan melakukan percobaan pengiriman kembali notifikasi secara bergantian dalam waktu yang acak. Misalnya, setelah gagal mengirim notifikasi percobaan pertama akan dilakukan pada detik ke 33 (Paling lama 2 menit).
</article>
</details>

### Contoh Kode Implementasi Notifikasi

Contoh kode implementasi bagaimana merchant dalam menerima notifikasi HTTP(s) POST dan JSON object yang telah di-utilize menggunakan **Midtrans Official Library**. Kami mengasumsikan kode dibawah ini menggunakan URL endpoint yang dapat diakses pada (https://tokoecomm.com/notification)

<!-- tabs:start -->
#### **Node JS**
```javascript
const midtransClient = require('midtrans-client');
// Membuat object Core API / Snap
let apiClient = new midtransClient.Snap({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

apiClient.transaction.notification(notificationJson)
    .then((statusResponse)=>{
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

        // Contoh logic dalam menangani transactionStatus

        if (transactionStatus == 'capture'){
            if (fraudStatus == 'challenge'){
                // TODO set transaction status on your database to 'challenge'
                // respon dengan http status 200 OK
            } else if (fraudStatus == 'accept'){
                // TODO set transaction status on your database to 'success'
                // respon dengan http status 200 OK
            }
        } else if (transactionStatus == 'settlement'){
            // TODO set transaction status on your database to 'success'
            // respon dengan http status 200 OK
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
          // TODO set transaction status on your database to 'failure'
          // respon dengan http status 200 OK
        } else if (transactionStatus == 'pending'){
          // TODO set transaction status on your database to 'pending' / waiting payment
          // respon dengan http status 200 OK
        }
    });
```
#### **PHP**
```php
<?php

require_once(dirname(__FILE__) . '/Midtrans.php');
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$serverKey = '<your serverkey>';
$notif = new \Midtrans\Notification();

$transaction = $notif->transaction_status;
$type = $notif->payment_type;
$order_id = $notif->order_id;
$fraud = $notif->fraud_status;

if ($transaction == 'capture') {
  // Untuk transaksi kartu kredit, anda perlu memeriksa apakah transaksi terdapat challenge status dari FDS
  if ($type == 'credit_card'){
    if($fraud == 'challenge'){
      // TODO set payment status in merchant's database to 'Challenge by FDS'
      // TODO merchant should decide whether this transaction is authorized or not in MAP
      echo "Transaction order_id: " . $order_id ." is challenged by FDS";
      }
      else {
      // TODO set payment status in merchant's database to 'Success'
      echo "Transaction order_id: " . $order_id ." successfully captured using " . $type;
      }
    }
  }
else if ($transaction == 'settlement'){
  // TODO set payment status in merchant's database to 'Settlement'
  echo "Transaction order_id: " . $order_id ." successfully transfered using " . $type;
  }
  else if($transaction == 'pending'){
  // TODO set payment status in merchant's database to 'Pending'
  echo "Waiting customer to finish transaction order_id: " . $order_id . " using " . $type;
  }
  else if ($transaction == 'deny') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is denied.";
  }
  else if ($transaction == 'expire') {
  // TODO set payment status in merchant's database to 'expire'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is expired.";
  }
  else if ($transaction == 'cancel') {
  // TODO set payment status in merchant's database to 'Denied'
  echo "Payment using " . $type . " for transaction order_id: " . $order_id . " is canceled.";
}
?>
```
<!-- tabs:end -->

### Kustomisasi URL Notifikasi melalui API
<br>
<details>
<summary><b>Kustomisasi URL Notifikasi melalui API</b></summary>
<article>
	
Secara opsional, anda dapat mengganti atau menambahkan beberapa custom URL notifikasi pada setiap transaksi. Hal ini dapat anda lakukan dengan memanfaatkan Header HTTP(s) pada saat Request API.

Terdapat dua opsi header yang dapat Midtrans terima, diantaranya:
- `X-Append-Notification` : Untuk menambahkan URL notifikasi baru, bersamaan dengan URL notifikasi yang ada pada setting pada Dashboard Midtrans.
- `X-Override-Notification` : Untuk menambahkan URL notifikasi baru, dan akan mengabaikan URL notifikasi yang ada pada setting pada Dashboard Midtrans.

Kedua parameter header diatas masing-masing hanya dapat menampung maksimal 2 alamat URL notifikasi yang dipisahkan dengan karakter koma (`,`).

#### Contoh Kustomisasi URL Notifikasi melalui API dengan CURL

Ini adalah contoh override-notification-url pada saat Request API snap:

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -H 'X-Override-Notification: https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }
}'
```

#### Contoh kasus

Kita asumsikan anda telah melakukan konfigurasi URL notifikasi pada Dashboard Midtrans dengen URL `https://example.com`. Jika anda melakukan override-notification-url dengan menambahkan header `X-Append-Notification: https://example.com/test1,https://example.com/test2`. Maka setelah itu midtrans akan mengirim HTTP(s) notifikasi pada transaksi tersebut ke alamat:
- https://example.com,
- https://example.com/test1, dan
- https://example.com/test2

Namun jika merchant melakukan override-notification-url dengan menambahkan header  `X-Override-Notification: https://example.com/test1,https://example.com/test2`. Maka setelah itu midtrans akan mengirim HTTP(s) notifikasi pada transaksi tersebut ke alamat:
- https://example.com/test1 dan
- https://example.com/test2
</article>
</details>