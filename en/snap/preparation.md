This section will explain what preparation is needed to start Snap integration.

?> Please make sure you have already done [creating your Midtrans Account](/en/midtrans_account/overview.md), before proceeding with this section.

## Retrieving API Access Keys

Retrieve your API [Server Key & Client Key, by following previous section.](/en/midtrans_account/overview.md?id=retrieving-api-access-keys)

## Configure Redirection URL

Redirection URL is used to redirect your customer after the payment process through Snap is completed. 

<!-- tabs:start -->
#### **Snap Popup (Default)**

To set your redirection URL if you are using pop-up mode, please go to [**Settings > Snap Preference > System Settings**](https://dashboard.sandbox.midtrans.com/settings/snap_preference).

![Redirect URL Configuration Snap JS](./../../asset/image/snap-prep-redirect-url-snapjs.png)

Please refer to the diagram below on how redirection URLs are being handled.

![Diagram Snap JS](./../../asset/image/snap-prep-diagram-snapjs.png)

#### **Snap Redirect (Alternative)**

To set your redirection URL if you are using redirect mode, please go to [**Settings > Configuration**](https://dashboard.sandbox.midtrans.com/settings/vtweb_configuration).

![Redirect URL Configuration Snap Redirect](./../../asset/image/snap-prep-redirect-url-snapredir.png)

Please refer to the diagram below on how redirection URLs are being handled.

![Diagram Snap Redirect](./../../asset/image/snap-prep-diagram-snapredir.png)

<!-- tabs:end -->

**Note**: 
The final redirect url will be appended with query parameter like `?order_id=xxx&status_code=xxx&transaction_status=xxx`. 

For example the final redirect url might looks like this: `https://tokoecommerce.com/finish_payment/?order_id=CustOrder-102123123&status_code=200&transaction_status=capture`. 

You could utilize those information to display custom message to your customer on your finish url.
