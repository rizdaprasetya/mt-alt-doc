<!-- 
TODO:
- list out what's the diff with snap & UI PL

 -->
# Payment Link - API Reference 
<span class="badge badge-yellow">BETA</span> <br>

## Overview
This API Reference page will explain about **Payment Link API** 
<span class="badge badge-yellow">BETA</span>. Merchants can create & manage **Payment Link** using the API. **Payment Link** is a web-based link (URL) which you can share to customers to receive payments from them – like an **invoice**. The link will redirect them to Midtrans hosted payment web page.

### Sequence Diagram
TBA
### Merchant Journey
TBA
### Customer Journey
TBA
### Integration Overview
TBA

<!-- 
@TODO:
For guided integration refer please refer to this page
-->
<!-- 
## Integration Overview
Backend integration goal is to get payment-link url by providing payment informations. We provide a HTTP API to do this.

1. Merchant sent req params using server key to get payment link url
2. Midtrans will response payment link url

 -->
## API Reference
The followings reference will explain the Payment Link API.

### API Host URL
| Environment | API Host Base URL                                                    |
| ----------- | -------------------------------------------------------------------- |
| Sandbox     | [https://api.sandbox.midtrans.com](https://api.sandbox.midtrans.com) |
| Production  | [https://api.midtrans.com](https://api.midtrans.com)                 |

<small>

\*Learn more about [what is Sandbox Environment](/en/technical-reference/sandbox-test.md).
</small>

## Create Payment Link API
Merchant send HTTP API request with the desired transaction details to this endpoint, and will get API response mainly with the Payment Link URL. The URL then should be shared to & opened by their customer, so customer can initiate payment to the merchant.

### Request
**Endpoints:** `/v1/payment-links`\
**HTTP Method:** `POST`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
`AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

?> Midtrans API validates HTTP request by using Basic Authentication method. The username is your **Server Key** while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username and password separated by colon symbol (**:**). For more details, refer to [ API Authorization and Headers](/en/technical-reference/api-header.md).

#### Request Body
```json
{
  "transaction_details": {
    "order_id": "001",
    "gross_amount": 190000,
    "payment_link_id": "abc"
  },
  "credit_card": {
    "secure": true
  },
  "usage_limit":  1,
  "expiry": {
    "start_time": "2022-04-01 18:00 +0700",
    "duration": 20,
    "unit": "days"
  },
  "enabled_payments": [
    "credit_card",
    "bca_va",
    "indomaret"
  ],
  "item_details": [
    {
      "id": "pil-001",
      "name": "Pillow",
      "price": 95000,
      "quantity": 2,
      "brand": "Midtrans",
      "category": "Furniture",
      "merchant_name": "PT. Midtrans"
    }
  ],
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@midtrans.com",
    "phone": "+62181000000000",
    "notes": "Thank you for your purchase. Please follow the instructions to pay."
  },
"custom_field1": "custom field 1 content", 
"custom_field2": "custom field 2 content", 
"custom_field3": "custom field 3 content"
}
```

#### Request JSON Body Details
<!-- Auto converted from Gdocs to html-markdown to markdown -->
| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| [transaction_details](#transaction_details-object)| **required** | Object | Specific information regarding the transaction|
| [customer_details](#customer_details-object)| optional | Object | Specific information regarding the customer<br>**Note:** If merchant sent customer email detail on the request, midtrans will be sent payment link url to customer email|
| [item_details](#item_details-object)| optional | Object | Shopping item details will be paid by customer|
| usage_limit | optional | integer | Maximum Usage for payment success|
| [expiry](#expiry-object)| optional | Object | Custom transaction lifetime|
| enabled_payments    | optional | Array | List of payment types that should be enabled. If blank, all active payment types are included.<br>**Options:**<br>credit_card, gopay, cimb_clicks, bca_klikbca, bca_klikpay, bri_epay, telkomsel_cash, echannel, permata_va, other_va, bca_va, bni_va, bri_va, indomaret, danamon_online, akulaku, shopeepay |
| custom_field1 | optional | String(255) | retrievable custom value that you can pass to Midtrans on field 1.|
| custom_field2 | optional | String(255) | retrievable custom value that you can pass to Midtrans on field 2.|
| custom_field3 | optional | String(255) | retrievable custom value that you can pass to Midtrans on field 3.|
| [credit_card](#credit_card-object)| optional | Object | Credit card payment options|
| [bni_va](#bni_va-object)| optional | Object | Custom Virtual Account Number|
| [permata_va](#permata_va-object)| optional | Object | Custom Virtual Account Number
| [bca_va](#bca_va-object)| optional | Object | Custom Virtual Account Number|
| [bri_va](#bri_va-object)| optional | Object | Custom Virtual Account Number|

<!-- 
@TODO: properly convert table to markdown format.
it was auto converted to HTML format from GDocs, as quick solution.
-->
##### transaction_details object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>order_id</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Unique transaction ID. A single ID could be used only once by a Merchant.</td>
  </tr>
  <tr>
   <td>gross_amount</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Amount to be charged</td>
  </tr>
  <tr>
   <td>payment_link_id</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Unique Link ID. A single ID could be used only once by a Merchant. <br><strong>Note:</strong> <br>By default generated by midtrans</td>
  </tr>
</table>

##### credit_card object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>secure</td>
   <td>optional</td>
   <td>Boolean</td>
   <td>Use 3D-Secure authentication when using credit card. Default: false</td>
  </tr>
  <tr>
   <td>bank</td>
   <td>optional</td>
   <td>String</td>
   <td>Acquiring bank.  <br><strong>Options</strong>: bca, bni, mandiri, cimb, bri, danamon, maybank, mega</td>
  </tr>
  <tr>
   <td>channel</td>
   <td>optional</td>
   <td>String</td>
   <td>Acquiring channel. <br><strong>Options</strong>: migs</td>
  </tr>
  <tr>
   <td>type</td>
   <td>optional</td>
   <td>String</td>
   <td>Credit card transaction type.  <br><strong>Options</strong>: authorize, authorize_capture  <br><strong>Default: </strong>authorize_capture</td>
  </tr>
  <tr>
   <td>whitelist_bins</td>
   <td>optional</td>
   <td>Array</td>
   <td>Allowed credit card BIN numbers. The bin value can be either a prefix(upto 8 digits) of card number or the name of a bank, in which case all the cards issued by that bank will be allowed.</td>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#json-objects">installment.required</a></td>
   <td>optional</td>
   <td>Boolean</td>
   <td>Force installment when using credit card.<br> <strong>Default</strong>: false</td>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#json-objects">installment.terms</a></td>
   <td>optional</td>
   <td>Object</td>
   <td>Available installment terms</td>
  </tr>
</table>

##### expiry object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>start_time</td>
   <td>optional</td>
   <td>String <br>Timestamp in yyyy-MM-dd HH:mm:ss Z format</td>
   <td>Timestamp in yyyy-MM-dd HH:mm:ss Z format. If not specified, transaction time will be used as start time when payment link is created</td>
  </tr>
  <tr>
   <td>duration</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Expiry duration</td>
  </tr>
  <tr>
   <td>unit</td>
   <td><strong>required</strong></td>
   <td>String</td>
   <td>Expiry unit. <br><strong>Options</strong>: day, hour, minute</td>
  </tr>
</table>

##### item_details object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>id</td>
   <td>optional</td>
   <td>String</td>
   <td>Item ID</td>
  </tr>
  <tr>
   <td>price</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Price of the item  <br><strong>NOTE</strong>: Don’t add decimal</td>
  </tr>
  <tr>
   <td>quantity</td>
   <td><strong>required</strong></td>
   <td>Integer</td>
   <td>Quantity of the item  <br><strong>NOTE</strong>: Must be greater than or equal 1</td>
  </tr>
  <tr>
   <td>name</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Name of the item</td>
  </tr>
  <tr>
   <td>brand</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Brand of the item</td>
  </tr>
  <tr>
   <td>category</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Category of the item</td>
  </tr>
  <tr>
   <td>merchant_name</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Merchant selling the item</td>
  </tr>
</table>

##### customer_details object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td>first_name</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Customer's first name.</td>
  </tr>
  <tr>
   <td>last_name</td>
   <td>optional</td>
   <td>String(50)</td>
   <td>Customer's last name.</td>
  </tr>
  <tr>
   <td>email</td>
   <td><strong>required</strong></td>
   <td>String(50)</td>
   <td>Customer's email address.</td>
  </tr>
  <tr>
   <td>phone</td>
   <td><strong>required</strong></td>
   <td>String(20)</td>
   <td>Customer's phone number.</td>
  </tr>
  <tr>
   <td>notes</td>
   <td>optional</td>
   <td>String(255)</td>
   <td>Email instructions</td>
  </tr>
</table>

##### bca_va object
BCA Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(11)</td>
   <td>Custom Virtual Account Number</td>
  </tr>
</table>

##### bni_va object
BNI Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(8)</td>
   <td>Custom Virtual Account Number</td>
  </tr>
</table>

##### permata_va object
Permata Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(10)</td>
   <td>Custom Virtual Account Number</td>
  </tr>
</table>

##### bri_va object
BRI Virtual Account Object

<table>
  <tr>
   <th>Parameter</th>
   <th>Required</th>
   <th>Type</th>
   <th>Description</th>
  </tr>
  <tr>
   <td><a href="https://snap-docs.midtrans.com/#custom-virtual-account-number">va_number</a></td>
   <td>optional</td>
   <td>String(13)</td>
   <td>Custom Virtual Account Number</td>
  </tr>
</table>

### Request Sample
Sample Request including Headers & Body.
#### CURL

```bash
curl --location --request POST 'https://api.sandbox.midtrans.com/v1/payment-links' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
--data-raw '{
 "transaction_details": {
   "order_id": "midtrans-order-id-123",
   "gross_amount": 190000,
   "payment_link_id": "payment-link-id-11122"
 },
 "credit_card": {
   "secure": true
 },
 "usage_limit":  1,
 "expiry": {
   "start_time": "2022-04-01 18:00 +0700",
   "duration": 20,
   "unit": "days"
 },
 "enabled_payments": [
   "credit_card",
   "bca_va",
   "indomaret"
 ],
 "item_details": [
   {
     "id": "pil-001",
     "name": "Pillow",
     "price": 95000,
     "quantity": 2,
     "brand": "Midtrans",
     "category": "Furniture",
     "merchant_name": "PT. Midtrans"
   }
 ],
 "customer_details": {
   "first_name": "John",
   "last_name": "Doe",
   "email": "john.doe@midtrans.com",
   "phone": "+62181000000000",
   "notes": "Thank you for your purchase. Please follow the instructions to pay."
 }
}
'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
   "order_id": "midtrans-order-id-123",
   "payment_url": "https://app.sandbox.midtrans.com/payment-links/payment-link-id-111"
}
```

#### Sample Failure Response
HTTP Status Code: `409`

```json
{
   "error_messages": [
       "The Order ID '1525840754698' has been taken"
   ]
}
```

HTTP Status Code: `401`

```json
{
   "error_messages": "Access denied due to unauthorized request"
}
```

HTTP Status Code: `400`

```json
{
   "error_messages": [
       "Invalid JSON data provided."
   ]
}
```

#### Response JSON Body Details

<table>
  <tr>
   <th>Property</th>
   <th>Descriptions</th>
  </tr>
  <tr>
   <td>order_id</td>
   <td>Merchant’s Order ID</td>
  </tr>
  <tr>
   <td>payment_url</td>
   <td>payment link created by merchant</td>
  </tr>
  <tr>
   <td>error_messages</td>
   <td>The message describing the error.</td>
  </tr>
</table>

Response properties are conditional, depending on whether the API response is success or failure. E.g. error_messages may only exists on failure response.

#### HTTP Status Code

<table>
  <tr>
   <th>Status Code</th>
   <th>Descriptions</th>
  </tr>
  <tr>
   <td>200</td>
   <td>Request is successful</td>
  </tr>
  <tr>
   <td>409</td>
   <td>Duplicate order ID. Order ID has already been utilized previously</td>
  </tr>
  <tr>
   <td>401</td>
   <td>Access denied due to unauthorized request</td>
  </tr>
  <tr>
   <td>400</td>
   <td>Validation Error / Invalid JSON</td>
  </tr>
  <tr>
   <td>500</td>
   <td>Internal Server Error</td>
  </tr>
</table>

## Delete Payment Link API
Merchant send HTTP API request to this endpoint with the specified Order ID to delete the Payment Link. Useful to deactivate some specific payment links when merchant no longer want customer to pay for it.

### Request
**Endpoints:** `/v1/payment-links/{order_id}`\
**HTTP Method:** `DELETE`\
**Headers:**
```text
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```
[Authorization]((/en/technical-reference/api-header.md)) `AUTH_STRING` value is result of Base64Encode(`"YourServerKey"+":"`)

### Request Sample
Sample Request including Headers & Body.
```bash
curl --location --request DELETE 'https://api.sandbox.midtrans.com/v1/payment-links/1525840754698' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```

### Response
For successful response you will receive HTTP status code `2xx` as a response. For failure response you may receive HTTP status code `4xx` or `5xx`.

#### Sample Success Response
HTTP Status Code: `200`
```json
{
   "message": "Payment Link with Order ID 1525840754698-1647594290 deleted"
}
```

#### HTTP Status Code

<table>
  <tr>
   <th>Status Code</th>
   <th>Descriptions</th>
  </th>
  <tr>
   <td>200</td>
   <td>Request is successful</td>
  </tr>
  <tr>
   <td>404</td>
   <td>Not Found</td>
  </tr>
  <tr>
   <td>401</td>
   <td>Access denied due to unauthorized request</td>
  </tr>
  <tr>
   <td>500</td>
   <td>Internal Server Error</td>
  </tr>
</table>

## Other Useful Info
### Managing Payment Links via Dashboard
The created Payment Link(s) will then be available to be [viewed & managed via Midtrans Dashboard](/en/payment-link/overview.md#managing-payment-link).

### Redirection After Payment Complete
Merchants can customize the Redirect URL in Dashboard's **Settings > Snap Preference > System Settings** Menu. Redirect URL is used to redirect your customer after the payment process is complete. [Follow this section to learn the details.](/en/snap/advanced-feature.md#configuring-redirect-url).

### Handling Notifications
[Transaction notification](/en/after-payment/http-notification.md) is sent when a customer completes the transaction or when the transaction status changes.

Merchant's [HTTP notification URL can be configured on merchant dashboard](/en/after-payment/http-notification.md#configuring-http-notifications-on-map), Midtrans will send HTTP notification to the specified URL.

There are also several ways to [ensure authenticity of the HTTP notifications received by Merchant backend](/en/after-payment/http-notification.md#verifying-notification-authenticity), in order to improve security aspect.

### Order ID Structure
For each payment created for a specific Payment Link Order ID, Midtrans will automatically append merchant's original order id with timestamp, from `order-id ` to `order-id + timestamp`.

For example from: `order123` to `order123-1647944535605`.

So **Merchant need to make sure that their system able to handle the change** when processing payment's **HTTP notification**.

For example, here are some ideas to do that:

#### Using Code Logic Implementation
In Merchant's notification handler backend code, merchant can implement logic to convert back the modified Order ID to the original order ID that their system recognizes.

For example the logic must be able to convert `order123-1647944535605` back to `order123`, by disregarding string after the last occurence of `-` character.

#### Using Custom Field
Alternatively, Merchant can optionally send `custom_field1` JSON body parameter with the original order_id when create payment link. Like so:
```json
{
 "transaction_details": {
   "order_id": "merchant-order-id-1",
   "gross_amount": 10000
 },
 "custom_field1": "merchant-order-id-1"
}
```

So that later when merchant receive the notification from Midtrans, the original order_id will be available on the HTTP Notification within the same `custom_field1` JSON property.

```json
{
 "va_numbers": [
   {
     "va_number": "00018929808",
     "bank": "bca"
   }
 ],
 "transaction_time": "2022-03-22 17:22:21",
 "transaction_status": "pending",
 "transaction_id": "1d02cdda-a424-4e6e-a711-154f004bc26d",
 "status_message": "midtrans payment notification",
 "status_code": 201,
 "signature_key": "caa79748f56892a8664633331d6b719320ccda008d44d10d56156988700ca37067b9d6531d0b4778366707ce0fb859ea6f38499f6f03283f48007e6d77956afe",
 "payment_type": "bank_transfer",
 "payment_amounts": [],
 "order_id": "merchant-order-id-1-1647944535605",
 "merchant_id": "G379181825",
 "gross_amount": 10000,
 "fraud_status": "accept",
 "custom_field1": "merchant-order-id-1",
 "currency": "IDR"
}
```

## Advanced Info
### Other API Actions & Payment Handling
<!-- @TODO: link to other available endpoints -->
Once customer has initiated the payment and payment is created on Midtrans side:
- Merchant can further perform [other API actions to the transaction](/en/after-payment/status-cycle.md#api-action-method).
- Other [After Payment sections explanations](/en/after-payment/overview.md) also applies to the payment transaction.

### Relation to Snap Payment Product
Under the hood, our Payment Link product utilize [Snap Payment](/en/snap/overview.md) product to present payment page. So, please note that most configurations, parameters, and behaviours of Snap Payment is also inherited by Payment Link. For example:
- [Finish Redirect configuration](#redirection-after-payment-complete)
- [Notification handling](#handling-notifications)
- [Applicable API Actions](#other-api-actions-amp-payment-handling)
- etc.

### Comparison to Snap Payment
Notable benefits & differences compared to [Snap Payment](/en/snap/overview.md) product:
- Support **more than 7 days expiry** period.
- Payment Link **can be paid more than once** or any specified limit. Snap Payment link can only be paid once.
- The **created payment links are visible and manageable** via Midtrans Dashboard.
- The resulting payment Order ID in Midtrans dashboard [will be appended with timestamp suffix.](#order-id-structure)

### Comparison to Payment Link via Dashboard
Notable benefits & differences compared to [Payment Link creation via Midtrans Dashboard](/en/payment-link/overview.md):
- Payment Link creation can be **programmatically automated, via system integration to our API** according to your business needs. Although you will need your development resource to integrate with the API we provide.
- Can be **programmatically integrated to the merchant's system**. Especially the backend system, store CMS, POS, Invoicing system, etc.

### Business Usecase Example
Here are some business use case ideas that merchant can achieve with Payment Link:
- **Invoice based payment system** use case. As the payment link expiry can be set to weeks or months. Can also be set to be paid by 1 specific customer, or mass generic invoice for a big number of customers.
  - Whether for B2B business type where merchant want to create goods & services payment invoice to be paid by partner/vendor/customer.
  - Or even for regular B2C business type that sells various goods & services.
- **Ticketing payment** use case, due to the same reason as above. For example tickets for transportations, entertainment, courses, digital products, conferences, webinars, online/offline event, concert, shows, meet and greet, parking, hotel, traffic/other violation sanction, & hospitality, etc.

### Note & Limitation
Notable limitations will be explained below.
#### API Beta Phase
This Payment Link API is still in <span class="badge badge-yellow">BETA</span> phase. But is currently usable for merchants on Midtrans Production environment.