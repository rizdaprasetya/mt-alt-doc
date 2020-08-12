# Snap Advanced Features
<hr>

<!-- TODO:add sample code for lang other than CURL? -->
Snap have various optional parameters that can be utilized for more advanced use case that can help your integration.

## General

### Recommended Params
It's recommended to send as much detail so on report/dashboard those information will be included.

You can customize `transaction_details` data. To include data like `customer_details`, `item_details`. 

Below are the recommended JSON params for general use (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}
```

#### **As CURL**

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "credit_card": {
    "secure": true
  },
  "item_details": [
    {
      "id": "a01",
      "price": 7000,
      "quantity": 1,
      "name": "Apple"
    },
    {
      "id": "b02",
      "price": 3000,
      "quantity": 2,
      "name": "Orange"
    }
  ],
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789",
    "billing_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "08123456789",
      "address": "Sudirman No.12",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    },
    "shipping_address": {
      "first_name": "Budi",
      "last_name": "Susanto",
      "email": "budisusanto@example.com",
      "phone": "0812345678910",
      "address": "Sudirman",
      "city": "Jakarta",
      "postal_code": "12190",
      "country_code": "IDN"
    }
  }
}'
```
<!-- tabs:end -->

Refer to [Snap Docs](https://snap-docs.midtrans.com/#json-objects) for more details & definitions.

### Configure Redirection URL

Redirection URL is used to redirect your customer after the payment process through Snap is completed. 

<!-- tabs:start -->
#### **Snap Popup (Default)**

To set your redirection URL if you are using pop-up mode, please go to [**Settings > Snap Preference > System Settings**](https://dashboard.sandbox.midtrans.com/settings/snap_preference).

![Redirect URL Configuration Snap JS](./../../asset/image/snap-prep-redirect-url-snapjs.png)

Please refer to the diagram below on how redirection URLs are being handled.

![Diagram Snap JS](./../../asset/image/snap-prep-diagram-snapjs.png)

#### **Snap Redirect (Alternative)**

To set your redirection URL if you are using redirect mode, please go to [**Settings > Configuration**](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration).

![Redirect URL Configuration Snap Redirect](./../../asset/image/snap-prep-redirect-url-snapredir.png)

Please refer to the diagram below on how redirection URLs are being handled.

![Diagram Snap Redirect](./../../asset/image/snap-prep-diagram-snapredir.png)

<!-- tabs:end -->

**Note**: 
The final redirect url will be appended with query parameter like `?order_id=xxx&status_code=xxx&transaction_status=xxx`. 

For example the final redirect url might looks like this: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102123123&status_code=200&transaction_status=capture`. 

You could utilize those information to display custom message to your customer on your finish url.

### Snap.js Function & Options

Snap.js support various useful options that you can use according to your needs, like specifying language, specifying GoPay payment mode to deeplink, etc.

For full reference please refer to [this doc](https://snap-docs.midtrans.com/#frontend-integration)

Note: If you are using Snap Redirect Mode, you can append options as Query parameter at the end of the Snap redirect_url. e.g:
```
https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?language=en&gopayMode=deeplink
```

### Javascript Callback

Snap.js support callbacks, which you can utilize to trigger your custom javascript implementation on each event. The available callbacks are:

* `onSuccess`: Function that will be triggered when payment success.
* `onPending`: Function that will be triggered when payment is pending, which is for payment that require further customer action, like bank transfer / VA.
* `onError`: Function that will be triggered when payment failure after several attempts.
* `onClose`: Function that will be triggered when customer closed the Snap popup.

Example of the Snap.js callback option usage (this param is used during [Snap frontend implementation](/en/snap/integration-guide.md#_2-show-snap-payment-page-on-frontend)), while calling `snap.pay(...)`:

<!-- tabs:start -->
#### **Frontend JS**
```javascript
snap.pay('SNAP_TRANSACTION_TOKEN', {
  onSuccess: function(result){
    /* You may add your own implementation here */
    alert("payment success!"); console.log(result);
  },
  onPending: function(result){
    /* You may add your own implementation here */
    alert("wating your payment!"); console.log(result);
  },
  onError: function(result){
    /* You may add your own implementation here */
    alert("payment failed!"); console.log(result);
  },
  onClose: function(){
    /* You may add your own implementation here */
    alert('you closed the popup without finishing the payment');
  }
})
```
<!-- tabs:end -->

### Custom Finish URL
By default Snap will redirect customer to [Finish Redirect URL configured on Dashboard](/en/snap/preparation.md?id=configure-redirection-url), but you can override that configuration by specifying `callbacks.finish` parameter. This will allow you to have specific redirect for each specific payment.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "callbacks": {
    "finish": "https://tokoecommerce.com/my_custom_finish/?name=Customer01"
  }
}'
```
<!-- tabs:end -->

### Specify Payment Channel
On Snap payment selection screen, all available payments for the merchant are activated by default. Under some conditions, you might need to display only some of the payment methods available. There are generally two way that you can choose:

#### A) Specify Payment Channel via Dashboard
You can set Enable Payment with Snap Preference on Midtrans Dashboard. This will apply to all Snap transaction for the Merchant account.

1. Login to your Midtrans Dashboard
2. Go to menu **(1) Settings -> (2) Snap Preferences -> (3) Payment Channels Tab**
3. Click [x] icon to disable payment channel
4. Click [+] icon To enable payment channel
5. To use our recommendation sorting, Click "Apply Recommended Sorting" button and also you can drag/drop manually to sorting payment channel list
6. Click **Save** button

![snap preference payment channels](./../../asset/image/snap-adv-enabled-payment-dash.png)

#### B) Specify Payment Channel via API Request
Alternatively, you can add and customize `enabled_payments` parameter. That will apply specifically for the transaction.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
...
"enabled_payments": [
    "credit_card",
    "gopay",
    "permata_va",
    "bca_va",
    "bni_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
]
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "enabled_payments": [
    "credit_card",
    "gopay",
    "permata_va",
    "bca_va",
    "bni_va",
    "echannel",
    "other_va",
    "danamon_online",
    "mandiri_clickpay",
    "cimb_clicks",
    "bca_klikbca",
    "bca_klikpay",
    "bri_epay",
    "xl_tunai",
    "indosat_dompetku",
    "kioson",
    "Indomaret",
    "alfamart",
    "akulaku"
  ],
  "credit_card": {
    "secure": true
  },
  "customer_details": {
    "first_name": "Budi",
    "last_name": "Susanto",
    "email": "budisusanto@example.com",
    "phone": "+628123456789"
  }
}'
```
<!-- tabs:end -->

An alias refers to a list of payment types. Adding an alias is the equivalent of adding all the payment types it refers to.

Supported aliases:

* `bank_transfer` = `permata_va, bca_va, bni_va, echannel`
* `store` = `kioson, indomaret, alfamart`.

Example usage:
<!-- tabs:start -->
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "enabled_payments": [
    "credit_card"
  ],
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

The code above will display only credit card payment method on Snap:

![enabled payment card](./../../asset/image/snap-adv-enabled-payment.png)

### Custom Transaction Expiry
Custom Expiry feature enables merchant to set an expiry time of payment for each transaction. When the time elapsed, customer will no longer be able to pay the transaction. There are generally two way that you can choose:

#### A) Custom Expiry via Dashboard
You can set custom expiry with Snap Preference on Midtrans Dashboard. This will apply to all Snap transaction for the Merchant account.
1. Login to your Midtrans Dashboard
2. Go to menu **(1) Settings -> (2) Snap Preferences -> (3) System Settings** Tab
3. Click Checkbox (4) on the left side duration field
4. Field in the expiry duration (5).
5. Select duration unit on the dropdown menu (6)
6. Click **Save** button

![snap preference expiry](./../../asset/image/snap-adv-custom-expiry-dash.png)

#### B) Custom Expiry via API Request 
This will apply specifically for the transaction.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):

<!-- tabs:start -->
#### **JSON Param**
```json
...
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "expiry": {
    "start_time": "2020-04-13 18:11:08 +0700",
    "unit": "minutes",
    "duration": 180
  }
}'
```
<!-- tabs:end -->

| Parameter | Type | Required? | Description |
---|---|---|---
`start_time` | String(255) | (optional) |  Timestamp in `yyyy-MM-dd hh:mm:ss Z` format. <br>If not specified, transaction time will be used as start time (when customer confirm payment channel)
`duration` | Integer | (required) | Expiry duration
`unit` | String | (required) | Expiry unit. Options: `day, hour, minute` (plural term also accepted)

### Custom Fields

Custom field allow you to send your own (custom) data to Snap API, and then it will be send back from Midtrans to your backend on HTTP notification. Also will be displayed on Dashboard under the order detail.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):

<!-- tabs:start -->
#### **JSON Param**
```json
...
  "custom_field1": "this is custom text defined by merchant",
  "custom_field2": "order come from web",
  "custom_field3": "customer selected blue color variant"
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 13000
  },
  "custom_field1": "this is custom text defined by merchant",
  "custom_field2": "order come from web",
  "custom_field3": "customer selected blue color variant"
}'
```
<!-- tabs:end -->

| Parameter | Type | Required? | Description |
---|---|---|---
custom_field1 | String(255) | (optional) | Custom field 1 for custom parameter from merchant <br>Input any data you want here
custom_field2 | String(255) | (optional) | Custom field 2 for custom parameter from merchant <br>Input any data you want here
custom_field3 | String(255) | (optional) | Custom field 3 for custom parameter from merchant <br>Input any data you want here

## Credit Card
### 3 Domain Secure (3DS)
Three Domain Secure (3DS) feature can be enabled/disabled for certain transaction on Snap. By default you **should enable 3DS whenever possible**, to prevent unnecessary security & chargeback risks. Unless there are specific business needs, that you understand the risk of disabling 3DS and its requirements (it will require you to have agreement and approved by the Acquiring Bank). To allow disabling 3DS please consult to Midtrans Partner Growth Team.

* Set the `secure` value to `true` to enable 3DS
* Set the `secure` value to `false` to disable 3DS

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
...
  "credit_card": {
    "secure": true
  }
...
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true
  }
}'
```
<!-- tabs:end -->

