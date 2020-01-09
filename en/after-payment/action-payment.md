After payment has been completed by customer (payment confirmed on Midtrans). Merchant will be notified by Midtrans, also Merchant can also retrieve transaction status to Midtrans.

Midtrans provides three means for merchant to obtain the transaction status:

<div class="my-card">

#### [A. Email Notification &#187;](/en/after-payment/action-payment.md?id=email-notification)
The simplest. Require no complicated set up.
</div>

<div class="my-card">

#### [B. HTTP(S) Notification / Webhook &#187;](/en/after-payment/action-payment.md?id=https-notification-webhook)
The most recommended, if you are aiming to have automated transaction status update on your system.
</div>

<div class="my-card">

#### [C. Dashboard / Merchant Administration Portal &#187;](/en/after-payment/dashboard-usage.md)
Also simple and easy, utilizing our ready to use Dashboard.
</div>

<div class="my-card">

#### [D. Call API Get Status &#187;](/en/after-payment/action-payment.md?id=api-get-status)
You can query for transaction status to Midtrans via API too if needed.
</div>

## Email Notification

Whenever transaction status changes: success, failure, cancel, etc. Midtrans by default will notify by email the status of the transaction to Merchant email (email configured on dashboard) & Customer email (email inputted on Snap payment page). 

Feel free to try create transaction on Sandbox mode, to see and test email notification that will be sent to you.

Merchant can configure the email notification setting at [Settings - Email Notification](https://dashboard.sandbox.midtrans.com/settings/email_notifications) in Dashboard.

![Email Notification Configuration](./../../asset/image/after-payment-email-dashboard.png)

?> For multiple emails, please use comma as a separator. Example : `me@tokoecomm.com, you@tokoecomm.com`

## HTTP(S) Notification / Webhook

Notification through HTTP(S) POST / Webhook will be sent to the merchant's server when customer completes the payment process and when transaction status changes (transaction refunded, pending, etc). Merchant can utilize the HTTP(S) POST notification to update a payment status or send the item of a transaction in real time.

Enable Midtrans HTTP(S) POST Notification by setting the Payment Notification URL at [Settings - Configuration](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration/). URL protocol prefix  (`https://` or `http://`) are required, we highly recommended to use `https://` to ensure security.

![HTTP Notification Configuration](./../../asset/image/after-payment-notifurl-dashboard.png)

!> Make sure to input Notification URL that **can be reached from Public Internet**. Midtrans **will not be able** to send notification to localhost, url protected with auth/password, url behind VPN, unusual destination port, etc. Though don't worry, you can then utilize `signature_key` or method explained below to make sure it's security.

?> **Tips**: If you are still developing your notification handler on localhost, you can utilize these service to expose your localhost server to public internet: [Ngrok](https://ngrok.com/), [Serveo](http://serveo.net/), [Localhost.Run](http://localhost.run/), etc. Once you have obtain the internet accessible url, you can input it to the `notification url` field on Dashboard.

#### Sample Notification

The content of the HTTP(S) POST notification consists of JSON object. Some sample notification of successful transaction based on payment channel:

<!-- tabs:start -->
#### **Card**
```javascript
{
  "masked_card": "481111-1114",
  "approval_code": "256084",
  "bank": "bni",
  "transaction_time": "2016-06-28 09:42:20",
  "gross_amount": "10000.00",
  "order_id": "C17550",
  "payment_type": "credit_card",
  "signature_key": "ad7ccda03d8ec6f2f415661fb511d47fcd17dcc7d7e1ade96a305dd5d3bc2bea5438a8bdfe1aeedabdefb226000338ac169fc18d5ae73788fd5e78dbac945ce4",
  "status_code": "200",
  "transaction_id": "1eae238a-cb9e-4f92-b284-aac8b39e4eab",
  "transaction_status": "capture",
  "fraud_status": "accept",
  "status_message": "midtrans payment notification"
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

?> It's recommended to check the `transaction_status` as reference of the most accurate transaction status. Transaction can be considered **success** if `transaction_status` value is `settlement` (or `capture` incase of card transaction) **and**  `fraud_status` value is `accept`. Then you are safe to deliver good/service to customer.

#### Status Description

transaction_status | 🔍 | description
--- | --- | ---
`capture` | ✅ | Transaction successfully capture the credit card balance. <br>Will be settled automatically next day if no manual action taken. <br>Safe to assume as success payment.
`settlement` | ✅ | Transaction is successfully settled. Funds has been received.
`pending` | 🕒 | Transaction is made available in Midtrans to be paid.
`deny` | ❌| Payment provider / Fraud Detection System rejects the credentials used for payment. See `status_message` field for deny reason/details.
`cancel` | ❌| Transaction is cancelled. Can be triggered by Midtrans or Merchant themselves.
`expire` | ❌| Transaction no longer available to be paid or processed, beacause the payment has not been completed after the expiry time period exceeded.
`refund` | ↩️| Refund is triggered by Merchant. Transaction is marked to be refunded.

fraud_status | 🔍 | description
--- | --- | ---
`accept` | ✅ | Transaction is safe, not considered as fraud.
`deny` | ❌ | Transaction is considered as fraud. And denied/rejected for safety reason.
`challenge` | ⚠️ | Transaction have indication of potential fraud, but cannot be determined precisely. <br>Merchant should take action to accept or deny via Dashboard, or via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API

To ensure the content integrity and the notification is securely sent by Midtrans, not other unverified party, we recommend you to verify the notification by one of these mechanism:

#### Verify Signature Key

#### Verify Notification Authenticity

To ensure Notification is securely sent by Midtrans, not other unverified party, we recommend a mechanism to verify . This can be achieved by calling [the get status API](/en/after-payment/action-payment.md?id=api-get-status). This means the request is directly responded by Midtrans, not other party. The JSON response will be generally the same as the notification status. Illustrated below:

![Verify Notification Diagram](./../../asset/image/after-payment-notif-diag.png)

## API Get Status