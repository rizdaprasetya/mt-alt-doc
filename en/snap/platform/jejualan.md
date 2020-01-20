# Midtrans Integration with Jejualan

Please complete the following steps in advance:

1. Create an online store account with [Jejualan](https://jejualan.com/daftar), and choose Beta, Gamma, or Delta in order to use Midtrans service.
2. Register to Midtrans account [here](https://account.midtrans.com/register).
3. Complete the account registration form, or get help by contacting [Midtrans activation team](mailto:activation@midtrans.com) with __Jejualan – URL Name__ as subject header.

### Integrate Midtrans to Jejualan platform by following the steps below:

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login)

	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Choose __Settings - Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

	Fill __Payment Notification URL__ with: `<your_website>`.<br />__E.g__ : if your website is http://abc.jejualan.com, so your Payment Notification URL should be filled with “http://abc.jejualan.com”.<br />

	Fill __Finish Redirect URL__ with: `<your_website>/store/payment/veritrans/success`.<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>/store/payment/`.<br />
	Fill __Error Redirect URL__ with: `<your_website>/store/payment/veritrans/failed`.

3. Choose __Settings - Access Keys__.

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Jejualan Admin Panel of your store 

	![jejualan](./../../../asset/image/jejualan-1.png)

5. Choose __Konfigurasi - Pembayaran__.

	![jejualan](./../../../asset/image/jejualan-2.png)

	Click Midtrans field, then change mode from `Tidak Aktif` to `Aktif`. Ensure that the button is now colored in blue.

6. Input Midtrans __Production Server Key__. Then enable payment methods via Midtrans by checking / unchecking the desired payment method.

	![jejualan](./../../../asset/image/jejualan-3.png)

> You can enable only registered payment methods. For Credit Card, 3D Secure mode is recommended.

7. Click **Simpan**.