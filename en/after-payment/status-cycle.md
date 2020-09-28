# Midtrans Transaction Status Cycle Description
<hr>

<!-- TODO: create status diagram similar to this https://docs.woocommerce.com/wp-content/uploads/2013/05/woocommerce-order-process-diagram.png -->
The table given below describes the life cycle of `transaction_status` and its possible changes.

### Transaction Status

Transaction Status | Description | Possible changes(s)
--- | --- | ---
`pending` | Transaction is created and available/waiting to be paid by customer at the payment provider (ATM/Internet banking/E-wallet app/store). | settlement, <br>expire,<br>cancel, <br>deny 
`capture` | Transaction is successful and credit card balance is captured successfully. <br/>If no action is taken by you, the transaction will be successfully settled on the next day and transaction status will change to *settlement*.<br />It is safe to assume a successful payment. | settlement, <br />cancel 
`settlement` | Transaction is successfully settled. Funds have been received. | refund, chargeback, partial_refund, partial_chargeback
`deny` | The credentials used for payment are rejected by the payment provider or Midtrans Fraud Detection System (FDS). <br/>To know the reason and details for denied transaction, see the `status_message` field in the response. |
`cancel` | Transaction is cancelled. Can be triggered by Midtrans or merchant themselves.<br>Cancelled transaction can be caused by various reasons:<br> 1. `Capture` transaction is cancelled before Settlement.<br> 2. `Challenge` Transaction is denied by merchant. |
`expire` | Transaction no longer available to be paid or processed, because the payment is not completed within the expiry time period. |
`failure` | The transaction status is caused by unexpected error during transaction processing. <br/>Failure transaction can be caused by various reasons, but mostly it is caused when bank fails to respond.<br/>This occurs rarely. |
`refund` | Transaction is marked to be refunded. Refund can be requested by Merchant. | 
`chargeback` | Transaction is marked to be charged back. | 
`partial_refund` | Transaction is marked to be partially refunded. | 
`partial_chargeback` | Transaction is marked to be partially charged back. | 


<details>
<summary><b>Notes When Using Snap API</b></summary>
<article>

When a transaction is created on Snap API, it does not immediately assign any payment status on Core API's get-status response. 

When a transaction is created on Snap API, it does not immediately assign any payment status on *Core API GET Status* response. Even if the payment page is activated on Snap API, you might encounter `404` or *Payment not found* response while calling *Core API GET Status*.

This is because the customer did not yet choose any payment method within the Snap payment page (idling or abandoning the Snap payment page). Once the customer proceeds with a payment method, then the transaction status is assigned and is available on *Core API GET Status*. 

</article>
</details>

### Fraud Status

Fraud Status | 🔍 | Description
--- | --- | ---
`accept` | ✅ | Transaction is safe to proceed. It is not considered as fraud. Refer to [Accepting Fraudulent Transaction](en/after-payment/dashboard-usage.md) for more details. 
`deny` | ❌ | Transaction is considered as fraud and is denied/rejected for security reasons. 
`challenge` | ⚠️ | Transaction is flagged as potential fraud, but cannot be determined precisely. <br> You can accept or deny via Dashboard, or via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API.<br />If no action is taken, the transaction is denied automatically. 

<!-- TODO explain how to do refund, approve, deny, cancel, etc -->

## API Action / Method

You can perform a number of actions on *transaction_status* through API calls. 

The header for all backend requests is described below.

| Header Name   | Description                                           | Required | Values            |
| ------------- | ----------------------------------------------------- | -------- | ----------------- |
| Accept        | The format of the data to be returned.                | Optional | application/json  |
| Content-Type  | Format of the data to be posted                       | Optional | application/json  |
| Authorization | The authentication method used to access the resource |          | Basic AUTH_STRING |

**AUTH_STRING**: Refer to [API Authorization and Header](https://docs.midtrans.com/en/technical-reference/api-header) for more information.

**API Base URL:**
- Sandbox Environment : [https://api.sandbox.midtrans.com](https://api.sandbox.midtrans.com)
- Production Environment : [https://api.midtrans.com](https://api.midtrans.com)

Endpoint URL | HTTP Method | Description
--- | --- | ---
/v2/[ORDER_ID]/status | GET | Get information status of a transaction with a `order_id`. <br>Refer to [GET Status](/en/after-payment/get-status.md) for more information. 
/v2/[ORDER_ID]/cancel | POST | Cancel a transaction with `order_id`. <br>Cancelation can only be done before `settlement`. <br>Refer to [Cancel Transaction](https://api-docs.midtrans.com/#cancel-transaction) for more information. 
/v2/[ORDER_ID]/refund | POST | Mark `order_id` with `settlement` status to be marked as `refund`. <br>Refer to [Refund Transaction](https://api-docs.midtrans.com/#refund-transaction) for more information. 
/v2/[ORDER_ID]/refund/online/direct | POST | Attempt to send refund to bank or payment provider directly and update the transaction status to `refund` if it succeeded. <br>Refer to [Direct Refund Transaction](https://api-docs.midtrans.com/#direct-refund-transaction) for more information. 
/v2/[ORDER_ID]/expire | POST | Update `order_id` with pending status to be marked as `expired`. <br>Refer to [Expire Transactions](https://api-docs.midtrans.com/#expire-transaction) for more information. 
/v2/[ORDER_ID]/approve | POST | Approve a transaction with `order_id` which gets `challenge` status from Fraud Detection System. <br>Refer to [Approve Transactions](/en/after-payment/dashboard-usage.md) for more information. 
/v2/[ORDER_ID]/deny | 	POST | Deny a transaction with `order_id` which gets `challenge` status from Fraud Detection System. <br>Refer to [Deny Transaction](https://api-docs.midtrans.com/#deny-transaction) for more information. 
/v2/[ORDER_ID]/status/b2b | GET | Get information status of multiple B2B transactions related to `order_id`. <br>Refer to [GET transaction status for B2B](https://api-docs.midtrans.com/#get-transaction-status-b2b) for more information. 
/v2/capture	| POST | Capture a pre-authorized transaction for card payment. <br>Refer to [Capture Transaction](https://api-docs.midtrans.com/#capture-transaction) for more information. 

Refer to the [API docs](https://api-docs.midtrans.com/#payment-api) for a full list and more detail.

?>***Note:*** Each of the official [Midtrans Language Library](/en/technical-reference/library-plugin.md) has functions that can be easily called. Please refer to the library's GitHub Repository for usage example.

#### Sample usage

A sample Curl code given for an API request to cancel a pending transaction is given below.

```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/myCustOrder123/cancel \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json'
```