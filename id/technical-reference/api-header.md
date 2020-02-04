# Otorisasi API & Headers

Untuk permintaan / panggilan API pada Midtrans backend, Midtrans API membutuhkan headers HTTP yang akan dijelaskan di bawah ini.

## Content-Type dan Accept Header

API Midtrans menggunakan format JSON sebagai input dan output, jadi Anda harus menentukan JSON sebagai tipe konten & menerima JSON sebagai respon, untuk itu anda harus menambahkan beberapa parameter header seperti berikut ini:

- `Content-Type: application/json`
- `Accept: application/json`

## Otorisasi pada Header

Header Otorisasi akan digunakan oleh API Midtrans untuk mengidentifikasi "ID merchant" yang melakukan permintaan (dan fitur mana yang diizinkan untuk digunakan), sehingga permintaan Anda dapat diproses oleh backend Midtrans. Nilai header Otorisasi didasarkan pada [**Server Key**](/id/midtrans-account/overview?id=mengambil-kunci-api-akses-kunci)

Sebagai analogi, Authentication Header dapat dianggap sebagai "kunci mobil Anda", sehingga hanya Anda yang dapat mengakses mobil Anda (dan hanya mobil Anda yang dapat diakses oleh Anda).

- Untuk mendapatkan Server Key **Environment Sandbox**, Anda dapat mengunjungi Sandbox Dashboard, menu: [Settings - Access Keys](https://dashboard.sandbox.midtrans.com/settings/config_info) 
- Untuk mendapatkan Server Key **Environment Production**, Anda dapat mengunjungi Dashboard, menu: [Settings - Access Keys](https://dashboard.midtrans.com/settings/config_info).

!> Setiap merchant Midtrans memliki nilai Akses keys yang unik dan Server Key bersifat rahasia. Mohon tetap menjaga kerahasiaan Server Key anda.

Mekanisme untuk mendapatkan nilai Authorization pada HTTP header: 
1. Anda dapat mengikuti format berikut ini [**Basic Authentication**](https://swagger.io/docs/specification/authentication/basic-authentication/). mis: `Username:Password`. 
2. Username dan password dipisahkan oleh simbol `:`
3. Server Key digunakan untuk nilai parameter `username`, sedangkan nilai parameter `password` dibiarkan kosong.
	- Contoh: Nilai server key anda `SB-Mid-server-abc123cde456`, maka akan menjadi `SB-Mid-server-abc123cde456:`.
4. Encode nilai dengan format base64 (menjadi: `U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`)
5. Tambahkan dengan parameter `Basic ` sebagai prefix (menjadi: `Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`)
6. Maka hasil akhir pada Authorization header menjadi `Authorization: Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`


Anda dapat mencoba dengan tool Generator Authorization Header dibawah ini:

<details>
<summary><b>Authorization Header Generator</b></summary>
<article>

[Authorization Header Generator](https://jsfiddle.net/wx3hbcen/embedded/result,html/dark ':include :type=iframe width=100% height=600px')
</article>
</details>
<br>

## Nilai Komplit pada HTTP(s) Headers

 HTTP(s) Header | Deskripsi
--- | ---
`Content-Type: application/json` | Parameter Tipe konten (Content-Type) menggunakan format JSON yang digunakan oleh pemohon API Request. Penerima permintaan API Request juga harus membolehkan format JSON yang akan diterima.
`Accept: application/json` | Parameter Accept digunakan untuk menentukan jenis media tertentu yang dapat diterima oleh responder. Dalam hal ini format JSON yang diperbolehkan untuk digunakan.
`Authorization: base64Encode(ServerKey+":")` | Parameter Authorization menggunakan format *Basic Auth*, Server key digunakan sebagai username dan password dikosongkan.


<details open>
<summary>Contoh Final Request pada Curl</summary>
<article>

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6' \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }
}'
```
</article>
</details>

#### Exception pada Frontend API Request

Frontend API Request yang dimaksudkan adalah permintaan API Request yang dipanggil dari sisi frontend, seperti API `/token` (untuk mendapatkan token kartu), dll. Nilai Header diatas **tidak diperlukan**. Untuk menghindari resiko mengekspos Server Key Anda di frontend yang dapat diakses publik. Anda **tidak diperbolehkan menggunakan Server Key** untuk meng-otentikasi API Request pada API `/token`,

Sebagai gantinya Client Key digunakan untuk mengotorisasi API Request.

Sebagai contoh, Nilai Client Key digunakan pada API `/token` untuk mendapatkan token kartu pada saat melakukan API Request:

Kunci | Deskripsi
--- | ---
HTTP(s) Method | `GET`
HTTP(s) Header | -
API endpoint URL | `https://api.sandbox.midtrans.com/v2/token`
Query Parameter untuk auth | `client_key=<YOUR-CLIENT-KEY>`

```bash
curl 'https://api.sandbox.midtrans.com/v2/token?client_key=SB-Mid-client-xxxxxxx&card_cvv=123&gross_amount=20000&currency=IDR&card_number=4811111111111114&card_exp_month=02&card_exp_year=2025'
```