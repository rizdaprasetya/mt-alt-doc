Pada halaman ini anda akan melakukan integrasi teknis yang akan dijelaskan secara detail.


?>**Note:**
Untuk mempermudah proses integrasi, proses yang akan dilakukan dibawah ini menggunakan mode **Sandbox**. Pastikan anda sudah melakukan instruksi pada halaman [Persiapan awal](/id/snap/preparation.md)

## Langkah-langkah Integrasi
1. Mendapatkan `token` Transaksi melalui *Backend*
2. Menampilkan halaman Snap pada *frontend*
3. Melakukan test pembayaran
4. Menerima notifikasi Post

<details>
<summary><b>Diagram Sequence</b></summary>
<article>

Semua proses transaksi pada Snap dapat anda lihat melalui diagram sequence dibawah ini:

<!-- tabs:start -->
#### **Snap Popup Mode (Default)**
![Snap JS sequence diagram](./../../asset/image/snap_sequence_regular.png)

#### **Snap Redirect Mode**
![Snap Redirect sequence diagram](./../../asset/image/snap_sequence_redirect.png)
<!-- tabs:end -->
</article>
</details>

## 1. Mendapatkan Token Transaksi pada Backend

Untuk mendapatkan transaksi Token Snap anda dapat melakukan API request melalui backend merchant dengan mengirim beberapa informasi seperti Server key dan 2 atribut pada bodi JSON yaitu: 

Atribut          | Deskripsi
---------------- | ---
Server Key       | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md)
`order_id`       | Order ID transaksi yang dapat anda isi sesuai dengan kebutuhan anda
`gross_amount`   | Total nilai transaksi

### API Request

Dibawah ini midtrans memberikan beberapa contoh program dalam meminta token transaksi ke backend merchant
<!-- tabs:start -->
#### **Request-API**

Berikut contoh dari request API `/charge` dalam Curl, silahkan implementasikan sesuai bahasa pemrograman backend Anda (Anda juga bisa cek [library yang tersedia](/en/developer_resource/library-plugin.md)).

#### Request Details
Tipe | Nilai
---- | -----
HTTP Method | `POST`
API endpoint (Sandbox) | `https://app.sandbox.midtrans.com/snap/v1/transactions`
API endpoint (Production) | `https://app.midtrans.com/snap/v1/transactions`

#### Headers HTTP
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Snap akan men-validasi Request HTTP dengan menggunakan metode Basic Otentikasi. Username diisi dengan data server key Anda. Sedangkan kata sandi dibiarkan kosong. Nilai header *Authorization* diwakili oleh nilai AUTH_STRING. AUTH_STRING adalah string dari Base-64 dimana terdiri dari gabungan antara nama pengguna & kata sandi Anda yang dipisahkan oleh **:** (simbol titik dua).

#### Full HTTP Request

Request dengan CURL:
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }, 
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}'
```

#### **PHP**

Install [**midtrans-php**](https://github.com/Midtrans/midtrans-php) library
```bash
composer require midtrans/midtrans-php
```

> Alternatif jika anda tidak menggunakan **Composer**, anda dapat [download midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), dan menambahkan secara manual kedalam project anda
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

Send Snap transaction request
```php
// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => 10000,
    ),
    'customer_details' => array(
        'first_name' => 'budi',
        'last_name' => 'pratama',
        'email' => 'budi.pra@example.com',
        'phone' => '08111222333',
    ),
);

$snapToken = \Midtrans\Snap::getSnapToken($params);
```

#### **Node JS**

Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package
```bash
npm install --save midtrans-client
```

Send Snap transaction request
```javascript
const midtransClient = require('midtrans-client');
// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY'
    });

let parameter = {
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }, 
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
};

snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        let transactionToken = transaction.token;
        console.log('transactionToken:',transactionToken);
    })
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

