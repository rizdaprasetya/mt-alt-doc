## Midtrans Account

Before integrating with Midtrans, you need to register for Account.

<div class="my-card">

#### [Register Midtrans Account here](https://account.midtrans.com/register)
</div>

After completing the registration you will be given access to your Merchant Administration Portal (MAP), where you shall have access to both sandbox and production environment.

![Production Merchant Dashboard](./../../asset/image/production-map.png)

## Complete Account Information

Please complete the required information in the General Settings menu [**Settings > General Settings**](https://dashboard.sandbox.midtrans.com/settings/general_info).

![General Information](./../../asset/image/snap-prep-general-setting.png)

> **Note:**
> * Please do not use any symbols in Merchant Name.
> * Please use less than 25 characters for Merchant URL.

## Retrieving API Access Keys

API Access Keys will be used to access Midtrans' API. You can find them in [Dashboard](dashboard.sandbox.midtrans.com), menu [**Settings > Access Keys**](https://dashboard.sandbox.midtrans.com/settings/config_info).

![access keys](./../../asset/image/snap-prep-access-keys.png)

> **Key Explanation**
> - `Client Key`: Used as API key to be used for authorization on **frontend** API request/configuration. So it safe to put in your HTML / client code publicly.
> - `Server Key`: Used as API key to be used for authorization while calling Midtrans API **from backend**. So keep it **stored confidentially**.

!> Access Keys are unique for every merchant. Server Key are secret, please always **keep Server Key confidential**.

## Switching Environment

Keys between **Production & Sandbox** environment are different, please make sure you are accessing correct Dashboard **environment**. Environment can be switched easily on top left **Enviornment** Dropdown on the dashboard.

![environment switch](./../../asset/image/snap-prep-env-switch.png ':size=300')

The light and dark shade of blue indicates production and sandbox mode respectively. You can use the sandbox environment during your development phase of integrating Midtrans’ payments system. You can also test dummy transactions on sandbox environment.

![environment switch](./../../asset/image/snap-prep-env-diff.jpg ':size=400')

