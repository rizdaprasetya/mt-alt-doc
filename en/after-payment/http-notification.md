# HTTP(S) Notification / Webhooks
<hr>

HTTP(S) POST notifications or Webhooks are sent to your server when the customer completes the payment process or when transaction status changes. These notifications help you to update payment status or take suitable actions in real-time.

Midtrans HTTP(S) POST Notification can be configured by configuring the *Payment Notification URL* from SETTINGS on *Dashboard*. URL protocol prefix (`https://` or `http://`) are required. We recommend using `https://` for security purposes.

## Configuring HTTP Notifications On MAP

To receive notifications of transactions, HTTP notifications are configured as explained in the steps given below.

1. Login to your MAP account.

2. On the Home page, go to **SETTINGS > CONFIGURATION**.

   *Redirect Settings* page is displayed.

3. Enter Required fields.

4. Click **Update**.

   <img src="./../../asset/image/after-payment_http_notification_redirect_settings.png" alt="HTTP Notification Configuration" style="zoom:50%;" />

   A confirmation message is displayed. 

   > ***Note***: URL protocol prefix `https://` or `http://` are required. We highly recommended to use `https://` for security purposes.

   The table given below describes the fields that can be configured from the Merchant Administrative Portal (MAP).

| Field                      | Description                                                  |
| -------------------------- | ------------------------------------------------------------ |
| Payment Notification URL   | The URL to which notification is to be sent when a payment is made by a customer. |
| Recurring Notification URL | The URL to which notification is to be sent when a payment recurs. |
| Finish Redirect URL        | The URL to which the customer is redirected when a transaction is finished. |
| Unfinished Redirect URL    | The URL to which the notifications are sent when a transaction is unfinished or if the customer clicks *Back* to order. |
| Error Redirect URL         | The URL to which the notifications are sent when an error occurs during payment or if the payment is unsuccessful. |

!> Make sure that the Notification URL can be reached from Public Internet**. Midtrans **cannot send notifications to localhost, URL protected with authorization or password, URL behind VPN, unusual destination port, and so on. You can then utilize *signature_key* or method that is explained below as security measures.

