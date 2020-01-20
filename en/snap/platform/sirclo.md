# Midtrans Integration with Sirclo

Please complete the following steps in advance:

1. Create an online store with Sirclo.
2. Register to Midtrans account [here](https://account.midtrans.com/register).
3. Complete the account registration form, or get help by contacting [Midtrans activation team](mailto:activation@midtrans.com) with __SIRCLO - URL Name__ as a subject header and mention your registered _Midtrans Merchant ID_.

### Integrate Midtrans to Sirclo Platform by following the steps below:

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login)

	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![environment switch](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Choose __Settings - Configuration__.

	Fill __Payment Notification URL__ with : `<your_website>/payment_ipn/veritrans/notify`.<br />
	E.g: If your website is www.abc.com, so your Payment Notification URL should be filled with “http://www.abc.com/payment_ipn/veritrans/notify”.

	Fill __Finish Redirect URL__ with: `<your_website>/payment_ipn/veritrans/completed`.<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>/payment_ipn/veritrans/unfinish`.<br />
	Fill __Error Redirect URL__ with: `<your_website>/payment_ipn/veritrans/error`.

	![Setting](./../../../asset/image/sirclo-1.png)

3. Choose __Settings - Access Keys__

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Sirclo Admin Panel of your Sirclo store.

	![sirclo](./../../../asset/image/sirclo-3.png)

5. Choose __Settings - Payment Settings__.

	![sirclo](./../../../asset/image/sirclo-4.png)

	Find Midtrans field, then input Midtrans Production _Merchant ID_ and _Server Key_.

	![sirclo](./../../../asset/image/sirclo-5.png)

6. Enable payment methods via Midtrans by checking / unchecking the desired payment method

> **Info:**
> You can enable all registered payment methods at Midtrans by unchecking all payment methods.

7. You can choose installment payment method by filling installment period in _Veritrans Installment period for [Bank Name]_. 

> **Info:**
> For installment:
> - You need to be approved and negotiate with the Bank regarding to interest rate and installment period
> - Please contact us at [activation@midtrans.com](mailto:activation@midtrans.com) for further inquiry.

8. Click **Save** or **Update**