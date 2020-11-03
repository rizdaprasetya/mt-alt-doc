# Core API E-Wallet Integration
<hr>

Midtrans facilitates its customers by *E-Wallet*. This payment method is compatible with [QR Code Indonesian Standard (QRIS)](https://www.bi.go.id/id/ruang-media/siaran-pers/Pages/SP_216219.aspx). Customers can make payments with GoPay, ShopeePay or any QRIS compatible e-wallet or banking app. 

Gojek has introduced GoPay as an E-Wallet payment method. Customers can pay using the Gojek apps, or any QRIS compatible app.  The user flow is different for web browser (on a computer or a tablet) and smartphone. The user flows are given below.

1. **QR Code** - This is the user flow on a web browser (on a computer or a tablet). User is shown a QR code and asked to scan using any QRIS compatible app, such as Gojek app.
2. **Deeplink** - This is the user flow on a smartphone /mobile device. User gets redirected to the Gojek app to finish payment.

?> Please make sure to create your[ Midtrans Account](/en/midtrans_account/overview.md), before proceeding with this section.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall GoPay end-to-end payment proccess can be illustrated in following sequence diagram:
<!--spelling of process. colon after the description in the description of sequence diagram.-->

<!-- tabs:start -->

#### **QR Code Mode (Default)**

![Core API Gopay QR sequence diagram](./../../asset/image/core-api_sequence_qr.png)

#### **Deeplink Mode**

![Core API Gopay Deeplink sequence diagram](./../../asset/image/core-api_sequence_deeplink.png)
<!-- tabs:end -->
</article>
</details>

## Steps for Integration

Basic integration process of GoPay will be explained in this section. To integrate with *E-Wallet* payment  method, follow the steps given below.

### 1. Sending Transaction Data to API Charge
API request should be sent from your backend to acquire qr code and deeplink to Gojek app. There are several components that are required:

#### Endpoints

| Environment | Method | URL                                        |
| ----------- | ------ | ------------------------------------------ |
| Sandbox     | POST   | https://api.sandbox.midtrans.com/v2/charge |
| Production  | POST   | https://api.midtrans.com/v2/charge         |

#### Headers

| Header Name   | Description                                            | Required | Values                |
| ------------- | ------------------------------------------------------ | -------- | --------------------- |
| Accept        | The format of the data to be returned.                 | Required | application/json      |
| Content-Type  | The format of the data to be posted.                   | Required | application/json      |
| Authorization | The authentication method used to access the resource. | Required | Basic **AUTH_STRING** |

**AUTH_STRING**: Base64(`ServerKey + :`)<br>Midtrans API validates HTTP request by using Basic Authentication method. The username is your *Server Key* while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by a colon symbol (**:**). For more details, refer to [ API Authorization and Headers](https://docs.midtrans.com/en/technical-reference/api-header).

?> ***Note***: *Server Key* is required to authenticate the request. For more details, refer to [HTTPS Header](https://api-docs.midtrans.com/#http-s-header).<br>

#### POST Body

Element | Description |Type|Required
----------- | ----------- | ----------- | ----------- 
transaction_details | Details of the transaction such as order_id and gross_amount |-|Required
order_id | Transaction order ID, defined from your side |String|Required
gross_amount | Total amount of transaction, defined from your side |String|Required
payment_type | Type of payment |String|Required

#### Sample Request 

The sample request for *charge API* Charge is as given below. APIs are implemented in some of the commonly used languages. You may implement according to your backend language. For more details, refer to available [Language Libraries](/en/technical-reference/library-plugin.md#language-library).
<!-- tabs:start -->

#### CURL

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

Install [**midtrans-php**](https://github.com/Midtrans/midtrans-php) library.

```bash
composer require midtrans/midtrans-php
```

> Alternatively, if you are not using **Composer**, you can [download midtrans-php library](https://github.com/Midtrans/midtrans-php/archive/master.zip), and then require the file manually
> ```php
> require_once dirname(__FILE__) . '/pathofproject/Midtrans.php';
> ```

**GoPay Charge** 

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

Install [**midtrans-client**](https://github.com/Midtrans/midtrans-nodejs-client) NPM package.

```bash
npm install --save midtrans-client
```

**GoPay Charge** 

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

Install [**midtrans-java**](https://github.com/Midtrans/midtrans-java) library.

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

If you're using Gradle as the build tools for your project, please add jcenter repository to your build script then add the following dependency to your project's build definition (build.gradle). 

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

**GoPay Charge** 

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

Install [**midtransclient**](https://github.com/Midtrans/midtrans-python-client) PIP package.

```bash
pip install midtransclient
```

**GoPay Charge** 

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

?>***Tips***: You can customize the `transaction_details` to include more information such as customer_details, item_details, and so on. For more details, refer to [Transaction Details Object](https://api-docs.midtrans.com/#json-object).<br>

It is recommended to add more details regarding transaction, so that these details can get added to the report. The report can be viewed on the dashboard.

#### Sample Response
A sample Charge API response is shown below.

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
You will get the `actions` attribute.

**Response Body**

| Element            | Description                                                  | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The status of the API call.                                  | String | For more details, refer to [Status Codes and Error](/en/technical-reference/error-response-code.md#status-codes-and-errors). |
| status_message     | A message describing the status of the transaction.          | String | --                                                           |
| transaction_id     | The *Transaction ID* of the specific transaction.            | String | --                                                           |
| order_id           | The specific *Order ID*.                                     | String | --                                                           |
| gross_amount       | The total amount of transaction for the specific order.      | String | --                                                           |
| currency           | The unit of currency used for the transaction.               | String | --                                                           |
| payment_type       | The type of payment method used by the customer for the transaction. | String | --                                                           |
| transaction_time   | The date and time at which the transaction occurred.         | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*<br>Time zone: Western Indonesian Time (GMT+7) |
| transaction_status | The status of the transaction.                               | String | For more details, refer to [Transaction Status](/en/after-payment/get-status.md#transaction-status). |
| fraud_status       | The fraud_status of the transaction is displayed.            | String | --                                                           |
| actions            | The stage of the transaction                                 | Array  | There are four stages of the transaction that can be retrieved through this attribute: QR code, Deeplink, Status of transaction, Canceling the transaction |
| name               | The name of the action.                                      | String | --                                                           |
| method             | The type of the method.                                      | String | --                                                           |
| url                | The redirect url                                             | String | --                                                           |

## 2. Altering Payment Flow Depending on the Device Used

 The user flow is different for web browser (on a computer or a tablet) and smartphone.

**Displaying *QR Code Image* (on computer or tablet)**

The steps to be followed to display the QR code image:

1. URL`generate-qr-code`should be used. `generate-qr-code` can be derived from 'actions' (API Response).
2. To hotlink the image URL is the simplest way to get the QR code image. In HTML frontend, you can put the URL in image tag (img src="[QR CODE URL]">) and directly get the image.
3. If the frontend is other than HTML, the QR code image should be downloaded from the URL, and should be displayed on the frontend.

**Instruction Example for *QR Code* :** 

1. Select **Payment Mode**, for example GoPay.
2. Click **Pay Now**. QR code will be displayed.
3. Open any **QRIS compatible app**, installed in your phone, for example Gojek.
4. Scan the **QR code**.
5. Click **Pay**, after checking and verifying your payment details.
6. Verify your **security pin** and finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-qr-pay.png)

**Creating Redirect Link to Gojek Apps (on smartphone)**

The customers can be redirected to Gojek app through URL. This URL can be obtained from `deeplink-redirect`, retrieved from `actions` (API Response). JavaScript such as `window.location=[DEEPLINK URL]`, or HTML link such as `<a href="[DEEPLINK URL]">Pay with GoPay</a>` can be used to redirect the customers via server-side redirect.

**The steps for *Deeplink* are as given below:**

1. Select Payment mode, for example GoPay.
2. You will be redirected to **Gojek** app.
3. Click **Pay**, after checking and verifying your payment details.
4. Verify your **security pin** and finish your transaction.

![GoPay QR Instruction](./../../asset/image/core-api_gopay-deeplink-pay.png)

?> For more details, refer to [here to simulate/test success payment](/en/technical-reference/sandbox-test.md#e-wallet).

**Implementing GoPay Deeplink Callback**

When the transaction is completed , you can opt to implement deeplink callback to redirect the customers  from Gojek to your apps/website.
Add `gopay` parameter in the [Charge API request](#charge-api-request) .

```json
  "gopay": {
      "enable_callback": true,
      "callback_url": "someapps://callback" //you can also use web url like https://myshop.com/finish
  }
```

| JSON Parameter | Description |
| -------------- | ----------- |
| enable_callback | To determine appending callback URL in the deeplink. Default value: `false` |
| callback_url | To determine where Gojek apps will redirect after successful payment. It can be HTTP or deeplink URL. Default value: `callback_url` in dashboard settings |

Prepare a `callback_url` which will accept two query parameters.

| Parameter | Description |
| --------- | ----------- |
| order_id | Order ID sent on the Charge Request|
| result | Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`|

?> **Important!** <br> To update the transaction status on your backend/database, DO NOT solely rely on frontend callbacks. For security reasons, make sure the status is authentically coming from Midtrans. Update transaction status based on [HTTP Notification](#_3-handling-post-transaction) or 
[API Get Status](https://api-docs.midtrans.com/#get-transaction-status) only.



## 3. Handling After Payment

When the transaction status changes, Midtrans notifies you at the redirect URL and sends HTTP notification to the merchant backend. This ensures that you are updated of the transaction status securely.

HTTP POST request with JSON body will be sent to your *Payment Notification URL* configured on dashboard.

<details>
<summary><b>Configuring Payment Notification URL</b></summary>
<article>
To configure the Payment Notification URL, follow the steps given below.

1. Login to your MAP account.

2. On the Home page, go to **SETTINGS > CONFIGURATION**.
   *Configuration* page is displayed.

3. Enter **Payment Notification URL**.

4. Click **Update**.
   A confirmation message is displayed.

   ![Core API](C:/Users/asset/image/coreapi/core-api-payment-notification-1.png)

   The *Payment Notification URL* is configured.

   </article>
   </details>

   


#### [Handling Webhook HTTP Notification](/en/after-payment/http-notification.md)
</div>

## Additional Notes

To use the Gojek app in smartphone (Android/IOS app), you should add additional configurations to ensure that your app will be able to redirect the customers to use GoPay deeplink. Please make sure that the WebView allow opening `gojek://` deeplink protocol.

<!-- tabs:start -->

#### **Android**

If you are using WebView on an Android device, make sure that it allows opening `gojek://` deeplink protocol. Please modify your WebView `shouldOverrideUrlLoading` functions as follows:

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

On **iOS**, add `LSApplicationQueriesSchemes` key to your app's `Info.plist`.

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
<string>gojek</string>
</array>
```
<!-- tabs:end -->

## Description

The description of `transaction_status` value for GoPay E-Wallet payment method is given below:

| Transaction Status | Description |
| ------------------ | ----------- |
| settlement | Transaction is successful, customer has completed the transaction. |
| pending | Transaction is created successfully but it is not completed by the customer. |
| expire | Transaction is failed as the payment is not done by customer within the given time period. |
| cancel | Transaction is cancelled by you. |
| deny | Transaction is rejected by the payment provider. |
| refund | Transaction is refunded by you. |

<br>

For more details, refer to  [*Status Cycle*](/en/after-payment/status-cycle.md)

## Next Step:
<br>

<div class="my-card">

#### [Taking Action of Payment](/en/after-payment/overview.md)
</div>

<div class="my-card">

#### [Core API Advanced Feature](/en/core-api/advanced-features.md)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action](/en/after-payment/status-cycle.md)
</div>

<hr>
For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)

.