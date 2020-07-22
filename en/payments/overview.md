## Payments Overview {docsify-ignore}

Midtrans helps your business to easily accept payments [from cards, bank transfer, wallets, over the counter, cardless credits, direct debit, and other methods](https://midtrans.com/payments); and helps you manage them.

<!-- TODO: put image of all payment methodss icon here? -->
<!-- ![payment methods](https://midtrans.com/assets/images/channels/payment-channels-sprite-v4.png) -->

Along with giving your customer freedom to pay with their favorite payment methods, we also offers various options for you to integrate. From the easiest to the most customizable. The choice is yours:

- [Get familiar with each options](#choose-integration-options)
- [Compare the differences](#integration-comparison)

Decide which is best suited for your needs. Or, if you're looking for integration method [for offline usecases, see here](#other-options).

## Choose Integration Options {docsify-ignore}

<div class="my-card">

#### [Built-In Interface (Snap) for Your Web & App](/en/snap/overview.md)
Securely accept payment on your web and app with few simple steps! Your customer will be presented with a sleek, mobile-friendly interface to do payment with, straight inside your web and app in the form of a pop-up dialogue box (or redirected to Midtrans' url if you choose to). With single integration, Snap user interface allows you to accept payment with [all Midtrans' various payment methods](https://midtrans.com/payments).
<br> <!-- TODO: use better CORS proxy, cors-anywhere is limited per referrer domain  -->
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
    .catch( e=>{ console.error(e); window.open('https://demo.midtrans.com', '_blank'); } )
    .finally( e=>{ event.target.innerText = `Pay with Snap ⎋` })
  " class="my-btn">Try Snap Payment Interface ⎋</button>
</p>
<div style="text-align: center;">

<sup>[Try out the quick (less than 5 mins) integration sample!](/en/snap/interactive-demo.md)</sup>
</div>
</div>

<div class="my-card">

#### [Native Mobile App SDK](https://mobile-docs.midtrans.com)
Easily embed our Android and iOS Mobile SDK within your app to start accepting payments natively within the app. We provide the drop-in User Interface to accept payment using multiple methods supported by Midtrans. Just like Snap, but for native mobile platforms.
<!-- <details>
<summary><b>Try Mobile SDK via Android Simulator</b></summary>
<article>
<div style="text-align: center;">
<iframe src="https://appetize.io/embed/9r0b89zu862f8eu1ukd0ecpgxc?device=nexus5&scale=75&orientation=portrait&osVersion=8.1"width="300px" height="600px" frameborder="0" scrolling="no"></iframe>
</div>
</article>
</details> -->
</div>

<div class="my-card">

#### [Custom Interface (Core API)](/en/core-api/overview.md)
Need to customize the payment flow or user interface to fit your unique needs? We have Core API for your web, app, point of sales, IoT (or any internet-capable device) to connect with us and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Payment Link](/en/payment-link/overview.md)
Whether you need to invoice your customers or want to receive payments without having a website, you can do it with Midtrans - as easy as sharing a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details just like an invoice.
</div>

<div class="my-card">

#### [CMS Payment Plugins](/en/snap/with-plugins.md)
Not a developer, or already using e-commerce Content Management System like **Wordpress-Woocommerce, Magento, Prestashop, Opencart, WHMCS**, etc? Easily integrate with Midtrans payment page by installing plugin in a few simple clicks. 
</div>

<div class="my-card">

#### [Ecommerce Platform](/en/snap/platform/overview.md)
Ready to use, user friendly, and require very minimal setup. You can simply integrate Midtrans to start accepting payment with 3rd party platform like **Shopify, Sirclo, Jejualan**, etc.
</div>

## Integration Comparison {docsify-ignore}

| Integration Type | Features | Sample Use Case |
| --- | --- | --- |
| **Built-in Interface** (Snap) | • All-in-one payment UI that can display all available payment methods. <br>• Quick, you can integrate just one time, and new payment methods will be auto added within it. <br>• Can customize the displayed payment methods, and expiry time via Dashboard or API param. <br>• Customizable display name, brand logo, and theme color. | • You want an easy way to integrate payment quickly, which allow some customization. <br>• Your platform is web based or able to display web based payment page (webview). <br><br>**Can either:** <br>• Embed payment page directly within your web & app (via webview) using our Javascript library, or <br>• Redirect customer to Midtrans-hosted payment web page. |
| **Native Mobile App SDK** | • About the same features as above, but optimized for native Android & iOS app, instead of web. <br>• Integrate by importing our SDK within your app codebase.  | • Your business is native mobile app based, for Android & iOS. <br>• You want to integrate payment quickly for mobile app, with native performance & feels.
| **Custom Interface** (Core API) | • Freedom to render and customize your own payment interface (UI).<br> • Build your own payment interface (UI) for each payment methods. <br>• Utilize API only, can be used for non-web/app, like hardware device or custom software. <br>• Further advanced features, like on-demand recurring charges. | • You want to fully customize the payment interface/UI, for each payment methods. <br>• Your business probably unable to use web/app based integration (e.g: Vending Machine, POS, hardware devices, etc). <br>• Your business is probably PCI compliant. |
| **Payment Link** | • Require no code or programming <br>• Create payment link from Midtrans Dashboard, with easy to use UI. <br> • Copy-paste the payment link to anywhere you need; Blog post, social media, messanger, WA, IG, email, etc.  | • You want to quickly invoice your customer without any complex system/integration. <br>• You are a social media based seller. <br>• You are selling product at certain price for many potential customers (e.g: webinar tickets, virtual products, etc.). |
| **CMS Payment Plugins** | • As feature rich as Snap <br>• Designed for simple installation & usage for each CMS, no programming needed. | • You want same benefit as Snap, without complexity of manual programming/integration.<br>• You already (or want to) use ready-to-use CMS like: Wordpress, Magento, Prestashop, WHMCS, etc. |
| **Ecommerce Platform** | • As feature rich as Snap <br>• Designed for simple installation & usage for 3rd party ecommerce platform, no programming needed. | • You want same benefit as Snap, without complexity of manual programming/integration.<br>• You already (or want to) use ready-to-use Platform like: Shopify, Sirclo, Jejualan etc. |


?> **Note:** Those sample use case **does not limit** how you could fits the integration-type with your own unique requirement. You can get creative and go beyond those sample use case, and invent your own use case for that type of integration.

## Other Options {docsify-ignore}
- [**Gopay Integration for POS**](https://midtrans-advanced-faq.netlify.com/#/partner-gopay-pos): For business with non conventional web/app platform like: vending machine, TV box, IoT, point of sales, etc. as long as it connect to the internet, it can be integrated with **Core API** to start accepting payment on the device. With Core API device can easily integrate via API call/command as communication medium.

## Next Step {docsify-ignore}
<br>

<div class="my-card">

#### [Sign Up for Midtrans Account](/en/midtrans-account/overview.md)
Sign up for an Account to get your Sandbox API keys ready to test integration. Also the production mode to start accepting real payment.
</div>

<div class="my-card">

#### [Explore Integration Options](#choose-integration-options)
Check out all the available choices and learn the integration.
</div>