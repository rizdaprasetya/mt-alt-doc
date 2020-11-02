# Snap Interactive Integration Demo
<hr>
Snap integration is explained here using interactive demonstration. You can try the Snap integration demo given below. You can inspect the source code and see the real-time output.


### Preparations
<br>
<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for a Midtrans Merchant Administration Portal (MAP) account, to get your API Keys for *Sandbox* environment and to test integration.
</div>

<div class="my-card">

#### [Retrieving API Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
Retrieve API Keys for *Sandbox* environment that will be used for this guide.
</div>

### Technology Stack

For the sample given here, the **backend** is **NodeJS** (hosted on CodeSandbox) and **frontend** is plain **HTML & Javascript**.

### Usage Explanation

You will see Snap Transaction Token as a vizualization of API response on backend integration. 

1. Click **Proceed to Payment** to test the frontend.

?> Please wait until the window/iframe below is fully loaded. It may take some time while it tries to build the backend.

[Codesandbox demo Midtrans NodeJS](https://codesandbox.io/embed/serene-bell-yfjjd?fontsize=14&hidenavigation=0&theme=dark ':include :type=iframe width=100% height=600px')

2. Click **Open Sandbox** to see and edit the full source code. You can modify with the sample code or copy it as reference to your own machine.

?>***Note***: In real-case scenario, the `token_id` may not be displayed to the customer. In the example, the  `token_id` string is displayed to make it easier for you to understand the basic.

<!-- @WIP: Doesnt work yet -->
<!-- <br>

<details>
<summary><b>Alternative Backend Integration Sample</b></summary>
<article>

Another sample backend integration (hosted on Runkit). Click **"Run"** to run the backend code.

<script type="text/javascript">
var script = document.createElement('script');
script.src = 'https://embed.runkit.com';
script.setAttribute('data-element-id','snap-backend-demo');
</script>
</div>

</article>
</details> -->

<br>
<details>
<summary><b>Alternative Frontend Integration Sample</b></summary>
<article>
A sample frontend integration, hosted on JSFiddle is shown below.

1.  Enter the `snap_transaction_token` in **Snap Token** field.
2. Click **Pay**.
3. Click **HTML** to see the source code.

<!-- [JSFiddle demo Snap.js](https://jsfiddle.net/d4mx1gkc/11/embedded/result,html/dark ':include :type=iframe width=100% height=400px') -->

<iframe width="100%" height="750" src="//jsfiddle.net/kntfdzob/embedded/result,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</article>
</details>

### Create Test Payment

You can use the following test credentials for *Card* Payment method.

Name | Value
--- | ---
Card Number | 4811 1111 1111 1114 
CVV | 123 
Exp Month | Any month (e.g: `02`)
Exp Year | Any future year (e.g: `2025`)
OTP/3DS | 112233 

Refer to [Testing Payments on Sandbox](/en/technical-reference/sandbox-test.md) for more test payment credentials.

<div class="my-card">

#### [Next Step](/en/snap/integration-guide.md?id=_4-handle-after-payment)
This was a demonstaration of Step 1 and Step 2 on [Snap Integration Guide](/en/snap/integration-guide.md?id=integration-steps). Please follow the next steps given in the [Snap Integration Guide]((/en/snap/integration-guide.md?id=integration-steps)) to proceed with the complete integration.
</div>