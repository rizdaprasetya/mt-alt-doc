# Error Code And Response Code

<hr>

## Frequently Encountered Error Codes

Reasons and possible solutions for some frequently encountered error codes & responses from Midtrans APIs:

- `401`, **"Access denied due to unauthorized transaction, please check client or server key"**
    - Your API request used wrong Authorization, please refer to [Authorization Header](/en/technical-reference/api-header.md) on how to do proper API authorization.
    - Please check your *Server Key* and make sure that you are using appropriate Server Key for the environment. The *Server Key* is different for Sandbox environment and Production environment. Refer to [Retrieving the access keys](/en/midtrans-account/overview.md#retrieving-api-access-keys).
    - Wrong environment (sandbox/production) is used. 
        - Check the API url and see if it contains `.sandbox.midtrans.com`, it means you are in sandbox mode. Or if using language library check for the `isProduction` variable value.


- `406`, **"order_id has been paid and utilized, please use another order ID"**
    - You are re-using the same *Order ID* that is currently active or has been paid previously. *Order ID* should be unique for every transaction, and cannot be re-used while it is active or has been paid.
        - You can call API `/cancel` to re-use the *Order ID* of a transaction with a transaction status:*pending*. 
        - Or you can add a suffix (like timestamp) to the *Order ID* to make it unique. For example: `order123-1579080643`, `order123-12012020145221`


- `503`, **"Bank/partner is experiencing connection issue."**
    - Temporary issue at bank or the provider side, that may recover after sometime. Please retry later.


- `05`, **"Do not honor"**
    - This applies to card transaction which got declined by the Bank. Do not Honor (05) is generic message coming from the bank. It indicates that the Issuing Bank fail to validate the transaction. It can be caused by many factors such as mistyping, insufficient funds, bank suspecting fraud, etc.
        - The customer can try to contact the card Issuing Bank and explain the issue. Once the problem is solved, customer can complete the transaction.


- `900`, **"GENERIC_SERVICE_ERROR"**
    - Intermittent service error on provider side, that may recover after sometime. Please retry later.



For full list of code and response please refer to [API Docs' Error Code And Response Code](https://api-docs.midtrans.com/#status-code).