<!-- TODO: explain about 3DS and non 3DS save card feature -->
### Save Card for Seamless Subsequent Payments
You can allow customer to save their card credentials within Snap payment page, for easier and faster future transactions. Card credentials will be saved securely on Midtrans side, and will not require merchant to manage the card data.

Merchant will only need to store and associate each unique customer with unique `user_id` defined by merchant.

* Add `"save_card" : true` and `user_id`

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->

Be sure to use the same `user_id` for that particular customer on future transactions. Their card will be previewed on Snap card payment page, on future transactions.

![enabled payment card](./../../asset/image/snap-adv-save-card-preview.jpg)

To better understand the use cases, you an also further refer to [this article](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction).

### Recurring / Subscription Card Transaction
Snap can be utilized **to initialize** subscription or recurring payment flow. Note that:

* You will require [Core API](/en/core-api/overview.md) to do the recurring charge.
* Currently, recurring only support card transaction.

Please refer to sequence below to understand the recommended flow:

<input id="seq-diag" class="collaps-toggle" type="checkbox">
<label for="seq-diag" class="collaps-label"><strong>Snap Recurring Sequence Diagram</strong></label>
<div class="collaps-content">

![snap recurring sequence](./../../asset/image/snap-adv-snap-recurring-sequence.png)
</div> 

