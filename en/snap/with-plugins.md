# Snap With Plugins

The steps to do plugins integration of Snap will be explained below

?>**Note:**
All the steps below are using Midtrans **Sandbox environment**, not production, to easily test the integration process. Make sure to follow [preparation section](/en/snap/preparation.md), before proceeding.


### Prestashop
Midtrans ❤️ Prestashop! Integrate your Prestashop store with Midtrans Snap payment gateway. We strive to make payments simple for both the merchant and customers. This plugin will allow online payment on your Prestashop store using various online payment channel.

#### Requirements:
* Prestashop 1.6 & 1.7 or greater
* PHP version 5.4 or greater
* MySQL version 5.0 or greater
* Midtrans plugin for PrestaShop [ [Github](https://github.com/veritrans/SNAP-Prestashop) | [Zip](https://github.com/veritrans/SNAP-Prestashop/archive/master.zip) ].

#### Installation Process:

1. Extract the plugin you have previously downloaded and rename folder as **midtranspay**. Then Zip the folder back into **midtranspay.zip**.
2. Go to your Prestashop administration page and go to **Modules - Modules Manager** menu.
3. Click on the **Upload a module** and locate the **midtranspay.zip** file, then upload it.
![Prestashop install midtrans](./../../asset/image/Prestashop-install.gif)
4. Find the **Midtrans Pay** module in the module manager and click configure.
    * Fill Payment Option Display Text with text button that you want to display to Customer.
    * Select **Environment**, Development for testing transaction, Production for real transaction.
    * Fill in the **Merchant ID,** **Client key & Server key**. You can find this credential on Midtrans MAP `Dashboard Settings` **->** `Access Keys`.
    * **Map payment SUCCESS status to:** select your desired order status when payment is success.
    * **Map payment FAILURE status to:** select your desired order status when payment is failure.
    * **Map payment PENDING/CHALLENGE status to:** select your desired order status when payment is challenged.
    * Other configuration are optional, you may leave it as is.

#### Prestashop Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings > configuration`

   * Payment Notification URL:<br>
        `http://[your-site-url]/index.php?fc=module&module=midtranspay&controller=notification`
   * Finish Redirect URL:<br>
        `http://[your-site-url]/index.php?fc=module&module=midtranspay&controller=success`
   * Unfinish Redirect URL:<br>
        `http://[your-site-url]/index.php?fc=module&module=midtranspay&controller=success`
   * Error Redirect URL:<br>
        `http://[your-site-url]/index.php?fc=module&module=midtranspay&controller=failure`
        
#### Prestashop Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Prestashop Payment Test](./../../asset/image/presta-pay-show.gif)


### Magento 2

Midtrans ❤️ Magento! Midtrans highly concerned with customer experience (UX). We strive to make payments simple for both the merchant and customers. With this plugin you can make your Magento store using Midtrans payment.

#### Requirements:

* An online store with Magento infrastructure. This plugin is tested with **Magento v2.3.2**
* PHP v5.4 or greater.
* MySQL v5.0 or greater.
* Midtrans plugin for Magento For Magento v2.x [ [Github](https://github.com/Midtrans/Midtrans-Magento2) | [Zip](https://github.com/Midtrans/Midtrans-Magento2/archive/master.zip) ] , For Magento v1.9 [ [Github](https://github.com/veritrans/SNAP-Magento) | [Zip](https://github.com/veritrans/SNAP-Magento/archive/master.zip) ] 

#### Installation:
#### Simple Installation

1. Download and extract the zip.
2. Locate the root Magento directory of your shop via FTP connection.
3. Copy the 'app' & 'lib' folders into magento root folder.
4. Login to your Magento Admin Panel.
5. Go to `System (1)` -> `Web Setup Wizard (2)` -> `Module Manager(3)`.
![Magento 2 step 5](./../../asset/image/Magento2-1.png)
6. Scroll or go to the next page until you find Midtrans_Snap.
![Magento 2 step 6](./../../asset/image/Magento2-3.png)
7. Click **Select** -> **Enable** to enable the module.
8. Proceed to step 5 below.
9. Let’s to the Midtrans Magento 2 [Plugins Configurations](#midtrans-magento-2-plugins-configurations) Section

`i.e: (6),(5) is numbers on the picture above`

#### Manual Installation:

1. Download and extract the zip.
2. Locate the root Magento directory of your shop via FTP connection
3. Copy the 'app' & 'lib' folders into magento root folder
4. On Magento root folder, run below command:
    * `php bin/magento module:enable --clear-static-content Midtrans_Snap`
    * `php bin/magento setup:upgrade`
    * `php bin/magento cache:clean`
5. Let’s to the Midtrans Magento 2 [Plugins Configurations](#midtrans-magento-2-plugins-configurations) Section

#### Midtrans Magento 2 Plugins Configurations

1. Login to your Magento Admin Panel.
2. Go to menu **Stores** (1) -> **Configuration** (2) -> **Sales** (3) -> **Payment** **Method** (4) -> Tab "**Midtrans_Snap**" (5)
![Magento 2 step config 1](./../../asset/image/Magento2-7.png)
![Magento 2 step config 2](./../../asset/image/Magento2-Snap-Config.png)
3. Fill the **Title**, **Merchant Id**, **Client Key**, **Server Key** on the field of section area (6)
4. The last to do with Midtrans Configuration is **Save Config** (7)
5. All is done, you can use Online Payment with Midtrans Snap on Magento 2

#### Magento Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings > configuration`

   * Payment Notification URL:<br>
        `http://[your-site-url]/snap/payment/notification`
   * Finish Redirect URL:<br>
        `http://[your-site-url]/snap/index/finish`
   * Unfinish Redirect URL:<br>
        `http://[your-site-url]/snap/index/finish`
   * Error Redirect URL:<br>
        `http://[your-site-url]/snap/index/finish`

#### Magento 2 Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Magento 2 Payment Test](./../../asset/image/mag2-pay-show.gif)

### Opencart

Midtrans ❤️ Opencart! This is official Midtrans extension for the OpenCart E-Commerece platform.

#### Requirements:

* Opencart minimal 2.0 or greater
* PHP version 5.4 or greater
* MySQL version 5.0 or greater
* Midtrans plugin for Opencart

#### Installation:
1. Download midtrans opencart plugins and extract the zip file
    * [Opencart v3.0](https://github.com/Midtrans/Midtrans-Opencart3)
    * [Opencart v2.3](https://github.com/Midtrans/SNAP-Opencart-2.3/)
    * [Opencart v2.0, v2.1, v2.2](https://github.com/veritrans/SNAP-Opencart)
2. Locate the root OpenCart directory of your shop via FTP connection.
3. Copy the `admin`, `catalog`, and `system` folders into your OpenCart root folder, and merge it.
![Opencart Install](./../../asset/image/Opencart-install.gif)
4. In your OpenCart admin area, go to **Extensions** -> **Extensions**.
5. Filter by Payments, scroll down until you find Midtrans.
6. Click the Install green button and edit the plugin.

#### Opencart Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings` **->** `configuration`

   * Payment Notification URL:<br>
        `http://[your shop's homepage]/index.php?route=payment/snap/payment_notification`
   * Finish Redirect URL:<br>
        `http://[your shop’s homepage]/index.php?route=payment/snap/landing_redir&`
   * Unfinish Redirect URL:<br>
        `http://[your shop’s homepage]/index.php?route=payment/snap/landing_redir&`
   * Error Redirect URL:<br>
        `http://[your shop’s homepage]/index.php?route=payment/snap/landing_redir&`
        
#### Opencart Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Opencart Payment Test](./../../asset/image/opencart-pay-show.gif)

### WooCommerce

Midtrans  ❤️ WooCommerce! This plugin will allow secure online payment on your WooCommerce store, without your customer ever need to leave your WooCommerce store! With beautiful responsive payment interface built-in. We strive to make payments simple for both the merchant and customers. Support various online payment channel. Our WooCommerce plugins also available on [Wordpress plugins store](https://wordpress.org/plugins/midtrans-woocommerce/). Support WooCommerce v3 & v2

#### Requirements:

* WordPress v3.9 or greater **|** Tested up to v5.0.0
* [WooCommerce v2](https://github.com/veritrans/SNAP-Woocommerce) or greater **|** Tested up to v3.5.2
* PHP version v5.4 or greater
* MySQL version v5.0 or greater
* PHP CURL enabled server/host

#### Installation:
#### A. Simple Installation
   * Login to your Wordpress admin panel.
   * Go to Plugins menu, click add new. Search for Midtrans-WooCommerce plugin.
   * Install and follow on screen instructions.
   * Proceed to Configuration Process below.

![WooCommerece Install](./../../asset/image/WooCommerce-install.gif)

#### B. Manual Installation
   * Download the plugin from [Zip](https://github.com/veritrans/SNAP-Woocommerce/archive/master.zip).
   * Extract the plugin, then rename the modules folder as **midtrans-woocommerce**.
   * Upload the unzipped plugin folder to your WordPress installation's `wp-content/plugins/ directory`.
   * Install and activate the plugin from plugins menu within the WordPress admin panel
   * Proceed to Configuration Process above.
   
#### WooCommerce Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings` **->** `configuration` and `settings` **->** `Snap Preference` **->** `System Settings`

   * Payment Notification URL:<br>
        `http://[your web]/?wc-api=WC_Gateway_Midtrans`
   * Finish Redirect URL:<br>
        `http://[your web]/?wc-api=WC_Gateway_Midtrans`
   * Unfinish Redirect URL:<br>
        `http://[your web]/?wc-api=WC_Gateway_Midtrans`
   * Error Redirect URL:<br>
        `http://[your web]/?wc-api=WC_Gateway_Midtrans`
        
#### WooCommerce Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![WooCommerce Payment Test](./../../asset/image/woo-pay-show.gif)

### WHMCS

#### Requirements:
   * WHMCS v5.3.12 - v7.x or greater (Tested up to WHMCS v7.6 - running well)
   * PHP version 5.4 or greater
   * MySQL version 5.0 or greater
   * Midtrans plugin for WHMCS [ [Github](https://github.com/veritrans/SNAP-whmcs.git) | [Zip](https://github.com/veritrans/SNAP-whmcs/archive/master.zip) ].

#### Installation:
   * Download the modules from this repository.
   * Extract **Whmcs-master.zip** file you have previously downloaded.
   * Upload & merged module folder that you have extracted into your WHMCS directory. **Installation & Configuration**
   * Access your WHMCS admin page.
   * Go to `Setup` **->** `Payments` **->** `Payment Gateways` menu.
   * Click **Midtrans** payment method, then you will be redirected to configuration page.
   * Fill the input as instructed on the screen. Click **Save Changes**.

![WHMCS](./../../asset/image/snap-whmcs1.png)

#### WHMCS Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings` **->** `configuration` and `settings` **->** `Snap Preference` **->** `System Settings`

   * Payment Notification URL:<br>
        `http://[your website url]/modules/gateways/callback/veritrans.php`
   * Finish Redirect URL:<br>
        `http://[your website url]`
   * Unfinish Redirect URL:<br>
        `http://[your website url]`
   * Error Redirect URL:<br>
        `http://[your website url]`
        
#### WHMCS Testing Payment
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025


### Drupal 8

Midtrans ❤️ Drupal 8! This is the official Midtrans extension for the Drupal E-commerce platform. Let your Drupal Commerce store integrated with Midtrans payment gateway.

#### Requirements :
   * PHP v5.6.x or greater
   * MySQL version 5.0 or greater
   * Drupal v8.x
   * Drupal Commerce 8.x-2.xx

#### Installation :
1. Download the plugin file to your computer and unzip it, rename folder to **commerce_midtrans**.
2. Using an FTP program, or your hosting control panel, upload the unzipped plugin folder to your Drupal modules installation's **[Drupal folder]/modules/contrib/** directory.
3. Open drupal admin page, open menu **Extend**.
4. Look for **Commerce Midtrans** modules under COMMERCE (CONTRIB) group, enable by ticking the checkboxes.
![Drupal 8 1](./../../asset/image/drupal8_1.png)
5. Scroll down and click **Install**.
6. Go to `Commerce` **->** `Configuration` **->** `Payment` **->** `Payment gateways``.
![Drupal 8 2](./../../asset/image/drupal8_2.png)
7. Click **Add payment gateway** button.
![Drupal 8 3](./../../asset/image/drupal8_3.png)
8. Click **Midtrans** under Actions.
9. Fill the following config fields as instructed on each settings description.
    * Fill **Display Name** with text button that you want to display to customer.
    * Select **Mode**, Sandbox for testing transaction and Production for real transaction.
    * Fill **Client and Server key**. You can find this credential on Midtrans MAP Dashboard.
    * Other configuration are optional, you may leave it as is.

![Drupal 8 4](./../../asset/image/drupal8_4.png)
10. Click save.

#### Drupal Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings` **->** `configuration` and `settings` **->** `Snap Preference` **->** `System Settings`
   * Payment Notification URL:<br>
        `http://[your web]/payment/notify/midtrans`
   * Finish Redirect URL:<br>
        `http://[your website url]`
   * Unfinish Redirect URL:<br>
        `http://[your website url]`
   * Error Redirect URL:<br>
        `http://[your website url]`

#### Drupal Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![Drupal Payment Test](./../../asset/image/drupal8-pay-show.gif)

### Easy Digital Download

Midtrans ❤️ EDD! Integrate your Easy Digital Download store with Midtrans Snap payment gateway. We strive to make payments simple for both the merchant and customers. This plugin will allow online payment on your EDD store using various online payment channel. Our EDD plugins also available on [Wordpress plugins store](https://wordpress.org/plugins/edd-midtrans-gateway/) 

#### Requirements:
   * WordPress 3.9.1 or greater
   * Easy Digital Downloads 2.0 or greater
   * PHP version 5.4 or greater
   * MySQL version 5.0 or greater
   * PHP CURL enabled server/host

#### Installation:

#### Simple Installation:

1. Login to your Wordpress admin panel.
2. Go to Plugins menu, click add new. Search for **Midtrans-Easy-Digital-Downloads** plugin.
3. Install and follow on screen instructions.
4. Proceed to step 5 below.
![EDD Install](./../../asset/image/Edd-Install.gif)

#### Manual Installation:

The manual installation method involves downloading our feature-rich plugin and uploading it to your webserver via your favorite FTP application.

1. Download the plugin file to your computer and unzip it
2. Extract the plugin, then rename the folder modules as **edd-midtrans-gateway**
3. Using an FTP program, or your hosting control panel, upload the unzipped plugin folder to your WordPress installation wp-content/plugins/ directory.
4. Install & Activate the plugin from the Plugins menu within the WordPress admin panel.
5. Activate Easy Digital Downloads - Midtrans Gateway plugin from Plugin menu in your WordPress admin page.

#### Midtrans Easy Digital Download Configuration

![Edd Config 1](./../../asset/image/EDD-Config-1.png)

![Edd Config 2](./../../asset/image/EDD-Config-2.png)


#### Easy Digital Download Handling Notification
Login to your [Midtrans Account](https://account.midtrans.com/login), select your environment (sandbox/production), go to menu `settings` **->** `configuration` and `settings` **->** `Snap Preference` **->** `System Settings`
   * Payment Notification URL:<br>
        `http://[Your Website URL]/?edd-listener=midtrans`
   * Finish Redirect URL:<br>
        `http://[Your Website URL]`
   * Unfinish Redirect URL:<br>
        `http://[Your Website URL]`
   * Error Redirect URL:<br>
        `http://[Your Website URL]`

#### EDD Payment Test
Perform successful transaction in your online store by inputing a dummy credit card number as followed (Sandbox Mode):

Type | Visa
------|-----
Card Number	| 4811 1111 1111 1114
CVV	| 123
Exp. Month	| 01
Exp. Year	| 2025

![EDD Payment Test](./../../asset/image/edd-show-pay.gif)