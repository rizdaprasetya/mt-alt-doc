Basic integration process of Bank Transfer (Virtual Account) will be explained below.

?> Please make sure you have already done [creating your Midtrans Account](/en/midtrans_account/overview), before proceeding with this section.

One of the payment method offered by Midtrans is Bank Transfer. By using this payment method, customers will have the option to make a payment via bank transfer and Midtrans will send real time notification when the customer complete the payment.

At this moment, Midtrans has integrated with 4 different bank transfer payment methods:

1. BCA Virtual Account
2. BNI Virtual Account
3. Mandiri Bill Payment
4. Permata Virtual Account

## Integration Step
1. Send transaction data to API Charge.
2. Display virtual account number and expiry time.
3. Handling Post-Transaction.

<details>
<summary><b>Sequence Diagram</b></summary>
<article>
The overall Bank Tranfer end-to-end payment proccess can be illustrated in following sequence diagram:

![bank transfer sequence diagram](./../../asset/image/core_api-sequence_bank_transfer.png)
</article>
</details>

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

## 1. Send Transaction Data to API Charge
API request should be done from **Merchant’s backend** to acquire `va_number`. There are several components that are required:

Requirement | Description
--- | ---
Server Key | Explained on [previous section](/en/midtrans-account/overview.md)
`order_id` | Transaction order ID, defined from your side
`gross_amount` | Total amount of transaction, defined from your side
`payment_type` | Set Bank Transfer payment method

Charge API request should be done from Merchant's backend.

### Charge API request
This is example of basic `/charge` API request in Curl, please implement according to your backend language (you can also check our [available language libraries](/en/technical-reference/library-plugin.md)). The example below shows a sample codes to obtain transaction token:
<!-- tabs:start -->
#### **BCA**

```bash
# sample charge in CURL
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bank_transfer":{
      "bank": "bca"
  }
}'
```

#### **BNI**
```bash
# sample charge in CURL
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "bank_transfer",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
  "bank_transfer":{
      "bank": "bni"
  }
}'
```

#### **Mandiri Bill**
```bash
# sample charge in CURL
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "echannel",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```

#### **Permata**
```bash
# sample charge in CURL
curl -X POST \
  https://api.sandbox.midtrans.com/v2/charge \
  -H 'Accept: application/json' \
  -H 'Authorization: Basic <YOUR SERVER KEY ENCODED in Base64>' \
  -H 'Content-Type: application/json' \
  -d '{
  "payment_type": "permata",
  "transaction_details": {
      "order_id": "order-101",
      "gross_amount": 44000
  }
}'
```

<!-- tabs:end -->

