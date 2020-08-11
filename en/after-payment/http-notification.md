# HTTP(S) Notification / Webhook
<hr>

Notification through HTTP(S) POST / Webhook will be sent to the merchant's server when customer completes the payment process and when transaction status changes (transaction refunded, pending, etc). Merchant can utilize the HTTP(S) POST notification to update a payment status or send the item of a transaction in real time.

Enable Midtrans HTTP(S) POST Notification by setting the Payment Notification URL at [Settings - Configuration](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration/). URL protocol prefix  (`https://` or `http://`) are required, we highly recommended to use `https://` to ensure security.

![HTTP Notification Configuration](./../../asset/image/after-payment-notifurl-dashboard.png)

!> Make sure to input Notification URL that **can be reached from Public Internet**. Midtrans **will not be able** to send notification to localhost, url protected with auth/password, url behind VPN, unusual destination port, etc. You can then utilize `signature_key` or method that will be explained below as security measures.

?> **Tips**: If you are still running/developing your notification handler on localhost, you can utilize these service to expose your localhost server to public internet: [Ngrok](https://ngrok.com/), [Serveo](http://serveo.net/), [Localhost.Run](http://localhost.run/), etc. Once you have obtain the internet accessible url, you can input it to the `notification url` field on Dashboard.

### Sample Notification

The HTTP(S) POST notification is HTTP request with:

Key | Type
--- | ---
Kind | HTTP Request
Request Method | `POST`
Request Header | `Content-Type: application/json`
Request Body | `string` of JSON

<details>
<summary><b>Sample Notification Request in CURL</b></summary>
<article>

Here's example of how the HTTP notification will be sent from Midtrans side:
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

Some sample notification of successful transaction based on payment channel:
<!-- TODO: Update the notification sample with actual test result-->

<!-- tabs:start -->
#### **Card**
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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
```json
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

?> It's recommended to check the `transaction_status` as reference of the most accurate transaction status. Transaction can be considered **success** if `transaction_status` value is `settlement` (or `capture` incase of card transaction) **and**  `fraud_status` value is `accept`. Then you are safe to deliver good/service to customer.

### Status Definition

<!-- tabs:start -->
#### **Transaction Status**

transaction_status | 🔍 | description
--- | --- | ---
`capture` | ✅ | Transaction successfully capture the credit card balance. <br>Will be settled automatically next day if no manual action taken. <br>Safe to assume as success payment.
`settlement` | ✅ | Transaction is successfully settled. Funds has been received.
`pending` | 🕒 | Transaction is created and available/waiting to be paid by customer at the payment provider (ATM/ebanking/E-wallet app/ store).
`deny` | ❌| Payment provider / Fraud Detection System rejects the credentials used for payment. See `status_message` field for deny reason/details.
`cancel` | ❌| Transaction is cancelled. Can be triggered by Midtrans or Merchant themselves.
`expire` | ❌| Transaction no longer available to be paid or processed, beacause the payment has not been completed after the expiry time period exceeded.
`refund` | ↩️| Refund is triggered by Merchant. Transaction is marked to be refunded.

#### **Fraud Status**

fraud_status | 🔍 | description
--- | --- | ---
`accept` | ✅ | Transaction is safe, not considered as fraud.
`deny` | ❌ | Transaction is considered as fraud. And denied/rejected for safety reason.
`challenge` | ⚠️ | Transaction have indication of potential fraud, but cannot be determined precisely. <br>Merchant should take action to accept or deny via Dashboard, or via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API
<!-- tabs:end -->

#### Notes When Using Snap API
<br>
<details>
<summary><b>Notes When Using Snap API</b></summary>
<article>

When a transaction is created on Snap API, it does not immediately assign any payment status on Core API's get-status response. 

So please expect that you may encounter `404` or payment not found response upon calling Core API get-status even if the payment page is activated on Snap API. 

It is because of customer may not yet choose any payment method within the Snap payment page (e.g: idling or abandoning the Snap payment page). After customer chooses and proceeds with a payment method, then the transaction status will be assigned and available on Core API get-status. The possible status is as defined on the table above. 

</article>
</details>

### Verify Notification Authenticity

To ensure the content integrity and the notification is securely sent by Midtrans, not by other unverified party, we recommend you to verify the notification by one of these mechanisms:

<!-- tabs:start -->
#### **Verify Signature Key**

On the JSON notification body, we provided `signature_key` which generated using Server Key as one of its component. Since presumably only Midtrans and that specific Merchant knows the Server Key, it can be use to ensure the notification is signed by Midtrans, and can be verified by Merchant.

The logic to generate or calculate signature key is explaine below:

```
SHA512(order_id+status_code+gross_amount+serverkey)
```

> It basically means append the value of `order_id`,`status_code`,`gross_amount`,`ServerKey` into one string, then use it as input to SHA512 hash function. Then the output should match with `signature_key` from notification.

You can test with this tools to try out signature_key calculation:


<details>
<summary><b>Signature Key Calculator</b></summary>
<article>

[Signature Key Calculator](https://jsfiddle.net/5amr8cov/6/embedded/result,html/dark ':include :type=iframe width=100% height=800px')
</article>
</details>
<br>

#### **Verify Directly to Midtrans API**

Alternatively, verify by calling [the get status API](/en/after-payment/get-status.md). This means the request is directly responded by Midtrans, not other party. The JSON response will be generally the same as the notification status. Illustrated below:

![Verify Notification Diagram](./../../asset/image/after-payment-notif-diag.png)
<!-- tabs:end -->

?> **Tips**: Official Midtrans language library will automatically do "Verify Directly to Midtrans API" mechanism within the built in `notification` function. As well as official Midtrans CMS plugin.

### Response

Your notification url / backend must response with http status code `200` to confirm notification is received. On most backend / web framework you can also achive that by simply printing string, like `ok` it will automatically send http status code `200`.

### Best Practice to Handle Notification
<br>
<details>
<summary><b>Best Practice</b></summary>
<article>

- Always use an HTTPS endpoint. It is secure and there cannot be MITM attacks because we validate the certificates match the hosts. Also do not use self signed certificates.
- Use standard port (80/443) for notification callback url
- Always implement notification in an idempotent way, in extremely rare cases, we may send multiple notifications for the same transaction event twice. It should not cause double entries in the merchant end, The simple way of achieving this is to use orderid as the key to track the entries.
- Always check the signature hash of the notification, This will confirm that the notification was actually sent by Midtrans, because we encode the shared secret (server key). Nobody else can build this signature hash.
- Always check all the following three fields for confirming success transaction
	- `status_code`: Should be 200 for successful transactions
	- `fraud_status`: ACCEPT
	- `transaction_status` : settlement/capture
- We strive to send the notification immediately after the transaction has occurred, but in extremely rare cases, it may be delayed because of transaction spikes. If you have not received a notification, please use the Status API to check for current status of the transaction.
- It is safe to call Status API to get the latest status of the transaction/order on each notification.
- We set the HTTP timeout to 15 seconds.
- Please strive to keep the response time of the the HTTP notifications under 5 seconds.
In extremely rare cases we may send the HTTP notifications out of order, ie. a `settlement` status for a notification before the notification for `pending` status. It's important that such later notifications are ignored. Here's the state transition diagram that you could use. But again, use our /status API to confirm the actual status.
- We send the notification body as JSON, please parse the JSON with a JSON parser. Always expect new fields will be added to the notification body, so parse it in a non strict format, so if the parser sees new fields, it should not throw exception. It should gracefully ignore the new fields. This allows us to extend our notification system for newer use cases without breaking old clients.
- Always use the right HTTP Status code for responding to the notification, we handle retry for error cases differently based on the status code
	- for `2xx`: No retries, it is considered success
	- for `500`: Retry only once
	- for `503`: Retry 4 times
	- for `400/404`: Retry 2 times
	- for `301/302/303`: No retries. We suggest the notificaiton endpoint should be update in setting instead of reply these status code.
	- for `307/308`: Follow the new url with POST method and same notification body. Max redirect is 5 times
	- for all other failures: Retry 5 times
- We do retry at most 5 times with following policy
- Different retry interval from 1st time to 5th time (2m, 10m, 30m, 1.5hour, 3.5hour)
- Put a random time shift for each time retry base on above interval. For example, the first time retry might be 33s(at most 2m) after the job failed.
</article>
</details>

### Example

Sample code for merchant to receive HTTP(S) POST and JSON object by utilizing **Midtrans Official Library**. Assume that this code will be executed when notification URL endpoint (https://tokoecomm.com/notification) is accessed.

<!-- tabs:start -->
#### **Node JS**
```javascript
const midtransClient = require('midtrans-client');
// Create Core API / Snap instance (both have shared `transactions` methods)
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

        // Sample transactionStatus handling logic

        if (transactionStatus == 'capture'){
            if (fraudStatus == 'challenge'){
                // TODO set transaction status on your database to 'challenge'
                // and response with 200 OK
            } else if (fraudStatus == 'accept'){
                // TODO set transaction status on your database to 'success'
                // and response with 200 OK
            }
        } else if (transactionStatus == 'settlement'){
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
          // TODO set transaction status on your database to 'failure'
          // and response with 200 OK
        } else if (transactionStatus == 'pending'){
          // TODO set transaction status on your database to 'pending' / waiting payment
          // and response with 200 OK
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
  // For credit card transaction, we need to check whether transaction is challenge by FDS or not
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

### Customize Notification URL via API
<br>
<details>
<summary><b>Customize Notification URL via API</b></summary>
<article>
	
Optionally, if required Merchant can option to change or add custom notification URLs on each transaction. It can be achieved by adding additional HTTP(s) headers on the API request.

There are two optional headers that we can accept:
- `X-Append-Notification` : to add new notification url(s) alongside the settings on dashboard
- `X-Override-Notification` : to use new notification url(s) disregarding the settings on dashboard

Both header can only receive up to maximum of 2 URLs, separated by coma(`,`).

#### Example in CURL

This is sample API request of Snap a transaction with override-notification url:

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

#### Sample Case

Assuming merchant has set `https://example.com` as notification url on the dashboard. If merchant set header `X-Append-Notification: https://example.com/test1,https://example.com/test2`. Then, every HTTP(s) notification for that specific transaction will be sent to:
- https://example.com,
- https://example.com/test1, and
- https://example.com/test2

Else if merchant set header `X-Override-Notification: https://example.com/test1,https://example.com/test2`. Then, every HTTP(s) notification for that specific transaction will be sent to:
- https://example.com/test1 and
- https://example.com/test2
</article>
</details>

### View Notification History
<br>
<details>
<summary><b>View Notification History</b></summary>
<article>

In some cases you might want to know if HTTP notification is successfully sent to your notification url or backend server.

To audit if notification is sent, and if it sent successfuly or not you can login to your Midtrans Dashboard. Go to menu `Settings > Configuration > See History`. You will find HTTP Notification as well as email notification records for each Order ID, and you can see the status if it successfully sent or not. You can also search by Order ID.

- You may find some notification failed to be sent, most likely that is because your notification url is rejecting the HTTP notification delivery. Please check your notification url implementation on your backend server. Make it also follows the [best practice](#best-practice-to-handle-notification).

- You may find notification shown as `success` to be sent, but your server wasn't able to change the payment status on your side. Please check, most likely there is mis-implementation or issue on the implementation on your backend server.

- If there is issue of Midtrans having delay or issue that unable to send the HTTP Notification, you can always use [Get Status API](/en/after-payment/get-status) approach to sync payment status on Midtrans side to your system.

</article>
</details>