During the first transaction, example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "save_card": true
  },
  "user_id": "budiSusanto201"
}'
```
<!-- tabs:end -->

As result of successful first transaction, you will receive `saved_token_id` in the JSON of HTTP notification. `saved_token_id` is unique for each customer's card, you will need to store on your database and associate that card token to your customer.

When you want to charge that particular customer, you will need to proceed with `/charge` API via [Core API](/en/core-api/credit-card.md). The recurring transaction is non 3DS and will directly deduct customer fund associated with the card.

To better understand the use cases, you an also further refer to [this article](https://support.midtrans.com/hc/en-us/articles/360002419153-One-Click-Two-Clicks-and-Recurring-Transaction).

### Route Transactions to Specific Acquiring
Merchant can specify which Acquring Bank they prefer to use for specific Snap transaction. Transaction fund will be routed to that specific acquiring bank. Please consult to Midtrans Activation Team for the availability of the acquiring bank.

* Specify the bank name inside the `bank` parameter

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "bank": "bca"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "bank": "bca"
  }
}'
```
<!-- tabs:end -->

### BIN Filter
BIN filter is a feature that allows the merchant to accept only Credit Cards within specific set of BIN numbers, it is useful for certain bank promo/discount payment by accepting only credit cards issued by that bank. BIN (Bank Identification Number) is the **first 1-6 digits of a card number**, which identifies the bank that issues the card. A bank generally has more than one BIN.

