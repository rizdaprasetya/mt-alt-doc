# Midtrans API Libraries & Plugins
<hr>

Midtrans strives to make the integration process as frictionless as possible. This page contains a list of open sourced plugins and libraries that can help you speed up integration with Midtrans API.

Our library and plugins are **Open Source!** We are happy to accept any open source contribution or feedback, feel free to check the Github repo. If you write your own plugin or library and would like us to link it, contact [support@midtrans.com](mailto:support@midtrans.com "support email").

<!-- TODO add new row on the table, logo of each CMS & languages -->

## Language Library

|Platforms | Resources | Notes |
|---|---|---|
|PHP|[Composer](https://packagist.org/packages/midtrans/midtrans-php)<br>[Github](https://github.com/Midtrans/midtrans-php)| |
|Ruby|[Gem](https://rubygems.org/gems/veritrans)<br>[Github](https://github.com/veritrans/veritrans-ruby)| |
|Node JS|[NPM](https://www.npmjs.org/package/midtrans-client)<br>[Github](https://github.com/Midtrans/midtrans-nodejs-client)| |
|Python|[PyPI](https://pypi.org/project/midtransclient/1.0.6/)<br>[Github](https://github.com/Midtrans/midtrans-python-client)| |
|Java|[Bintray](https://bintray.com/midtrans/midtrans-java/com.midtrans)<br>[Java Doc](https://midtrans.github.io/midtrans-java/index.html)<br>[Github](https://github.com/Midtrans/midtrans-java)| |
|Go|[Github](https://github.com/Midtrans/midtrans-go)| |
|Postman Collection| [Postman](https://app.getpostman.com/run-collection/af068be08b5d1a422796)<br>[Github](https://github.com/Midtrans/Midtrans-Payment-API-Postman-Collections)| |
|TypeScript\*|[Github](https://github.com/restuwahyu13/midtrans-node)| \*Community contribution. <br>Credits to [restuwahyu13](https://github.com/restuwahyu13)

#### For Library Developer
Did you develop your own library/package/module for Midtrans API, and want us to list and recognize it on this page? Please do let us know via email at support@midtrans.com. We do appreciate community contributions 🎉.

## Snap Plugin for E-Commerce CMS
?> The [step by step installation guide is available here](/en/snap/with-plugins.md).

|Platforms | Resources |
|---|---|
|Prestashop| **v1.6**<br> * [Github](https://github.com/veritrans/SNAP-Prestashop)<br> * [Prestashop Wiki](https://github.com/veritrans/SNAP-Prestashop/wiki)<br>**v1.7**<br> * [Github](https://github.com/veritrans/SNAP-Prestashop)<br><br>|
|Magento|**v1.8, v1.9**<br> * [Github](https://github.com/veritrans/SNAP-Magento)<br> * [Magento Wiki](https://github.com/veritrans/SNAP-Magento/wiki)<br>**v2.x**<br> * [Github](https://github.com/Midtrans/Midtrans-Magento2)<br> * [Magento Marketplace](https://marketplace.magento.com/midtrans-snap.html)<br><br>|
|Opencart|**v2.0, v2.1, v2.2**<br> * [Github](https://github.com/veritrans/SNAP-Opencart)<br> * [Opencart Wiki](https://github.com/veritrans/SNAP-Opencart/wiki)<br>**v2.3**<br> * [Github](https://github.com/Midtrans/SNAP-Opencart-2.3/)<br>**v3.0**<br> * [Github](https://github.com/Midtrans/Midtrans-Opencart3/)<br><br>|
|Wordpress <br> Woocommerce|**Wordpress v3.9.1 or Greater**<br>**WooCommerce v2.0 or Greater**<br> * [Github](https://github.com/veritrans/SNAP-Woocommerce)<br> * [Wordpress Wiki](https://github.com/veritrans/SNAP-Woocommerce/wiki)<br> * [Wordpress Plugin Site](https://wordpress.org/plugins/midtrans-woocommerce/)<br><br> |
|WHMCS| **v5.3.12 - v7**<br> * [Github](https://github.com/veritrans/SNAP-whmcs)<br><br>|
|Drupal Commerce|**7.x**<br> * [Github](https://github.com/Midtrans/Midtrans-Drupal7)<br>**v8.x**<br> * [Github](https://github.com/Midtrans/Midtrans-Drupal8)<br> * [Drupal Module Site](https://www.drupal.org/project/midtrans_commerce)<br><br> |
|Wordpress <br> Easy Digital Downloads|**Wordpress v3.9.1 or Greater**<br>**v2.x**<br> * [Github](https://github.com/Midtrans/midtrans-edd)<br> * [Wordpress Plugin Site](https://wordpress.org/plugins/edd-midtrans-gateway/)<br><br> |

## Sample Integration Code

|Platforms | Resources |
|---|---|
|PHP | [Github](https://github.com/Midtrans/midtrans-php/tree/master/examples)|
|Java | [Github](https://github.com/Midtrans/midtrans-java/tree/master/example)|
|NodeJS | [Github](https://github.com/Midtrans/midtrans-nodejs-client/tree/master/examples)|
|Python | [Github](https://github.com/Midtrans/midtrans-python-client/tree/master/examples)|
|Other | please check <br>[respective language's repo](#language-library)|

#### How to Run Sample Codes Quickly & Easily

?> ***Tips:*** You can use [Gitpod.io](https://www.gitpod.io/) to easily run our sample codes. Gitpod is like a temporary cloud VM/VPS/container (with proper UI) that you can use to manage & run codes/web-servers easily. You don't need to install or download anything on your own machine, run it on their cloud!

Here's how:
- Go to [Gitpod.io](https://www.gitpod.io/), and sign-up/sign-in for a free account.
	- You can easily sign-in with Github account.
- Then on your web browser, type `https://gitpod.io#`, then paste Midtrans' example repo url at the end of the url.
	- E.g. open this url on your browser: https://gitpod.io#https://github.com/Midtrans/midtrans-nodejs-client/
- Then you will be given access to a cloud IDE, that have its own code-editor UI & terminal/shell that you can use to browse/edit the code & run the codes/examples.
- You can `cd` to the `/examples` folder and follow the instruction.
	- e.g. for NodeJS example, you can `cd /examples/expressApp` then run the example with `npm install; npm start;`. The example web server will run and you can click open browser/preview, to browse it as a web user.

That's it!

## Ecommerce Platform
If you are looking to integrate with 3rd party Ecommerce platform such as Shopify, [please visit this page](/en/snap/platform/overview).
