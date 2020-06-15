## Accept Online Payments on Your Website and App {docsify-ignore}

<div class="my-card">

#### [Add Payment Page on Your Web & Web App (Snap) &#187;](/en/snap/overview.md#overview)
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

#### [Payment Page For Your Native Mobile App (Payment Mobile SDK) &#187;](https://mobile-docs.midtrans.com)
Easily embed our Android and iOS Mobile SDK within your app to start accepting payments natively within the app. We provide the drop-in User Interface to accept payment using multiple methods supported by Midtrans. Check out this [video](https://www.youtube.com/watch?v=EefsTMXCscg) for the default SDK example. Just like Snap, but for native mobile platforms.
</div>

<div class="my-card">

#### [Customize Your Own Payment Page (Core API) &#187;](/en/core-api/overview.md)
Need to customize the payment flow or user interface to fit your unique needs? We have Core API for your web, app, point of sales, IoT (or any internet-capable device) to connect with us and start accepting payments. Core API uses the familiar REST API standard with JSON-based payload.
</div>

<div class="my-card">

#### [Use CMS Payment Plugin &#187;](/en/snap/with-plugins.md)
Not a developer, or already using e-commerce Content Management System like Magento 2, WooCommerce, etc? Easily integrate with Midtrans payment page by installing plugin in a few simple clicks. 
</div>

<div class="my-card">

#### [Create Invoice via Payment Link &#187;](/en/payment-link/overview.md)
Whether you need to invoice your customers or want to receive payments without having a website, you can do it with Midtrans - as easy as sharing a link that redirects your customers to Midtrans's payment page. No technical integration is required, create links with just a few taps or clicks from our dashboard with customizable payment details just like an invoice.
</div>

## Misc {docsify-ignore}

<!-- TODO: write this page -->
<div class="my-card">

<!-- #### [Integrate Payment to POS &#187;](/en/pos/overview.md) -->
#### [Integrate Payment to POS &#187;](#accept-payment-on-point-of-sales-vending-machine-iot-devices-etc)
</div>