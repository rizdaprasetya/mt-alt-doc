# API Get Status

Merchant can also request to Midtrans API to inquire transaction status of a transaction, using the transaction `order_id` (or `transaction_id`) as identifier.


#### Request Details
Type | Value
--- | ---
HTTP Method | `GET`
API endpoint | `https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status`

#### HTTP Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Snap validates HTTP request by using Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by **:** (colon symbol).

### Sample Get Status Request

Replace the `[ORDER_ID]` with the transaction `order_id` (or `transaction_id` is also supported).

```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```
?> Each of official Midtrans Library will also have `status` function to call Get Status API.

### Sample Response

#### Success Response

```javascript
{
  "masked_card": "481111-1114",
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
  "card_type": "credit"
}
```

#### Fail / Not Found Response
```javascript
{
  "status_code": "404",
  "status_message": "The requested resource is not found"
}
```

#### Definition

The same [status definition with notification](/en/after-payment/http-notification?id=status-definition) applies.