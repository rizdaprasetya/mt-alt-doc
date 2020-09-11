# API Authorization & Headers
<hr>

For backend based API request/call, Midtrans API require HTTP(s) headers that will be explained below.

## Content-Type and Accept Header

Midtrans API use JSON format as the input and output, so you must specify JSON as content-type & accept JSON as response, to do that the following header should be specified:

- `Content-Type: application/json`
- `Accept: application/json`

## Authorization Header

The **Authorization header** will be used by Midtrans API to identify "which merchant ID" is initiating the request (and which feature is authorized to be used), so that your request can be processed accordingly. Authorization Header is based on [**Server Key**](/en/midtrans-account/overview.md#retrieving-api-access-keys)

As analogy in physical world, it can be considered as "a key to your car", so that only you can access your car (and only your car can be accessed by you).

- For **Sandbox environment**, obtain Server Key in Sandbox Dashboard, menu: [Settings - Access Keys](https://dashboard.sandbox.midtrans.com/settings/config_info).
- For **Production environment**, obtain Server Key in Dashboard, menu: [Settings - Access Keys](https://dashboard.midtrans.com/settings/config_info).

!> Access Keys are unique for every merchant. Server Key are secret, please always **keep Server Key confidential**.

The mechanism to generate `Authorization` header value is:
1. Follow the format of [**Basic Authentication**](https://swagger.io/docs/specification/authentication/basic-authentication/). e.g: `Username:Password`.
2. Username and password is separated by `:` character.
3. Server Key is used as `username`, there is no password, so password is blank/empty string.
	- For example if your Server Key is `SB-Mid-server-abc123cde456`, then it should be `SB-Mid-server-abc123cde456:`.
4. Encode this value into base64 format (e.g: `U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`)
5. Add the word `Basic ` as prefix (e.g: `Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`)
6. Finally that is the final result of the header (e.g `Authorization: Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6`)

You can test with this tools to try out Authorization Header calculation:

<details>
<summary><b>Authorization Header Generator</b></summary>
<article>

[Authorization Header Generator](https://jsfiddle.net/wx3hbcen/embedded/result,html/dark ':include :type=iframe width=100% height=600px')
</article>
</details>
<br>

## Complete HTTP(s) Headers

 HTTP(s) Header | Description
--- | ---
`Content-Type: application/json` | The Content-Type field indicates that JSON format will be used by the requestor. Responder should allow JSON format to be received.
`Accept: application/json` | The Accept field indicates that JSON format is acceptable as response to the requestor. JSON are allowed to be used as response by responder.
`Authorization: base64Encode(ServerKey+":")` | The Authorization field in *Basic Auth* format, Server Key is used as username, and the password is blank.

<details open>
<summary>Final Sample Request in Curl</summary>
<article>

```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1hYmMxMjNjZGU0NTY6' \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }
}'
```
</article>
</details>

#### Exception on Frontend API Request

For API request that is intended to be called from frontend/client side, such as API `/token` (get card token), etc. Above usual headers **are not required**, and you **should not use Server Key** to authorize the request, to avoid the risk of exposing your Server Key on your publicly accessible frontend.

Instead Client Key is used to authorize the HTTP(s) request.

For example, this is the Client Key used in API `/token` (get card token) request:

Key | Description
--- | ---
HTTP(s) Method | `GET`
HTTP(s) Header | -
API endpoint url | `https://api.sandbox.midtrans.com/v2/token`
Query Param for auth | `client_key=<YOUR-CLIENT-KEY>`

```bash
curl 'https://api.sandbox.midtrans.com/v2/token?client_key=SB-Mid-client-xxxxxxx&card_cvv=123&gross_amount=20000&currency=IDR&card_number=4811111111111114&card_exp_month=02&card_exp_year=2025'
```