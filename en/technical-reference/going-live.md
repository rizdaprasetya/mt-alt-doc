# Switching to Production Mode
<hr>

This documentation will assist you in switching from Sandbox environment to Production environment, in order to start accepting real world payment for your business. Also known as "Going Live".

*If further assistance is required, don't hesitate to contact us at support@midtrans.com .*

### 1. Login to Your Midtrans Production Account Dashboard

Please visit https://account.midtrans.com . Enter the email and password of your Midtrans account, then click the **Login** button. [Also explained here](/en/midtrans-account/overview.md#accessing-midtrans-administration-portal).

Make sure the **Environment** indicator shows `Production`. Or please [switch to production mode](/en/midtrans-account/overview.md#switching-environment).

### 2. Check Your Production Account is Active

To check, please go to your [Dashboard > Settings > Snap Preferences](https://dashboard.midtrans.com/settings/snap_preference) and choose **Payment Channels** tab to see your active payment methods.

> Please contact your Midtrans Business PIC or support@midtrans.com if you have any question.

### 3. Retrieve Production Server Key & Client Key

Server Key & Client Key for Production mode is different to Sandbox mode, so you will need to [retrieve the Production mode keys, by following this step](/en/midtrans-account/overview.md#retrieving-api-access-keys).

### 4. Setup HTTP Notification Webhook URL

Ensure you have [set **Notification URL** configuration for Production, by following this step](/en/after-payment/http-notification.md).

#### For Snap Integration:
You can also optionally [ensure to set Redirect URL configuration](/en/snap/advanced-feature.md#configure-redirection-url).

### 5. Configure the Integration

Based on your integration method, please select the one most relevant:

<!-- tabs:start -->
#### **Language Libraries**

If you use Languang Libraries provided by Midtrans. (e.g: Midtrans PHP, Midtrans Ruby, Midtrans NodeJS, etc.)

- Make sure to replace `isProduction` variable on Backend with value `true`.
- Make sure to replace `serverKey` variable value on Backend with the one retrieved from step 3.
- Make sure to replace `data-client-key` variable value on Frontend with the one retrieved from step 3.

#### **Manual API Request**

If you are directly integrating by doing direct API call/request

- Make sure to point API domain destination to **Production API**, on Backend by removing `.sandbox` from the domain. e.g: change from `app.sandbox.midtrans.com/` to `app.midtrans.com/`
- Make sure to replace `serverKey` variable value used for API auth on Backend with the one retrieved from step 3.
- Make sure to replace `data-client-key` variable value on Frontend with the one retrieved from step 3.

#### **Wordpress Woocommerce CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Change `Environment` in Midtrans plugin from `sandbox` into `production`.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **Magento CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Change `Environment` in Midtrans plugin from `sandbox` into `production`.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **Prestashop CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Change `Environment` in Midtrans plugin from `sandbox` into `production`.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **Opencart CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Change `Environment` in Midtrans plugin from `sandbox` into `production`.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **Wordpress EDD CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Uncheck `Test Mode` in Midtrans plugin (Settings > Payment Gateway > General).
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **WHMCS CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Tick `Production Mode` in Midtrans plugin.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).

#### **Drupal CMS**

- Login to your website as admin, then go to the plugin configuration page.
- Change `Mode` in Midtrans plugin from `sandbox` into `production`.
- Input your `Client Key` and `Server Key` with the one retrieved from step 3.

[Check here to know where to find the configuration page](/en/snap/with-plugins).
<!-- tabs:end -->

## 6. Done, Ready for Production Mode

Now you are ready to accept real world payments in Production mode! You can test it yourself.