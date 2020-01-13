## Midtrans Account

Before integrating with Midtrans, you need to register for Account.

<div class="my-card">

#### [Register Midtrans Account here](https://account.midtrans.com/register)
</div>

After completing the registration you will be given access to your Merchant Administration Portal (MAP), where you shall have access to both sandbox and production environment.

![Production Merchant Dashboard](./../../asset/image/production-map.png)

## Access Midtrans Administration Portal

Please click the "Login" button on the top right of the Midtrans page (www.midtrans.com). Enter the email and password the user used to create the Midtrans account, then click the "Login" button.

![Login page](./../../asset/image/snap-prep-login-page-url.png)

> **Note:** Midtrans do the following to maintain the security of your account.
> * If there is no activity on Midtrans MAP for 15 minutes, the account will automatically logout.
> * MAP Midtrans will do merchant to update the password every 90 days.

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

## How to unlock account (locked account)

Midtrans provides tolerance of up to 5x (five times) errors when the merchant tries to login into MAP. If the tolerance limit is exceeded, the account will be locked automatically.

To unlock MAP, inform the locked account to support@midtrans.com for the unlock process. If the unlock process was done, please log into midtrans account using your previous password.

## Reset Password

If you forgotten Midtrans account password, you can reset the password by click **Trouble Logging in?** button on login page

<p align="center">
<img src="./../../asset/image/snap-prep-login-page.png" alt="login page forgot password" width="300" height="300">
</p>

Fill in the email that has been registered at Midtrans, instructions for the password reset process will be sent to your email. Please check your Inbox or Spam, you will receive a new e-mail with instructions on how to reset your password in a few moments.			

<p align="center">
<img src="./../../asset/image/snap-prep-reset-password.png" alt="email forgot field" width="300" height="300">
</p>


> **Info :**
> - Forgot password link in the email is only valid for 1 hour. If the link has expired, you must repeat from the beginning the password reset process.