<H2> Integrasi Pembayaran Kartu Kredit </H2>
Dengan menggunakan metode pembayaran kartu kredit, pelanggan anda akan mempunyai pilihan untuk melakukan pembayaran melalui berabagai macam kartu kredit dan Midtrans akan mengirimkan notifikasi pemberitahuan secara real time setelah pelanggan anda menyelesaikan pembayarannya.

<img align="center" width="80px" height="70px" src="./../../asset/image/coreapi/mastercard.svg" /> <img align="center" width="80px" height="70px" src="./../../asset/image/coreapi/jcb.svg" /> <img align="center" width="80px" height="70px" src="./../../asset/image/coreapi/american_express.svg" /> <img align="center" width="80px" height="70px" src="./../../asset/image/coreapi/visa.svg" />   

Proses integrasi dasar untuk pembayaran kartu akan dijelaskan di bawah.

?> Sebelum melakukan proses integrasi, pastikan anda sudah memiliki [Akun Midtrans](/en/midtrans-account/overview).

## Langkah Integrasi
1. Dapatkan token kartu, melalui *frontend*.
2. Kirim data traksaksi ke *API Charge* dengan token kartu, melalui *backend*.
3. Buka *redirect_url* *3DS* dengan *popup/redirect*, melalui *frontend*.
4. Terima notifikasi transaksi, pada *backend*.

<input id="seq-diag" class="collaps-toggle" type="checkbox">
<label for="seq-diag" class="collaps-label"><strong>Diagram Sequence 3DS</strong></label>
<div class="collaps-content">
Proses pembayaran melalui kartu kredit 3DS dapat anda lihat melalui ilustrasi diagram sequence dibawah ini:

![Diagram Sequence 3DS](./../../asset/image/core_api-sequence_3ds.png)
</div>

## 1. Mendapatkan token kartu kredit
`token_id` kartu adalah representasi dari data kartu customer, yang akan digunakan untuk transaksi. `token_id` didapatkan menggunakan Library [MidtransNew3ds JS](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js) pada frontend website merchant, data kartu akan dikirimkan dengan aman dari javascript frontend ke API Midtrans untuk ditukar dengan `token_id` kartu, untuk menghindari risiko jika data kartu dikirim dari backend merchant.

### Midtrans JS
Midtrans JS adalah library javascript yang digunakan untuk mendapatkan token kartu kredit pada halaman pembayaran merchant. Berikut adalah langkah-langkah implementasi Midtrans JS pada halaman *frontend* anda:
```html
<script id="midtrans-script" type="text/javascript"
src="https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js" 
data-environment="sandbox" 
data-client-key="<INSERT YOUR CLIENT KEY HERE>"></script>
```

**Catatan**: Mohon mengganti nilai pada atribut, seperti tabel dibawah ini.

| Atribut   | Nilai |
|-----------|-------|
| `data-environment`| Masukan nilai `sandbox` atau `production` *(API environment)*|
| `data-client-key`| Masukan nilai *client key* pada dashboard midtrans [Kunci Akses](/id/midtrans-account/overview.md?id=melihat-informasi-access-keys) |

