# Overview

Midtrans helps your business to easily accept payments, disburse payments, and more in automated manners. Get to know the technical details and documentation of each product below.

<br>

## Accept Online Payments on Your Website and App

<div class="my-card">

#### [Use Midtrans Checkout Page (SNAP Checkout) &#187;](/en/snap/overview.md?id=overview)
Securely accept payment on your web and app with few simple steps! Your customer will be presented with a sleek, mobile-friendly interface to do payment with, straight inside your web and app in the form of a pop-up dialogue box (or redirected to Midtrans' url if you choose to). With single integration, Snap user interface allows you to accept payment with Midtrans' [various payment methods](https://midtrans.com/payments).
<br>
<p style="text-align: center;">
	<button onclick="
	let label = event.target.innerText;
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
		.finally( e=>{ event.target.innerText = label })
	" class="my-btn">Try Snap Demo &#9099;</button>
</p>
</div>

<div class="my-card">

#### [Mobile SDK &#187;](https://mobile-docs.midtrans.com)
Easily embed our Android and iOS Mobile SDK within your app to start accepting payments natively within the app. We provide the drop-in User Interface to accept payment using multiple methods supported by Midtrans. Check out this [video](https://www.youtube.com/watch?v=EefsTMXCscg) for the default SDK example. Just like Snap, but for native mobile platforms.
</div>

<div class="my-card">

#### [Build Your Own Checkout Page (Core API) &#187;](/en/core-api/overview.md?id=overview)
Need to customize the payment flow or user interface to fit your unique needs? We have Core API for your web, app, point of sales, IoT (or any internet-capable device) to connect with us and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Use CMS Payment Plugin &#187;](/en/snap/overview.md?id=c-install-as-cms-plugin-module)
Not a developer, or already using e-commerce CMS? Integrate to Midtrans via your choice of CMS plugin in a few simple clicks. 
</div>

<div class="my-card">

#### [Create Invoice via Payment Link &#187;](/en/payment-link/overview.md?id=overview)
Whether you need to invoice your customers or want to receive payments without having a website, you can do it with Midtrans - as easy as sharing a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details just like an invoice.
</div>

## Pay Out / Disburse Fund

<div class="my-card">

#### [Pay Out via Iris Disbursement System &#187;](/en/iris/overview.md?id=overview)

Pay out money to your partners, sellers, customers, vendors or any third parties with our Iris Disbursement system. Whether you have a marketplace or business needing to disburse money to your sellers, doing payrolls transfers to your employees, all of your payout needs can be catered by Iris. Iris supports disbursing money to Gopay accounts or any kind of bank accounts in Indonesia.
</div>

## Misc

<div class="my-card">

#### [Integrate Payment to POS &#187;](/en/pos/overview.md?id=overview)
</div>

<br> <br>


# Choose based on Business Use Cases

Here are some popular use cases that may help you choose

#### Accept payment on your e-commerce web, app

Accept payment from your customer straight within your website/app with [Card Transaction, Bank Transfer, Direct Debit, E-Wallet, and more](https://midtrans.com/payments) as payment methods. Use [Snap beautiful interface](/en/snap/overview.md) or [Customizable Core API](/en/core-api/overview.md) to enable your web and app to accept payment securely in a few simple steps.

#### Subscription / Recurring Service

<TODO: elaborate>

#### Sending Payment Invoices via Email, Link, Whatsapp, Instagram, Social Media, Messaging App, etc

<TODO: elaborate payment link or maybe also selly?>

#### Accept payment on Point of Sales, IoT devices, etc

<TODO: elaborate>

#### Paying out users/merchants on your platform

<TODO: elaborate iris>

#### Paying out vendors/contractors of your business

<TODO: elaborate iris>

#### <Add More Use Case>

# Non Technical Person? 

<TODO: elaborate plugin, payment link, or snap plugin for non-dev reader>

Not familiar with coding, technical integration, and all the complexity? We have a way for you to integrate without any technical knowledge.