To use this feature, merchant needs to accumulate the list of BIN that accepts the promotion or simply uses the issuing bank's name. This list of BIN or issuing bank name will then become a transaction parameter `whitelist_bins`. This transaction can only be performed exclusively by using the credit card that is included in the BIN list or BIN under the particular defined issuing bank.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "whitelist_bins": [
      "48111111",
      "41111111",
      "bni"
    ]
  }
}'
```
<!-- tabs:end -->

?> Note: We already pre-populate BIN number for bni, mandiri, cimb, bca, and other partner bank. You can add the bank name as whitelist bins value.

The following figure displays the Snap payment page with BIN Filter feature:
![snap bin filter](./../../asset/image/snap-adv-bin-filter.png)

### Card Installment Payment
#### Online Installment
This is the type of Installment where the Card Issuer and Acquiring Bank is the same entity (e.g: BNI Card and BNI Acquiring bank).

To activate the installment feature, merchant are required to have agreement with the bank. For online installments, the bank will issue special MID for installment. By using this installment MID, the transaction will be converted automatically into an installment. Please consult to Midtrans Activation Team for installment MID. If MID is ready, merchant simply need to add the `installment` parameter.

```json
...
  "credit_card": {
    "secure": true,
    "installment": {
      // set to `true` to force customer pay with installment for this transaction
      // set to `false` to add option for customer to pay with regular fullpayment
      "required": true,
      "terms": {
        // input the desired bank & installment terms
        "<bank-name>": [ <installment terms as array of integers> ] 
      }
    }
  }
...
```

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "bca": [3,6,12],
        "bni": [3,6,12],
        "mandiri": [3,6,12],
        "cimb": [3,6,12],
        "bri": [3,6,12],
        "maybank": [3,6,12],
        "mega": [3,6,12]
      }
    }
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "bca": [6,12],
        "bni": [6,12],
        "mandiri": [3,6,12]
      }
    }
  }
}'
```
<!-- tabs:end -->

The following figure displays the Snap payment page with online installment feature:
![snap online installment](./../../asset/image/snap-adv-online-installment.png)

?> Note: Installment term will show in Snap payment page after customer insert installment-compatible credit card number. [Sandbox test card available here](/en/technical-reference/sandbox-test.md#card-number)

#### Offline Installment
This is the type of Installment where the Card Issuer and Acquiring Bank don't have to be same entity (e.g: BNI Card and Mandiri Acquiring Bank).

To allow installment feature with banks which do not issue MID Installment, merchant can use offline installment feature. With offline installment feature, the transaction will be charged in full amount and the transaction will be converted into installment later. Please consult to Midtrans Activation Team for installment agreement first.

Merchant simply need to add the `installment` parameter with combination of bin filter feature. The purpose of bin filter is to limit certain cards from being allowed to do offline installment, based on the agreement between merchant and issuing banks.

```json
...
  "credit_card": {
    "secure": true,
    "installment": {
      // set to `true` to force customer pay with installment for this transaction
      // set to `false` to add option for customer to pay with regular fullpayment
      "required": true,
      "terms": {
        // input the desired installment terms
        "offline": [ <installment terms as array of integers> ] 
      }
    }
  }
...
```

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "offline": [3,6,12]
      }
    },
    "whitelist_bins": [ 
      481111,
      410505
    ]
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 120000
  },
  "credit_card": {
    "secure": true,
    "installment": {
      "required": true,
      "terms": {
        "offline": [3,6,12]
      }
    },
    "whitelist_bins": [ 
      481111,
      410505
    ]
  }
}'
```
<!-- tabs:end -->

The following figure displays the Snap payment page with offline installment feature:
![snap offline installment](./../../asset/image/snap-adv-offline-installment.png)

#### Definition

Param | Description
--- | ---
`required` | if `true` for that transaction customer must pay with installment <br>if `false` for that transaction customer can choost to pay with installment or regular fullpayment
`terms` | under `terms` array, on online installment, you can specify the bank name <br>(e.g: bni, bca, cimb, mandiri, etc.)

### Pre-Authorization Payment
Pre-authorization feature means customer's fund will not directly deducted after transaction, but it's amount/limit will be temprorary reserved (blocked). Then merchant can initiate "capture" action later via [Core API](https://api-docs.midtrans.com/#capture-transaction). By default fund reservation will be released after 7 days if there is no "capture" action for that transaction.

To use this feature, merchant need to add `"type": "authorize"` parameter.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "type": "authorize"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "credit_card": {
    "secure": true,
    "type": "authorize"
  }
}'
```
<!-- tabs:end -->

