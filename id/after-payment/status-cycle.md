Perubahan nilai pada parameter `transaction_status` dan kemungkinan perubahan yang terjadi pada setiap nilai status transaksi dapat anda lihat pada tabel dibawah ini:

### Status Transaksi 

Status Transaksi | Deskripsi | Kemungkinan Perubahan
--- | --- | ---
`pending` | Transaksi berhasil dibuat dan menunggu pembayaran oleh customer melalui (ATM/ebanking/E-wallet app/ store). | settlement, expire,<br> cancel, deny
`capture` | Transaksi kartu berhasil dilakukan. <br>Jika tidak dilakukan manual, Transaksi akan otomatis berubah menjadi settlement pada hari selanjutnya. <br> Status transaksi `capture` aman untuk dianggap sebagai pembayaran yang berhasil. | settlement, cancel
`settlement` | Dana telah diterima, Transaksi berhasil. | refund, chargeback, partial_refund, partial_chargeback
`deny` | Payment provider / Fraud Detection System menolak kredensial yang digunakan untuk pembayaran. Anda dapat melihat detail/alasan transaksi tersebut ditolak pada nilai parameter `status_message`.
`cancel` | Transaksi dibatalkan. pembatalan transaksi dapat dilakukan oleh Midtrans atau merchant.<br> Transaksi yang dibatalkan dapat disebabkan oleh berbagai alasan:<br> 1. `Capture` transaksi dibatalkan sebelum Settlement.<br> 2. `Challenge` Transaksi ditolak oleh merchant.
`expire` | Transaksi sudah tidak tersedia / kadaluarsa, dikarenakan tidak ada pembayaran yang diterima atau lewat dari batas waktu yang telah ditentukan.
`failure` | Kesalahan tak terduga selama pemrosesan transaksi. <br>Kegagalan transaksi dapat disebabkan oleh berbagai alasan, sebagian besar masalah ini terjadi dikarenakan seperti bank gagal memberikan respons (time-out) dan kasus ini sangat jarang terjadi.
`refund` | Refund dapat dilakuan oleh Merchant. Transaksi ditandai sebagai refund. | 
`chargeback` | Transaction ditandai sebagai chargeback. | 
`partial_refund` | Transaksi ditandai sebagai partial refund | 
`partial_chargeback` | Transaksi ditandai sebagai partial chrgeback | 


#### **Status Fraud**

fraud_status | 🔍 | deskripsi
--- | --- | ---
`accept` | ✅ | Transaksi anda aman, tidak ditandai sebagai transaksi fraud.
`deny` | ❌ | Transaksi ditandai sebagai fraud. Untuk kemananan maka transaksi ditolak/deny.
`challenge` | ⚠️ | Transaksi berpotensi farud, tetapi tidak bisa ditentukan dengan tepat. Merchant harus mengambil tindakan untuk menerima atau menolak transaksi melalui Dashboard, atau via [Approve](https://api-docs.midtrans.com/#approve-transaction) or [Deny](https://api-docs.midtrans.com/#deny-transaction) API

<!-- TODO explain how to do refund, approve, deny, cancel, etc -->

## API Untuk Aksi pada Transaksi

Anda dapat melakukan aksi tertentu pada setiap transaksi yang ada, dengan melihat daftar API dibawah ini:

Setiap API request yang dilakukan membutuhkan header HTTP berikut ini:
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: [Untuk detail mengenai API Auth header, anda dapat mengunjungi halaman ini](/id/technical-reference/api-header.md).

**API Base URL:**
- Sandbox Environment : `https://api.sandbox.midtrans.com`
- Production Environment : `https://api.midtrans.com`

Endpoint URL | HTTP Method | Deskripsi
--- | --- | ---
/v2/[ORDER_ID]/status | GET | Mendapatkan informasi status transaksi terbaru dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](/id/after-payment/get-status.md)
/v2/[ORDER_ID]/cancel | POST | Membatalkan transaksi dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>Pembatalan transaksi dapat dilakukan sebelum status transaksi berubah menjadi `settlement`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#cancel-transaction)
/v2/[ORDER_ID]/refund | POST | Update transaksi `settlement` menjadi `refund` dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#refund-transaction)
/v2/[ORDER_ID]/refund/online/direct | POST | Mengirimkan permintaan langsung kepada bank / penyedia layanan pembayaran untuk `refund` transaksi. Jika berhasil status transaksi akan berubah menjadi `refund` <br>[Cara penggunaan](https://api-docs.midtrans.com/#direct-refund-transaction)
/v2/[ORDER_ID]/expire | POST | Update transaksi `pending` menjadi `expired` dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#expire-transaction)
/v2/[ORDER_ID]/approve | POST | Menyetujui transaksi yang mendapatkan status `challenge` oleh Fraud Detection System dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#approve-transaction)
/v2/[ORDER_ID]/deny | 	POST | Menolak transaksi yang mendapatkan status `challenge` oleh Fraud Detection System dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#deny-transaction)
/v2/[ORDER_ID]/status/b2b | GET | Mendapatkan informasi status transaksi B2B terbaru dengan melakukan API Request ke Midtrans menggunakan parameter `order_id`. <br>[Cara penggunaan](https://api-docs.midtrans.com/#get-transaction-status-b2b)
/v2/capture	| POST | Melakukann Capture pada transaksi kartu kredit pre-authorized. <br>[Cara penggunaan](https://api-docs.midtrans.com/#capture-transaction)

Referensi Penuh [API docs](https://api-docs.midtrans.com/#payment-api)

?> Sebagian besar [Midtrans Language Library](/id/technical-reference/library-plugin.md) memiliki fungsi/metode untuk memanggil API Aksi untuk transaksi. Untuk contoh penggunaan, silakan mengunjungi halaman Repo github Midtrans.
 
#### Contoh Penggunan API Aksi untuk Transaksi

Ini adalah salah satu contoh API Request `cancel` transaksi pada CURL:
```bash
curl -X POST \
  https://api.sandbox.midtrans.com/v2/myCustOrder123/cancel \
  -H 'Accept: application/json'\
  -H 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87' \
  -H 'Content-Type: application/json'
```

