
You can interactively try integration demo below. Inspect the source code and see the live output.

### Preparation
<br>
<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for an Account to get your Sandbox API keys ready to test integration.
</div>

<div class="my-card">

#### [Retrieve API Keys](/en/midtrans-account/overview.md#retrieving-api-access-keys)
Retrieve Sandbox mode API keys that will be used for this guide.
</div>

### Snap Integration Demo

#### Technology Stack

The sample integration's:
- **Backend** is **NodeJS** (hosted on CodeSandbox).
- **Frontend** is plain **HTML & Javascript**.

#### Demo Usage

You will see Snap Transaction Token as vizualization of API response on backend integration. Then you can click **"Proceed to Payment"** to test the frontend.

?> Please wait until the window/iframe below is fully loaded. It may take some time as it try to build the backend.

[Repl.it demo Midtrans NodeJS](https://codesandbox.io/embed/serene-bell-yfjjd?fontsize=14&hidenavigation=0&theme=dark ':include :type=iframe width=100% height=600px')

Click **"Open Sandbox"** to see/edit the full source code. You can modify and play with the sample code yourself, or simply copy it as reference to your own machine.

**Note**: In real case scenario, the `token_id` shouldn't necessarily be displayed to customer. This example display the `token_id` string to make it easier for you to understand the basic.

<br>
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

Now that you understand the basic of how Snap integration works, this is just demonstration of **Step 1 & Step 2** [explained in the guide](/en/snap/integration-guide.md?id=integration-steps). Please follow the next step from there.

<div class="my-card">

#### [Next Step](/en/snap/integration-guide.md?id=_4-handling-post-transaction)
Follow Snap integration Guide next steps, to proceed with complete integration.
</div>