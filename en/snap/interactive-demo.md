
You can interactively try integration demo below. Inspect the source code and see the live output.

### Preparation
<br>
<div class="my-card">

#### [Sign Up for Midtrans Account &#187;](/en/midtrans-account/overview.md)
Sign up for an Account to get your Sandbox API keys ready to test integration.
</div>

<div class="my-card">

#### [Retrieve API Keys &#187;](/en/midtrans-account/overview.md#retrieving-api-access-keys)
Retrieve Sandbox mode API keys that will be used for this guide.
</div>

### Snap Integration Demo

Sample backend integration in NodeJS (hosted on CodeSandbox), and frontend integration in HTML+Javascript. Please wait until the window/iframe below is fully loaded, you will see Snap Transaction Token as as result of API response on backend, and you can click **"Pay"** to test the frontend. Click **"Open Sandbox"** to see/edit the full source code.

[Repl.it demo Midtrans NodeJS](https://codesandbox.io/embed/serene-bell-yfjjd?fontsize=14&hidenavigation=0&theme=dark ':include :type=iframe width=100% height=600px')

<details>
<summary><b>Alternative Frontend Integration Sample</b></summary>
<article>

Another sample frontend integration (hosted on JSFiddle). Input the Snap Transaction Token from step 1 (backend) to below field, then click **"Pay"**. Click **"HTML"** to see the source code.

<!-- [JSFiddle demo Snap.js](https://jsfiddle.net/d4mx1gkc/11/embedded/result,html/dark ':include :type=iframe width=100% height=400px') -->

<iframe width="100%" height="750" src="//jsfiddle.net/kntfdzob/embedded/result,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</article>
</details>

### Creating Test Payment

You can use one of our test credentials for Card Payment:

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month (e.g: `02`)
Exp Year | Any future year (e.g: `2025`)
OTP/3DS | `112233`

You can use more test payment credentials [available on our sandbox payment simulator](/en/technical-reference/sandbox-test.md)

### What's Next

This is just demonstration of **Step 1 & Step 2** [explained in the guide](/en/snap/integration-guide.md?id=integration-steps). Please follow the next step from there.

<div class="my-card">

#### [Next Step &#187;](/en/snap/integration-guide.md?id=_4-handling-post-transaction)
Follow Snap integration Guide next steps, to proceed with complete integration.
</div>