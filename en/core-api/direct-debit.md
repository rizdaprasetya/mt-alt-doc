# Direct Debit Transfer Integration
One of the payment method offered by Midtrans is Direct Debit. By using this payment method, customers will have the option to make a payment via bank website and Midtrans will send real time notification when the customer complete the payment.

At this moment, Midtrans has integrated with some direct debit payment methods:

![bca klikpay](./../../asset/image/coreapi/bca_klikpay.svg ":size=150") <br>
![cimb clicks](./../../asset/image/coreapi/cimb_clicks.svg ":size=150") <br>
![danamon online banking](./../../asset/image/coreapi/danamon.png ":size=150") <br>
![epay bri](./../../asset/image/coreapi/epay_bri.png ":size=150") <br>

Basic integration process of Direct Debit will be explained below.
<details>
<summary><b>Sequence Diagram Transaction Flow</b></summary>
<article>

![Direct Debit Payment Flow](./../../asset/image/coreapi/direct_debit.png)

</article>
</details>

#### Sandbox Environment
All the steps below are using [Midtrans Sandbox environment](https://account.midtrans.com/), not Production, to easily test the integration process. Make sure you are switching to Sandbox mode on your Midtrans account dashboard while retrieving Server Key and Client Key. Explained in [`Getting Started - Preparation`](/en/midtrans-account/overview.md).

Server Key and Client Key can be retrieved on menu `Settings` > `Access Key`.

?>**Info:**
[How to retrieved Access key](/en/midtrans-account/overview.md#retrieving-api-access-keys)

### Integration Step
1. Send transaction data to API Charge.
2. Redirect customer to bank's website.
3. Create landing page after customer complete the payment.
4. Handle transaction notification.

Charge API request should be done from Merchant's backend. Server Key (from your account's Dashboard) will be needed to [authenticate the request](https://api-docs.midtrans.com/#http-s-header).

#### Request Details
Type | Value
--- | ---
HTTP Method | `POST`
API endpoint (Sandbox) | `https://api.sandbox.midtrans.com/v2/charge`
API endpoint (Production) | `https://api.midtrans.com/v2/charge`

#### HTTP Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> HTTP request by using Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by **:** (colon symbol).



### 1. Send Transaction Data to API Charge

#### Charge API request
This is example of basic `/charge` API request in Curl, please implement according to your backend language (you can also check our [available language libraries](/en/technical-reference/library-plugin.md)).
<!-- tabs:start -->
#### **BCA Kilkpay**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bca_klikpay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bca_klikpay": {
      "description": "Pembelian Barang"
  }
}'
```

#### **CIMB Clicks**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "cimb_clicks",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  },
  "cimb_clicks": {
      "description": "Purchase of a Food Delivery"
  }
}'
```

#### **Danamon Online Banking**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "danamon_online",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
#### **e-Pay BRI**
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bri_epay",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```
<!-- tabs:end -->

