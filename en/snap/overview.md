Snap is a payment service that allows our partners to use Midtrans payments system, where Midtrans’ payment page pops-up on your web page after checkout. Setting up Snap is easy and there is no monthly fees. The simple and quick integration is suitable for any size of business spanning from small to corporate/unicorn size business.

![Snap Overview](./../../asset/image/snap-overview-main.png)

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
  " class="my-btn">Try Snap Demo &#9099;</button>
</p>

## Integration
**Choose** any of **one** integration method below that is suitable to your liking:

### A) Step by Step Guide
<sub><i>Including example for various programming languages</i></sub>
<br>
<div class="my-card">

#### [Integration Guide &#187;](/en/snap/integration-guide.md)
</div>

### B) Interactive Demo
<br>
<div class="my-card">

#### [Interactive Demo &#187;](/en/snap/interactive-demo.md)
</div>

### C) Install as Plugin / Module on Your CMS
Already using e-commerce CMS like: Wordpress Woocommerce, Magento, Prestashop, Opencart, WHMCS, etc? Simply install these plugins:

<div class="my-card">

#### [Install Snap as CMS Plugin &#187;](/en/snap/with-plugins.md)
</div>

### D) Using Ecommerce Platform
If you are using 3rd party E-commerce platform or SaaS like Shopify, Sirclo, Jejualan etc.

<div class="my-card">

#### [Using Ecommerce Platform &#187;](/en/snap/platform/overview.md)
</div>

### E) Download Sample Code
<br>
<div class="my-card">

#### [Sample Code Repo &#187;](/en/technical-reference/library-plugin.md#sample-code)
</div>