<!-- ### Enabling Payments using Card Loyalty Points // TODO Is it available on Snap ???-->

## GoPay
### Redirect Customer From Gojek App
After GoPay payment completed, by default customer will remain on Gojek app, so they need to manually close Gojek app to switch back to merchant web/app. Using parameter `gopay.callback_url` will allow customer to be automatically redirected to merchant web/app from Gojek app.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/finish"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "gopay": {
    "enable_callback": true,
    "callback_url": "https://tokoecommerce.com/finish"
  }
}'
```
<!-- tabs:end -->

You can input `callback_url` value with http/https url protocol for website, or Deeplink protocol for mobile App. For example, you can specify deeplink to your app: `"callback_url": "tokoecommerce://gopay_finish/"`

> **Note**: 
> The final redirect url will be appended with query parameter like `?order_id=xxx&result=xxx`. 
> 
> For example the final redirect url might looks like this: 
> ```
https://tokoecommerce.com/gopay_finish/?order_id=CustOrder-102123123&
result=success
```

Query Parameter | Type | Description
--- | --- | ---
order_id |  String |  Order ID sent on the Charge Request.  
result  | String |  Result of the transaction to decide what kind of page to show to customer. Possible values: `success` or `failure`.

> You could utilize those information to display custom message to your customer on your finish url.

Note: `gopay.callback_url` will only affect customer who pay with Deeplink mode, customer who pay with QR scan mode, will be redirected to Snap finish redirect url. Which you can also [specify here](/en/snap/advanced-feature.md#custom-finish-url)

### Specify GoPay Mode
Snap payment screen by default will autodetect customer device being used for transaction:

* If the device is detected as mobile device, Snap will use Deeplink mode to redirect customer to GoJek app (if installed on the device). 
* If the device is detected as non movile device, Snap will use QR mode to display QR Code for customer to be paid from their mobile device.

You can specify options `gopayMode` on Snap.js to force Snap to use QR or deeplink as specified.

Option | Type | Required? | Description
--- | --- | --- | ---
gopayMode | String | (optional) | Choose the UI mode for GoPay. <br>Supported values are `deeplink`, `qr`, and `auto`. Set to auto by default.

Example of the Snap.js callback option usage (this param is used during [Snap frontend implementation](/en/snap/integration-guide.md#_2-show-snap-payment-page-on-frontend)), while calling `snap.pay(...)`:

<!-- tabs:start -->
#### **Frontend JS**
```javascript
snap.pay('SNAP_TRANSACTION_TOKEN', {
  gopayMode: "deeplink"
})
```
#### **Snap Redirect Mode**
If you are using Snap Redirect Mode, you can append options as Query parameter at the end of the Snap redirect_url. e.g:
```
https://app.sandbox.midtrans.com/snap/v2/vtweb/cf9534e3-ddf7-43f9-a1b7-5f618d2d1c96?gopayMode=deeplink
```
<!-- tabs:end -->

For full reference please refer to [this doc](https://snap-docs.midtrans.com/#gopay)

## Bank Transfer / VA
### Specify VA Number

By default Midtrans will randomize VA number used for bank transfer transaction. In some cases, you might want to specify/customize VA Number for Bank Transfer payment channels. You can do that with the following parameters.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000"
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "va_number": "12345678901",
    "sub_company_code": "00000"
  },
  "bni_va": {
    "va_number": "12345678"
  },
  "permata_va": {
    "va_number": "1234567890"
  }
}'
```
<!-- tabs:end -->

Virtual Account number displayed to customer contains two parts. for example, in `{91012}{12435678}` , the first part is the company code and the second part is a unique code. The second part is the part that can be customized.

* Only digits are allowed.
* Different banks have different specs on their custom VA numbers. Please see the documentation on the respective banks.
* If the number provided is already utilized for another order, then a different unique number will be used instead.
* If the number provided is longer than required, then the unnecessary digits in the end will be trimmed.
* If the number provided is shorter than required, then the number will be prefixed with zeros.

