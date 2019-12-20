## Overview

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
    .catch( e=>console.error(e) )
    .finally( e=>{ event.target.innerText = `Pay with Snap &#9099;` })
  " class="my-btn">Try Snap Demo &#9099;</button>
</p>

## Integration

Choose any of one integration method below that is suitable to your liking:

### A) Step by Step Guide
<br>
<div class="my-card">

#### [Integration Guide](/en/snap/integration-guide)
</div>

### B) Follow Sample Code
<br>
<div class="my-card">

#### [PHP](https://github.com/Midtrans/midtrans-php/tree/master/examples)
</div>
<div class="my-card">

#### [Java](https://github.com/Midtrans/midtrans-java/tree/master/example)
</div>
<div class="my-card">

#### [NodeJS](https://github.com/Midtrans/midtrans-nodejs-client/tree/master/examples)
</div>
<div class="my-card">

#### [Python](https://github.com/Midtrans/midtrans-python-client/tree/master/examples)
</div>

### C) Install as CMS Plugin / Module
<br>
TODO: link these to plugins

### D) Using Platform
<br>
TODO: link these to affiliated platform