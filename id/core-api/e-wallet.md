<H2> Integrasi Pembayaran E-Wallet </H2> 

![Gopay logo](./../../asset/image/coreapi/logo-gopay.svg ':size=150') sebuah metode pembayaran e-Wallet dari Gojek. Pengguna dapat membayar menggunakan aplikasi Gojek. Flow pengguna bervariasi ketika menggunakan web browser (komputer atau tablet) atau dengan SmartPhone:
1. **QR Code** - Untuk pengguna yang menggunakan browser web (di komputer atau tablet), akan ditunjukkan kode QR dan diminta untuk scan kode QR menggunakan aplikasi Gojek.
2. **Deeplink** - Untuk pengguna yang menggunakan SmartPhone, akan langsung diarahkan ke aplikasi Gojek untuk menyelesaikan pembayarannya.

Proses integrasi dasar untuk pembayaran GoPay akan dijelaskan di bawah.

?> Sebelum melakukan proses integrasi, pastikan anda sudah memiliki [Akun Midtrans](/en/midtrans-account/overview).

## Langkah Integrasi
1. Kirim data transaksi ke API Charge.
2. Membuat flow transaksi sesuai pada perangkat yang digunakan:
    * Tampilkan gambar kode QR (komputer atau tab).
    * Buat link ke aplikasi Gojek (SmartPhone).
    * Mengimplementasi GoPay deeplink callback.
3. Terima notifikasi transaksi.



<details>
<summary><b>Diagram Sequence</b></summary>
<article>
Berikut adalah gambaran proses pembayaran gopay dengan diagram sequence baik QR Code maupun Deeplink:

<!-- tabs:start -->
#### **QR Code Mode (Default)**
![QR sequence diagram](./../../asset/image/coreapi/gopay_qr.png)

#### **Deeplink Mode**
![Deeplink sequence diagram](./../../asset/image/coreapi/gopay_deeplink.png)
<!-- tabs:end -->
</article>
</details>

## 1. Kirim Data Traksaksi ke API Charge
*Request API charge* akan dilakukan melalui *backend Merchant*. *Server Key* (dari [Dashboard](https://dashboard.midtrans.com/) Anda) akan dibutuhkan untuk meng-otentikasi request.

Atribut          | Deskripsi
---------------- | ---
Server Key       | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md)
`order_id`       | Order ID transaksi yang dapat anda isi sesuai dengan kebutuhan anda
`gross_amount`   | Total nilai transaksi
`payment_type`   | Berikan nilai `gopay` sebagai metode pembayaran


### Charge API request

Contoh dibawah ini adalah kode program untuk charge request:

<!-- tabs:start -->
#### **API-Request**

*Berikut contoh dari request API `/charge` dalam CURL, silahkan implementasikan sesuai bahasa pemrograman backend Anda (Anda juga bisa cek [library-library pemrograman yang tersedia](/en/developer_resource/library_plugin)).*


#### Request Details
Type | Value
--- | ---
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

#### Full HTTP Request

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
    "payment_type": "gopay",
    "transaction_details": {
        "order_id": "order-101",
        "gross_amount": 44000
    }
}'

```

#### **PHP**

Install [**midtrans-php**](https://github.com/Midtrans/midtrans-php) library
```bash
composer require midtrans/midtrans-php
```

> Alternatif, jika anda tidak menggunakan **Composer**, anda dapat [unduh midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), dan import secara manual kedalam project anda
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

GoPay Charge
```php
// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';

$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => 10000,
    ),
    'payment_type' => 'gopay',
    'gopay' => array(
        'enable_callback' => true,                // optional
        'callback_url' => 'someapps://callback'   // optional, anda juga dapat menggunakan url web seperti "https://myshop.com/finish"
    )
);

$response = \Midtrans\CoreApi::charge($params);
```

#### **Node JS**

Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package
```bash
npm install --save midtrans-client
```

GoPay Charge
```javascript
const midtransClient = require('midtrans-client');
// Create Core API instance
let core = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

let parameter = {
    "payment_type": "gopay",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "gopay": {
        "enable_callback": true,                // optional
        "callback_url": "someapps://callback"   // optional, anda juga dapat menggunakan url web seperti "https://myshop.com/finish"
    }
};

// charge transaction
core.charge(parameter)
    .then((chargeResponse)=>{
        console.log('chargeResponse:');
        console.log(chargeResponse);
    });
```

#### **Java**

Install [**midtrans-java**](https://github.com/Midtrans/midtrans-java) library

Jika anda menggunakan Maven sebagai build tool, silahkan tambahkan jcenter repositori dan dependency kedalam file pom.xml anda
Maven:
```xml
<repositories>
    <repository>
        <id>jcenter</id>
        <name>bintray</name>
        <url>http://jcenter.bintray.com</url>
    </repository>
</repositories>

<dependencies>
    <dependency>
      <groupId>com.midtrans</groupId>
      <artifactId>java-library</artifactId>
      <version>1.1.0</version>
    </dependency>
