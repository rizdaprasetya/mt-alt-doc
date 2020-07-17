Snap is a payment service that allows our partners to use Midtrans payments system, where Midtrans’ payment page pops-up on your web page after checkout. Setting up Snap is easy and there is no monthly fees. The simple and quick integration is suitable for any size of business spanning from small to corporate/unicorn size business.

 With single integration, Snap user interface allows you to accept payment with [all Midtrans' various payment methods](https://midtrans.com/payments).

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

## Available Ways to Integrate {docsify-ignore}
**Choose** any of **one** integration method below that is suitable to your liking:

<div class="my-card">

#### [A. Integration Guide](/en/snap/integration-guide.md)
Easy to follow step by step basic integration guide. Also includes example for various programming languages.
</div>

<div class="my-card">

#### [B. Interactive Demo](/en/snap/interactive-demo.md)
Quickly understand how integration works by looking at an interactive code example, which the output is displayed in real-time. That you can replicate yourself within few minutes.
</div>

<div class="my-card">

#### [C. Install Snap as CMS Plugin](/en/snap/with-plugins.md)
Simply install these ready to use plugins to start integration with e-commerce CMS like: Wordpress Woocommerce, Magento, Prestashop, Opencart, WHMCS, etc.
</div>

<div class="my-card">

#### [D. Using Ecommerce Platform](/en/snap/platform/overview.md)
Use 3rd party E-commerce platform solutions (SaaS like Shopify, Sirclo, Jejualan etc.) to quickly integrate with Midtrans.
</div>

<div class="my-card">

#### [E. Sample Code Repo](/en/technical-reference/library-plugin.md#sample-code)
Collections of integration code examples for various programming languages, available as public Github repositories.
</div>


## Advanced Usage {docsify-ignore}

<div class="my-card">

#### [Snap Advanced Feature](/en/snap/advanced-feature.md)
Learn the various useful features that Snap API provides.
</div>