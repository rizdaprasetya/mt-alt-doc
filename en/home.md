# Home

<TODO: elaborate about overall midtrans product>

Midtrans helps your business to easily accept payments, disburse payments, and more in automated manners. Get to know the technical details and documentation of each product below.

<br>

# Our Product

## Accept Payment / Payment In

<div class="my-card">

### &#9099; Snap
Securely accept payment on your web and app with few simple steps! Your customer will be presented with a sleek, mobile-friendly interface to do payment with, straight inside your web and app in the form of a pop-up dialogue box (or redirected to Midtrans' url if you choose to). With single integration, Snap user interface allows you to accept payment with Midtrans' various payment methods (link to payment methods). 

Try it yourself:

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
" class="my-btn">Pay with Snap &#9099;</button>
</div>

<div class="my-card">

### &#9099; Mobile SDK
Easily embed our Android and iOS Mobile SDK within your app to start accepting payments natively within the app. We provide the drop-in User Interface to accept payment using multiple methods supported by Midtrans. Check out this [video](https://www.youtube.com/watch?v+EefsTMXCscg) for the default SDK example. Just like Snap, but for native mobile platforms.
</div>

<div class="my-card">

### &#9099; Customize your own (Core API)
Need to customize the payment flow or user interface to fit your unique needs? We have Core API for your web, app, point of sales, IoT (or any internet-capable device) to connect with us and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

### &#9099; Payment Link
Whether you need to invoice your customers or want to receive payments without having a website, you can do it with Midtrans - as easy as sharing a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details just like an invoice.
</div>

## Disbursement / Payout

<div class="my-card">

### &#9099; IRIS
<TODO: elaborate>
</div>


<br> <br>


# Choose based on Business Use Cases

Here are some popular use cases that may help you choose

#### Accept payment on your e-commerce web, app

Accept payment from your customer straight within your website/app with [Card Transaction, Bank Transfer, Direct Debit, E-Wallet, and more](link to payment methods page) as payment methods. Use [Snap beautiful interface](link to snap) or [Customizable Core API](link to core API) to enable your web and app to accept payment securely in a few simple steps.

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
