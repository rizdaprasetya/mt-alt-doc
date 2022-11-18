# Interactive Demonstration of Snap Integration
<hr>

Step 1 and Step 2 in [Snap Integration Overview](/en/snap/overview.md) is explained here using interactive demonstration. You can try the *Snap* integration demo given below. You can also observe the source code and see the real-time output.

## Requirements
Midtrans Account and API keys will be used in this integration, but we will be using a predefined demo keys.

## Specifications
- **Backend**: This demo is using **NodeJS** (hosted on CodeSandbox) for simplicity, but you can use any backend language.
- **Frontend**: HTML and JavaScript.

## Usage Explanation
You will observe the basic implementation flow of creating payment page via *Snap API*.

1. Click **Proceed to Payment** to test the frontend.

?> ***Note***: Please wait until the window/iframe below is fully loaded. It may take some time while it tries to build the backend.

[CodeSandbox demo Midtrans NodeJS](https://codesandbox.io/embed/serene-bell-yfjjd?fontsize=14&hidenavigation=0&theme=dark ':include :type=iframe width=100% height=600px')

2. Click **Open Sandbox** to view and edit the full source code. You can modify with the sample code or copy it as a reference to your local machine.

?>***Note***: In real-case scenario, the `token_id` may not be displayed to the customer. In the example shown, the `token_id` string is displayed to make it easy to understand the basic integration.

<!-- @WIP: Doesnt work yet -->
<!-- <br>

<details>
<summary><b>Alternative Backend Integration Sample</b></summary>
<article>

A Sample backend integration hosted on RunKit is shown below. Click **Run** to run the backend code.

<script type="text/javascript">
var script = document.createElement('script');
script.src = 'https://embed.runkit.com';
script.setAttribute('data-element-id','snap-backend-demo');
</script>
</div>

</article>
</details> -->

<details>
<summary><b>Alternative Frontend Integration Sample</b></summary>
<article>

A sample frontend integration, hosted on JSFiddle is shown below.
1.  Enter the value of `snap_transaction_token` in **Snap Token** field.
2.  Click **Pay**.
3.  Click **HTML** to see the source code.

<!-- [JSFiddle demo Snap.js](https://jsfiddle.net/d4mx1gkc/11/embedded/result,html/dark ':include :type=iframe width=100% height=400px') -->

<iframe width="100%" height="750" src="//jsfiddle.net/kntfdzob/embedded/result,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</article>
</details>

## Testing Payment
You can perform successful transaction by entering the card credentials given below.

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month in MM format. For example, `02`.
Exp Year | Any future year, in YYYY format. For example, `2025`.
OTP/3DS | `112233`

For more test payment credentials, refer to [Testing Payments on Sandbox](/en/technical-reference/sandbox-test.md).

## Next Step

<div class="my-card">

#### [Get Your Own API Keys](/en/snap/preparation.md)
Sign up for Midtrans account and retrieve your API keys.
</div>

<div class="my-card">

#### [Handling After Payment](/en/snap/integration-guide.md#_4-handling-after-payment)
This was a simplified demonstration of Step 1 and Step 2 on [Snap Integration Guide](/en/snap/integration-guide.md#steps-for-integration). Please follow the next steps given in the [Snap Integration Guide](/en/snap/integration-guide.md#id=steps-for-integration) to proceed with the complete integration.
</div>
