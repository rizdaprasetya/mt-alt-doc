<!-- TODO: create status diagram similar to this https://docs.woocommerce.com/wp-content/uploads/2013/05/woocommerce-order-process-diagram.png -->
The life cycle of `transaction_status` and its possible changes will be listed below.

### Transaction Status

Transaction Status | Description | Possible changes(s)
--- | --- | ---
`pending` | Transaction is created and available/waiting to be paid by customer at the payment provider (ATM/ebanking/E-wallet app/ store). | settlement, expire,<br> cancel, deny
`capture` | Transaction successfully capture the credit card balance. <br>Will be settled automatically next day if no manual action taken. <br>Safe to assume as success payment. | settlement, cancel
`settlement` | Transaction is successfully settled. Funds has been received. | refund, chargeback, partial_refund, partial_chargeback
`deny` | Payment provider / Fraud Detection System rejects the credentials used for payment. See `status_message` field for deny reason/details.
`cancel` | Transaction is cancelled. Can be triggered by Midtrans or Merchant themselves.<br> Cancelled transaction can be caused by various reasons:<br> 1. `Capture` transaction is cancelled before Settlement.<br> 2. `Challenge` Transaction is denied by merchant.
`expire` | Transaction no longer available to be paid or processed, beacause the payment has not been completed after the expiry time period exceeded.
`failure` | Unexpected error during transaction processing. <br>Failure transaction can be caused by various reasons, but mostly unhandled issue like bank fail to give response (time-out). Occurs rarely.
`refund` | Transaction is marked to be refunded. | 
`partial_refund` | Transaction is marked to be partially refunded. | 
`partial_chargeback` | Transaction is marked to be partially charged back. | 


### Fraud Status

Fraud Status | 🔍 | Description
--- | --- | ---
`accept` | ✅ | Transaction is safe, not considered as fraud.
`deny` | ❌ | Transaction is considered as fraud. And denied/rejected for safety reason.
`challenge` | ⚠️ | Transaction have indication of potential fraud, but cannot be determined precisely. <br>Merchant should take action to accept or deny via Dashboard, or via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API

<!-- TODO explain how to do refund, approve, deny, cancel, etc -->

## API Action / Method

Other API action that you can perform to an transaction will be listed below. 

All backend based request requires the following header:
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: [Follow this reference for more detail about API Auth header](/en/technical-reference/api-header.md).

**API Base URL:**
- Sandbox Environment : `https://api.sandbox.midtrans.com`
- Production Environment : `https://api.midtrans.com`

Endpoint URL | HTTP Method | Description
--- | --- | ---
/v2/[ORDER_ID]/status | GET | Get information status of a transaction with certain `order_id`. <br>[Click for usage](/en/after-payment/get-status.md)
/v2/[ORDER_ID]/cancel | POST | Cancel a transaction with certain `order_id`. <br>Cancelation can only be done before `settlement`. <br>[Click for usage](https://api-docs.midtrans.com/#cancel-transaction)
/v2/[ORDER_ID]/refund | POST | Update `order_id` with `settlement` status to be marked as `refund`. <br>[Click for usage](https://api-docs.midtrans.com/#refund-transaction)
/v2/[ORDER_ID]/refund/online/direct | POST | Attempt to send refund to bank or payment provider directly and update the transaction status to `refund` if it succeeded. <br>[Click for usage](https://api-docs.midtrans.com/#direct-refund-transaction)
/v2/[ORDER_ID]/expire | POST | Update order_id with pending status to be expired. <br>[Click for usage](https://api-docs.midtrans.com/#expire-transaction)
/v2/[ORDER_ID]/approve | POST | Approve a transaction with certain `order_id` which gets `challenge` status from Fraud Detection System. <br>[Click for usage](https://api-docs.midtrans.com/#approve-transaction)
/v2/[ORDER_ID]/deny | 	POST | Deny a transaction with certain `order_id` which gets `challenge` status from Fraud Detection System. <br>[Click for usage](https://api-docs.midtrans.com/#deny-transaction)
/v2/[ORDER_ID]/status/b2b | GET | Get information status of multiple B2B transactions related to certain `order_id`. <br>[Click for usage](https://api-docs.midtrans.com/#get-transaction-status-b2b)
/v2/capture	| POST | Capture a pre-authorized transaction for card payment. <br>[Click for usage](https://api-docs.midtrans.com/#capture-transaction)

Refer to the [API docs for full list and more detail](https://api-docs.midtrans.com/#payment-api)

?> Each of official [Midtrans Language Library](/en/technical-reference/library-plugin.md) will mostly have those as function to easily call. Please refer to the library's github Repo for usage example.

#### Sample usage

Here's sample for one of the request in Curl. This demonstrate how to cancel a pending transaction via API.
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/myCustOrder123/cancel \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json'
```