SNAP merupakan portal pembayaran yang memungkinkan merchant untuk menggunakan sistem pembayaran Midtrans dengan memunculkan halaman pembayaran Midtrans langsung dihalaman pembayaran Anda. Setup-nya mudah dan tidak dikenakan tagihan bulanan, cocok untuk bisnis skala kecil dan menengah.
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
  " class="my-btn">Coba Demo Snap &#9099;</button>
</p>

## Integrasi
Silahkan pilih salah satu integrasi yang paling sesuai dengan anda:

### A) Step by Step Guide
<br>
<div class="my-card">

#### [Panduan Integrasi](/id/snap/integration-guide.md)
</div>

### B) Melalui Sample Program
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

### C) Demo Interkatif
<br>
<div class="my-card">

#### [Interactive Demo](/id/snap/interactive-demo.md)
</div>

### D) Melalui Plugins pada Website CMS anda
<br>

#### [CMS Plugins](/id/snap/with-plugins.md)

### E) Melalui platform affiliasi
<br>
TODO: link these to affiliated platform