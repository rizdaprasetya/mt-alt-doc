# Integrasi Snap melalui Plugins

The steps to do plugins integration of Snap will be explained below

?>**Note:**
All the steps below are using Midtrans **Sandbox environment**, not production, to easily test the integration process. Make sure to follow [preparation section](/en/snap/preparation.md), before proceeding.


### Prestashop
Midtrans ❤️ Prestashop! Integrasikan website Prestashop Anda dengan Midtrans Snap. Plugin kami memungkinkan website prestashop anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan.
#### Apa yang diperlukan:
* Prestashop v1.6 keatas.
* PHP minimal v5.4.
* MySQL minimal v5.0.
* Plugin Midtrans untuk Prestashop [ [Github](https://github.com/veritrans/SNAP-Prestashop) | [Zip](https://github.com/veritrans/SNAP-Prestashop/archive/master.zip) ].

#### Proses Instalasi:

1. Ekstrak plugin yang sudah di download, ubah nama folder menjadi **midtranspay**.  Setelah itu Zip kembali folder tersebut menjadi **midtranspay.zip**.
2. Masuk ke halaman administrasi Prestashop Anda, akses menu **Modules - Modules Manager** menu.
3. Klik tombol **Upload a module** dan pilih file **midtranspay.zip** , lalu klik upload
![Prestashop install midtrans](./../../asset/image/Prestashop-install.gif)
4. Cari modul **Midtrans Pay** pada halaman module manager dan klik configure.
    * Isi **Payment Button Display Title** dengan text yang akan ditampilkan ke pelanggan.
    * Pilih **Environment**, `Sandbox` untuk test transaksi, `Production` untuk transaksi asli.
    * Isi **client key & server key**. Anda dapat menemukan ini di Midtrans MAP Dashboard.
    * **Map payment SUCCESS status to**: pilih status yang Anda ingin tampilkan bila pembayaran sukses.
    * **Map payment FAILURE status to**: pilih status yang Anda ingin tampilkan bila pembayaran gagal.
    * **Map payment PENDING/CHALLENGE status to**: pilih status yang Anda inginkan bila pembayaran terkena status challenge.
    * Konfigurasi lainnya adalah opsional.

#### Prestashop Terima Notifikasi Midtrans
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/index.php?fc=module&module=midtranspay&controller=notification |
| Finish Redirect URL | [your-site-url]/index.php?fc=module&module=midtranspay&controller=success |
| Error Redirect URL | [your-site-url]/index.php?fc=module&module=midtranspay&controller=failure |
| Unfinish Redirect URL | [your-site-url]/index.php?fc=module&module=midtranspay&controller=success |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### Prestashop Payment Test
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Prestashop Payment Test](./../../asset/image/presta-pay-show.gif)


### Magento 2

Midtrans ❤️ Magento2! Integrasikan website magento Anda dengan Midtrans Snap. Plugin kami memungkinkan website magento anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan. Extension ini juga tersedia di [Magento Marketplace](https://marketplace.magento.com/midtrans-snap.html).

> Berikut adalah untuk Magento 2, untuk Magento 1 silahkan cek [daftar plugin](/id/technical-reference/library-plugin.md#plugin-snap-untuk-cms-e-commerce).

#### Apa yang diperlukan::

* Sebuah toko online berbasis Magento. Plugin ini telah ditest menggunakan **Magento v2.3.4**
* PHP v5.6 atau lebih tinggi.
* MySQL v5.7 atau lebih tinggi.
* Plugin Midtrans untuk Magento  v2.x [ [Github](https://github.com/Midtrans/Midtrans-Magento2) | [Zip](https://github.com/Midtrans/Midtrans-Magento2/archive/master.zip) ] , Magento v1.9 [ [Github](https://github.com/veritrans/SNAP-Magento) | [Zip](https://github.com/veritrans/SNAP-Magento/archive/master.zip) ]
*   Plugin Midtrans Snap mendukung Magento 2 versi 2.1.0, 2.2.0, 2.3.4 atau versi lebih tinggi.

#### Instalasi:
#### Instalasi melalui Magento Marketplace
Anda dapat menginstall plugin Midtrans Snap melalui Magento Marketplace, dengan mungunjungi [Magento Marketplace](https://marketplace.magento.com/midtrans-snap.html) dan mengikuti tata cara instalasi melalui halaman [dokumentasi resmi Magento](https://docs.magento.com/user-guide/system/web-setup-extension-manager.html).

#### Instalasi melalui Composer
Sebelum anda melakukan instalasi melalui Composer, pastikan kembali perangkat/server anda telah terinstall aplikasi Composer. Buka aplikasi terminal, masuk kedalam folder root Magento, jalankan perintah berikut ini:
1. Install plugins: `composer require midtrans/snap`
2. Aktivasi plugin:  `bin/magento module:enable Midtrans_Snap`
3. Jalankan upgrade script : `bin/magento setup:upgrade`
4. Flush cache storage :  `bin/magento cache:flush`
5. Login ke halaman Magento Admin Panel.
6. [Konfigurasi plugin](#konfigurasi-plugin-midtrans-magento-2) Midtrans Magento 2.

#### Instalasi melalui Midtrans Magento GitHub porject
Pada langkah instalasi berikut ini, anda dapat melakukan modifikasi pada plugins Midtrans Magento, sesuai dengan keinginan Anda:

1. Download dan ekstrak plugin yang telah anda unduh pada halaman Github dan Rename folder plugins menjadi **Snap**.
2. Buat folder struktu seperti berikut ini:
![Magento folder structure](./../../asset/image/magento-folder-structure.png)
3. Temukan direktori root Magento pada Backend web Anda melalui koneksi FTP.
4. Copy folder app kedalam folder root Magento.
5. Jalankan perintah dibawah ini pada aplikasi terminal:

    `bin/magento module:enable Midtrans_Snap`
    
    `bin/magento setup:upgrade`
    
    `bin/magento cache:flush`
6. Login ke halaman Magento Admin Panel.
7. [Konfigurasi plugin](#konfigurasi-plugin-midtrans-magento-2) Midtrans Magento 2.

#### Konfigurasi plugin Midtrans Magento 2
Sebelum anda memluai konfigurasi plugin Snap, pastikan kembali anda telah berhasil melewati proses instalasi dengan benar.

Langkah konfigurasi plugin pada Magento admin:
1. Masuk ke halaman Magento Admin Panel.
2. Pada menu bar sebelah kiri, pilih **Stores(1)** -> **Configuration(2)**. 
3. Pada menu Configuration, pilih **Sales(3)** -> **Payment Methods(4)**
![Magento 2 step config 1](./../../asset/image/Magento2-7.png)
4. Jika Anda telah meilhat bagian **Midtrans - Accept Online Payment** , klik **Basic Settings** dan isi kolom yang dibutuhkan seperti berikut ini:

| Kolom Basic Settings    | Deskripsi|
|-------------------------| ---------------------------------------------------------------------------|
| Is Production           | Pilih environment yang akan Anda gunakan, Ya untuk prodcution dan No untuk Sandbox.			|
| Merchant ID             | Id Merchant unik yang terdapat pada akun Midtrans Anda.|
| Sandbox-ClientKey    | Kunci API pada environment Sandbox yang digunakan untuk otorisasi konfigurasi pada halaman frontend.   |
| Sandbox-ServerKey    | Kunci API  pada environment Sandbox yang digunakan untuk otorisasi pada saat memanggil API Midtrans.                      |
| Production-ClientKey | Kunci API pada environment Production yang digunakan untuk otorisasi konfigurasi pada halaman frontend. |
| Production-ServerKey | Kunci API  pada environment Production yang digunakan untuk otorisasi pada saat memanggil API Midtrans                    |
| Enable Snap redirect    | Merubah mode Snap pop-up ke mode redirect.			 |


>Catatan: Setiap merchant memiliki Access Keys yang berbeda. Mohon jaga kerahasiaan Server key anda.

#### Opsi Log

Secara default fungsi log equest, notification dan error otomatis aktif. Plugin Snap akan menulis log pada direktori `/var/log/midtrans`.
![magento_log_options](./../../asset/image/magento-log-options.png)

#### Konfigurasi Plugins Payment Integration
Pada plugin Snap, terdapat 4 opsi untuk mengunakan model pembayaran dengan detail sebagai berikut:


1. **Snap payment integration**

    Snap payment integration adalah mode default Snap plugins, Snap payment aktif secara otomatis pada saat anda melakukan instalasi plugins. Midtrans akan menampilkan metode pembayaran yang aktif pada halaman Snap.

2. **Specific Payment integration | Optional** 
    
    Specific Payment integration adalah fitur opsional untuk Anda yang ingin memberikan spesifik metode pembayaran kepada pelanggan Anda. Anda dapat mengisi nama payment method pada kolom "Allowed Payment Method", maka Snap hanya akan menampilkan metode pembayaran yang Anda inginkan.

3. **Online Installment payment integration | Optional**
    Online Installment payment adalah fitur opsional untuk Anda yang ingin mengaktifkan pembayaran cicilan / Online Installment dimana penerbit kartu dan bank penampung adalah entitas yang sama. Contoh: Kartu kredit BNI dengan Bank Acquiring BNI

4. **Offline Installment payment integration | Optional**
    Offline Installment payment adalah fitur opsional untuk Anda yang ingin mengaktifkan pembayaran cicilan offline / Offline Installment dimana penerbit kartu dan bank penampung adalah entitas yang berbeda. Contoh: Kartu kredit BNI dengan Bank Acquiring Mandiri

>Catatan: Anda dapat menggunakan akun Midtrans spesifik pada masing-masing Snap model integrations. Secara default Snap plugins akan otomatis menggunakan akun Midtrans pada konfigurasi Basic Settings.

>INFO: Untuk BCA Klikpay landing page hanya dapat berjalan normal pada Snap payment integration.

<details>
<summary>
  
#### Detail kolom konfigurasi
</summary>
Berikut adalah detail kolom pada konfigurasi plugins
<article>

| Kolom                  | Deskripsi            
|------------------------|---------------------------------------------------------------------------|
| Enable                 | Aktivasi mode pembayaran Snap                                                                         
| Title                  | Judul metode pembayaran pada halaman checkout Magento
| Custom Expiry          | Digunakan untuk kustomisasi waktu berapa lama transaksi anda dapat dibayar.                                                                                                        
| Allowed Payment Method | Digunakan untuk menampilkan spesifik metode pembayaran kepada pelanggan Anda. Anda dapat membiarkan kosong jika belum yakin.                                                  
| Acquiring Bank         | Anda dapat menentukan spesifik Acquriing Bank penampung transaksi kartu kredit yang akan digunakan. Anda dapat membiarkan kosong jika belum yakin.                
| BIN Number             | Ini adalah fitur yang memungkinkan Anda untuk hanya menerima Kartu Kredit dalam set angka BIN tertentu. Pisahkan nomor BIN dengan koma Contoh: 4,5,4811, bni, mandiri. Biarkan kosong jika Anda tidak yakin! |
| Installment Terms      | Pengaturan untuk pembayaran cicilan.                             
| 3D Secure              | Untuk transaksi kartu Anda diwajibkan mengaktifkan 3D Secure. Silakan hubungi Tim Bisnins kami jika Anda ingin menonaktifkan fitur ini.                                                                  
| Save Card              | Fitur ini memungkinkan pelanggan Anda untuk menyimpan kartu mereka, untuk dapat digunakan pada transaksi selanjutnya.  

</article>
</details>

#### Magento2 Terima Notifikasi Midtrans
1. Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

    | URL Role | Redirect URL|
    |----------|-------------|
    | Payment Notification URL | [your-site-url]/snap/payment/notification |
    | Finish Redirect URL | [your-site-url]/snap/index/finish |
    | Error Redirect URL | [your-site-url]/snap/index/finish |
    | Unfinish Redirect URL | [your-site-url]/snap/index/finish |

    > Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

2. Masuk ke menu **Settings > Snap Preference > System Settings**
    * Masukan `[your-site-url]/snap/index/finish` di field Finish/Unfinish/Error Redirect URL.

#### Magento 2 Coba Transaksi
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Magento 2 Payment Test](./../../asset/image/mag2-pay-show.gif)

### Opencart

Midtrans ❤️ Opencart! Integrasikan website opencart Anda dengan Midtrans Snap. Plugin kami memungkinkan website opencart anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan.

#### Apa yang diperlukan:

* Sebuah toko online berbasis OpenCart. 
* PHP minimal v5.4
* MySQL minimal v5.0.
* Plugin Midtrans untuk OpenCart 

#### Instalasi:
1. Download dan ekstrak plugin dari repositori ini
    * [Opencart v3.0](https://github.com/Midtrans/Midtrans-Opencart3)
    * [Opencart v2.3](https://github.com/Midtrans/SNAP-Opencart-2.3/)
    * [Opencart v2.0, v2.1, v2.2](https://github.com/veritrans/SNAP-Opencart)
2. Masuk ke direktori Opencart Anda melalui koneksi FTP.
3. Upload/copy folder `admin`, `catalog`, dan `system` yang baru diekstrak ke dalam direktori OpenCart Anda.
![Opencart Install](./../../asset/image/Opencart-install.gif)
4. Buka menu **Extensions** -> **Extensions**. pada halaman admin OpenCart.
5. Pilih Filter by Payments, scroll kebawah sampai anda menemukan `Midtrans`
6. Tekan tombol Install yang bewarna hijau dan klik edit plugin.

#### Opencart Terima Notifikasi Midtrans
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/index.php?route=payment/snap/payment_notification |
| Finish Redirect URL | [your-site-url]/index.php?route=payment/snap/landing_redir& |
| Error Redirect URL | [your-site-url]/index.php?route=payment/snap/landing_redir& |
| Unfinish Redirect URL | [your-site-url]/index.php?route=payment/snap/landing_redir& |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### Opencart Coba Transaksi
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Opencart Payment Test](./../../asset/image/opencart-pay-show.gif)

### WooCommerce

Midtrans ❤️ WooCommerce! Integrasikan website WooCommerce Anda dengan Midtrans Snap. Plugin kami memungkinkan website WooCommerce anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan.

#### Apa yang diperlukan:

* Wordpress minimal v3.9.1 **|** Sudah ditest hingga v5.0.0
* [WooCommerce v2](https://github.com/veritrans/SNAP-Woocommerce) **|** Sudah ditest hingga v3.5.2
* PHP minimal v5.4.
* MySQL minimal v5.0.

#### Instalasi:
#### A. Instalasi Sederhana
   * Masuk ke Wordpress admin panel Anda.
   * Masuk menu Plugins, Tekan tombol `new`. Cari dengan nama `Midtrans-WooCommerce` untuk menemukan plugin.
   * Install dan ikuti petunjuknya.
   * Lanjutkan ke Proses Konfigurasi di bawah.

![WooCommerece Install](./../../asset/image/WooCommerce-install.gif)

#### B. Instalasi Manual
   * Download dan ekstrak plugin dari link [Zip](https://github.com/veritrans/SNAP-Woocommerce/archive/master.zip).
   * Ekstrak plugin yang baru di unduh, rubah nama folder modul menjadi `midtrans-woocommerce`.
   * Upload folder plugin ke direktori `wp-content/plugins/` pada instalasi Wordpress Anda.
   * Install dan aktifkan plugin melalui menu plugin pada admin panel Wordpress Anda.
   * Lanjutkan ke Proses Konfigurasi.
   
#### WooCommerce Handling Notification
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/?wc-api=WC_Gateway_Midtrans |
| Finish Redirect URL | [your-site-url]/?wc-api=WC_Gateway_Midtrans |
| Error Redirect URL | [your-site-url]/?wc-api=WC_Gateway_Midtrans |
| Unfinish Redirect URL | [your-site-url]/?wc-api=WC_Gateway_Midtrans |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### WooCommerce Payment Test
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![WooCommerce Payment Test](./../../asset/image/woo-pay-show.gif)

### WHMCS
Midtrans ❤️ WHMCS! Integrasikan website WHMCS Anda dengan Midtrans Snap. Plugin kami memungkinkan website WHMCS anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan.


#### Apa yang diperlukan:
   * WHMCS v5.3.12 - v6.x (sudah dites hingga WHMCS v7.0.2)
   * PHP minimal v5.4.
   * MySQL minimal v5.0.
   * Plugin Midtrans untuk WHMCS  [ [Github](https://github.com/veritrans/SNAP-whmcs.git) | [Zip](https://github.com/veritrans/SNAP-whmcs/archive/master.zip) ].

#### Instalasi:
   * Download dan ekstrak plugin dari repositori ini.
   * Ekstrak file Whmcs-master.zip yang sudah di-download sebelumnya.
   * Upload dan satukan folder modul yang sudah di ekstrak kedalam direktori WHMCS Anda.
   * Masuk ke halaman admin WHMCS Anda.
   * masuk ke menu `Setup` **->** `Payments` **->** `Payment Gateways`.
   * Klik metode pembayaran **Midtrans**, lalu Anda akan dialihkan ke halaman konfigurasi.
   * Isi data-data yang diperlukan, lalu klik **Save Changes**.

![WHMCS](./../../asset/image/snap-whmcs1.png)

#### WHMCS Terima Notifikasi Midtrans
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration` dan `settings` **->** `Snap Preference` **->** `System Settings`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/modules/gateways/callback/veritrans.php |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### WHMCS Coba Transaksi
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025


### Drupal 8

Midtrans ❤️ Drupal! Integrasikan website Drupal Anda dengan Midtrans Snap. Plugin kami memungkinkan website Drupal anda dapat menerima berbagai pembayaran online. Kami berupaya untuk membuat halaman pembayaran sesederhana mungkin, demi pengalaman pembayaran yang menakjubkan.

#### Apa yang diperlukan:
   * Drupal v8.x
   * Drupal Commerce 8.x-2.xx
   * PHP minimal v5.4
   * MySQL minimal v5.0.

#### Instalasi :
1. Ekstrak plugin yang sudah di download, rubah nama folder menjadi **commerce_midtrans**.
2. Masuk ke direktori Drupal Anda melalui koneksi FTP. Upload folder tersebut ke **[Drupal folder]/modules/contrib/**.
3. Masuk ke halaman administrasi Drupal Anda, akses menu **Extend**.
4. Cari modul **Commerce Midtrans** dibawah grup COMMERCE (CONTRIB), klik pada field checkbox.
![Drupal 8 1](./../../asset/image/drupal8_1.png)
5. Scroll kebawah dan klik **Install**.
6. Masuk ke `Commerce` **->** `Configuration` **->** `Payment` **->** `Payment gateways`.
![Drupal 8 2](./../../asset/image/drupal8_2.png)
7. Click **Add payment gateway** button.
![Drupal 8 3](./../../asset/image/drupal8_3.png)
8. Cari **Midtrans** dan Klik
9. Pada Midtrans modul, klik Edit untuk masuk ke halaman plugin, lalu masukan data-data yang diperlukan.
    * Isi **Display Name** dengan text yang akan ditampilkan kepada pelanggan.
    * Pilih **Mode**. `Sandbox` untuk test transaksi dan `Production` untuk transaksi asli.
    * Isi **Client and Server key**. Anda dapat menemukan ini di Midtrans MAP Dashboard.
    * Konfigurasi lainnya adalah opsional.

![Drupal 8 4](./../../asset/image/drupal8_4.png)
10. Klik save.

#### Drupal Terima Notifikasi Midtrans
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/payment/notify/midtrans |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### Drupal Coba Transaksi
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Drupal Payment Test](./../../asset/image/drupal8-pay-show.gif)

### Easy Digital Download

Midtrans ❤️ EDD! Integrate your Easy Digital Download store with Midtrans Snap payment gateway. We strive to make payments simple for both the merchant and customers. This plugin will allow online payment on your EDD store using various online payment channel. Our EDD plugins also available on [Wordpress plugins store](https://wordpress.org/plugins/edd-midtrans-gateway/) 

#### Apa yang diperlukan:
   * Wordpress minimal v3.9.1.
   * Easy Digital Downloads minimal v2.0.
   * PHP minimal v5.4.
   * MySQL minimal v5.0.

#### Instalasi:

#### Instalasi Sederhana:

1. Masuk ke halaman admin wordpress anda.
2. Masuk menu Plugins, Tekan tombol `new`. Cari dengan nama `Midtrans-WooCommerce` untuk menemukan plugin.
3. Install dan ikuti petunjuknya.
4. Lanjutkan ke [Proses Konfigurasi](#konfigurasi-midtrans-easy-digital-download) di bawah.
![EDD Install](./../../asset/image/Edd-Install.gif)

#### Instalasi Manual:

The manual installation method involves downloading our feature-rich plugin and uploading it to your webserver via your favorite FTP application.

1. Download dan ekstrak plugin dari repositori ini.
2. Ekstrak plugin yang baru di unduh, ubah nama folder modul menjadi midtrans-edd.
3. Upload folder plugin ke direktori wp-content/plugins/ pada instalasi Wordpress Anda.
4. Install dan aktifkan plugin melalui menu plugin pada admin panel Wordpress Anda.
5. Masuk ke menu `Downloads` **->** `Settings` **->** `Payment Gateways`, masukan data-data yang diperlukan.

#### Konfigurasi Midtrans Easy Digital Download

![Edd Config 1](./../../asset/image/EDD-Config-1.png)

![Edd Config 2](./../../asset/image/EDD-Config-2.png)


#### Easy Digital Download Handling Notification
Masuk ke [Midtrans Account](https://account.midtrans.com/login), pilih environment (sandbox/production), lalu masuk ke menu `settings > configuration`

| URL Role | Redirect URL|
|----------|-------------|
| Payment Notification URL | [your-site-url]/?edd-listener=midtrans |
| Finish Redirect URL | [your-site-url] |
| Error Redirect URL | [your-site-url] |
| Unfinish Redirect URL | [your-site-url] |

> Note: Mohon lengkapi URL dengan **http://** atau **https://** saat mengisi Notification URL dan Redirect URL, sesuai konfigurasi web server anda. Jika anda tidak yakin, silakan buka URL website anda di browser, dan cek URL anda menggunakan **http** atau **https**.

#### EDD Coba Transaksi
Lakukan transaksi sukses di toko Anda dengan menggunakan nomor kartu kredit dummy berikut (sandbox mode):

Jenis | Visa
------|-----
Nomor Kartu	|4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![EDD Payment Test](./../../asset/image/edd-show-pay.gif)