</dependencies>
```
Jika anda menggunakan Gradle sebagai build tools, silahkan tambahkan jcenter sebagai repositori dan dependency didalam file build.gradle anda

Gradle:
```bash
repositories {
    maven {
        url  "http://jcenter.bintray.com" 
    }
}

dependencies {
    compile 'com.midtrans:java-library:1.1.0'
}
```

GoPay Charge
```java
import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.service.MidtransCoreApi;
import com.midtrans.httpclient.error.MidtransError;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;


public class MidtransExample {

    public static void main(String[] args) throws MidtransError {
        MidtransCoreApi coreApi = new ConfigFactory(new Config("YOU_SERVER_KEY","YOUR_CLIENT_KEY", false)).getCoreApi();

        UUID idRand = UUID.randomUUID();
        Map<String, Object> chargeParams = new HashMap<>();

        Map<String, String> transactionDetails = new HashMap<>();
            transactionDetails.put("order_id", idRand.toString());
            transactionDetails.put("gross_amount", "265000");
        
        //Optional
        Map<String, String> gopay = new HashMap<>();
            gopay.put("enable_callback", "true");
            gopay.put("callback_url", "someapps://callback"); //anda juga dapat menggunakan url web seperti "https://myshop.com/finish"
        
        chargeParams.put("payment_type", "gopay");
        chargeParams.put("transaction_details", transactionDetails);
        chargeParams.put("gopay", gopay);
        
            JSONObject result = coreApi.chargeTransaction(chargeParams);
            System.out.println(result);
    }
}
```
#### **Python**

Install [**midtransclient**](https://github.com/Midtrans/midtrans-python-client) PIP package
```bash
pip install midtransclient
```

GoPay Charge
```python
import midtransclient
# Create Core API instance
core_api = midtransclient.CoreApi(
    is_production=False,
    server_key='YOUR_SERVER_KEY',
    client_key='YOUR_CLIENT_KEY'
)
# Build API parameter
param = {
    "payment_type": "gopay",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "gopay": {
        "enable_callback": true,                # optional
        "callback_url": "someapps://callback"   # optional //anda juga dapat menggunakan url web seperti "https://myshop.com/finish"
    }
}

# charge transaction
charge_response = core_api.charge(param)
```
<!-- tabs:end -->

?> **Opsional:** Anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.

### Charge API response
Anda akan mendapatkan Respon **API** persis seperti dibawah ini:

```json
{
  "status_code": "201",
  "status_message": "GO-PAY transaction is created",
  "transaction_id": "231c79c5-e39e-4993-86da-cadcaee56c1d",
  "order_id": "order-101h-1570513296",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "payment_type": "gopay",
  "transaction_time": "2019-10-08 12:41:36",
  "transaction_status": "pending",
  "fraud_status": "accept",
  "actions": [
      {
        "name": "generate-qr-code",
        "method": "GET",
        "url": "https://api.sandbox.veritrans.co.id/v2/gopay/231c79c5-e39e-4993-86da-cadcaee56c1d/qr-code"
      },
      {
        "name": "deeplink-redirect",
        "method": "GET",
        "url": "https://simulator.sandbox.midtrans.com/gopay/ui/checkout?referenceid=Y0xwjoQ9uy&callback_url=someapps%3A%2F%2Fcallback%3Forder_id%3Dorder-101h-1570513296"
      },
      {
        "name": "get-status",
        "method": "GET",
        "url": "https://api.sandbox.veritrans.co.id/v2/231c79c5-e39e-4993-86da-cadcaee56c1d/status"
      },
      {
        "name": "cancel",
        "method": "POST",
        "url": "https://api.sandbox.veritrans.co.id/v2/231c79c5-e39e-4993-86da-cadcaee56c1d/cancel"
      }
  ]
}
```
Anda akan mendapatkan atribut `actions` yang dapat digunakan untuk melakukan transaksi.


## 2. Membuat flow transaksi sesuai pada perangkat yang digunakan

Flow transaksi akan berbeda ketika menggunakan web browser (komputer atau tab) atau SmartPhone.

### Tampilkan kode QR (komputer atau tab)
Untuk menampilkan Kode QR, gunakan url dari `generate-qr-code` yang didapat dari respons API. Cara termudah adalah dengan **"hotlink"** url, jika frontend menggunakan HTML, masukkan url ke dalam tag img `<img src="[URL KODE QR]">`, atau tampilkan komponen yang serupa tanpa harus mendownload.
Jika frontend anda tidak mendukung hal tersebut, download Kode QR dari url tersebut, lalu tampilkan langsung di frontend.
Contoh instruksi untuk **QR Code**:

1. Klik **Pay using GoPay**
2. Kode QR akan tampil pada halaman berikutnya
3. Buka aplikasi Gojek pada SmartPhone anda
4. Klik **Pay** lalu scan kode QR
5. Cek kembali rincian pembayaran anda dan klik **PAY**
6. Masukan **PIN** anda
7. Transaksi anda telah selesai

![GoPay QR Instruction](./../../asset/image/core-api_gopay-qr-pay.png)

### Buat link ke aplikasi Gojek (SmartPhone)
Untuk mengarahkan customer ke aplikasi Gojek, gunakan url dari `deeplink-redirect` yang didapat dari respons API. Kemudian customer dapat diarahkan melalui server-side redirect, menggunakan javascript seperti `window.location = [URL DEEPLINK]`, atau menggunakan link HTML `<a href="[DEEPLINK URL]"> Bayar dengan GoPay </a>`.

Contoh instruksi untuk Deeplink :

1. Klik **Pay using GoPay**
2. Anda akan langsung diarahkan menuju aplikasi **Gojek**
3. Cek kembali rincian pembayaran anda dan klik **Pay**
4. Masukan **PIN** anda
5. Transaksi anda telah selesai

![GoPay QR Instruction](./../../asset/image/core-api_gopay-deeplink-pay.png)

?> Baca [disini untuk simulate/test pembayaran sukses](/id/technical-reference/sandbox-test.md#e-wallet).

### Mengimplementasi GoPay deeplink callback

Anda dapat mengimplementasikan deeplink callback untuk mengarahkan customer kembali ke aplikasi anda dari aplikasi Gojek.
Tambahkan parameter gopay di request API `/charge`

```json
  "gopay": {
      "enable_callback": true,
      "callback_url": "someapps://callback" //anda juga dapat menggunakan url web seperti "https://myshop.com/finish"
  }
