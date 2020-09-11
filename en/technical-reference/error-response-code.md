# Error Code And Response Code
<hr>

### Definiton

You can find full list of Error Code and Response Code and its definition by following these links:

<div class="my-card">

#### [Error Code And Response Code](https://api-docs.midtrans.com/#status-code)
</div>

### Frequently Encountered Error Code

#### `401`, `Access denied due to unauthorized transaction, please check client or server key`

**Possible Solution:**
- Your API request used wrong Authorization, please check on [how to do proper Authorization in this section](/en/technical-reference/api-header.md)
- You used wrong Server Key, please check your server key and make sure you are using [the correct one from dashboard](/en/midtrans-account/overview?id=retrieving-api-access-keys.md)
- Wrong environment (sandbox/production) is used, please note that Server Key for Production and Sandbox mode are different. Make sure you use correct Server Key for that particular environment.
	- Check the API url and see if it contains `.sandbox.midtrans.com` it means sandbox mode, or if using language library check for any `isProduction` variable.

#### `406`, `order_id has been paid and utilized, please use another order ID`

**Possible Solution:**
- You are re-using same order ID that currently still active or has been paid previously. Order ID should be unique per transaction, and cannot be re-used while it's active or has been paid. 
	- You can call API `/cancel` if the order ID is in `pending` state to re-use it.
	- Or you can simply add suffix (like timestamp) to make sure order ID is unique, e.g: `order123-1579080643`, `order123-12012020145221`

#### `503`, `Bank/partner is experiencing connection issue.`

**Possible Solution:**
- Generally temprorary issue at bank/provider side, that can be retried after sometime. Please retry later.

#### Deny by bank with code `05`, `Do not honor`

**Possible Solution:**

Do not Honor (05) is the most common and general message for card transactions that are declined by the Bank. It indicates that the Issuing Bank will not validate the transaction. It is caused by many factors such as mistyping, insufficient funds, etc.

To resolve this, customer needs to contact the Issuing Bank and tell what had happened. Once the problem is solved, customer should be able to transact.

#### Gopay failure with response code `900`, `GENERIC_SERVICE_ERROR`

**Possible Solution:**

Intermittent service error on provider side. For the most case, it is retriable. Please retry later.

<hr>

For full list of code and response please refer: [Error Code And Response Code](https://api-docs.midtrans.com/#status-code)