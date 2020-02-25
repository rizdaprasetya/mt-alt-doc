<hr>

[![Midtrans Logo](/asset/image/main/midtrans-logo.svg ':size=220')](https://midtrans.com)<hr>

Midtrans helps your business to easily accept payments, disburse payments, and more in automated manners. Get to know the technical details and documentation of each product below.

<!-- TODO: add more image for each product so it doesn't look to plain? -->
## Accept Online Payments on Your Website and App {docsify-ignore}

<div class="my-card">

#### [Use Midtrans Checkout Page (SNAP Checkout) &#187;](/en/snap/overview.md#overview)
Securely accept payment on your web and app with few simple steps! Your customer will be presented with a sleek, mobile-friendly interface to do payment with, straight inside your web and app in the form of a pop-up dialogue box (or redirected to Midtrans' url if you choose to). With single integration, Snap user interface allows you to accept payment with Midtrans' [various payment methods](https://midtrans.com/payments).
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
    .finally( e=>{ event.target.innerText = `Pay with Snap &#9099;` })
  " class="my-btn">Try Snap Payment Interface &#9099;</button>
</p>
<div style="text-align: center;">

<sup>[Try out the quick (less than 5 mins) integration sample!](/en/snap/interactive-demo.md)</sup>
</div>
</div>

<div class="my-card">

#### [Mobile SDK &#187;](https://mobile-docs.midtrans.com)
Easily embed our Android and iOS Mobile SDK within your app to start accepting payments natively within the app. We provide the drop-in User Interface to accept payment using multiple methods supported by Midtrans. Check out this [video](https://www.youtube.com/watch?v=EefsTMXCscg) for the default SDK example. Just like Snap, but for native mobile platforms.
</div>

<div class="my-card">

#### [Build Your Own Checkout Page (Core API) &#187;](/en/core-api/overview.md)
Need to customize the payment flow or user interface to fit your unique needs? We have Core API for your web, app, point of sales, IoT (or any internet-capable device) to connect with us and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Use CMS Payment Plugin &#187;](/en/snap/with-plugins.md)
Not a developer, or already using e-commerce CMS? Integrate to Midtrans via your choice of CMS plugin in a few simple clicks. 
</div>

<div class="my-card">

#### [Create Invoice via Payment Link &#187;](/en/payment-link/overview.md)
Whether you need to invoice your customers or want to receive payments without having a website, you can do it with Midtrans - as easy as sharing a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details just like an invoice.
</div>

## Pay Out / Disburse Fund {docsify-ignore}

<div class="my-card">

#### [Pay Out via Iris Disbursement System &#187;](https://iris-docs.midtrans.com/)

Pay out money to your partners, sellers, customers, vendors or any third parties with our Iris Disbursement system. Whether you have a marketplace or business needing to disburse money to your sellers, doing payrolls transfers to your employees, all of your payout needs can be catered by Iris. Iris supports disbursing money to Gopay accounts or any kind of bank accounts in Indonesia.
</div>

## Misc {docsify-ignore}

<!-- TODO: write this page -->
<div class="my-card">

<!-- #### [Integrate Payment to POS &#187;](/en/pos/overview.md) -->
#### [Integrate Payment to POS &#187;](#accept-payment-on-point-of-sales-vending-machine-iot-devices-etc)
</div>

<br> <br>


# Choose based on Business Use Cases {docsify-ignore}

Here are some popular use cases that may help you choose:

#### Accept payment on your e-commerce web, app

Accept payment from your customer straight within your website/app with Card Transaction, Bank Transfer, Direct Debit, E-Wallet, [and more](https://midtrans.com/payments) as payment methods. Use [Snap beautiful interface](/en/snap/overview.md) or [Customizable Core API](/en/core-api/overview.md) to enable your web and app to accept payment securely in a few simple steps.

#### Subscription / Recurring Service

Charge customer for recurring payment. For example payment of repeat item purchase, subscription, membership, or billing with flexible interval period according to your business needs. So your customer can be automatically charged via Midtrans, without asking your customer to do manual payment each time. Recurring payment is available via [Snap](/en/snap/advanced-feature.md#recurring-subscription-card-transaction) and [Core API](/en/core-api/advanced-features.md#recurringone-click-transaction) product. \**Recurring only available for some specific payment channels*.

#### Sending Payment Invoices via Email, Link, Whatsapp, Instagram, Social Media, Messaging App, etc
<!-- <TODO: elaborate payment link or maybe also selly?> -->
Accept payment and invoice your customer via [Payment Link](/en/payment-link/overview.md). You will only need to login via browser to Midtrans Dashboard, generate payment link, and then send the link to your customers via your favorite messaging app. Whether you are selling stuff on social media, freelancer, service provider, teacher, business that need to quickly invoice payment to specific customers, etc.

#### Accept payment on Point of Sales, Vending Machine, IoT devices, etc

For business with non conventional web/app platform like: vending machine, TV box, IoT, point of sales, etc. as long as it connect to the internet, it can be integrated with [Midtrans Core API](/en/core-api/overview.md) to start accepting payment on the device. With Core API device can easily integrate via API call/command as communication medium. There is [specific Gopay guide for this type of integration](https://midtrans-advanced-faq.netlify.com/#/partner-gopay-pos).

#### Paying out users/merchants on your platform
<!-- <TODO: elaborate iris> -->
Owning Ecommerce marketplace/platform (whether it is B2C, B2B, or any other model) that connect services/goods seller to buyer, will require solution to easily manage payout or disburse fund to huge number of sellers and buyers. We got this covered with easy to use, automation ready [Fund Disbursement System: Iris](https://midtrans.com/iris).

#### Paying out vendors/contractors of your business
<!-- <TODO: elaborate iris> -->
Owning big business (whether online, offline, or traditional business) means having to deal with a lot of vendors, contractors, and suppliers. It require solution to easily manage payment-out or transfer of fund to them. We got this covered with easy to use, automation ready [Fund Disbursement System: Iris](https://midtrans.com/iris).

<!-- < TODO:Add More Use Case> -->
<!-- Case Topup -->

# Non Technical Person? {docsify-ignore}

<!-- <TODO: elaborate plugin, payment link, or snap plugin for non-dev reader> -->

Not familiar with programming, technical integration, and all the complexity? We have a way for you to integrate without any technical knowledge:

- Simplest way to use Midtrans to accept payment without website or technical knowledge is via [**Payment Link**](/en/payment-link/overview.md). You will only need to login via browser to Midtrans Dashboard, generate payment link, and then send the link to your customers.

- Did you know you can use ready to use Content Management System (CMS) to create online store? Are you familiar with CMS like: **Wordpress - Woocommerce, Magento, Prestashop, Opencart, WHMCS**, etc. ? You can setup those CMS online mostly without any programming knowledge, and then install Midtrans plugin/extension to start accepting payment right away! With useful feature of payment status on the CMS will automatically be updated in accordance to real time payment status provided by Midtrans. Check out [Midtrans list of supported CMS plugin/extension](/en/snap/with-plugins.md).

- Did you know there are also 3rd party Ecommerce solution like **Shopify, Sirclo, Jejualan**, etc. that are ready to use, easy to use, user friendly, and require very minimal setup? You can simply integrate Midtrans to start accepting payment with those 3rd party platform. Check out [Midtrans list of supported 3rd party Ecommerce platform](/en/snap/platform/overview.md).