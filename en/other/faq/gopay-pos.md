# GoPay QRIS POS Integration

Integration process of GoPay QRIS with custom software/hardware/POS/IoT will be explained below.

## Overview
Overview of the transaction flow in sequence diagram:

![Gopay QR flow](./../../../../asset/image/core-api_gopay_qr_partner.png)
.

## Integration Step
1. Get QR code image URL, via backend.
2. Show QR code to customer, via POS device / frontend.
3. Handle HTTP notification, on backend.

## 1. Get QR Code Image URL

Charge API request should be done from Partner's backend. **Server Key** (given by Midtrans Business PIC) will be needed to [authenticate the request](https://api-docs.midtrans.com/#http-s-header).

### Charge API Request

Below is example of minimum `/charge` API request in Curl, please implement according to your backend language (you can also check our available [language libraries](/en/technical-reference/library-plugin.md).

Additionally `X-Override-Notification` HTTP header is required, in order to [specify which URL Midtrans should send HTTP notification](https://api-docs.midtrans.com/#override-notification-url), in case of transaction updated (success, fail, etc).

```bash
# sample charge in CURL
curl -X POST \
  https://api.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'X-Override-Notification: <YOUR BACKEND URL TO RECEIVE NOTIFICATION>' \
  -d '{
  "payment_type": "gopay",
  "transaction_details": {
    "order_id": "order102",
    "gross_amount": 789000
  }
}'
```

Optional: we can customize [transaction_details data](https://api-docs.midtrans.com/#json-object). To include data like customer_details, item_details, etc. It's recommended to send as much detail so on report/dashboard those information will be included.

> Note: On the API Docs, there are `enable_callback` & `callback_url` fields, which are not used for POS transaction. It only useful for non QR transaction. We can ignore that.

### Charge API Response
We will get the **API response** like the following.
```javascript
{
    "status_code": "201",
    "status_message": "GO-PAY billing created",
    "transaction_id": "e48447d1-cfa9-4b02-b163-2e915d4417ac",
    "order_id": "SAMPLE-ORDER-ID-01",
    "gross_amount": "10000.00",
    "payment_type": "gopay",
    "transaction_time": "2017-10-04 12:00:00",
    "transaction_status": "pending",
    "actions": [{
            "name": "generate-qr-code",
            "method": "GET",
            "url": "https://api.midtrans.com/v2/gopay/e48447d1-cfa9-4b02-b163-2e915d4417ac/qr-code"
        },
    {
            "name": "deeplink-redirect",
            "method": "GET",
            "url": "gojek://gopay/merchanttransfer?tref=1509110800474199656LMVO&amount=10000&activity=GP:RR&callback_url=someapps://callback?order_id=SAMPLE-ORDER-ID-01"
        },
        {
            "name": "get-status",
            "method": "GET",
            "url": "https://api.midtrans.com/v2/e48447d1-cfa9-4b02-b163-2e915d4417ac/status"
        },
        {
            "name": "cancel",
            "method": "POST",
            "url": "https://api.midtrans.com/v2/e48447d1-cfa9-4b02-b163-2e915d4417ac/cancel",
            "fields": []
        }
    ],
    "channel_response_code": "200",
    "channel_response_message": "Success",
  "currency": "IDR"
}
```

`"transaction_status": "pending"` means now the transaction is active and can be paid via the QR code.

## 2. Show QR Code to Customer

Inside the `actions` array there is `generate-qr-code` action:
```javascript
{
  "name": "generate-qr-code",
  "method": "GET",
  "url": "https://api.midtrans.com/v2/gopay/e48447d1-cfa9-4b02-b163-2e915d4417ac/qr-code"
}
```

We can use the `url` to get the QR code image. The easiest way is to "hotlink" the image url, if the POS device support displaying HTML, put it in image tag `<img src="[QR CODE URL]">`, or display it on a similar component without downloading.

If the POS device does not support such scenario, download the QR code image from that url, then display it on the device.

Once QR displayed to customer, customer can scan and proceed to pay via Gojek app on their mobile device. Customer will see success or failure screen inside their Gojek app after attempting payment.

## 3. Handle HTTP notification

### Notification

HTTP notification from Midtrans to Partner's backend will be triggered on event of `transaction_status` getting updated (e.g payment received), to ensure merchant is securely informed. Including if GoPay transaction success or expired (left unpaid).

HTTP POST request with JSON body will be sent to **X-Override-Notification** url sent on step 1, this is the sample JSON body that will be received by Partner's backend:

```javascript
{
  "transaction_time": "2019-09-04 19:08:21",
  "transaction_status": "settlement",
  "transaction_id": "8b82e549-2a48-47a9-8cb1-fb36060b88f3",
  "status_message": "midtrans payment notification",
  "status_code": "200",
  "signature_key": "7b91a66336ab53c2ee197cf5d0e38fed014b1f94e617f4c5f6ca3b81800d9c783c570b972ed9ac190bcc08daac27ced4720e6dea9947c6826761972bc66e32f2",
  "settlement_time": "2019-09-04 19:08:37",
  "payment_type": "gopay",
  "order_id": "20190904190821463338875755684689",
  "gross_amount": "100.00",
  "fraud_status": "accept",
  "currency": "IDR"
}
```

If the `transaction_status` is `settlement` and `fraud_status` is `accept`, it means the transaction is **success**, and is now complete.

If the `transaction_status` is `expire` and `fraud_status` is `accept`, it means the transaction is **expire** (left unpaid until time limit exceeded), which means payment fail.

Refer [here on more details of how to handle HTTP Notification](https://api-docs.midtrans.com/#handing-notifications).

### Get Transaction Status

In case of HTTP notification fail to be received by Partner's backend/POS Device. Partner can call API [get status](https://api-docs.midtrans.com/#get-transaction-status) to retrieve the most updated status of transaction (in a form of JSON like above).

Merchant can also implement auto check status mechanism on a specified interval, but it is recommended to not overly use the check status API, for example only retry check status after 10 second.

**It's recommended to rely on HTTP notification first**, before attempting to use API check status. Because HTTP notification should be received in realtime, and less effort is needed.

## Finish!

The GoPay payment integration guide is now complete. Below are some further references.

## Description

`transaction_status` value description:

- `Deny`: Payment provider rejected the payment code/id creation.
- `Pending`: Payment specific code for customer to pay is created. Customer need to complete payment at the app/bank/payment provider website/Application/ATM etc.
- `Expire`: Customer fail to pay at bank/payment provider within the specified expiry time.
- `Cancel`: Transaction is canceled by trigger from Merchant/Partner.
- `Settlement`: Customer payment is successfully confirmed by bank/payment provider.

Link: [*More detailed definition of transaction_status*](https://api-docs.midtrans.com/#transaction-status)

Link: [*More detailed definition of fraud_status*](https://api-docs.midtrans.com/#fraud-status)

## Additional Notes / FAQ

### Expiry Time
By default expiry for Gopay transaction is 15 minutes. However this can be customized by sending additional JSON parameter during transaction creation. Partner can send `custom_expiry` ([Core API docs](https://api-docs.midtrans.com/#charge-features)).

It is **not recommended to set expiry below 15 minutes**, because Midtrans' expiry scheduler only reliably expire transaction with 15 minutes or more expiry, 15 minutes is also might be subject to some delay on batch processing of periodic expire transactions. If partner want the transaction to expire in real time or less than 15 minutes, they can utilize API [cancel](https://api-docs.midtrans.com/#cancel-transaction) or [expire](https://api-docs.midtrans.com/#expire-transaction) instead. Which partner can trigger at anytime on a `pending` transaction.

### Refund
For POS transaction, by default refund online via API/dashboard are not allowed. Please consult to Midtrans business PIC on how to handle refund scenario.

### Failure Payment Attempt
Failure of payment within Gojek App will be contained only within the app, and will allow customer to retry payment. So failure is not notified to Midtrans or Merchant. Transaction status will remain pending, to allow retry attempt from customer. If customer fail to do successful payment until expiry-time exceeded (default expiry is 15 minutes) the transaction status will then change to `expire` and cannot be paid.

### Order ID
Order ID of each transaction should be unique, `order_id` cannot be used for other transaction if it is `pending` or `settlement`. You can however trigger cancel/expire on a `pending` transaction, so you can re-use the `order_id` if needed.

### Why is customer Gopay deducted while the transaction recorded as failure/expire on Midtrans Dashboard?
In the very rare case of Gopay system already deduct customer’s Gopay but experiencing issues that may result in failure to notify Midtrans (and Partner) about the transaction status, Gopay system will auto-sync transaction on their end by refunding the payment. This mechanism intended to sync up transaction status between Partner-Midtrans-Gopay to failure state. Partner can always refer to status on Midtrans, as the most accurate (and final) status. Partner may advise customer to re-check their Gopay balance periodically to ensure that their balance is refunded, as the refund can be instant or might take a while depends on Gopay internal process. If customers still does not receive any refund, Partner can email bizops[at]midtrans.com with following information: Order ID, Transaction date, Gross amount.

If the customer wish to proceed transaction, please create new transaction (and call API cancel to the previous transaction to avoid double transaction, if required).

> NOTE: **Do not** deliver good/service to customer, if transaction status on Midtrans is not `settlement`/success.

### Getting `deny` status on API response while attemtping to create Gopay transaction, what happened?

Pleas check the API response, it usually contains more reason of why transaction fail, for example

```text
...
"status_message":"GO-PAY transaction is rejected"
"transaction_status":"deny"
"channel_response_code":"900"
...
```

Some time `status_message` might already explain why it failed, then please check `channel_response_code` response code definition is explained here:
https://api-docs.midtrans.com/#go-pay-response-codes

In this example it means Gopay side returning `900` response code, which means intermittent service error. For the most case, it is retriable. There's temporary issue from Gopay at that time and please retry at later time.

### Server Key
Server key is unique for each merchant, please consult to Midtrans Business PIC to retrieve it.

## Reference

[Complete Core API documentation](https://api-docs.midtrans.com/)