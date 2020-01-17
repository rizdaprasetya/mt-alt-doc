Pada halaman ini akan menjelaskan persiapan dan apa saja yang dibutuhkan untuk melakukan integrasi dengan Snap.

?> Sebelum melanjutkan proses integrasi, Pastikan anda sudah memiliki [akun Midtrans](/id/midtrans-account/overview.md).


## Mendapatkan *API Access Keys*

Untuk mendapatkan *access keys* anda dapat mengunjungi halaman berikut [Server Key & Client Key](/id/midtrans-account/overview.md?id=melihat-informasi-access-keys)

## Konfigurasi *Redirect URL*
URL Redirect digunakan untuk mengarahkan halaman tertentu setelah proses pembayaran pada Snap selesai.

<!-- tabs:start -->
#### **Snap Popup (Default)**

Untuk melakukan konfigurasi redirect URL pada Snap pop-up, silahkan ke halaman berikut [**Settings > Snap Preference > System Settings**](https://dashboard.sandbox.midtrans.com/settings/snap_preference).

![Redirect URL Configuration Snap JS](./../../asset/image/snap-prep-redirect-url-snapjs.png)

Untuk lebih memahami bagaimana proses Snap pop-up bekerja, anda dapat melihat diagram dibawah ini:

![Diagram Snap JS](./../../asset/image/snap-prep-diagram-snapjs.png)

#### **Snap Redirect (Alternatif)**

Untuk melakukan konfigurasi URL Redirect pada mode Snap Redirect, silahkan ke halaman berikut [**Settings > Configuration**](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration).

![Redirect URL Configuration Snap Redirect](./../../asset/image/snap-prep-redirect-url-snapredir.png)

Untuk lebih memahami bagaimana proses Snap redirect bekerja, anda dapat melihat diagram dibawah ini:

![Diagram Snap Redirect](./../../asset/image/snap-prep-diagram-snapredir.png)

<!-- tabs:end -->

**Note**: 
Pada saat redirect bekerja, Midtrans akan menambahkan beberapa parameter `?order_id=xxx&status_code=xxx&transaction_status=xxx` kedalam URL yang telah dikonfigurasi sebelumnya.

Sebagai contoh: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102123123&status_code=200&transaction_status=capture`. 

Anda dapat memanfaatkan nilai parameter guna menampilkan pesan kepada customer didalam finish url.
