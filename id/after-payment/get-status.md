# Mendapaatkan Status Transaksi Melalui API

Untuk melihat status transaksi anda dapat melakukan API Request ke Midtrans dengan menggunakan parameter `order_id` atau `transaction_id`


#### Detail Request
Tipe | Nilai
--- | ---
HTTP Method | `GET`
API endpoint | `https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status`

#### Header HTTP
```
Accept: application/json
Content-Type: application/json
Authorization: Basic AUTH_STRING
```

**AUTH_STRING**: Base64(`ServerKey + :`)

?> Request HTTP dengan menggunakan metode Basic Otentikasi. Username diisi dengan data server key Anda. Sedangkan kata sandi dibiarkan kosong. Nilai header *Authorization* diwakili oleh nilai AUTH_STRING. AUTH_STRING adalah string dari Base-64 dimana terdiri dari gabungan antara nama pengguna & kata sandi Anda yang dipisahkan oleh **:** (simbol titik dua). [Untuk lebih detail silahkan mengunjungihalaman ini](/id/technical-reference/api-header.md).

### Contoh Mendapatkan Status Transaksi

Ubah parameter `[ORDER_ID]` dengan nilai `order_id` pada transaksi yang ingin anda cek atau bisa juga menggunakan nilai pada parameter `transaction_id`.
<!-- TODO: add more language sample -->
```bash
curl --location --request GET 'https://api.sandbox.midtrans.com/v2/[ORDER_ID]/status' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic U0ItTWlkLXNlcnZlci1UT3ExYTJBVnVpeWhoT2p2ZnMzVV7LZU87'
```
?> Pada Official [Midtrans Language Library](/id/technical-reference/library-plugin.md) selalu ada method/function untuk API Request `status`.

### Contoh Respon

#### Respon Sukses

```json
{
  "masked_card": "481111-1114",
  "approval_code": "1578569243927",
  "bank": "bni",
  "eci": "05",
  "channel_response_code": "00",
  "channel_response_message": "Approved",
  "transaction_time": "2020-01-09 18:27:19",
  "gross_amount": "10000.00",
  "currency": "IDR",
  "order_id": "Postman-1578568851",
  "payment_type": "credit_card",
  "signature_key": "16d6f84b2fb0468e2a9cf99a8ac4e5d803d42180347aaa70cb2a7abb13b5c6130458ca9c71956a962c0827637cd3bc7d40b21a8ae9fab12c7c3efe351b18d00a",
  "status_code": "200",
  "transaction_id": "57d5293c-e65f-4a29-95e4-5959c3fa335b",
  "transaction_status": "settlement",
  "fraud_status": "accept",
  "settlement_time": "2020-01-10 16:15:31",
  "status_message": "Success, transaction is found",
  "merchant_id": "M004123",
  "card_type": "credit"
}
```

#### Respon Fail / Not found
```json
{
  "status_code": "404",
  "status_message": "The requested resource is not found"
}
```

#### Definisi

Definisi pada status transaksi bisa anda lihat pada halaman berikut [Definisi Notifikasi Status Transaksi](/id/after-payment/http-notification?id=definisi-status).


### API Request Aksi Transaksi Lainnya

Untuk aksi API Request lainnya terkait transaksi anda dapat mengunjungi halaman berikut ini:

<div class="my-card">
	
#### [API Action / Method](/en/after-payment/status-cycle.md#api-action-method)
</div>