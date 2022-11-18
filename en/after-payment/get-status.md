# GET Status API Requests
<hr>

To get the status of a transaction, you can send a request to Midtrans API. It will then send back the transaction status. This method requires the transaction `order_id` (or `transaction_id`) as an identifier.

## Endpoint

| Method | URL                                                   |
| ------ | ----------------------------------------------------- |
| GET    | https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status |

 This retrieves the transaction details for a specified *ORDER_ID*.

## Path Parameters

 Parameters | Description                                          
--- | ---
 ORDER_ID   | The order id or transaction id of the transaction you want to look up. 

?> Note: You can also replace `order_id` used in API urls with `transaction_id`, which uniquely generated from Midtrans side and you received as response when creating transaction, and from HTTP Notification. This is useful if your `order_id` contains unusual character (such as `#`) that may result in an invalid URL pattern.

## HTTP Headers

```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64Encode(`"YourServerKey"+":"`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your **Server Key** while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](/en/technical-reference/api-header.md).

<!-- TODO: add more language examples to the sample request -->
## Sample Request

<!-- tabs:start -->

#### **Curl**

```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

In the above request, replace `[ORDER_ID]` with your Order ID or Transaction ID.

<!-- tabs:end -->

?> Each of the official [Midtrans Language Library](/en/technical-reference/library-plugin.md) has *status* function to call Get Status API.

## Sample Response

The sample response from `[ORDER_ID]/status` endpoint is shown below.

```json
{
  "masked_card": "48111111-1114",
  "approval_code": "1578569243927",
  "bank": "bni",
  "eci": "05",
  "channel_response_code": "00",
  "channel_response_message": "Approved",
  "transaction_time": "2020-01-09 18:27:19",
  "gross_amount": "10000.00",
  "currency": "IDR",
  "order_id": "Postman-1578568851",
  "payment_type": "credit_card",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "status_code": "200",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "settlement_time": "2020-01-10 16:15:31",
  "status_message": "Success, transaction is found",
  "merchant_id": "M004123",
  "card_type": "credit",
  "three_ds_version": "2",
  "challenge_completion": true
}
```
?> Please note that this is **only a sample response**, to let you know the general idea of this API action. Please expect that the actual API response may have **slight variations (more/less JSON fields), depending on conditions** (like different payment methods will have different fields, etc.). In the future, Midtrans can also add new JSON fields to enhance this API with more useful information.

The table given below describes elements in the response.