?> **Tips**: If you are still running/developing your notification handler on localhost, you can utilize the services (such as [Ngrok](https://ngrok.com/), [Serveo](http://serveo.net/), [Localhost.Run](http://localhost.run/), and so on) to expose your localhost server to public Internet. Once you have obtained the Internet accessible URL, you can add it to the *Notification URL* field on *Dashboard*. For more information, refer to [Configuring Email Notification](./../dashboard-usage.md/#Configuring Email Notification).

## Sending HTTP Notifications to URL

### Endpoint

| Method | URL                                                    |
| ------ | ------------------------------------------------------ |
| POST   | https://tokoecommerc.com/payment-notification-handler/ |

 This sends the transaction notifications to the URLs.

### Header

| Header Name  | Description                            | Values           |
| ------------ | -------------------------------------- | ---------------- |
| Accept       | The format of the data to be returned. | application/json |
| Content-Type | Format of the data to be posted.       | application/json |

### POST Body 

| Element                  | Description                                                  | Type   | Notes                                                        |
| ------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| transaction_time         | Time at which the transaction happened.                      | String | –                                                            |
| transaction_status       | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](#Transaction Status). |
| transaction_id           | The transaction id of the specific transaction.              | String | –                                                            |
| status_message           | The status message.                                          | String | –                                                            |
| status_code              | The transaction status code.                                 | String | –                                                            |
| signature_key            | The Signature Key.                                           | String | This is a very important data that informs you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| payment_type             | The type of payment method used.                             | String | –                                                            |
| order_id                 | The order id of the transaction.                             | String | –                                                            |
| merchant_id              | Your merchant ID.                                            | String | –                                                            |
| masked_card              | The first six-digit and last four-digit of customer's credit card number. | String | –                                                            |
| gross_amount             | Total amount for which the transaction was done.             | String | –                                                            |
| fraud_status             | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| eci                      | The 3D secure ECI code for a card transaction.               | String | –                                                            |
| currency                 | The unit of currency used for the transaction.               | String | –                                                            |
| channel_response_message | The response from payment channel.                           | String | –                                                            |
| channel_response_code    | The response code from the payment channel.                  | String | –                                                            |
| card_type                | The type of card used for the transaction.                   | String | Possible values are Credit, Debit.                           |
| bank                     | Name of the bank through which the transaction was processed. | String | –                                                            |
| approval_code            | The approval code from the bank.                             | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied. |

### Sample Request

Some examples of sample requests are given below.

<details>
<summary><b>Sample Request in CURL</b></summary>
<article>


#### CURL

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

#### </article>

</details>

### Sample Request on Different Payment Channels

Some sample HTTP notifications for a successful transaction on different payment channels are given below.

<!-- TODO: Update the notification sample with actual test result-->

<!-- tabs:start -->

#### **Card**

#### POST Body 

| Element                  | Description                                                  | Type   | Notes                                                        |
| ------------------------ | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| transaction_time         | Time at which the transaction happened.                      | String | –                                                            |
| transaction_status       | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](#Transaction Status). |
| transaction_id           | The transaction id of the specific transaction.              | String | –                                                            |
| status_message           | The status message.                                          | String | –                                                            |
| status_code              | The transaction status code.                                 | String | –                                                            |
| signature_key            | The Signature Key.                                           | String | This is a very important data that informs you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| payment_type             | The type of payment method used.                             | String | –                                                            |
| order_id                 | The order id of the transaction.                             | String | –                                                            |
| merchant_id              | Your merchant ID.                                            | String | –                                                            |
| masked_card              | The first six-digit and last four-digit of customer's credit card number. | String | –                                                            |
| gross_amount             | Total amount for which the transaction was done.             | String | –                                                            |
| fraud_status             | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| eci                      | The 3D secure ECI code for a card transaction.               | String | –                                                            |
| currency                 | The unit of currency used for the transaction.               | String | –                                                            |
| channel_response_message | The response from payment channel.                           | String | –                                                            |
| channel_response_code    | The response code from the payment channel.                  | String | –                                                            |
| card_type                | The type of card used for the transaction.                   | String | Possible values are Credit, Debit.                           |
| bank                     | Name of the bank through which the transaction was processed. | String | –                                                            |
| approval_code            | The approval code from the bank.                             | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| permata_va_number  | The Permata VA number.                           | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| :----------------- | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| bank               | The name of the bank.                            | String | –                                                            |
| va_number          | The virtual account number.                      | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| status_message     | The status message.                              | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| bill_key           | The bill key number.                             | String | –                                                            |
| biller_code        | The code for the biller.                         | String | –                                                            |

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

#### POST Body 

| Element            | Description                                                  | Type   | Notes                                                        |
| :----------------- | ------------------------------------------------------------ | ------ | ------------------------------------------------------------ |
| bank               | Name of the bank.                                            | String | –                                                            |
| va_number          | VA number.                                                   | String | –                                                            |
| payment_amounts    | Payment details such as the amount paid and the time of payment. | String | It is in the format, *YYYY-MM-DD* *HH:MM:SS.*                |
| paid_at            | The time and date at which the payment was done.            | String | –                                                            |
| amount             | The amount paid.                                             | String | –                                                            |
| transaction_time   | Time at which the transaction happened.                      | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done.             | String | –                                                            |
| order_id           | The order id of the transaction.                             | String | –                                                            |
| payment_type       | The type of payment method used.                             | String | –                                                            |
| signature_key      | The Signature Key.                                           | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                                 | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.              | String | –                                                            |
| transaction_status | The transaction status of the transaction.                   | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.                         | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| bank               | Name of the bank through which the transaction was processed. | String | –                                                            |
| status_message     | The status message.                                          | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| status_message     | The status message.                              | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |

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

#### POST Body

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| status_message     | The status message.                              | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied. |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| payment_code       | 14 digit payment code.                           | String | –                                                            |
| store              | Name of the store.                               | String | –                                                            |

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

#### POST Body

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| status_code        | The transaction status code.                     | String | –                                                            |
| status_message     | The status message.                              | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| transaction_time   | The time of transaction with date.               | String | It is in the format, YYYY-MM-DD HH:MM:SS.                    |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied. |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| payment_code       | 14 digit payment code.                           | String | –                                                            |
| store              | Name of the store.                               | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| status_message     | The status message.                              | String | –                                                            |

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

#### POST Body 

| Element            | Description                                      | Type   | Notes                                                        |
| ------------------ | ------------------------------------------------ | ------ | ------------------------------------------------------------ |
| approval_code      | The approval code from the bank.                 | String | This can be used to refund a transaction. *approval_code* does not exist on transactions with transaction status: Denied |
| merchant_id        | Your merchant ID.                                | String | –                                                            |
| transaction_time   | Time at which the transaction happened.          | String | –                                                            |
| gross_amount       | Total amount for which the transaction was done. | String | –                                                            |
| order_id           | The order id of the transaction.                 | String | –                                                            |
| payment_type       | The type of payment method used.                 | String | –                                                            |
| signature_key      | The Signature Key.                               | String | This is a very important data that tells you that the notification is sent from Midtrans. For more details, refer to [Verifying Authenticity of Notification](#Verifying Authenticity of Notification). |
| status_code        | The transaction status code.                     | String | –                                                            |
| transaction_id     | The transaction id of the specific transaction.  | String | –                                                            |
| transaction_status | The transaction status of the transaction.       | String | For more details, refer to [Transaction Status](#Transaction Status). |
| fraud_status       | The fraud status of the transaction.             | String | For more details, refer to [Fraud Status](#Fraud Status).    |
| status_message     | The status message.                              | String | –                                                            |

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

?> It's recommended to check the `transaction_status` as reference of the most accurate transaction status. Transaction can be considered **success** if `transaction_status` value is *settlement* (or *capture* in case of card transaction) **and** `fraud_status` value is *accept*. Then you are safe to deliver good/service to customer.

### Status Definition

<!-- tabs:start -->

#### **Transaction Status**

Transaction Status | Description 
--- | ---
`capture` | Transaction is successful and card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your parner bank. Then the  transaction status changes to  *settlement*. <br/>It is safe to assume a successful payment. 
`settlement` | The transaction is successfully settled. Funds have been credited to your account. 
`pending` | The transaction is created and is waiting to be paid by the customer at the payment providers like Direct debit, Bank Transfer, E-wallets, and so on. 
`deny` | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for the denied transaction, see the `status_message` in the response. 
`cancel` | The transaction is canceled. It can be triggered by you.<br/> You can trigger *Cancel* status in the following cases:<br/> 1. If you cancel the transaction after *Capture* status.<br/> 2. If you deny a transaction after *Challenge* status.<br/>Midtrans can Cancel transactions in cases of fraud. 
`expire` | Transaction is not available for processing, because the payment was delayed. 
`refund` | Transaction is marked to be refunded. Refund status is triggered by you. 

#### **Fraud Status**

Fraud Status | Description 
--- | ---
`accept` | Transaction is safe to proceed. It is not considered as a fraud. 
`deny` | Transaction is considered as fraud. It is denied by Midtrans. 
`challenge` | Transaction is flagged as potential fraud, but cannot be determined precisely. <br/>You can *Accept* or *Deny* the transaction from MAP account or using [Approve Transaction API](https://api-docs.midtrans.com/#approve-transaction) or [Deny Transaction API](https://api-docs.midtrans.com/#deny-transaction).<br/>If no action is taken, the transaction is denied automatically. 
<!-- tabs:end -->

#### Notes When Using Snap API
<br>


When a transaction is created on Snap API, it does not immediately assign any payment status on*Core API* *GET Status* response. 

Even if the payment page is activated on Snap API, you might encounter *404* or *Payment not found* response while calling *Core API GET Status*.

This is because the customer is yet to choose any payment method within the Snap payment page. Once the customer chooses and proceeds with a payment method, then the transaction status will be assigned and available on *Core API GET Status*.

</article>
</details>

### Verifying Notification Authenticity

To ensure the integrity of the notifications and the content, it is recommended to verify the notification using one of the following mechanisms.

<!-- tabs:start -->
#### **Verifying Signature Key**

In the notification response body, Midtrans provides `signature_key` which is generated by appending `order_id`, `status_code`, `gross_amount`, and `ServerKey` into a string. *ServerKey* is confidential information known only to Midtrans and you. Thus, you can verify the `signature_key` to ensure that the notification is signed by Midtrans.

The logic to generate or calculate signature_key is explained below:

```
SHA512(order_id+status_code+gross_amount+ServerKey)
```

> It basically means append the value of `order_id`,`status_code`,`gross_amount`,`ServerKey` into one string, then use it as input to SHA512 hash function. Then the output should match with `signature_key` from notification.

Try out *signature_key* calculation using the tool given below.


<details>
<summary><b>Signature Key Calculator</b></summary>
<article>

[Signature Key Calculator](https://jsfiddle.net/5amr8cov/6/embedded/result,html/dark ':include :type=iframe width=100% height=800px')
</article>
</details>
<br>

#### Verify Using GET Status API Call

You can verify authenticity using the [GET status API Request](/en/after-payment/get-status.md). This means the request is directly responded by Midtrans. The JSON response will be the same as the notification status. This process of verification is illustrated below.

![Verify Notification Diagram](./../../asset/image/after-payment-notif-diag.png)
<!-- tabs:end -->

?> **Tips**: Official Midtrans language library will perform "Verify Directly to Midtrans API" mechanism automatically within the built in `notification` function. As well as official Midtrans CMS plugin.

### Response

To confirm that you received the notification, your notification URL or backend must respond to the HTTP notification with HTTP `status code: 200`. On most backend or web frameworks you can achieve that by printing a string similar to *OK*. This will automatically sends HTTP `status code: 200` to Midtrans. 

### Status Codes and Errors

The table given below describes the status codes and errors.

| Code        | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| 2XX         | No retries, it is considered successful.                     |
| 500         | Retry only *once*.                                           |
| 503         | Retry *four* times.                                          |
| 400/404     | Retry *two* times.                                           |
| 301/302/303 | No retries. Update notification endpoint in SETTINGS menu, instead of replying to these status codes. |
| 307/308     | Follow the new URL with POST method and the same notification body. Maximum number of redirect is five times. |
| Other       | Retry five times.                                            |

### Best Practice to Handle Notification

<br>

<details>
<summary><b>Best Practices</b></summary>
<article>


- Always use an HTTPS endpoint. It is secure and there cannot be Man-in-the-Middle (MITM) attacks because we validate the certificates match with the hosts. Also do not use self signed certificates.
- Use standard port (80/443) for notification callback URL.
- Always implement notification in an idempotent way. In extremely rare cases, we may send multiple notifications for the same transaction event. It should not cause duplicate entries at your end, The simple way of achieving this is to use *order_id* as the key to track the entries.
- Always check the signature hash of the notification, This will confirm that the notification was actually sent by Midtrans, because we encode the *Server Key*. Nobody else can build this signature hash.
- Always check the following three fields for confirming success transactions:
	- `status_code`: Should be 200 for successful transactions
	- `fraud_status`: ACCEPT
	- `transaction_status` : *settlement* or *capture*
- We strive to send the notification immediately after the transaction has occurred. In extremely rare cases, it may be delayed because of transaction spikes. If you have not received a notification, please use the *GET Status API* to check for current status of the transaction.
- It is safe to call *GET Status API* to get the latest status of a transaction or an order.
- The HTTP timeout is configured for 15 seconds. Please respond as soon as possible, ideally, within 5 seconds, to reduce the load on Midtrans' infrastructure. 
- In extremely rare cases we may send the HTTP notifications out of order - a `settlement` status for a notification before the notification for `pending` status. It's important that such later notifications are ignored. Here's the state transition diagram that you could use. But it is recommended to use *GET Status API* to confirm the actual status.
- We send the notification body as JSON, please parse the JSON with a JSON parser. Always expect new fields will be added to the notification body, so parse it in a non strict format. This prevents the parser from throwing an exception for new fields. It should gracefully ignore the new fields. This allows us to extend our notification system for newer use cases without breaking old clients.
- Always use the right HTTP Status code for responding to the notifications. 
- we handle retry for error cases differently based on the status code.
	- for `2xx`: No retries, it is considered success
	- for `500`: Retry only once
	- for `503`: Retry 4 times
	- for `400/404`: Retry 2 times
	- for `301/302/303`: No retries. We suggest the notification endpoint should be update in setting instead of reply these status code.
	- for `307/308`: Follow the new URL with POST method and same notification body. Max redirect is 5 times
	- for all other failures: Retry 5 times
- We do retry at most 5 times with following policy.
- Different retry intervals are:

  - First time - two minutes
  - Second time - ten minutes
  - Third time - 30 minutes (0.5 hours)
  - Fourth time - 90 minutes (1.5 hours)
  - Fifth time - 210 minutes (3.5 hours)
- Put a random time shift for each time retry base on above interval. For example, the first time retry might be 33s (at most 2m) after the job failed.
</article>
</details>

### Receiving HTTP Notifications

Some sample codes to receive HTTP(S) POST and JSON object by utilizing **Midtrans Official Library** are given below. Assume that this code will be executed when the notification URL endpoint (https://tokoecomm.com/notification) is accessed.

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

### Customizing Notification URL via API
<br>
<details>
<summary><b>Customize Notification URL via API</b></summary>
<article>

You can add custom notification URLs on each transaction. It can be achieved by adding additional HTTP(s) headers on the API request.

### Endpoint

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| POST   | https://app.sandbox.midtrans.com/snap/v1/transactions |

This is used to add or change the notification URL.

### Headers

| Header Name             | Description                                                  | Required | Values            | Notes                                                        |
| ----------------------- | ------------------------------------------------------------ | -------- | ----------------- | ------------------------------------------------------------ |
| Accept                  | The format of the data to be returned.                       | Required | application/json  | –                                                            |
| Content-Type            | The format of the data to be posted                          | Required | application/json  | –                                                            |
| Authorization           | The authentication method used to access the resource        | Required | Basic AUTH_STRING | –                                                            |
| X-Append-Notification   | New notification URL(S) can be added with the settings on dashboard | Optional | URL               | It can receive a maximum of 2 URLs, separated by comma (,). For more details, refer to the table given below. |
| X-Override-Notification | New notification URL(S) can be added ignoring the settings on dashboard | Optional | URL               | It can receive a maximum of 2 URLs, separated by comma (,). For more details, refer to the table given below. |

?> **AUTH_STRING**: Base64(*ServerKey* + : )

?> Midtrans API validates HTTP requests using the Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by a colon (**:**). For more information, refer to [ API Authorisation and Headers](https://docs.midtrans.com/en/technical-reference/api-header).

The following table describes the header and the change in URL settings, using examples.

| Initial Notification URL | Header                                                       | Final Notification URL                                       |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| https://example.com      | X-Append-Notification: https://example.com/test1,https://example.com/test2 | https://example.com ,       <br>  https://example.com/test1, and<br>  https://example.com/test2 |
| https://example.com`     | X-Override-Notification: https://example.com/test1,https://example.com/test2 | https://example.com/test1 and<br> https://example.com/test2  |

</article>
</details>

### POST Body 

| Element      | Description                     | Type    | Required |
| ------------ | ------------------------------- | ------- | -------- |
| order_id     | The order_id of the transaction | String  | Required |
| gross_amount | The total amount of transaction | Integer | Required |

### Sample Request

<!-- tabs:start -->

#### **CURL**

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

#### **Java**

```Java
OkHttpClient client = new OkHttpClient().newBuilder()
  .build();
MediaType mediaType = MediaType.parse("application/json");
RequestBody body = RequestBody.create(mediaType, "{\n    \"transaction_details\": {\n        \"order_id\": \"YOUR-ORDERID-123456\",\n        \"gross_amount\": 10000\n    }\n}");
Request request = new Request.Builder()
  .url("https://app.sandbox.midtrans.com/snap/v1/transactions")
  .method("POST", body)
  .addHeader("Accept", "application/json")
  .addHeader("Authorization", "Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87")
  .addHeader("Content-Type", "application/json")
  .addHeader("X-Override-Notification", "https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2")
  .build();
Response response = client.newCall(request).execute();
```

#### PHP

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://app.sandbox.midtrans.com/snap/v1/transactions",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS =>"{\n    \"transaction_details\": {\n        \"order_id\": \"YOUR-ORDERID-123456\",\n        \"gross_amount\": 10000\n    }\n}",
  CURLOPT_HTTPHEADER => array(
    "Accept: application/json",
    "Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87",
    "Content-Type: application/json",
    "X-Override-Notification: https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2"
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
```

#### **Python**

```Python
import requests

url = "https://app.sandbox.midtrans.com/snap/v1/transactions"

payload = "{\n    \"transaction_details\": {\n        \"order_id\": \"YOUR-ORDERID-123456\",\n        \"gross_amount\": 10000\n    }\n}"
headers = {
  'Accept': 'application/json',
  'Authorization': 'Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87',
  'Content-Type': 'application/json',
  'X-Override-Notification': 'https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2'
}

response = requests.request("POST", url, headers=headers, data = payload)

print(response.text.encode('utf8'))
```

#### **Ruby**

```Ruby
require "uri"
require "net/http"

url = URI("https://app.sandbox.midtrans.com/snap/v1/transactions")

https = Net::HTTP.new(url.host, url.port);
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Accept"] = "application/json"
request["Authorization"] = "Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87"
request["Content-Type"] = "application/json"
request["X-Override-Notification"] = "https://tokoecomm.com/notif-handler-1,https://myweb.com/notif-handler-2"
request.body = "{\n    \"transaction_details\": {\n        \"order_id\": \"YOUR-ORDERID-123456\",\n        \"gross_amount\": 10000\n    }\n}"

response = https.request(request)
puts response.read_body

```

<!-- tabs:end -->

### Response

| Element      | Description                                                  | Type   |
| ------------ | ------------------------------------------------------------ | ------ |
| Token        | It is the Snap transaction token used as a transaction identifier to open the Snap popup on the frontend. | String |
| Redirect_url | It is the URL specified by you, to which the notification has to be sent. | String |

### Sample Response

```curl
{
    "token": "2632d3f9-3038-4605-8763-c9a82d100a61",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/vtweb/2632d3f9-3038-4605-8763-c9a82d100a61"
}
```

### Status Codes and Errors

| Code | Description                             | Notes                         |
| ---- | --------------------------------------- | ----------------------------- |
| 201  | The new notification URL is configured. | –                             |
| 400  | The transaction_details are missing.    | –                             |
| 401  | Authentication failure                  | Check authentication details. |
| 500  | Internal system error occurred          | You can try again later.      |

### Viewing Notification History

In some cases you might want to know if HTTP notification is successfully sent to your notification URL or backend server.

To audit if notification is sent, and if it sent successfully or not, follow the steps given below.

1. Login to your MAP account. 

2. On the Home page, go to **SETTINGS > CONFIGURATION**.

   *Configuration* page is displayed.

3. Click **See History**.

   ![HTTP Notification Configuration](./../../asset/image/after-payment-http-notification-see-history.png)

   *HTTP Notification History* page is displayed.

   ![HTTP Notification Configuration](./../../asset/image/after-payment-http-notifications-history-page.png)

   

   You can view HTTP notification as well as email notification records for each Order ID. You can check if notifications are successfully sent or not. 



#### Searching for Notifications History

To search for the notifications in the *HTTP Notification History* page, follow the steps given below.

1. Login to your MAP account.

2. On the Home page, go to **SETTINGS > CONFIGURATION**.     

   *Configuration* page is displayed.

3. Click **See History**.

   ![HTTP Notification Configuration](./../../asset/image/after-payment-http-notification-see-history.png)

   *HTTP Notification History* page is displayed.

4. Enter the **Time** or **Order ID**.

5. Select **Status** from the drop-down list.

6. Select the **Kind** of notification from drop-down list.

7. Click **Search**.

   ![HTTP Notification Configuration](./../../asset/image/after-payment-http-notification-history-search.png)

   The search results are displayed.

   ![HTTP Notification Configuration](./../../asset/image/after-payment-http-notification-history-search-results.png)

> ***Notes***:
>
> - If notification fails to be sent,  your notification URL might be rejecting the HTTP notification delivery. Please check your notification URL implementation on your backend server. For more information, refer to [Best Practices](#Best Practices).
> - If you find that the notification has been sent, but your server wasn't able to change the payment status on your backend, it might be because of an issue in the implementation on your backend server.
> - If you face any delays or issues in receiving HTTP Notifications, use [Get Status API](/en/after-payment/get-status).

</article>
</details>

### Delayed or Missed Notification 

Although Midtrans strives for its best to keep notification service reliable, there may be some exceptional cases that can cause failure in sending notification from Midtrans or failure in receiving from merchant side.

This can happen due to cases such as delay, network/infra issues, unexpected downtime, vendor/service disruption, and so on. In this exceptional case, use [Get Status API call](/en/after-payment/get-status).

You can make [GET Status API call](https://docs.midtrans.com/en/after-payment/get-status), in any of the following scenarios:

- Notifications are not received within the defined time (24 hours, 12 hours, and so on).
- Before a transaction is considered as failure/canceled on your side.
- Your operations team wants to reconcile status.
- Funds are deducted from the customer but the transaction status is not updated to *success*.

Please make sure to check if the notification issue is not from your end. For more information, please refer to the [Best Practices to Handle Notification](#Best Practices) and [View Notification History](#View Notification History) sections explained earlier.