Send Snap transaction request
```java
import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.service.MidtransSnapApi;
import com.midtrans.httpclient.error.MidtransError;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.json.JSONObject;

public class MidtransExample {

    public static void main(String[] args) throws MidtransError {
      // Create new Object SnapAPI
      MidtransSnapApi snapApi = new ConfigFactory(new Config("YOU_SERVER_KEY","YOUR_CLIENT_KEY", false)).getSnapApi();
      // Set 3rd param to true if you want Production Environment (accept real transaction).

      // Create params JSON Raw Object request
      public Map<String, Object> requestBody() {
          UUID idRand = UUID.randomUUID();
          Map<String, Object> params = new HashMap<>();
          
          Map<String, String> transactionDetails = new HashMap<>();
          transactionDetails.put("order_id", idRand);
          transactionDetails.put("gross_amount", "265000");
          
          Map<String, String> creditCard = new HashMap<>();
          creditCard.put("secure", "true");
          
          params.put("transaction_details", transactionDetails);
          params.put("credit_card", creditCard);
          
          return params;
      }

      // Create Token and then you can send token variable to FrontEnd,
      // to initialize Snap JS when customer click pay button
      String transactionToken = snapApi.createTransactionToken(requestBody());
    }
}
```
#### **Python**

Install [**midtransclient**](https://github.com/Midtrans/midtrans-python-client) PIP package
```bash
pip install midtransclient
```

Send Snap transaction request
```python
import midtransclient
# Create Snap API instance
snap = midtransclient.Snap(
    # Set to true if you want Production Environment (accept real transaction).
    is_production=False,
    server_key='YOUR_SERVER_KEY'
)
# Build API parameter
param = {
    "transaction_details": {
        "order_id": "test-transaction-123",
        "gross_amount": 200000
    }, "credit_card":{
        "secure" : True
    }, "customer_details":{
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}

transaction = snap.create_transaction(param)

transaction_token = transaction['token']
```

#### **Postman**

1. Unduh dan buka [Postman](https://www.getpostman.com)
2. Gunakkan tombol diatas untuk mengimport Postman Collection Midtrans.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/af068be08b5d1a422796)
3. Mengarah ke `1.a.  SNAP transaction token request (minimum)`
4. Untuk info lebih detail [mohon ikuti instruksi berikut ini](https://github.com/midtrans/Midtrans-Payment-API-Postman-Collections#usage-instruction).

<!-- tabs:end -->

?> **Opsional:** Anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.


### Response API

Anda akan mendapat response API seperti berikut:
```json
{
  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
}
```

### Contoh Sample Respon Lainnya

Status Code | Deskripsi | Contoh
--- | --- | ---
201 | Berhasil mendapatkan token| "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862"
401 | Gagal. Tidak dapat otoritas  | "Access denied, please check client or server key"
4xx | Gagal. Parameter yang dikirim tidak sesuai. Pastikan error_message yang tampil dan parameter yang dikirim | "transaction_details.gross_amount is not equal to the sum of item_details"
5xx | Gagal. Terdapat error disisi Midtrans. Biasanya terjadi hanya sesaat, anda dapat mencoba kembali diwaktu yang sama | "Sorry, we encountered internal server error. We will fix this soon."

<br><br>

## 2. Menampilkan Snap popup ke halaman frontend

Untuk menampilkan halaman Snap didalam website anda, anda perlu menambahakan library `snap.js` kedalam halaman HTML anda.

Terdapat 3 komponen penting dalam implementasi library `snap.js` kedalam halaman frontend anda, yaitu:

Requirement | Description
--- | ---
Client Key | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md)
`snap.js` url | `https://app.sandbox.midtrans.com/snap/snap.js`
transaction `token` | didapatkan pada langkah [sebelumnya](#_1-mendapatkan-token-transaksi-pada-backend)

Sebelum anda menampilkan halaman Snap dengan memanggil `snap.pay` Anda membutuhkan **Client Key** untuk mengisi nilai atribut `data-client-key` pada file `snap.js`.


```html
<html>
  <head>
    <script 
      type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SET_YOUR_CLIENT_KEY_HERE"
    ></script>
  </head>

  <body>
    <button id="pay-button">Pay!</button>
    <script type="text/javascript">
      var payButton = document.getElementById('pay-button');
      // For example trigger on button clicked, or any time you need
      payButton.addEventListener('click', function () {
        snap.pay('SNAP_TRANSACTION_TOKEN'); // Replace it with your transaction token
      });
    </script>
  </body>
</html>
```

Jika konfigurasi yang anda lakukan telah berhasil, maka anda akan melihat tampilan Snap muncul seperti gambar dibawah ini

![Snap Popup Preview](./../../asset/image/snap-popup-preview.gif)

Atau anda bisa mencobanya dengan klik tombol dibawah ini:

<p style="text-align: center;">
  <button onclick="
  let label = event.target.innerText;
  event.target.innerText = `Processing...`;
  fetch(`https://cors-anywhere.herokuapp.com/https://midtrans.com/api/request_snap_token`)
    .then(res=>res.json())
    .then(res=>{
      let snapToken = res.token;
      snap.pay(snapToken,{
        onSuccess: function(res){ console.log('Snap result:',res) },
        onPending: function(res){ console.log('Snap result:',res) },
        onError: function(res){ console.log('Snap result:',res) },
      });
    })
    .catch( e=>{ console.error(e); window.open('https://demo.midtrans.com', '_blank'); } )
    .finally( e=>{ event.target.innerText = label })
  " class="my-btn">Coba Demo Snap &#9099;</button>
</p>

>**Viewport Meta Tag:** Untuk memastikan Snap tampil secara sempurna pada halaman mobile device, anda perlu menambahkan tag HTML `<meta name="viewport" content="width=device-width, initial-scale=1">` diantara tag `<HEAD>`

?> **Alternatif** Jika anda tidak inigin Tampilan Snap berada diatas halaman website anda. Anda juga dapat menggunakan nilai atribut `redirect_url` pada saat melakukan proses permintaan token transaksi ke backend, untuk mengarahkan pelanggan ke halaman Snap.

Setelah pelanggan selesai melakukan pembayaran, pelanggan anda akan diarahkan ke halaman [Finish URL yang telah anda konfigurasi sebelumnya](/id/snap/preparation.md#konfigurasi-redirect-url) di menu **Settings > Snap Preference > System Settings > `Finish URL`**


## 3. Mencoba Test Pembayaran

Lakukan tes pembayaran untuk memastikan integrasi Snap telah berhasil. Anda dapat melakukan tes pembayaran dengan menggunakan salah satu kartu dummy tes kami

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month (e.g: `02`)
Exp Year | Any future year (e.g: `2025`)
OTP/3DS | `112233`

Anda dapat mengunjungi halaman berikut untuk mendapakan test credential lainnya [simulator](https://simulator.sandbox.midtrans.com/gopay/ui/index)

![Snap Test Transaction](./../../asset/image/snap-test-transaction.gif)

## 4. Terima POST HTTP Notifikasi

Notifikasi HTTP dari Midtrans ke backend Merchant akan dikirimkan pada saat terjadi perubahan `transaction_status`, untuk memastikan Mercahant mendapat informasi secara aman. Termasuk pada saat status transaksi berubah jadi *success* atau *expired* (tidak dibayarkan). Jadi selain JSON pada callback di atas, Merchant juga akan menerima notifikasi dari Midtrans.

Request HTTP POST dengan body JSON akan dikirimkan ke `notification url` Merchant yang dikonfigurasi pada dashboard (`Settings` **->** `Configuration` **->** `Notification URL`), berikut contoh body JSON yang akan diterima Merchant:
<div class="my-card">

#### [Terima Webhook HTTP Notification &#187;](/en/)
</div>

## Next Step:
<br>

<div class="my-card">

#### [Taking Action of Payment &#187;](/en/)
</div>

<div class="my-card">

#### [Snap Advanced Feature &#187;](/en/snap/advanced-feature.md)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action &#187;](/en/)
</div>

<hr>

#### Referensi:

> Integrasi dengan contoh kode program tersedia pada [Github Repository](/en/snap/overview.md?id=b-follow-sample-code) kami.