?>**Optional:**
You can customize [transaction_details](https://api-docs.midtrans.com/#json-object) data. To include data like customer_details, item_details, etc. It's recommended to send as much detail so on report/dashboard those information will be included.

#### Charge API response
You will get the API response like the following.
<!-- tabs:start -->
#### **BCA Kilkpay**
```json
{
    "status_code": "201",
    "status_message": "OK, BCA KlikPay transaction is successful",
    "transaction_id": "d19a4bcd-ae30-49dc-bde7-57749aede090",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bca/klikpay/redirect/d19a4bcd-ae30-49dc-bde7-57749aede090",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bca_klikpay",
    "transaction_time": "2019-12-12 11:03:55",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "redirect_data": {
        "url": "https://simulator.sandbox.midtrans.com/bca/klikpay/index",
        "method": "post",
        "params": {
            "klikPayCode": "03KHAN816197673",
            "transactionNo": "92396",
            "totalAmount": "44000",
            "currency": "IDR",
            "payType": "01",
            "callback": "https://example.com?id=d19a4bcd-ae30-49dc-bde7-57749aede090",
            "transactionDate": "11/11/2019 11:03:55",
            "descp": "Pembelian Barang",
            "miscFee": "0.00",
            "signature": "239297204"
        }
    }
}
```

#### **CIMB Clicks**
```json
{
    "status_code": "201",
    "status_message": "Success, CIMB Clicks transaction is successful",
    "redirect_url": "https://api.sandbox.veritrans.co.id/cimb-clicks/request?id=2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "transaction_id": "2e8f8ddd-c61a-4d5f-83ad-429432383057",
    "order_id": "order-101i-1576124787",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "cimb_clicks",
    "transaction_time": "2019-11-11 11:26:27",
    "transaction_status": "pending",
    "merchant_id": "G812785002"
}
```

#### **Danamon Online Banking**
```json
{
    "status_code": "201",
    "status_message": "Success, Danamon Online transaction is successful",
    "transaction_id": "9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "order_id": "order-101p-1576124871",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v2/danamon/online/redirect/9da1c095-81b2-40d3-8285-8d27c60ae56e",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "danamon_online",
    "transaction_time": "2019-11-11 11:27:50",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
#### **e-Pay BRI**
```json
{
    "status_code": "201",
    "status_message": "Success, BRI E-Pay transaction is successful",
    "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
    "order_id": "order-101",
    "redirect_url": "https://api.sandbox.veritrans.co.id/v3/bri/epay/redirect/01c03b08-5e77-40d3-b1df-972f20a92e09",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bri_epay",
    "transaction_time": "2019-11-11 15:09:35",
    "transaction_status": "pending",
    "fraud_status": "accept"
}
```
<!-- tabs:end -->
You will get the `redirect_url` attribute which can be performed this transaction.

### 2. Redirect Customer to Bank's Website
To redirect customer to Bank's Website, use redirect_url that retrieved from API response.

Then customer can be redirected via server-side redirect, using javascript like `window.location=[REDIRECT URL]`, or using HTML link `<a href="[REDIRECT URL]">Pay Here!</a>`.

?> Read [here to simulate/test success payment](/en/technical-reference/sandbox-test.md#direct-debit).

### 3. Create Landing Page After Customer Complete the Payment
After the customer completes the payment via bank's website, the bank website automatically redirect customer to `Finish Redirect URL` which can be configured on MAP (Merchant Administration Portal). You must [login to MAP](https://account.midtrans.com/login). Go to setting -> configuration, and fill in the `Finish Redirect URL` with your landing page endpoint.
![Direct Debit Payment Flow](./../../asset/image/coreapi/direct_debit_map.png)

On the Finish Redirect URL script, we need to obtain the response sent to the finish url script. Please make sure the `Finish Redirect URL` endpoint can receive POST. The sample code below are written in native php. Please adjust to your own environment.
```php
<?php
    $response = $_POST['response']; //get the json response
    $decoded_response = json_decode($response);
    $order_id = $decoded_response->order_id;//how to access
?>
```
The response is in JSON format:

```json
{
    "status_code" : "200",
    "status_message" : "Success, transaction is found",
    "transaction_id" : "58b48d1c-3e51-46f8-a2fb-ad5fa668f534",
    "order_id" : "34",
    "gross_amount" : "19999998.00",
    "payment_type" : "cimb_clicks",
    "transaction_time" : "2018-01-26 08:57:45",
    "transaction_status" : "settlement",
    "approval_code" : "1516957074590",
    "signature_key" : "30b048ffff95e08c34cf265268224f0b6460d7716b3d70424a7203609a78b335280fe6137a9938cd3af24533fdafcfe8771203f6f30f21fd141a378bba1685fb"
}
```

### 4. Handling Post-Transaction

HTTP notification from Midtrans to Merchant backend will also be triggered on event of `transaction_status` getting updated, to ensure merchant is securely informed. Including if transaction success or expired (not paid). So apart of JSON result above, Merchant backend will be notified by Midtrans.

HTTP POST request with JSON body will be sent to Merchant's **notification url** configured on dashboard (Settings > Configuration > Notification URL), this is the sample JSON body that will be received by Merchant:
<!-- tabs:start -->
#### **BCA Kilkpay**
```json
{
  "transaction_time": "2019-12-11 16:20:48",
  "transaction_status": "settlement",
  "transaction_id": "34be81bd-1e4f-46b6-80f0-3e0f29776c63",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f75192079b47bb2a55d8307d443388f418d139bd13b447b2521fd9fe7b33ffddf9435afaa212f4ef67452fb2f2f109c1852ddd7567bb2d74cefeb2f5aa995de6",
  "settlement_time": "2019-12-11 16:21:38",
  "payment_type": "bca_klikpay",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "112233"
}
```

#### **CIMB Clicks**
```json
{
  "transaction_time": "2019-12-11 16:23:18",
  "transaction_status": "settlement",
  "transaction_id": "89cb0bfd-675b-4d4a-942c-7e19ba66d442",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "65e02e423cca2618a8d9ec201768438684bbf7218b27ab6f05a2197ce5b3c44fc9f4a157dce5a42d49f3ed6b88ac7a163f7e6b532d876d57a4a9297c5802639c",
  "settlement_time": "2019-12-11 16:24:00",
  "payment_type": "cimb_clicks",
  "order_id": "order-101",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "currency": "IDR",
  "approval_code": "1576142640542"
}
```

#### **Danamon Online Banking**
```json
{
   "transaction_time": "2019-12-11 16:25:34",
   "transaction_status": "settlement",
   "transaction_id": "e7eb187b-c54c-4960-8558-a995253d61ca",
   "status_message": "midtrans payment notification",
   "status_code": "200",
   "signature_key": "928775783adf67b0578340dc616a30d2c2b307350475fbfbcc5bc1a5ac94892bb6bb972b7fe2394509c32fd431fd3494a358f25e24456f7414b473989ab1e66f",
   "settlement_time": "2019-12-11 16:25:49",
   "payment_type": "danamon_online",
   "order_id": "order-101p-1576142735",
   "merchant_id": "G812785002",
   "gross_amount": "44000.00",
   "fraud_status": "accept",
   "currency": "IDR",
   "approval_code": "uRaSu1XAnIm56i"
 }
```
#### **e-Pay BRI**
```json
{
  "transaction_time": "2019-11-11 15:09:35",
  "transaction_status": "settlement",
  "transaction_id": "01c03b08-5e77-40d3-b1df-972f20a92e09",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "f0abe6507f42019839e028f9c5da723ff7c220c962af1f1f8fc25ac5a773c1123fd680602443e7cece83d059b9f9c13078d74cc4a79948214059394ec5d18c4b",
  "settlement_time": "2019-11-11 15:13:51",
  "payment_type": "bri_epay",
  "order_id": "order-101h-1576483775",
  "merchant_id": "G812785002",
  "gross_amount": "44000.00",
  "fraud_status": "accept",
  "currency": "IDR",
  "approval_code": "1576483775235"
}
```
<!-- tabs:end -->

<div class="my-card">

#### [Handling Webhook HTTP Notification &#187;](/en/after-payment/http-notification.md)
</div>

### Switching To Production
To use Midtrans production environment (accept real payment from real customer), please make sure to:

1. Switch the API domain URL from `api.sandbox.midtrans.com` to `api.midtrans.com`
2. Switch the Client Key and Server Key from sandbox Dashboard, with keys from production Dashboard.


## Next Step:
<br>

<div class="my-card">

#### [Taking Action of Payment &#187;](/en/after-payment/overview.md)
</div>

<div class="my-card">

#### [Core API Advanced Feature &#187;](/en/core-api/advanced-features.md)
</div>

<div class="my-card">

#### [Transaction Status Cycle and Action &#187;](/en/after-payment/status-cycle.md)
</div>

<hr>