Parameter | Type | Required? | Description
--- | --- | --- | ---
BCA `va_number`| String | (optional) | Length should be within 1 to 11.
BCA `sub_company_code` | String | (optional) | BCA sub company code directed for this transactions. <br>NOTE: Don't use it if you don't know.
Permata `va_number` | String | (optional) | Length should be 10. Only supported for b2b VA type.
BNI `va_number` | String | (optional)| Length should be within 1 to 8.


Note: On Production mode, not all Bank support custom VA number, it depends on the agreement, please consult with Midtrans Activation team for further info.

### Specify VA Description

Some VA description and recepient name can be customized.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "bca_va": {
    "free_text": {
      "inquiry": [
        {
          "en": "Invoice for Order 3123 - Toy Shop",
          "id": "Tagihan untuk Order 3123 - Toy Shop"
        }
      ],
      "payment": [
        {
          "en": "Pay Order 3123 - Toy Shop",
          "id": "Bayar Order 3123 - Toy Shop"
        }
      ]
    }
  },
  "permata_va": {
    "recipient_name": "Budi Susanto"
  }
}'
```
<!-- tabs:end -->

BCA VA:
* **Inquiry** free text is list of text that will be displayed on ATM (if supported) when customer attempt to check/inquire the VA number.
* **Payment** free text is list of text that will be displayed on ATM (if supported) when customer attempt to pay the VA number.

BCA VA Free Text Array: 

Parameter | Type | Required? | Description
--- | --- | --- | ---
inquiry | Array of FreeTextItem | (optional) | Max item for array is 10
payment | Array of FreeTextItem | (optional) | Max item for array is 10

BCA VA Free Text Item:

Parameter | Type | Required? | Description
--- | --- | --- | ---
en | String | (required) | Size should not exceed 50 chars.
id | String | (required) | Size should not exceed 50 chars.

Permata VA:

Parameter | Type | Required? | Description
--- | --- | --- | ---
recipient_name | String | (optional) | Recipient name shown on the on the bank’s payment prompt. <br>It is shown as 20 character uppercase string. <br>Anyting over 20 character will be truncated. NOTE: Default is merchant name

## Convenience Store

### Specify Alfamart Free Text
Text that will be shown/printend on Alfamart receipt can be customized.

Example of the JSON param (this param is used during [API Request Step](/en/snap/integration-guide.md#api-request)):
<!-- tabs:start -->
#### **JSON Param**
```json
{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}
```
#### **As CURL**
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
  "transaction_details": {
    "order_id": "CustOrder-102",
    "gross_amount": 9000
  },
  "cstore": {
    "alfamart_free_text_1" : "Thanks for shopping with Toy Store!",
    "alfamart_free_text_2" : "Visit our site at toystore.com",
    "alfamart_free_text_3" : "Invite your friend and get discount."
  }
}'
```
<!-- tabs:end -->

Parameter | Type | Required? | Description
--- | --- | --- | ---
alfamart_free_text_1 | String(40) | (optional) | First row of printed receipt description
alfamart_free_text_2 | String(40) | (optional) | Second row of printed receipt description
alfamart_free_text_3 | String(40) | (optional) | Third row of printed receipt description

## Consideration and Limitation
By using Midtrans API there are some consideration and limitation you need to keep in mind, that will be explained below.

### Maximum Request Size Limit

Midtrans API allow maximum size of **16kb** per request (**\~16000 total characters**). Please strive to keep it under this limit to avoid request failure.

Tips: You can try to limit the number of `item_details` from your request, or atleast group it into fewer (or 1 generic) `item_details`.

### Snap Token Expiry Time

For regular snap transaction, snap `token` and also the `redirect_url` default lifetime is **24 hours**. It can be customized by following "Custom Expiry" section.

Within that time limit the payment page is available for customer to proceed payment. Beyond that, it will shows that the payment page is no longer available.

### Note on Core API Get Status

When a transaction is created on Snap API, it does not immediately assign any payment status on Core API's get-status response. 

So please expect that you may encounter `404` or payment not found response upon calling Core API get-status even if the payment page is activated on Snap API. 

It is because of customer may not yet choose any payment method within the Snap payment page (e.g: idling or abandoning the Snap payment page). After customer chooses and proceeds with a payment method, then the transaction status will be assigned and available on Core API get-status. The possible status is as defined on the table above. 

## Reference

Refer to [Snap Docs](https://snap-docs.midtrans.com/#json-objects) for more detail & definition:

<div class="my-card">

#### [Snap Docs](https://snap-docs.midtrans.com/#json-objects)
</div>