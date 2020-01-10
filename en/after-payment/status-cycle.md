# Transaction Status Cycle

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