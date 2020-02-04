# Alamat IP

### Alamat IP Midtrans untuk Notifikasi

Midtrans mengirimkan notifikasi pembayaran kepada merchant dari beberapa IP Address. Apabila sistem Anda melakukan whitelist terhadap IP Address, mohon tambahkan Midtrans CIDR kepada daftar whitelist Anda:
```
Production Environment:
103.208.23.0/24
103.208.23.6/32
103.127.16.0/23
103.127.17.6/32

Sandbox Environment:
103.58.103.177
```
Apabila terjadi situasi dimana Anda tidak dapat menerima notifikasi dari Midtrans, mohon pastikan bahwa Anda telah melakukan whitelist pada alamat IP di atas.

### Endpoint API

API endpoint Midtrans terdistribusi dan dilindungi keamanan berlapis, jadi tidak punya IP spesifik. Sebagai gantinya, mohon whitelist API domain kami:
```
api.midtrans.com
app.midtrans.com
```

Apabila terjadi situasi dimana Anda tidak dapat mengirim request ke Midtrans, mohon pastikan bahwa Anda telah melakukan whitelist pada domain di atas.

Jika benar-benar diperlukan untuk mendaftarkan whitelist alamat IP pada Domain, Anda dapat merujuk ke [daftar alamat IP berikut ini](https://www.cloudflare.com/ips-v4). Namun tidak disarankan.

[Range Alamat IP API](https://www.cloudflare.com/ips-v4 ':include :type=iframe width=100% height=300px')