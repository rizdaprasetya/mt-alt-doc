The steps to do technical integration of Snap will be explained below

## Integration Steps
1. Obtain Transaction `token` on Backend
2. Show Snap Payment Page on Frontend
3. Creating Test Payment
4. Handling Post-Transaction

?>**Note:**
All the steps below are using Midtrans Sandbox environment, not production, to easily test the      integration process. Make sure are switching to Sandbox mode on your Midtrans account dashboard while retrieving Server Key and Client Key. Explained in Midtrans Account.

## 1. Obtain Transaction Token on Backend

API request should be done from Merchant’s backend to acquire Snap transaction `token` by providing payment information & Server Key. There are at least 3 components that are required to obtain the Snap token:

Requirement | Description
--- | ---
Server Key| Explained on [previous section](/en/midtrans_account/overview.md)
`order_id`| Transaction order ID, defined from your side
`gross_amount`| Total amount of transaction, defined from your side

### API Request

The example below shows a sample codes to obtain transaction token:
<!-- tabs:start -->
#### **API Request**

*This is an example in Curl, please implement according to your backend language, you can switch to other language on the "tab" above. (you can also check our [available language libraries](/en/developer_resource/library_plugin))*

#### Request Details
Type | Value
--- | ---
HTTP Method | `POST`
API endpoint | `https://app.sandbox.midtrans.com/snap/v1/transactions`

#### HTTP Headers
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Snap validates HTTP request by using Basic Authentication method. The username is your Server Key while the password is empty. The authorization header value is represented by AUTH_STRING. AUTH_STRING is base-64 encoded string of your username & password separated by **:** (colon symbol).

#### Full HTTP Request

Full request in CURL:
```bash
curl -X POST \
  https://app.sandbox.midtrans.com/snap/v1/transactions \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json' \
  -d '{
    "transaction_details": {
        "order_id": "YOUR-ORDERID-123456",
        "gross_amount": 10000
    }, 
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
}'
```

#### **Node JS**

```
Bonjour!
```

#### **Python**

```
Ciao!
```
<!-- tabs:end -->

?> **Optional:** You can customize `transaction_details` data. To include data like `customer_details`, `item_details`, etc. It's recommended to send as much detail so on report/dashboard those information will be included.

### API Response

You will receive API Response like the following:
```json
{
  "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url":"https://app.sandbox.midtrans.com/snap/v2/vtweb/66e4fa55-fdac-4ef9-91b5-733b97d1b862"
}
```

### Other Sample Response

Status Code | Description | Example
--- | --- | ---
201 | Success to create token | "token":"66e4fa55-fdac-4ef9-91b5-733b97d1b862"
401 | Failed. Wrong authorization sent  | "Access denied, please check client or server key"
4xx | Failed. Wrong parameter sent. Follow the error_message and check your parameter | "transaction_details.gross_amount is not equal to the sum of item_details"
5xx | Failed. Midtrans internal error. Most of the time this is temprorary, you can retry the request later | "Sorry, we encountered internal server error. We will fix this soon."

<br><br>

## 2. Show Snap Payment Page on Frontend

To show Snap payment page within your site, include `snap.js` library into your payment page HTML.

There are at least 3 components that are required to do this:

Requirement | Description
--- | ---
Client Key | Explained on [previous section](/en/midtrans_account/overview.md)
`snap.js` url | `https://app.sandbox.midtrans.com/snap/snap.js`
transaction `token` | retrieved from backend on [previous step](#_1-obtain-transaction-token-on-backend)

You will need to put your Client Key as the value of `data-client-key` attribute in snap.js script tag. Then you can start the payment process by calling `snap.pay` with transaction `token`.


```html
<html>
  <head>
    <script 
      type="text/javascript"
      src="https://app.sandbox.midtrans.com/snap/snap.js"
      data-client-key="SET_YOUR_CLIENT_KEY_HERE"
    ></script>
  </head>

  <body>
    <button id="pay-button">Pay!</button>
    <script type="text/javascript">
      var payButton = document.getElementById('pay-button');
      // For example trigger on button clicked, or any time you need
      payButton.addEventListener('click', function () {
        snap.pay('SNAP_TRANSACTION_TOKEN'); // Replace it with your transaction token
      });
    </script>
  </body>
</html>
```

Referring to the steps above, the sample displayed Snap page is as follows:

![Snap Popup Preview](./../../asset/image/snap-popup-preview.gif)

Or try the demo here:

<p style="text-align: center;">
  <button onclick="
  event.target.innerText = `Processing...`;
  fetch(`https://cors-anywhere.herokuapp.com/https://midtrans.com/api/request_snap_token`)
    .then(res=>res.json())
    .then(res=>{
      let snapToken = res.token;
      snap.pay(snapToken,{
        onSuccess: function(res){ console.log('Snap result:',res) },
        onPending: function(res){ console.log('Snap result:',res) },
        onError: function(res){ console.log('Snap result:',res) },
      });
    })
    .catch( e=>console.error(e) )
    .finally( e=>{ event.target.innerText = `Pay with Snap &#9099;` })
  " class="my-btn">Try Snap Demo &#9099;</button>
</p>

>**Viewport Meta Tag:** To ensure that Snap popup modal is displayed correctly on a mobile device, please include the viewport meta tag inside your `<head>` tag. The most common implementation:
`<meta name="viewport" content="width=device-width, initial-scale=1">`

?> **Alternatively**, you can also use `redirect_url` retrieved from backend on [previous step](#_1-obtain-transaction-token-on-backend) to redirect customer to Midtrans-hosted payment page. This can be useful if you don't want or can't display payment page on your web page.

After payment completed, customer will be redirected back to `Finish URL` specified on Midtrans Dashboard, under menu **Settings > Snap Preference > System Settings > `Finish URL`**


## 3. Creating Test Payment

Create a test payment to make sure you have integrated Snap successfully. You can refer to test credentials [available on our sandbox payment simulator]

![Snap Test Transaction](./../../asset/image/snap-test-transaction.gif)

## 4. Handling Post-Transaction

Other than customer being redirected, when the status of payment is updated/changed (i.e: payment has been successfully received), Midtrans will send **HTTP Notification** (or webhook) to your server's `Notification Url` (specified on Midtrans Dashboard, under menu **Settings > Configuration `Notification URL`**). Follow this link for more details:

<div class="my-card">

#### [&#187; Handling Webhook HTTP Notification](/en/)

</div>

#### Next Step:
<br>
<div class="my-card">

#### [&#187; Taking Action of Payment](/en/)

</div>
<div class="my-card">

#### [&#187; Transaction Status Cycle and Action](/en/)

</div>
<div class="my-card">

#### [&#187; Snap Advanced Integration](/en/)

</div>

#### Reference:

> Integration sample codes are also available on our Github repos:
- [PHP](https://github.com/Midtrans/midtrans-php/tree/master/examples)
- [Java](https://github.com/Midtrans/midtrans-java/tree/master/example)
- [NodeJS](https://github.com/Midtrans/midtrans-nodejs-client/tree/master/examples)
- [Python](https://github.com/Midtrans/midtrans-python-client/tree/master/examples)