```

| JSON Attribute | Description |
| -------------- | ----------- |
| enable_callback | Untuk menentukan, penambahan callback url pada deeplink. Nilai default: `false`|
| callback_url | Untuk menentukan kemana aplikasi Gojek akan diarahkan setelah pembayaran berhasil. Dapat berupa HTTP atau url deeplink. Nilai default: `callback_url` pada dashboard settings.|

Anda perlu menyiapkan `callback_url` yang dapat menerima dua parameter query.

| Parameter | Description |
| --------- | ----------- |
| order_id | Order ID yang dikirimkan pada saat Charge Request.|
| result | Status transaksi untuk memutuskan halaman yang akan ditampilkan kepada customer. Nilai yang muncul: `success` atau `failure`|

?> **Important!** <br> Untuk update status transaksi di backend/database Anda, JANGAN hanya mengandalkan callback dari frontend! Untuk alasan keamanan, dengan memastikan status transaksi berasal dari Midtrans, sebaiknya gunakan  [HTTP Notification](/id/core-api/e-wallet?id=_3-handling-post-transaction) atau [API Get Status](https://api-docs.midtrans.com/#get-transaction-status) untuk update status transaksi.

## 3. Terima HTTP Notification

Notifikasi HTTP dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan `transaction_status`, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi *success* atau *expired* (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.

Request HTTP POST dengan body JSON akan dikirimkan ke `notification url` Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), berikut contoh body JSON yang akan diterima Merchant:
<div class="my-card">

#### [Handling Webhook HTTP Notification](/en/)
</div>

## Catatan Tambahan

Jika anda menggunakan GoPay deeplink pada aplikasi SmartPhone (Android / iOS), terdapat konfigurasi yang mungkin perlu ditambahkan untuk memastikan aplikasi anda dapat redirect langsung ke aplikasi Gojek.

<!-- tabs:start -->
#### **Android**

Pada **Android** jika menggunakan Webview, pastikan bahwa Webview mengizinkan untuk membuka deeplink `gojek://`. Anda perlu memodifikasi function `shouldOverrideUrlLoading` seperti berikut:

```aidl
 @Override
 public boolean shouldOverrideUrlLoading(WebView view, String url) {
        LogUtils.info(TAG, "shouldOverrideUrlLoading: " + url);
        Intent intent;

        if (url.contains("gojek://")) {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            startActivity(intent);

            return true;
        } 
 }
```

#### **iOS**

Pada **iOS**, anda perlu menambahkan `LSApplicationQueriesSchemes` key ke app's `Info.plist`.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
<string>gojek</string>
</array>
```
<!-- tabs:end -->

## Description

Nilai `transaction_status` dalam transaksi GoPay:

| Transaction Status | Description |
| ------------------ | ----------- |
| `settlement` | Transaksi sukses, customer telah berhasil menyelesaikan/membayar transaksi. |
| `pending` | Transaksi telah berhasil dibuat GoPay tetapi belum dibayarkan oleh customer. |
| `expire` | Transaksi gagal karena customer tidak menyelesaikan pembayaran dalam waktu tertentu. |
| `cancel` | Transaksi dibatalkan oleh Merchant.|
| `deny` | GoPay menolak pembuatan transaksi. |
| `refund` | Transaksi direfund oleh Merchant. |

<br>

Link: [*Definisi lebih detail transaction_status*](https://api-docs.midtrans.com/#transaction-status)

## Next Step:

<div class="my-card">

#### [Dokumentasi lengkap Core API](/en/core-api/advanced-feature)
</div>

For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)