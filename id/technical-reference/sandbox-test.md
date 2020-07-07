# Halaman tes Pembayaran pada Sandbox 

Pada environment Sandbox Midtrans menyediakan portal web untuk melakukan simulasi pembayaran. Anda dapat melakukan tes pembayaran mulai dari sekenario sukses dan gagal yang dapat terjadi pada environment Production.

Berikut adalah daftar data informasi metode pembayaran yang dapat anda gunakan pada simulator midtrans. Data tersebut tidak dapat digunakan pada environment Production:

Metode Pembayaran :
- [Credit Card](#kartu-kredit)
- [E-Wallet](#e-wallet)
- [Bank Transfer](#bank-transfer)
- [Direct Debit](#direct-debit)
- [Convenience Store](#convenience-store)
- [Cardless Credit](#cardless-credit)

### Kartu Kredit

Untuk pembayaran kartu kredit, anda dapat menggunakan detail kartu kredit dibawah ini:

#### Tanggal Expire and CVV

|Parameter | Nilai|
|------|------|
|Expiry Month | `01` (or any month)|
|Expiry Year | `2025` (or any future year)|
|CVV | `123`|
|OTP/3DS | `112233`|
|Card Number | *Check table below*|

#### Nomor Kartu

<!-- tabs:start -->
#### **General**

|VISA | Description |
|---|---|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 4811 1111 1111 1114 <br> **Denied by Bank Transaction:** 4911 1111 1111 1113|
|Attempted Authentication <br> *Cardholder is not <br> enrolled for 3DS* | **Accept Transaction:** 4411 1111 1111 1118 <br> **Challenge by FDS Transaction:** 4511 1111 1111 1117 <br> **Denied by FDS Transaction:** 4611 1111 1111 1116 <br> **Denied by Bank Transaction:** 4711 1111 1111 1115|

| MASTERCARD | Description|
|-----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 5211 1111 1111 1117 <br> **Denied by Bank Transaction:** 5111 1111 1111 1118|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 5410 1111 1111 1116 <br> **Challenge by FDS Transaction:** 5510 1111 1111 1115 <br> **Denied by FDS Transaction:** 5411 1111 1111 1115 <br> **Denied by Bank Transaction:** 5511 1111 1111 1114|

|JCB | Description|
|----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 3528 2033 2456 4357 <br> **Denied by Bank Transaction:** 3528 5129 4493 2269|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 3528 8680 4786 4225 <br> **Challenge by FDS Transaction:** 3528 6731 1280 9398 <br> **Denied by FDS Transaction:** 3528 1852 6717 1623 <br> **Denied by Bank Transaction:** 3528 9097 7983 7631|

|AMEX | Description|
|----------|------------|
|Full Authentication <br> *Cardholder is 3DS ready* | **Accept Transaction:** 3701 9216 9722 458 <br> **Denied by Bank Transaction:** 3742 9635 4400 881|
|Attempted Authentication <br> *Cardholder is not  <br>  enrolled for 3DS* | **Accept Transaction:** 3737 4772 6661 940 <br> **Challenge by FDS Transaction:** 3706 6568 4049 309 <br> **Denied by FDS Transaction:** 3780 9621 8340 018 <br> **Denied by Bank Transaction:** 3703 5609 7975 856|

> **PERHATIAN**: Tidak semua bank acquiring dapat menerima transaksi kartu JCB & Amex. Untuk menggunakan kartu JCB Anda dapat menggunakan Acquiring bank BNI & BCA. Sedangkan AMEX anda dapat menggunakan Acquiring BCA


#### **Spesifik Bank**

This is useful for Installment/Promo scenario which require bank specific card.
Ini dapat anda gunakan untuk sekenario transaksi Cicilan/Promo yang membutuhkan bank spesifik

##### Simulasi Kartu 3D Secure

|Bank | Card Number | <span>|
|-----|-------------|-------|
|**Mandiri** <br> *Full Authentication* | <br> 4617 0069 5974 6656\* | <br> 5573 3810 7219 6900|
|*Attempted Authentication* | 4617 0017 4194 2101\* | 5573 3819 9982 5417||
|**Mandiri Debit** <br> *Full Authentication* | <br> 4097 6611 1111 1113\* |
|*Attempted Authentication* | 4097 6611 1111 1139\* ||
|<small>\*Card not available for online installment/promo</small>|
|**CIMB** <br> *Full Authentication* | <br> 4599 2078 8712 2414 | <br> 5481 1698 1883 2479|
|*Attempted Authentication* | 4599 2039 9705 2898 | 5481 1671 2103 2563|
|**BNI** <br> *Full Authentication* | <br> 4105 0586 8948 1467 | <br> 5264 2210 3887 4659|
|*Attempted Authentication* | 4105 0525 4151 2148 | 5264 2249 7176 1016|
|*BNI Private Label* | 1946 4159 8148 7684 ||
|**BCA** <br> *Full Authentication* | <br> 4773 7760 5705 1650 | <br> 5229 9031 3685 3172|
|*Attempted Authentication* | 4773 7738 1098 1190 | 5229 9073 6430 3610|
|**BRI** <br> *Full Authentication* | <br> 4365 0263 3573 7199 | <br> 5520 0298 7089 9100|
|*Attempted Authentication* | 4365 0278 6723 2690 | 5520 0254 8646 8439|
|**MEGA** <br> *Full Authentication* | <br> 4201 9100 0000 0009 | <br> 5221 0300 0000 0009|
|*Attempted Authentication* | 4201 9100 0000 0017 | 5221 0300 0000 0017|
|**Maybank** <br> *Full Authentication* | <br> 4055 7720 2603 6004 | <br> 5520 0867 5210 2334|
|*Attempted Authentication* | 4055 7713 3514 4012 | 5520 0867 7490 8452|

##### Simulasi Kartu yang akan ditolak

|Bank | Card Number | <span>|
|-----|-------------|-------|
|**Mandiri** | 4617 0085 6083 1760 | 5573 3840 4322 4447|
|**Mandiri Debit** | 4097 6676 7217 8631 ||
|**CIMB** | 4599 2060 0973 3090 | 5481 1691 9178 2739|
|**BNI** | 4105 0541 4854 1363 | 5264 2235 3013 1711|
|**BNI Private Label** | 1946 4102 7193 1269 ||
|**BCA** | 4773 7752 0201 1809 | 5229 9034 0542 3830|
|**BRI** | 4365 0286 6251 2583 | 5520 0219 0920 3008|
|**MEGA** | 4201 9100 0000 0025 | 5221 0300 0000 0025|
|**Maybank** | 4055 7796 2846 0474 | 5520 0883 1465 3770|
<!-- tabs:end -->

### e-Wallet

|Payment Methods | Description|
|----------|------------|
|Go-Pay | Di platform mobile Gopay Simulator akan otomatis terbuka. Di desktop, QR Code image akan ditampilkan, copy URL QR Code image URL kemudian gunakan [QRIS Simulator](https://simulator.sandbox.midtrans.com/qris/index), atau jika tidak bisa coba [Gopay Simulator](https://simulator.sandbox.midtrans.com/gopay/ui/index) berikut.|
|QRIS | QR Code image akan ditampilkan, copy URL dari QR Code image kemudian gunakan [QRIS Simulator](https://simulator.sandbox.midtrans.com/qris/index)|
|Indosat Dompetku | **Nomor transaksi berhasil:** 08123456789 <br> **Nomor transaksi gagal:** other than 08123456789|
|Mandiri E-cash | **Nomor transaksi berhasil:** 0987654321 <br> **PIN:** 12345 <br> **OTP:** 12123434|

!> **Catatan**: Pada environment Sandbox, Midtrans menggunakan simulator pembayaran berbasis web, pada pembayaran gopay ketika Mode Deeplink dijalankan anda akan diarahkan ke halaman web simulator. Jika anda ingin mencoba Deeplink yang mengarah ke aplikasi gojek, anda hanya bisa melakukannya pada environment Production.

### Bank Transfer

|Metode Pembayaran | Deskripsi|
|----------------|------------|
|Permata Virtual Account | Midtrans akan membuat nomor dummy Permata Virtual Account. Untuk melakukan tes transaksi, gunakan [Simulator Permata Virtual Account](https://simulator.sandbox.midtrans.com/permata/va/index).|
|BCA Virtual Account | Midtrans akan membuat nomor dummy BCA Virtual Account. Untuk melakukan tes transaksi, gunakan [Simulator BCA Virtual Account](https://simulator.sandbox.midtrans.com/bca/va/index).|
|Mandiri Bill Payment | Midtrans akan membuat dummy Kode Pembayaran untuk pembayaran via Mandiri e-channel (Internet Banking, SMS Banking, Mandiri ATM). Untuk melakukan tes transaksi, gunakan [Simulator Mandiri Bill Payment](https://simulator.sandbox.midtrans.com/mandiri/bill/index).|
|BNI Virtual Account | Midtrans akan membuat nomor dummy BNI Virtual Account. Untuk melakukan tes transaksi, gunakan [Simulator BNI Virtual Account](https://simulator.sandbox.midtrans.com/bni/va/index).|

### Direct Debit

|Metode Pembayaran | Deskripsi|
|----------|------------|
|Mandiri Clickpay | **Nomor kartu:** 4111 1111 1111 1111 <br> **Token Berhasil:** 000000 <br> **Token Gagal:** 111111|
|CIMB Clicks | Midtrans akan mengalihkan tes transaksi CIMB Clicks ke simulasi pembayaran. <br> **Transaksi Sukses:** tesuser00  <br> **Transaksi Gagal:** tesuser01|
|ePay BRI | Midtrans akan mengalihkan tes transaksi ePay BRI ke simulasi pembayaran. <br> **Transaksi Sukses:** tesuser00 <br> **Transaksi Gagal:** tesuser03|
|BCA Klikpay | Midtrans akan mengalihkan tes transaksi BCA Klikpay ke simulasi pembayaran.|
|KlikBCA | Midtrans akan mendaftarkan user id terisi di KlikBCA input. Untuk melakukan tes transaksi, gunakan [Simulator KlikBca](https://simulator.sandbox.midtrans.com/bca/klikbca/index).|

### Convenience Store

|Metode Pembayaran | Deskripsi|
|----------|------------|
|Indomaret | Midtrans akan membuat kode pembayaran Indomaret tesing. Untuk melakukan tes transaksi, gunakan [Simulator Indomaret](https://simulator.sandbox.midtrans.com/indomaret/index).|
|Alfamart | Midtrans akan membuat kode pembayaran Alfamart tesing. Untuk melakukan tes transaksi, gunakan [Simulator Alfamart](https://simulator.sandbox.midtrans.com/alfamart/index).|
|Kioson | Midtrans akan membuat kode pembayaran Kioson tesing. Untuk melakukan tes transaksi, gunakan [Simulator Kioson](https://simulator.sandbox.midtrans.com/kioson/index).|

### Cardless Credit 

|Metode Pembayaran | Deskripsi|
|----------|------------|
|Akulaku | Midtrans akan mengarahkan anda ke halaman simulator Akulaku.|