Link: [*Info lebih lanjut*](https://api-docs.midtrans.com/#get-token)

### Implementasi Midtrans JS Untuk Mendapatkan Token Kartu
Untuk mendapatkan token_id kartu, kita akan menggunakan function `MidtransNew3ds.getCardToken`. Implementasikan Javascript berikut pada halaman pembayaran.

```javascript
// data kartu dari input customer, contohnya
var cardData = {
  "card_number": 4811111111111114,
  "card_exp_month": 02,
  "card_exp_year": 2025,
  "card_cvv": 123,
};

// callback functions
var options = {
  onSuccess: function(response){
    // Sukses mendapatkan token_id kartu, implementasi sesuai kebutuhan
    console.log('Success to get card token_id, response:', response);
    var token_id = response.token_id;
    console.log('This is the card token_id:', token_id);
  },
  onFailure: function(response){
    // Gagal mendapatkan token_id kartu, implementasi sesuai kebutuhan
    console.log('Fail to get card token_id, response:', response);
  }
};

// panggil function `getCardToken`
MidtransNew3ds.getCardToken(cardData, options);
```

### Mendapatkan Respon Token
Jika semua lancar, kita akan mendapatkan `token_id` kartu di dalam callback function `onSuccess`. Yang akan digunakan sebagai salah satu parameter JSON untuk [`/charge` API request](id/core-api/credit-card.md?id=charge-api-request).

`token_id` akan butuh untuk dikirimkan dari *frontend* ke *backend* pada tahap selanjutnya, bisa dilakukan menggunakan Ajax (dengan javascript) atau form HTML (dengan HTTP POST), dsb. Merchant bebas mengimplementasikan.
> **Catatan:** `token_id` ini hanya valid untuk 1 transaksi. Setiap transaksi diharuskan melalui proses ini lagi, untuk membantu memastikan data kartu dikirimkan dengan aman. Jika Anda ingin untuk menyimpan token kartu, Anda bisa gunakan fitur [One-click](https://api-docs.midtrans.com/#card-features-one-click)/[Two-clicks](https://api-docs.midtrans.com/#card-features-two-clicks).

## 2. Kirim Data Transaksi ke API Charge
*Request API charge* akan dilakukan melalui *backend Merchant*. *Server Key* (dari [Dashboard](https://dashboard.midtrans.com/) Anda) akan dibutuhkan untuk meng-otentikasi request.

Atribut          | Deskripsi
---------------- | ---
Server Key       | Dijelaskan pada halaman [akun midtrans](/id/midtrans-account/overview.md)
`order_id`       | Order ID transaksi yang dapat anda isi sesuai dengan kebutuhan anda
`gross_amount`   | Total nilai transaksi
`token_id`       | Representasi informasi kartu kredit pelanggan anda yang didapatkan dari [Respon Token](id/core-api/credit-card.md?id=mendapatkan-respon-token)
`authentication` | Atribut sebagai penanda bahwa transaki yang diminta adalah trasaksi 3D Secure, nilai default adalah false

### Request Charge API

Berikut adalah contoh implementasi charge request berdasarkan kode program:
<!-- tabs:start -->
#### **API-Request**

Berikut contoh dari request API `/charge` dalam CURL, silahkan implementasikan sesuai bahasa pemrograman backend Anda (Anda juga bisa cek [library-library pemrograman yang tersedia](/en/developer_resource/library_plugin)). Gunakan `token_id` yang didapat sebelumnya.


### Request Details
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

#### Full HTTP Request

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

> Alternatif jika anda tidak menggunakan **Composer**, anda dapat mengunduh [midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), dan import library secara manual pada file php anda
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

Credit Card Charge
```php
// Set your Merchant Server Key
\Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';

$params = array(
    'transaction_details' => array(
        'order_id' => rand(),
        'gross_amount' => 10000,
    ),
	'payment_type' => 'credit_card',
    'credit_card'  => array(
        'token_id'      => $_POST['token_id'],
        'authentication'=> true,
    ),
    'customer_details' => array(
        'first_name' => 'budi',
        'last_name' => 'pratama',
        'email' => 'budi.pra@example.com',
        'phone' => '08111222333',
    ),
);

$response = \Midtrans\CoreApi::charge($params);
```

#### **Node JS**

Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package
```bash
npm install --save midtrans-client
```

Credit Card Charge
```javascript
const midtransClient = require('midtrans-client');
// Create Core API instance
let core = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : 'YOUR_SERVER_KEY',
        clientKey : 'YOUR_CLIENT_KEY'
    });

let parameter = {
    "payment_type": "credit_card",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "credit_card":{
        "token_id": 'CREDIT_CARD_TOKEN', // Ubah nilai CARD_TOKEN dengan token card yang sudah didapatkan sebelumnya
        "authentication": true
    }
};

// melakukan charge transaksi
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

Credit Card Charge
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
        // Membuat Instance Midtrans Core API
        MidtransCoreApi coreApi = new ConfigFactory(new Config("YOU_SERVER_KEY","YOUR_CLIENT_KEY", false)).getCoreApi();

		// Membuat method Objek RAW JSON
		public Map<String, Object> requestBody() {
		    UUID idRand = UUID.randomUUID();
		    Map<String, Object> params = new HashMap<>();
		    
		    Map<String, String> transactionDetails = new HashMap<>();
		    transactionDetails.put("order_id", idRand);
		    transactionDetails.put("gross_amount", "265000");
		    
		    Map<String, String> creditCard = new HashMap<>();
		    creditCard.put("token_id", YOUR_TOKEN_ID);
		    creditCard.put("authentication", "true");
		    
		    params.put("transaction_details", transactionDetails);
		    params.put("credit_card", creditCard);
		    
		    return params;
		}

		// melakukan charge transaksi
		JSONObject result = coreApi.chargeTransaction(requestBody());
		System.out.println(result);
    }
}
```
#### **Python**

Install [**midtransclient**](https://github.com/Midtrans/midtrans-python-client) PIP package
```bash
pip install midtransclient
```

Credit Card Charge
```python
import midtransclient
# Membuat Instance Core API
core_api = midtransclient.CoreApi(
    is_production=False,
    server_key='YOUR_SERVER_KEY',
    client_key='YOUR_CLIENT_KEY'
)
# Membuat objek parameter
param = {
    "payment_type": "credit_card",
    "transaction_details": {
        "gross_amount": 12145,
        "order_id": "test-transaction-54321",
    },
    "credit_card":{
        "token_id": 'CREDIT_CARD_TOKEN', # change with your card token
        "authentication": True
    }
}

# Melakukan charge transaksi
charge_response = core_api.charge(param)
```
<!-- tabs:end -->

?> **Opsional:** Anda bisa kustomisasi data [transaction_details](https://api-docs.midtrans.com/#json-object). Untuk menyertakan data seperti customer_details, item_details, dsb. Disarankan untuk mengirim data sebanyak mungkin agar nantinya report/dashboard menampilkan informasi tersebut.


### Respon API Charge
Anda akan mendapatkan Respon **API** persis seperti dibawah ini:

```json
{
  "status_code": "201",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "0bb563a9-ebea-41f7-ae9f-d99ec5f9700a",
  "order_id": "order102",
  "redirect_url": "https://api.sandbox.veritrans.co.id/v2/token/rba/redirect/481111-1114-0bb563a9-ebea-41f7-ae9f-d99ec5f9700a",
  "gross_amount": "789000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2019-08-27 15:50:54",
  "transaction_status": "pending",
  "fraud_status": "accept",
  "masked_card": "481111-1114",
  "bank": "bni",
  "card_type": "credit"
}
```

- Jika atribut `transaction_status` bernilai `capture` dan atribut `fraud_status` bernilai `accept`, menandakan transaksi tersebut telah berhasil sebagai transaksi NON 3DS.

- Jika atribut `transaction_status` bernilai `pending` dan terdapat atribut `redirect_url`, menandakan transaksi tersebut membutuhkan proses selanjutnya, yaitu membuka halaman 3DS dan melakukan otentikasi 3DS. 

### Contoh Kode Response

Kode Status | Deskripsi   | Contoh
----------- | ----------- | -------
200 | Berhasil, transaksi selesai (transaksi non 3DS) | "transaction_status": "capture"
201 | Dibutuhkan otentikasi ke halaman 3DS pada atribut `redirect_url` (Transaksi 3DS) | "https://api.sandbox.veritrans.co.id/v2/token/rba/redirect/481111-1114-f424a955-ed0f-4a64-88ea-60cdc9655984 "
401 | Gagal. Tidak dapat meng-otorisasi access key  | "Access denied, please check client or server key"
4xx | Gagal. Parameter yang dikirim tidak sesuai. Pastikan error_message yang tampil dan parameter yang dikirim | "transaction_details.gross_amount is not equal to the sum of item_details"
5xx | Gagal. Terdapat error disisi Midtrans. Biasanya terjadi hanya sesaat, anda dapat mencoba kembali diwaktu yang sama | "Sorry, we encountered internal server error. We will fix this soon."

## 3. Membuka halaman 3DS

Pada saat mendapatkan API response, terdapat atribut `redirect_url`. anda diwajibkan membuka halaman tersebut, dengan menggunakan [MidtransNew3ds JS library](https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js) agar Pelanggan anda dapat melakukan otentikasi halaman 3DS.

Untuk membuka halaman 3DS, anda dapat menggunakan fungsi pada midtrans js `MidtransNew3ds.authenticate` atau `MidtransNew3ds.redirect`. Lalu berikan nilai yang ada pada atribut `redirect_url`.

### Open 3DS Authenticate Page JS Implementation

```javascript
var redirect_url = '<redirect_url didapatkan dari response Charge>';

// callback functions
var options = {
  performAuthentication: function(redirect_url){
    // Implementasikan bagaimana anda akan membuka iframe untuk menampilkan redirect_url 3DS authentication ke customer
    popupModal.openPopup(redirect_url);
  },
  onSuccess: function(response){
    // 3ds authentication sukses, implementasikan skenario sukses
    console.log('response:',response);
    popupModal.closePopup();
  },
  onFailure: function(response){
    // 3ds authentication gagal, implementasikan skenario gagal
    console.log('response:',response);
    popupModal.closePopup();
  },
  onPending: function(response){
    // transaksi pending, hasil transaksi akan dikirimkan nanti melalui POST notification, implementasikan sesuai kebutuhan
    console.log('response:',response);
    popupModal.closePopup();
  }
};

// panggil function `authenticate`
MidtransNew3ds.authenticate(redirect_url, options);



/**
 * Contoh helper function untuk membuka Iframe popup, Anda bisa ubah implementasi dengan metode anda sendiri.
 * Contoh menggunakan library PicoModal:
 * <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/picomodal/3.0.0/picoModal.js"></script>
 */
var popupModal = (function(){
  var modal = null;
  return {
    openPopup(url){
      modal = picoModal({
        content:'<iframe frameborder="0" style="height:90vh; width:100%;" src="'+url+'"></iframe>',
        width: "75%", 
        closeButton: false, 
        overlayClose: false,
        escCloses: false
      }).show();
    },
    closePopup(){
      try{
        modal.close();
      } catch(e) {}
    }
  }
}());

/**
 * Atau alternatifnya, anda bisa redirect customer dengan: 
 * MidtransNew3ds.redirect(redirect_url, { callbackUrl : 'https://mywebsite.com/finish_3ds' });
 **/
```

### JSON Response 3DS Authenticate
Pada callback function JS, kita akan mendapatkan JSON dari hasil transaksi seperi berikut.

```json
{
  "status_code": "200",
  "status_message": "Success, Credit Card transaction is successful",
  "transaction_id": "226ba26f-b050-4fc5-aa25-b7f8169bc67b",
  "order_id": "order102",
  "gross_amount": "789000.00",
  "currency": "IDR",
  "payment_type": "credit_card",
  "transaction_time": "2019-08-27 17:22:08",
  "transaction_status": "capture",
  "fraud_status": "accept",
  "approval_code": "1566901334936",
  "eci": "05",
  "masked_card": "481111-1114",
  "bank": "bni",
  "card_type": "credit",
  "channel_response_code": "00",
  "channel_response_message": "Approved"
}
```

Jika `transaction_status` adalah `capture` dan `fraud_status` adalah `accept`, berarti transaksinya sukses, dan sudah selesai.

> **CATATAN PENTING:** Untuk update status transaksi di backend/database Anda, JANGAN hanya mengandalkan callback dari frontend! Untuk alasan keamanan, dengan memastikan status transaksi berasal dari Midtrans, sebaiknya gunakan HTTP Notification atau [API Get Status](https://api-docs.midtrans.com/#get-transaction-status). untuk update status transaksi.

## 4. Handling Post-Transaction

Pada saat pelanggan telah selesai melakukan otentikasi 3DS, status pembayaran akan diperbarui / diubah (yaitu: pembayaran telah berhasil diterima), Midtrans akan mengirimkan HTTP Notification (atau webhook) ke URL Notification server Anda yang telah ditentukan pada Dashboard Midtrans, pada menu `Settings` **->** `Configuration` **->** `Notification URL`). Anda dapat mengunjungi tautan dibawah ini untuk penjelasan lebih lanjut:

<div class="my-card">

#### [Terima Notifikasi HTTP &#187;](/en/)
</div>

## Deskripsi

Nilai `transaction_status` dalam transaksi kartu:

| Status Transaksi | Deskripsi |
| ------------------ | ----------- |
| `capture` | Transaksi sukses, dana berhasil dipotong |
| `pending` | Transaksi terbuat dan menunggu tindakan (3DS diselesaikan oleh customer)|
| `deny` | Transaksi ditolak, cek lebih lanjut `channel_response_message` atau `fraud_status` |
| `expire` | Transaksi gagal karena pelanggan tidak menyelesaikan 3DS dalam waktu tertentu |

Link: [*Definisi lebih detail transaction_status*](https://api-docs.midtrans.com/#transaction-status)

Link: [*Definisi lebih detail fraud_status*](https://api-docs.midtrans.com/#fraud-status)

## Selanjutnya:
<br>

<div class="my-card">

#### [Core API Advanced Feature &#187;](/en/core-api/advanced-feature)
</div>

<hr>

#### Reference:

> Anda juga bisa lihat contoh implementasi berikut:
>	- [NodeJs - Express](https://github.com/Midtrans/midtrans-nodejs-client/blob/master/examples/expressApp/views/simple_core_api_checkout.ejs)
>	- [Python - Flask](https://github.com/Midtrans/midtrans-python-client/blob/master/examples/flask_app/templates/simple_core_api_checkout.html)

For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)