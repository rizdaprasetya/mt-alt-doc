# Overview

Midtrans ingin membantu anda agar dapat dengan mudah menerima, mendistribusikan pembayaran melalui automasi yang dapat anda lakukan. Untuk itu dibawah ini adalah detail dokumentasi teknis terkait layanan Midtrans.
<br>

## Menerima Pembayaran Online melalui Website dan Aplikasi anda

<div class="my-card">

#### [Menggunakan Halaman Checkout Midtrans (SNAP Checkout)](/id/snap/overview.md)
Menerima pembayaran online pada web dan aplikasi anda dengan mudah dan aman! Pelanggan anda akan dihadapkan dengan tampilan halaman pembayaran, langsung didalam halaman web dan aplikasi anda dengan menampilkan jendela pop-up yang mudah serta mobile-friendly. Atau anda juga dapat mengarahkan pelanggan anda ke halaman pembayaran Midtrans. Halaman Pembayaran Snap mengizinkan pelanggan anda untuk memilih beberapa [jenis pembayaran tertentu](https://midtrans.com/payments)
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
	" class="my-btn">Coba Interfece Payment Snap &#9099;</button>
</p>
</div>
<div style="text-align: center;">

<sup>[Coba contoh integrasi cepat (kurang dari 5 menit)!](/en/snap/interactive-demo.md)</sup>
</div>
</div>

<div class="my-card">

#### [Mobile SDK](https://mobile-docs.midtrans.com)
Midtrans juga menyediakan Mobile SDK bagi merchant yang ingin implmentasi beberapa pembayaran online secara cepat melalui aplikasi mobile Android dan iOS. Untuk sample aplikasi Anda dapat mencoba di bawah. Tampilan Mobile SDK layaknya seperti tampilan Snap namun versi native mobile.
<details>
<summary><b>Coba Mobile SDK via Android Simulator</b></summary>
<article>
<!-- tabs:start -->
<div style="text-align: center;">
<iframe src="https://appetize.io/embed/9r0b89zu862f8eu1ukd0ecpgxc?device=nexus5&scale=75&orientation=portrait&osVersion=8.1"width="300px" height="600px" frameborder="0" scrolling="no"></iframe>
</div>
<!-- tabs:end -->
</article>
</details>
</div>

<div class="my-card">

#### [Buat Halaman Pembayaran Sesuka Anda (Core API)](/id/core-api/overview.md?id=overview)
Bagi anda yang membutuhkan kustomisasi alur pembayaran atau tampilan pembayaran yang unik sesuai dengan selara anda baik itu pada aplikasi web, point of sales, IoT, maka anda dapat melakukannya dengan Core API midtrans. Layanan Core API Midtrans menggunakan teknologi REST API dengan basis payload JSON.
</div>

<div class="my-card">

#### [Menggunakan Plugin CMS](/id/snap/overview.md?id=c-install-as-cms-plugin-module)
Jika anda bukan developer atau anda sudah menggunakan CMS e-Commerce? Anda dapat dengan mudah melakukan integrasi dengan Midtrans. Dengan Plugin CMS yang kami sediakan anda hanya perlu mengikuti instruksi yang telah kami buat agar dapat menerima pembayaran online pada toko e-Commerce anda.
</div>

<div class="my-card">

#### [Membuat Tagihan Dengan Payment Link](/id/payment-link/overview.md?id=overview)
Midtrans menyediakan layanan Payment Link untuk anda yang ingin melakukan tagihan pembayaran tanpa harus memiliki Website. Payment link tidak membutuhkan integrasi sama sekali, untuk menggunakannya anda hanya perlu masuk ke Akun Midtrans dan mengisi detail pembayaran pada halaman Payment Link. Maka dalam sekejap anda akan mendapatkan link pembayaran yang dapat anda bagikan ke pelanggan anda.
</div>

## Pay Out / Mendistribusikan Dana

<div class="my-card">

#### [Distirbusikan Dana Anda Melalui Iris Disbursement System](/id/iris/overview.md?id=overview)

Distribusikan pembayaran untuk mitra, penjual, pelanggan, vendor atau pihak ketiga mana pun dengan sistem Disbursement Iris kami. Apakah Anda memiliki pasar atau bisnis yang perlu mendistribusikan uang kepada penjual, vendor, atau  melakukan transfer gaji karyawan Anda, semua kebutuhan distibusi pembayaran Anda dapat dipenuhi oleh Iris. Iris mendukung pengiriman uang ke rekening Gopay atau segala jenis rekening bank di Indonesia.
</div>

## Misc

<div class="my-card">

#### [Integrasi Pembayaran Dengan Aplikasi POS](/id/pos/overview.md?id=overview)
</div>

<br> <br>


# Solusi Berdasarkan Use Case Bisnis Anda

Dibawah ini beberapa use case populer yang dapat menjadi solusi bisnis anda 
#### Menerima pembayaran melalui website e-commerce atau aplikasi anda

Anda dapat menerima berbagai metode pembayaran [Kartu Kredit, Transfer Bank, Direct Debit, E-Wallet, dan lainnya](https://midtrans.com/payments) langsung melalui website/aplikasi yang telah anda kembangkan. Untuk dapat mengaktifkan layanan pembayaran online yang aman, Anda dapat menggunakan Midtrans Snap sebagai halaman pembayaran atau kustomisasi sesuai dengan yang anda inginkan melalui Midtrans Core API.

#### Layanan Recurring / Subscription (Langganan)

<TODO: elaborate>

#### Mengirim Invoice Pembayaran melalui Email, Link, Whatsapp, Instagram, Social Media dan lainnya.

<TODO: elaborate payment link or maybe also selly?>

#### Menerima pembayaran melalui aplikasi Point of Sales, IoT devices, dan lainnya

<TODO: elaborate>

#### Paying out users/merchants on your platform

<TODO: elaborate iris>

#### Paying out vendors/contractors of your business

<TODO: elaborate iris>

#### <Add More Use Case>

# Non Technical Person? 

<TODO: elaborate plugin, payment link, or snap plugin for non-dev reader>

Not familiar with coding, technical integration, and all the complexity? We have a way for you to integrate without any technical knowledge.
