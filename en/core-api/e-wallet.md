?> This payment method is compatible with [QR Code Indonesian Standard (QRIS)](https://www.bi.go.id/id/ruang-media/siaran-pers/Pages/SP_216219.aspx), and can be paid with **any QRIS compatible e-wallet or banking app**.

GoPay is an e-Wallet payment method by Gojek. Users will pay using the Gojek apps, or any QRIS compatible app. The user flow varies when using a web browser (on a computer or a tablet) compared to a SmartPhone:

1. **QR Code** - This is the user flow on a web browser (on a computer or a tablet). User is shown a QR code and asked to scan using any QRIS compatible app, like Gojek app.
2. **Deeplink** - This is the user flow on a SmartPhone/mobile device. User gets redirected to the Gojek apps to finish payment.

Basic integration process of GoPay will be explained below.

?> Please make sure you have already done [creating your Midtrans Account](/en/midtrans_account/overview.md), before proceeding with this section.

## Integration Step
1. Send transaction data to API Charge.
2. Alter payment flow depending on the device used.
3. Handling Post-Transaction.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall GoPay end-to-end payment proccess can be illustrated in following sequence diagram:

<!-- tabs:start -->
#### **QR Code Mode (Default)**
![Snap JS sequence diagram](./../../asset/image/core-api_sequence_qr.png)

#### **Deeplink Mode**
![Snap Redirect sequence diagram](./../../asset/image/core-api_sequence_deeplink.png)
<!-- tabs:end -->
</article>
</details>

## 1. Send Transaction Data to API Charge
API request should be done from **Merchant’s backend** to acquire qr code and deeplink to Gojek app. There are several components that are required:

Requirement | Description |
----------- | ----------- |
Server Key | Explained on [previous section](/en/midtrans-account/overview.md) |
`order_id` | Transaction order ID, defined from your side |
`gross_amount` | Total amount of transaction, defined from your side |
`payment_type` | Set to `gopay` |

Charge API request should be done from Merchant's backend.

### Charge API request

The example below shows a sample codes of the charge request:
<!-- tabs:start -->
#### **API-Request**

*This is an example in Curl, please implement according to your backend language, you can switch to other language on the "tab" above. (you can also check our [available language libraries](/en/technical-reference/library-plugin.md))*

#### Request Details
Type | Value
--- | ---
HTTP Method | `POST`
API endpoint | `https://api.sandbox.midtrans.com/v2/charge`

#### HTTP Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Core API validates HTTP request by using Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by **:** (colon symbol).

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

> Alternatively, if you are not using **Composer**, you can [download midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require the file manually
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
    'gopay': {
        'enable_callback': true,                // optional
        'callback_url': 'someapps://callback'   // optional
    }
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
        "callback_url": "someapps://callback"   // optional
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

If you're using Maven as the build tools for your project, please add jcenter repository to your build definition, then add the following dependency to your project's build definition (pom.xml).
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
Gradle:
If you're using Gradle as the build tools for your project, please add jcenter repository to your build script then add the following dependency to your project's build definition (build.gradle):
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

        chargeParams.put("transaction_details", transactionDetails);
        chargeParams.put("payment_type", "gopay");
        
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
        "callback_url": "someapps://callback"   # optional
    }
}