?> **Optional:** You can customize [transaction_details](https://api-docs.midtrans.com/#json-object) data. To include data like customer_details, item_details, etc. It's recommended to send as much detail so on report/dashboard those information will be included.

### Charge API response
You will get the **API response** like the following.

<!-- tabs:start -->
#### **BCA**
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "be03df7d-2f97-4c8c-a53c-8959f1b67295",
    "order_id": "1571823229",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:33:49",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bca",
            "va_number": "812785002530231"
        }
    ],
    "fraud_status": "accept"
}
```
You will get the `va_numbers` attribute which can be performed this transaction.

#### **BNI**
```json
{
    "status_code": "201",
    "status_message": "Success, Bank Transfer transaction is created",
    "transaction_id": "2194a77c-a412-4fd8-8ec8-121ff64fbfee",
    "order_id": "1571823369",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:08",
    "transaction_status": "pending",
    "va_numbers": [
        {
            "bank": "bni",
            "va_number": "9888500212345678"
        }
    ],
    "fraud_status": "accept"
}
```
You will get the `va_numbers` attribute which can be performed this transaction.

#### **Mandiri Bill**
```json
{
    "status_code": "201",
    "status_message": "OK, Mandiri Bill transaction is successful",
    "transaction_id": "abb2d93f-dae3-4183-936d-4145423ad72f",
    "order_id": "1571823332",
    "merchant_id": "G812785002",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "echannel",
    "transaction_time": "2019-10-23 16:35:31",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "bill_key": "778347787706",
    "biller_code": "70012"
}
```
You will get the `bill_key` and `bill_code` attribute which can be performed this transaction.

#### **Permata**
```json
{
    "status_code": "201",
    "status_message": "Success, PERMATA VA transaction is successful",
    "transaction_id": "035ca76c-b814-4264-9e63-68142351df83",
    "order_id": "1571823410",
    "gross_amount": "44000.00",
    "currency": "IDR",
    "payment_type": "bank_transfer",
    "transaction_time": "2019-10-23 16:36:49",
    "transaction_status": "pending",
    "fraud_status": "accept",
    "permata_va_number": "850003072869607",
    "merchant_id": "G812785002"
}
```
You will get the `permata_va_number` attribute which can be performed this transaction.
<!-- tabs:end -->

## 2. Display Virtual Account Number and Expiry Time

To display the virtual account number, use the value of `va_number` retrieved from API response.

?> Read [here to simulate/test success payment](/en/technical-reference/sandbox-test.md#bank-transfer).

By default the expiry time for Bank Transfer / VA is **24 hours**, follow this link if you wanna customize the expiry time:
<div class="my-card">

#### [Set Custom Expiry &#187;](/en/core-api/advanced-features.md#custom-transaction-expiry)
</div>

## 3. Handling Post-Transaction

Other than customer being redirected, when the status of payment is updated/changed (i.e: payment has been successfully received), Midtrans will send **HTTP Notification** (or webhook) to your server's `Notification Url` (specified on Midtrans Dashboard, under menu **Settings > Configuration `Notification URL`**). Follow this link for more details:

<div class="my-card">

#### [Handling Webhook HTTP Notification &#187;](/en/after-payment/http-notification.md)
</div>

## Specify VA Number

Virtual Account number displayed to customer contains two parts. for example, in `{91012}{12435678}` , the first part is the company code and the second part is a unique code. The second part can be customized for **BCA**, **BNI** and **Permata** (Only supported for b2b transactions) payment types.

* Only digits are allowed.
* Different banks have different specs on their custom VA numbers. Please see the documentation on the respective banks.
* If the number provided is already utilized for another order, then a different unique number will be used instead.
* If the number provided is longer than required, then the unnecessary digits in the end will be trimmed.
* If the number provided is shorter than required, then the number will be prefixed with zeros.

By default Midtrans will randomize VA number used for bank transfer transaction. In some cases, you might want to specify/customize VA Number for Bank Transfer payment channels. You can do that with the following parameters.

Please add **bank_transfer** parameter during [API Request](/en/core-api/bank-transfer.md?id=charge-api-request)):
<!-- tabs:start -->
#### **BCA**
```json
...
  "bank_transfer":{
    "bank": "bca",
    "va_number": "12345678911",
    "sub_company_code": "00000" //NOTE: Don't use it if you don't know
  }
...
```

#### **BNI**
```json
...
  "bank_transfer":{
    "bank": "bni",
    "va_number": "12345678"
  }
...
```

#### **Permata**
```json
...
  "bank_transfer":{
    "bank": "permata",
    "va_number": "1234567890"
  }
...
```
<!-- tabs:end -->

Parameter | Type | Required? | Description
--- | --- | --- | ---
BCA `va_number`| String | (optional) | Length should be within 1 to 11.
BCA `sub_company_code` | String | (optional) | BCA sub company code directed for this transactions. <br>NOTE: Don't use it if you don't know.
Permata `va_number` | String | (optional) | Length should be 10. Only supported for b2b VA type.
BNI `va_number` | String | (optional)| Length should be within 1 to 8.

?> On Production mode, not all Bank support custom VA number, it depends on the agreement, please consult with Midtrans Activation team for further info.

## Description

`transaction_status` value description for Bank Transfer transaction:

| Transaction Status | Description |
| ------------------ | ----------- |
| `settlement` | Transaction successful, customer has been completed the transaction. |
| `pending` | The transaction has successfully created but has not been completed by the customer. |
| `expire` | Transaction failure because customer did not complete the payment within allowed time. |
| `cancel` | Transaction is canceled by trigger from Merchant. |
| `deny` | The bank rejected the transaction. |

Link: [*More detailed definition of transaction_status*](https://api-docs.midtrans.com/#transaction-status)

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

For more detail: [Complete Core API documentation](https://api-docs.midtrans.com/)