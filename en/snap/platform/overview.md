# 3rd Party Ecommerce Platform

If you are using 3rd party E-commerce platform or SaaS like Shopify, Sirclo, and Jejualan. 

We have partnered with various platfroms to make integration process as easy as possible. This page contains a list of platforms that have partnered with Midtrans, if you are using 3rd party platform that are not listed, and would like for us to integrate with it, please let us know via [support@midtrans.com](mailto:support@midtrans.com "email support")

Step by step guide to integrate Snap to your platform of choice, will be explained below.
#### Choose from any platform of your choice:
<br>

<div class="my-card">

#### [ Shopify](#shopify)
</div>
<div class="my-card">

#### [ Sirclo](#sirclo)
</div>
<div class="my-card">

#### [ Jejualan](#jejualan)
</div>
<hr><br><br>

## Shopify

Please complete the following steps:

1. Create an online store with [Shopify](https://shopify.com).
2. Register to Midtrans account [here](https://account.midtrans.com/register).
3. Complete the account registration form, or get help by contacting [Midtrans activation team](mailto:activation@midtrans.com) with __SHOPIFY - URL Name__ as a subject header and mention your registered _Midtrans Merchant ID_.

Note:
- You can try with Shopify Trial plan to test payment integration in Sandbox mode.
- You may be required by Shopify to have an active paid-plan in order to allow your customer to do checkout on Production mode.

### Integrate Midtrans to Shopify Platform by following the steps below:

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login)

	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Choose __Settings - Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

	On **Production** mode:

	Fill __Payment Notification URL__ with: `https://vt-pixels.midtrans.com/veritrans/callback_url`<br />
	Fill __Finish Redirect URL__ with: `<your_website>`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>`<br />
	Fill __Error Redirect URL__ with: `<your_website>`

	On **Sandbox** mode:

	Fill __Payment Notification URL__ with: `https://vt-pixels.sandbox.midtrans.com/veritrans/callback_url`<br />
	Fill __Finish Redirect URL__ with: `<your_website>`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>`<br />
	Fill __Error Redirect URL__ with: `<your_website>`

3. Choose __Settings - Access Keys__.

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to your [Shopify Store](https://www.shopify.com/login) 

5. In your Shopify Store admin page go to menu __Settings - Payment providers__ 
	
	![Settings menu](./../../../asset/image/shopify-1.png ':size=400')
	![Payment providers menu](./../../../asset/image/shopify-2.png ':size=400')

6. Under __Third-party providers__ menu, click __Choose third-party provider__.
	![Third-party providers](./../../../asset/image/shopify-3.png ':size=400')

7. Search __Midtrans__ and click it.
	![Search Midtrans](./../../../asset/image/shopify-4.png ':size=400')

8. Complete the configuration by filling in your __Merchant ID__ & __server key__. Then click __Activate__. 

	__Note:__

	- Leave __Enable test mode__ checkbox unchecked to allow real transaction.
	- Check the __Enable test mode__ checkbox if you want to test transaction without actual payment (using test credentials provided by Midtrans).

	Please note that __server key__ for sandbox/testing is different from production. You may obtain your Merchant ID & server key from Midtrans MAP (after logging in) from the following links:
	
	- For sandbox/testing: [here](https://dashboard.sandbox.midtrans.com/settings/config_info)
	- For production/real transaction: [here](https://dashboard.midtrans.com/settings/config_info)

	![shopify](./../../../asset/image/shopify-5.png ':size=400')

9. Done! Now your Shopify online shop is ready to use Midtrans as payment gateway. Your customer will see Online Payment as payment method on the checkout page.

	![shopify](./../../../asset/image/shopify-6.png ':size=400')

10. Midtrans Snap payment page will be displayed to the customer. Payment methods that are available for this integration is all payment methods that are available on Snap product, which is explained on [this page](https://midtrans.com/payments).

	![shopify](./../../../asset/image/shopify-7.png ':size=400')

With this integration, your customer will be redirected to Snap Redirect payment page. Customer payment data is safely managed by Midtrans hosted payment web page, outside of your Shopify store web domain.

<hr><br><br><hr><br><br>

### Available Payment Methods
Payment methods that are available for this integration is all payment methods that are available on Snap product, which is explained on [this page](https://midtrans.com/payments).

### Specific Payment Methods

You can optionally follow these steps, if **you prefer to have the payment methods displayed on your shopify checkout page** instead.

For example:
![shopify](./../../../asset/image/shopify-17.png ':size=400')

1. Choose your preferred payment methods, and click the link:
	- [Bank Transfer BNI](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055281)
	- [Bank Transfer BCA](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055283)
	- [Bank Transfer Permata](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055285)
	- [Bank Transfer Mandiri Bill](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055287)
	- [Gopay](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055289)
	- [Indomaret](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055291)
	- [Alfamart](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055293)
	- [Akulaku](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055295)
	- [Other bank transfer & debit](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055297)
	- [Card Payment](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055299)
	- [Card Installment Payment](https://www.shopify.com/login?redirect=%2Fadmin%2Fauthorize_gateway%2F1055413)

2. Login with your Shopify account when prompted, then you will need to click **Install** on the payment gateway:
![shopify](./../../../asset/image/shopify-13.png ':size=400')

3. You will be navigated to payment settings page (`Settings > Payments` menu on your Shopify admin page). Click **Choose Alternative Payments**
![shopify](./../../../asset/image/shopify-14.png ':size=400')

4. There will be search bar, input/search `Midtrans` you will be displayed they methods you installed previousy:
![shopify](./../../../asset/image/shopify-15.png ':size=400')
*for example that is if you install all of it, you can install just 1 or few of it*

5. You will need to enter Midtrans **Merchant ID** and **Server Key**
	![shopify](./../../../asset/image/shopify-16.png ':size=400')

	Get it from [Merchant Administration Portal](https://account.midtrans.com)
	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')
	
	under menu **Settings > Access Keys**
	![access key](./../../../asset/image/sirclo-2.png)

6. Setup Notification URL on [Merchant Administration Portal](https://account.midtrans.com/login)

	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![Login MAP](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

	Choose __Settings - Configuration__.

	![Setting](./../../../asset/image/dashboard-configuration.png)

	On **Production** mode:

	Fill __Payment Notification URL__ with: `https://vt-pixels.midtrans.com/veritrans/callback_url`<br />
	Fill __Finish Redirect URL__ with: `<your_website>`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>`<br />
	Fill __Error Redirect URL__ with: `<your_website>`

	On **Sandbox** mode:

	Fill __Payment Notification URL__ with: `https://vt-pixels.sandbox.midtrans.com/veritrans/callback_url`<br />
	Fill __Finish Redirect URL__ with: `<your_website>`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>`<br />
	Fill __Error Redirect URL__ with: `<your_website>`

7. Done! Now your Shopify online shop is ready to use Midtrans as payment gateway.
![shopify](./../../../asset/image/shopify-17.png ':size=400')
<hr><br><br><hr><br><br>

### Advanced
<br>
<details>
<summary>Matching Order ID Between Shopify & Midtrans</summary>
<article>

Order ID created on Midtrans Dashboard for each transaction is based from reference auto generated by Shopify platform, to ensure uniqueness per transaction. It can be different with order id shown on Shopify platform.

To find order on Shopify platform based on Order ID from Midtrans, first find the transaction Order ID from Midtrans Dashboard on Transactions Menu.
![shopify](./../../../asset/image/shopify-8.png ':size=400')

##### Via Order menu
1. On your Shopify admin area, go to __Orders > All Orders__ menu.
2. Use the __search__ feature, search by inputting order id from Midtrans.
3. Click on the shown order.

![shopify](./../../../asset/image/shopify-9.png ':size=400')

##### Via General Search
1. On your Shopify admin area, there is general __search__ bar on top of the page.
2. Search by inputting order id from Midtrans.
3. Click on the shown order.

![shopify](./../../../asset/image/shopify-10.png ':size=400')

##### Order detail
Inside the order found by the search result, you can see the reference number.

![shopify](./../../../asset/image/shopify-11.png ':size=400')

##### Via Exported Order
You can also find the reference number on the exported CSV file using Shopify export feature: __All Orders > Export > Export Orders.__ Then search within the CSV file.

![shopify](./../../../asset/image/shopify-12.png ':size=400')
</article>
</details>


<details>
<summary>Customize Shopify Order Confirmation Email Template</summary>
<article>

When customer is proceeding to check out from your Shopify store into Midtrans Snap payment page, order is "confirmed" on Shopify side, and they will send "order confirmation" email notification to customer.

But you may find the wording of the email is confusing for customer, e.g. :
> Hi John, we're getting your order ready to be shipped. We will notify you when it has been sent.

You may notice that email is being sent **before customer complete the payment**, so it may not be true that the order is ready for shipping, **the order need to be paid first**. Unfortunately that's how the default Shopify "order confirmation notification" behaviour works. We can try to customize the message to be less confusing.

Shopify explained how to customize notification [on their documentation here](https://help.shopify.com/en/manual/sell-online/notifications/edit-template). We try to summarize it for you.

1. Login to your Shopify admin page.
2. Go to `Settings > Notifications`.
3. Click `Order Confirmation`.
4. Search for `{% capture email_body %}` text.
5. Input or copy this sentence just below/after that text:
```
If you have completed your payment, then you are done. If you haven't complete your payment, please complete it soon to avoid auto-cancelation.<br><br>
```
You can customize the message to your own preference. Or even modify it as "payment reminder".
![shopify](./../../../asset/image/shopify-18.png ':size=400')
6. Click `Save`. And you can also `Preview` the email.
7. Done.
![shopify](./../../../asset/image/shopify-19.png ':size=400')

</article>
</details>

<details>
<summary>Additional Notes</summary>
<article>

##### Cancel & Refund via Shopify admin panel
Within Shopify admin panel's order details view, there are actions of `cancel` and `refund`. When triggering `cancel` or `refund`, Midtrans order status will try to sync with the Shopify status, if it met the criteria for payment cancel or refund.

For example:
- Canceling `pending` order on Shopify, will also make Midtrans order status to be marked as `cancel`.
- Refunding `paid` order on Shopify, will also make Midtrans order status to be marked as `refund`/`cancel`.

Not all payment type support online `refund` on Midtrans side, capability is mostly limited to Card & Gopay transaction, if your Midtrans account allowed to trigger online refund.

However, `cancel` or `refund` action triggered on Midtrans dashboard/API, may or may not be synced to Shopify due to some limitation.

##### Note on Canceling Order
Canceling a paid order will auto trigger attempt to refund/cancel payment on Payment Gateway (Midtrans) side . That is the flow of Shopify that Merchant & Payment Gateway follows. Please avoid canceling a paid order when you mean to edit/customize the item or size.

As per Shopify docs, `cancel order` are not supposed to be used to change item/size:
https://help.shopify.com/en/manual/orders/refund-cancel-order#cancel-an-order

Merchants supposed to `edit order` if they need to change the item/size:
https://help.shopify.com/en/manual/orders/edit-orders

Or archive the order, if they really need to remove it from order list:
https://help.shopify.com/en/manual/orders/manage-orders#archive-a-fulfilled-order

<!-- @TODO: waiting to be deployed, uncomment below once deployed -->

##### Item Stock & Status
This try to answer in which point item stock is reduced and restocked from your Shopify store.
- Item stock will be reduced whenever order status become `pending` on Shopify side.
- Item stock will be reduced immediately after customer reach Snap payment page, regardless of he will proceed to actual payment or not. This is to prevent "oversell" issue, by reserving the item stock for the duration of this payment.
- Card transaction with `deny` status will be updated as failed on Shpy by Pixels after 2 hours if left without any success attempt. if success pay attempt is found, it will be updated as success on Shopify.
- Abandoned Snap payment page (customer left without proceeding with  any payment method) will be updated as failed on Shopify after 2 hours, and may not show up in Midtrans Dashboard.
- When customer reach Snap payment page (status `pending` and stock reduced) unfortunately Shopify may send email to cust with body order ready to be shipped although from Shopify side it is still waiting for payment.

##### Basic Status Mapping
Condition | Midtrans Status | Shopify Order Status
--- | --- | ---
Cust redirected to Snap payment page | \- | Payment Pending
Cust proceed with asynchronous payment <br> e.g: Bank Transfer, Gopay. | Pending | Payment Pending
Cust proceed with asynchronous payment <br> but does not pay | Expire | Canceled
Cust successfully paid | Settlement/Capture | Paid
Cust abandoned Snap payment page <br> without proceeding payment | \- | Canceled
Cust abandoned denied card transaction | Deny | Canceled
Merchant cancel/refund order via Shopify | Cancel/Refund | Canceled/Refunded

</article>
</details>

<hr><br><br><hr><br><br>

<!-- @TODO: explain if payment page closed, it may lost forever -->
<!-- @TODO: explain shopify void & refund feature -->
<!-- @TODO: explain item stock deduction / restock scenarios -->


## Sirclo

Please complete the following steps:

1. Create an online store with Sirclo.
2. Register to Midtrans account [here](https://account.midtrans.com/register).
3. Complete the account registration form, or get help by contacting [Midtrans activation team](mailto:activation@midtrans.com) with __SIRCLO - URL Name__ as a subject header and mention your registered _Midtrans Merchant ID_.

### Integrate Midtrans to Sirclo Platform by following the steps below:

1. Login to Midtrans [Merchant Administration Portal](https://account.midtrans.com/login)

	You will find your online shop name with Sandbox/Production environment. Please make sure that you are in __Production environment__.

	![environment switch](./../../../asset/image/snap-prep-env-diff.jpg ':size=400')

2. Choose __Settings - Configuration__.

	Fill __Payment Notification URL__ with : `<your_website>/payment_ipn/veritrans/notify`<br />
	E.g: If your website is www.abc.com, so your Payment Notification URL should be filled with “http://www.abc.com/payment_ipn/veritrans/notify”.

	Fill __Finish Redirect URL__ with: `<your_website>/payment_ipn/veritrans/completed`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>/payment_ipn/veritrans/unfinish`<br />
	Fill __Error Redirect URL__ with: `<your_website>/payment_ipn/veritrans/error`

	![Setting](./../../../asset/image/sirclo-1.png ':size=400')

3. Choose __Settings - Access Keys__

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Sirclo Admin Panel of your Sirclo store.

	![sirclo](./../../../asset/image/sirclo-3.png ':size=400')

5. Choose __Settings - Payment Settings__.

	![sirclo](./../../../asset/image/sirclo-4.png ':size=400')

	Find Midtrans field, then input Midtrans Production _Merchant ID_ and _Server Key_.

	![sirclo](./../../../asset/image/sirclo-5.png ':size=400')

6. Enable payment methods via Midtrans by checking / unchecking the desired payment method

> **Info:**
> You can enable all registered payment methods at Midtrans by unchecking all payment methods.

7. You can choose installment payment method by filling installment period in _Veritrans Installment period for [Bank Name]_. 

> **Info:**
> For installment:
> - You need to be approved and negotiate with the Bank regarding to interest rate and installment period
> - Please contact us at [activation@midtrans.com](mailto:activation@midtrans.com) for further inquiry.

8. Click **Save** or **Update**
<hr><br><br><hr><br><br>

## Jejualan

Please complete the following steps:

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

	Fill __Finish Redirect URL__ with: `<your_website>/store/payment/veritrans/success`<br />
	Fill __Unfinish Redirect URL__ with: `<your_website>/store/payment/`<br />
	Fill __Error Redirect URL__ with: `<your_website>/store/payment/veritrans/failed`

3. Choose __Settings - Access Keys__.

	Copy Midtrans __Merchant ID__ dan __Server Key__ (Will be used for the next step).

	![access key](./../../../asset/image/sirclo-2.png)

4. Login to Jejualan Admin Panel of your store 

	![jejualan](./../../../asset/image/jejualan-1.png ':size=400')

5. Choose __Konfigurasi - Pembayaran__.

	![jejualan](./../../../asset/image/jejualan-2.png ':size=400')

	Click Midtrans field, then change mode from `Tidak Aktif` to `Aktif`. Ensure that the button is now colored in blue.

6. Input Midtrans __Production Server Key__. Then enable payment methods via Midtrans by checking / unchecking the desired payment method.

	![jejualan](./../../../asset/image/jejualan-3.png ':size=400')

> You can enable only registered payment methods. For Credit Card, 3D Secure mode is recommended.

7. Click **Simpan**.