# charge transaction
charge_response = core_api.charge(param)
```
<!-- tabs:end -->

?> **Optional:** You can customize [transaction_details](https://api-docs.midtrans.com/#json-object) data. To include data like customer_details, item_details, etc. It's recommended to send as much detail so on report/dashboard those information will be included.

### Charge API response
You will get the **API response** like the following.

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
You will get the `actions` attribute which can be performed this transaction.

## 2. Alter payment flow depending on the device used

The user flow varies when using a web browser (on a computer or a tablet) compared to a SmartPhone.

### Show QR Code Image (on computer or tablet)

To display transaction QR Code image, use the url from `generate-qr-code` actions retrieved from API response. Simplest way is to **"hotlink"** the image url, if the frontend is HTML, put the url in image tag `<img src="[QR CODE URL]">`, or display it on a similar component without downloading.
If the frontend does not support such scenario, download the QR code image from that url, then display it on frontend.

Instruction Example for **QR Code** :

1. Tap **Pay using GoPay**
2. QR code will appear on the next page
3. Open any **QRIS compatible app** (e.g: Gojek) on your mobile phone
4. Tap **Pay** then scan the QR Code
5. Check and verify your payment details then tap **PAY**
6. Complete your security PIN / verification
7. Your transaction is finished

![GoPay QR Instruction](./../../asset/image/core-api_gopay-qr-pay.png)

### Create Redirect Link to Gojek Apps (on SmartPhone)

To redirect customer to Gojek app, use the url from `deeplink-redirect` actions retrieved from API response. Then customer can be redirected via server-side redirect, using javascript like `window.location=[DEEPLINK URL]`, or using HTML link `<a href="[DEEPLINK URL]">Pay with GoPay</a>`.

Instruction Example for **Deeplink** :

1. Tap **Pay using GoPay**
2. You will be redirected to **Gojek** app
3. Check and verify your payment details then tap **Pay**
4. Enter your security **PIN**
5. Your transaction is finished

![GoPay QR Instruction](./../../asset/image/core-api_gopay-deeplink-pay.png)

### Implementing GoPay Deeplink Callback

In addition to the standard mobile apps flow, you may opt to implement a deeplink callback to redirect customer back from Gojek to their apps.
Please add gopay parameter in the [charge API request](#charge-api-request) .

```json
  "gopay": {
      "enable_callback": true,
      "callback_url": "someapps://callback" //you can also use web url like https://myshop.com/finish
  }
```

| JSON Attribute | Description |
| -------------- | ----------- |
| enable_callback | To determine appending callback url in the deeplink. Default value: `false`|
| callback_url | To determine where Gojek apps will redirect after successful payment. Can be HTTP or deeplink url. Default value: `callback_url` in dashboard settings|

You needs to prepare a `callback_url` which accept two query parameters.

| Parameter | Description |
| --------- | ----------- |
| order_id | Order ID sent on the Charge Request|
| result | Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`|

?> **Important!** <br> To update transaction status on your backend/database, DO NOT solely rely on frontend callbacks! For security reason to make sure the status is authentically coming from Midtrans, only update transaction status based on [HTTP Notification](#_3-handling-post-transaction) or 
[API Get Status](https://api-docs.midtrans.com/#get-transaction-status)

## 3. Handling Post-Transaction

Other than customer being redirected, when the status of payment is updated/changed (i.e: payment has been successfully received), Midtrans will send **HTTP Notification** (or webhook) to your server's `Notification Url` (specified on Midtrans Dashboard, under menu **Settings > Configuration `Notification URL`**). Follow this link for more details:

<div class="my-card">

#### [Handling Webhook HTTP Notification &#187;](/en/after-payment/http-notification.md)
</div>

## Additional Notes

If GoPay deeplink is being used on SmartPhone application (Android/iOS app), there are additional configurations you may need to add to ensure your app able to redirect customer to Gojek app. Please make sure that the webview allow opening `gojek://` deeplink protocol.

<!-- tabs:start -->
#### **Android**

On **Android** if using Webview, please make sure that the Webview allow opening `gojek://` deeplink protocol. You need to modify your web view `shouldOverrideUrlLoading` functions as follows:

```java
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

On **iOS**, you will need to add `LSApplicationQueriesSchemes` key to your app's `Info.plist`.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
<string>gojek</string>
</array>
```
<!-- tabs:end -->

## Description

`transaction_status` value description for GoPay transaction:

| Transaction Status | Description |
| ------------------ | ----------- |
| `settlement` | Transaction successful, customer has been completed the transaction |
| `pending` | The transaction has successfully created to GoPay but has not been completed by the customer |
| `expire` | Transaction failure because customer did not complete the payment within allowed time |
| `cancel` | Transaction is canceled by trigger from Merchant |
| `deny` | Payment provider rejected the payment code/id creation |
| `refund` | Transaction is refunded by trigger from Merchant |

<br>

Link: [*More detailed definition of transaction_status*](https://api-docs.midtrans.com/#transaction-status)

## Next Step:
<br>

<div class="my-card">

#### [Taking Action of Payment &#187;](/en/after-payment/overview.md)
</div>

<div class="my-card">

#### [Core API Advanced Feature &#187;](/en/core-api/advanced-feature.md)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action &#187;](/en/after-payment/status-cycle.md)
</div>

<hr>

For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)