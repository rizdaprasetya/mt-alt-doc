
Melalui halaman ini Anda dapat mencoba integrasi secara interaktif. Amati source code, dan lihat hasilnya secara langsung.
### Demo Integrasi Snap

Integrasi backend pada halaman ini menggunakan contoh kode NodeJS (di host pada CodeSandbox), dan frontend menggunakan HTML+Javascript. Mohon menunggu hingga halaman/iframe selesai. Anda akan melihat Transaksi Token sebagai hasil dari response API pada backend, dan anda bisa klik **"Pay"** untuk mencoba frontend-nya. Klik **"Open Sandbox"**  untuk melihat/mengedit source code yang digunakan.

[Repl.it demo Midtrans NodeJS](https://codesandbox.io/embed/serene-bell-yfjjd?fontsize=14&hidenavigation=0&theme=dark ':include :type=iframe width=100% height=600px')

<details>
<summary><b>Sample Integrasi Frontend Alternatif</b></summary>
<article>

Contoh sample lain untuk integrasi frontend (dihost di JSFiddle). Masukkan Snap Transaction Token dari step 1 (backend) ke field di bawah, kemudian click **"Pay"**. Click **"HTML"** untuk melihat source code-nya.

<!-- [JSFiddle demo Snap.js](https://jsfiddle.net/d4mx1gkc/11/embedded/result,html/dark ':include :type=iframe width=100% height=400px') -->

<iframe width="100%" height="750" src="//jsfiddle.net/kntfdzob/embedded/result,html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
</article>
</details>

### Melakukan Testing Pembayaran

Anda bisa gunakan test credentials untuk transaksi Kartu berikut:

Name | Value
--- | ---
Card Number | `4811 1111 1111 1114`
CVV | `123`
Exp Month | Any month (e.g: `02`)
Exp Year | Any future year (e.g: `2025`)
OTP/3DS | `112233`

Anda juga bisa gunakan credentials testing pembayaran lain [yang tersedia di  payment simulator sandbox kami](/id/technical-reference/sandbox-test.md)

### Selanjutnya Bagaimana?

Ini hanya demonstrasi dari **langkah 1 & langkah 2** [dijelaskan pada panduan ini](/id/snap/integration-guide?id=langkah-langkah-integrasi). Silahkan ikuti langkah selanjutnya yang dijelaskan di sana.

<div class="my-card">

#### [Langkah Integrasi](/id/snap/integration-guide?id=langkah-langkah-integrasi)
</div>