| Element                  | Description                                                  | Type   |
| ------------------------ | ------------------------------------------------------------ | ------ |
| approval_code            | The approval code for the transaction.                       | String |
| bank                     | Name of the bank through which the transaction was done.     | String |
| card_type                | The type of card used for the transaction.                   | String |
| three_ds_version         | The version of 3DS used for the transaction, for Card payment. Example values `"1"` or `"2"` | String |
| challenge_completion     | Whether the 3DS 2 challenge input was completed by customer, for Card payment. Example values `true` or `false`. Field may not exist if 3DS 2  challenge input was not prompted. | Boolean |
| channel_response_code    | The response code from the payment channel.                  | String |
| channel_response_message | The response message from the payment channel is specified.  | String |
| currency                 | The type of currency in which the transaction was done is shown here. | String |
| eci                      | The 3D secure ECI Code for card transaction                  | String |
| fraud_status             | The fraud status indicates if the transaction was flagged by the Fraud detection system. For more information, refer to [Fraud Status](/en/after-payment/http-notification.md#status-definition). | String |
| gross_amount             | The total amount of transaction for the specific order.      | String |
| merchant_id              | The merchant ID is shown here.                               | String |
| masked_card              | The first six-digit and last four-digit of customer's credit card number | String |
| order_id                 | The specific *Order ID*.                                     | String |
| payment_type             | The type of payment used by the customer for the transaction. | String |
| settlement_time          | The date and time of settlement of the transaction. The date is in `YYYY-MM-DD` form and the time is in `HH:MM:SS` form. The time zone is (GMT+7). | String |
| signature_key            | This is generated by appending `order_id`, `status_code`, `gross_amount`, and *Server Key* into a string | String |
| status_code              | This is the status of the API call. For more information, refer to [Status Codes and Error](#status-codes-and-errors). | String |
| status_message           | The status message is shown here.                            | String |
| transaction_id           | The specific *Transaction ID*.                               | String |
| transaction_status       | The status of the transaction. For more information, refer to [Transaction Status](/en/after-payment/http-notification.md#status-definition). | String |
| transaction_time         | The date and time of the transaction. The date is in YYYY-MM-DD form and the time is in HH:MM:SS form. The time zone is (GMT+7) | String |

## Status Codes and Errors

| Status Code | Message                              |
| ----------- | ------------------------------------ |
| 400         | Missing or invalid data.             |
| 401         | Authentication error.                |
| 404         | The requested resource is not found. |

## Sample Error Response

 Sample error response is given below.

```json
{
  "status_code": "404",
  "status_message": "The requested resource is not found"
}
```

## Transaction Status

The following table describes the transaction status.

Transaction Status | Fund Received | Description 
--- | --- | ---
`capture` | ✅ | Transaction is successful and card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the same day or the next day or within your agreed settlement time with your partner bank. Then the  transaction status changes to  *settlement*. <br/>It is safe to assume a successful payment. 
`settlement` | ✅ | The transaction is successfully settled. Funds have been credited to your account. 
`pending` | 🕒 | The transaction is created and is waiting to be paid by the customer at the payment providers like Direct debit, Bank Transfer, E-money, and so on. For card payment method: waiting for customer to complete (and card issuer to validate) 3DS/OTP process.
`deny` | ❌ | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for the denied transaction, see the `status_message` in the response. 
`cancel` | ❌ | The transaction is canceled. It can be triggered by merchant.<br/> You can trigger *Cancel* status in the following cases:<br/> 1. If you cancel the transaction after *Capture* status.<br/> 2. If you deny a transaction after *Challenge* status.<br/>If you fail to respond to a transaction with *Challenge* status within one day, it is automatically canceled by Midtrans. 
`expire` | ❌ | Transaction is not available for processing, because the payment was delayed. 
`refund` | ↩️ | Transaction is marked to be refunded. Refund status can be triggered by merchant. 
`partial_refund` | ↩️ | Transaction is marked to be refunded partially (if you choose to refund in amount less than the paid amount). Refund status can be triggered by merchant. 
`authorize` | 🕒 | Only available specifically only if you are using pre-authorize feature for card transactions (an advanced feature that you will not have by default, so in most cases are safe to ignore). Transaction is successful and card balance is reserved (authorized) successfully. You can later perform API “capture” to change it into `capture`, or if no action is taken will be auto released. Depending on your business use case, you may assume `authorize` status as a successful transaction.

## Fraud Status

The following table describes the fraud status.

Fraud Status | Fund Received | Description 
--- | --- | ---
`accept` | ✅ | Transaction is safe to proceed. It is not considered as a fraud. 
`deny` | ❌ | Transaction is considered as fraud. It is rejected by Midtrans FDS. FDS rejected transaction usually will not result in transaction_status: pending, capture, settlement.
`challenge` | ⚠️ | Transaction is flagged as potential fraud, but cannot be determined precisely. <br/>You can *Accept* or *Deny* the transaction from MAP account or using [Approve Transaction API](https://api-docs.midtrans.com/#approve-transaction) or [Deny Transaction API](https://api-docs.midtrans.com/#deny-transaction).<br/>If no action is taken, the transaction is denied automatically. 



The same [status definition with notification](/en/after-payment/http-notification.md#status-definition) applies.

## Refund Details
When a payment transaction has any recorded refund history, the response of get-status API will also return the refund status details. For example:

```json
{
  ...
  "refunds": [
    {
      "refund_chargeback_id": 183700,
      "refund_chargeback_uuid": "21a2b0a9-a2a2-4ab1-8758-ae0477458f21",
      "refund_amount": "10000.00",
      "created_at": "2022-08-23 11:16:16",
      "reason": "Refund reason is defined by merchant when attempting the refund request",
      "refund_key": "2358b552-3e22-4611-8b92-956223d1c03f",
      "refund_method": "online",
      "bank_confirmed_at": "2022-08-23 11:16:16"
    },
    {
      "refund_chargeback_id": 183701,
      "refund_chargeback_uuid": "b1adbe80-84de-4aae-b567-9f5eba7c0414",
      "refund_amount": "15000.00",
      "created_at": "2022-08-23 11:16:21",
      "reason": "Refund reason is defined by merchant when attempting the refund request",
      "refund_key": "32705cff-8907-4f09-a712-1bcea6dafea2",
      "refund_method": "online",
      "bank_confirmed_at": "2022-08-23 11:16:21"
    }
  ],
  "refund_amount": "25000.00"
  ...
}
```

Notable info:
- Each unique refund attempt will be on its own `refund` object inside the `refunds` array.
- Total refund amount will be available as `refund_amount`.
- If you previously attempted to refund, then the attempt is shown on the get-status API response, it means Midtrans and/or Payment Provider has already acknowledged the refund request.
 - But if it’s not listed, it means your refund request has not been acknowledged, you can retry the refund request.


## Other API Action / Method

Other API actions that you can perform to an transaction are listed in this section:

<div class="my-card">

#### [API Action / Method](/en/after-payment/status-cycle.md#api-action-method)
</div>