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

### A) Petunjuk Langkah demi Langkah
<sub><i>Termasuk contoh dalam berbagai bahasa pemrograman</i></sub>
<br>
<div class="my-card">

#### [Petunjuk Integrasi &#187;](/id/snap/integration-guide.md)
</div>

### B) Demo Interaktif
<br>
<div class="my-card">

#### [Demo Interaktif &#187;](/id/snap/interactive-demo.md)
</div>

### C) Install as Plugin / Module on Your CMS
Sudah menggunakan e-commerce CMS seperti: Wordpress Woocommerce, Magento, Prestashop, Opencart, WHMCS, dsb? Cukup install plugin yang kami sediakan:

<div class="my-card">

#### [Install Snap sebagai Plugin CMS &#187;](/id/snap/with-plugins.md)
</div>

### D) Menggunakan Ecommerce Platform
Jika menggunakan platform E-commerce pihak ke-3 platform atau SaaS seperti Shopify, Sirclo, Jejualan, dsb.

<div class="my-card">

#### [Menggunakan Ecommerce Platform &#187;](/id/snap/platform/overview.md)
</div>

### E) Download Contoh Kode
<br>
<div class="my-card">

#### [Repo Contoh Kode &#187;](/id/technical-reference/library-plugin.md#kode-sample)
</div>
