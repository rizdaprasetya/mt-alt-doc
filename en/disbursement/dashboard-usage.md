# Midtrans Iris Disbursement Account & Dashboard Usage

## Account

Before integrating with Iris, you need to get your Iris Account. Please get in touch with our activation team. After completing the registration you will be given access to your [Iris Dashboard](https://app.sandbox.midtrans.com/iris). Once you have been registered, it will have access to our sandbox environment. 

Iris have two user role accounts **Creator** and **Approver** account. Each of the roles capability is explained in this table:

| Action                  | Creator | Approver |
| ------------------------| --------|----------|
| Create Payout           | ✅      | ❌      |
| Release Payout          | ❌      | ✅      |
| View/inquire Balance    | ✅      | ✅      |
| View/inquire Statements | ✅      | ✅      |

The main idea is to separate authority between who can create the disbursement, and who can approve the disbursement, as these two major roles are separated as part of compliance in most organizations.

<!-- @TODO: add section on how to add users -->

## Dashboard
Midtrans Iris provides a Dashboard (or portal) to manage all your Payouts. You, as a partner,  can see all transfer history as well as for analytics of their transfer activities. The Iris Dashboard can also be used to create transfer requests, validating accounts, approve payout, add beneficiaries, and also requests for transfers/disbursements through CSV file upload.

### Accessing Iris Dashboard
Access Iris login page directly at :
- http://app.midtrans.com/iris for production use or 
- http://app.sandbox.midtrans.com/iris for sandbox environment. 

Input the email and password the user used to create the Iris account, then click the "Login" button.
![Iris Login Page](https://i.imgur.com/Vt0G0Rq.png)

> Note: Midtrans do the following to maintain the security of your account.
> 
> * If there is no activity on Iris Portal for 15 minutes, the account will automatically logout.
> * Iris will require account to update the password at least every 90 days.
> * After three times of failed attempts Login to Iris, you will be temporarily locked out from trying to log in. When your account is locked, you will not be able to log in even with the correct password.
> * If the account is locked, you can't process anything with the associated Iris API key. The API request will be responded with `HTTP Basic: Access denied`

### Retrieving API Access Keys
API Access Keys will be used to access Iris' API. You can find them on the profile sidebar menu. Hover and click your username on the right top of the bar.

![iris-api-key](https://i.imgur.com/qD80SD6.gif)

> API Keys and Merchant Key are unique for every Iris partner. Please always keep the Key confidential. Key Explanation:
> 
> * API Key: Used for authorization while calling Iris API from backend.
> 
> * Merchant Key: Used for validate whether the notification is originated from Midtrans or not.
> 

### Unlocking a locked account
Midtrans provides tolerance of up to 3x (three times) errors when the merchant tries to login into Iris Portal. If the tolerance limit is exceeded, the account will be locked automatically. This is to protect your account from illegitimate access.

To unlock the account, please inform the locked account to support@midtrans.com to begin unlock process. After the account has been unlocked, please log into Iris account using your previous password. But if the urgency is high you can [reset your password](#Reset-Password).

### Reset Password
If you forgot your Iris account password, you can reset the password by clicking Forgot password button on the login page.

![iris-forgot-password](https://i.imgur.com/AcdadvI.png)

Input the email that registered as Iris Account, instructions for the password reset process will be sent to your email. Please check your Inbox (or Spam folder incase it flagged as spam), you will receive a new e-mail with instructions on how to reset your password in a few moments.

![iris-email-forgot](https://i.imgur.com/DFiFUBY.png)


## Dashboard
Midtrans Iris provides powerful Dashboard to manage all your Payouts. Our partners can see all transfer history as well as for analytics of their transfer activities. The Iris Dashboard can also be used to create transfer requests, validating account, approve payout, add beneficiaries, and also requests for transfers/disbursements through CSV file upload.

### Statements
Midtrans Iris provides List all transaction history for a month. You can specify the start date and also end date for range transaction history. If you need CSV/Excel format just click the download button on the bottom of page. You will receive a new e-mail with statements file, please check your Inbox (or Spam folder incase it flagged as spam).

![iris-statment](https://i.imgur.com/Tshi3YQ.png)

### Beneficiary
Do you regularly make transfers to the same person? If so, it's useful to save them as a beneficiary. The beneficiary is represented destination bank account whereby the payout/transfer is intended to. To create a new beneficiary you need some of the detailed information.

| Column | Description |
| -------- | -------- |
| Name     | `String` Name of the Beneficiary     |
| Account  | `Number` Valid account number of the Beneficiary. Length should be within 6 to 20 characters    |
| Bank     | `String` Bank name used by the Beneficiary     |
| Alias Name     | `String` Alias name used by the Beneficiary. Length should be less than or equal to 20 characters. Only alphanumeric characters are allowed. Alias name is unique.  |
| Email     | `Optional` `String` Valid Email address for Beneficiary  |


#### 1. Add Single Benefciaries
To create a single beneficiary follow the below process.

1. log in to Iris Portal and go to `ADD BENEFICAIRES` and select tab `ADD SINGLE BENEFICIARIES`.
2. Please enter your beneficiary details in the fields provided.
3. Make sure all details is correct, confirm with click button `Add Beneficiaries`.

![iris-single-beneficiary](https://i.imgur.com/OpOcBeQ.png)
> NOTE - Fields marked with asterisks (\*) are mandatory fields. 


#### 2. Add Multiple Beneficiaries
To create a multiple beneficiary follow the below process.

1. log in to Iris Portal and go to `ADD BENEFICAIRES` and select tab `ADD MULTIPLE BENEFICIARIES`.
2. Click `download sample`.
3. Please enter your beneficiary details in the CSV file.
4. Make sure all details in CSV file is correct, upload the CSV file with click button `+ Add CSV File`.
![iris-multiple-benficiary](https://i.imgur.com/LNzkVJN.png)
> NOTE - Make sure alias name in the CSV file not contain space and any symbol.


#### Beneficiaries List
The beneficiary list is an easy way for you to view, edit, and delete your beneficiary.

1. Click button `Edit` in case you want to edit some data from beneficiary and click `Update Beneficiary` button after you updated the beneficiary data.
2. Click `delete` button in case you want to remove the beneficiary. The Iris portal will show confirmation pop-up.

![iris-beneficary-list](https://i.imgur.com/Wls618u.png)

#### Bank account number validation
Iris validate account supports all official Indonesia bank. You can validate the account from Iris Portal or Integrate account validation into any of your applications with the Iris API.

Validate from Iris portal:

1. Login to Iris portal. Go to `Beneficaries` menu, and click `Validate Account`.
2. Choose your bank account from the list, fill the bank account number and click `Submit` button.
3. Iris portal will response the result on the same page

![iris-validate-account](https://i.imgur.com/umw3LVm.png)

Valid response:
![](https://i.imgur.com/1li7NTM.png)


### Payout via Dashboard
As a basic payout for Creator to create a payout. It can be used for single payout and also multiple payouts. you can send an amount up to the available balance. The Payouts can’t be created for greater than the available balance. 

This guide walks you through how to transfer the funds into your Beneficiaries account. In this example, money is transferred from your Iris account balance to the individual user. 


To pay your user, go to the **Add Payout** menu. Select the beneficiary from the saved beneficiary list or you can input new beneficiary while creating a single payout.
![iris-add-payouts](https://i.imgur.com/YddacQr.png)

You can:

* [Create single payout](#Single-Payout)
* [Create bulk payout](#Bulk-Payout)
* Send payout email notification to the beneficiary and additional recipients (Optional)

#### Single Payout
Before you send the payout, you need a Beneficiary account. The beneficiary account represents a user bank account. You can choose from the saved beneficiary. The beneficiary list is saved from [add benefciaries menu](#1-Add-Single-Benefciaries).
![iris-saved-beneficiary](https://i.imgur.com/yHHLjlr.png)

In case the beneficiary isn’t on the list you can input new beneficiary accounts and save to beneficiary list while creating a single payout
![iris-add-single-payout](https://i.imgur.com/MztWBdu.png)
The next process is to fill out the amount and notes for request Payout. You can send the payout notification to the beneficiary's account email and also need to fill additional email recipients. Voila, you are done to create the single payout.


#### Bulk Payout
In case you need to make bulk payments such as employees’ salaries,  and vendor/partner payments. With the bulk payouts feature, you will be able to make bulk payments quick and fast. Payouts will send money to your beneficiary’ accounts.

How does bulk payout Work?

1. Make sure your account balance is sufficient.
2. Provide the beneficiary list with some details to the CSV file. You can click `Download sample` button to get sample file.
3. Upload the CSV file with drag and drop the file to Bulk Payout area or click `Add CSV File` button.

![iris-bulk-payout](https://i.imgur.com/m236858.png)
4. After the upload process is completed, The payout automatically to the list of bulk payout with status `queued`.
![](https://i.imgur.com/AyGIMeh.png)


### Approve and Reject Payout
Every business has its own internal rules for who needs to approve outgoing payments. From Iris Portal, You can approval rights to individuals based on payout requests. You can multiple approve/reject or single approve/reject from Iris portal and Iris API
1. Select the payout request.
![iris-pending-task](https://i.imgur.com/XYymzPn.png)

#### Approve
2. Click aprove button and then the payout status will change to `Approved`
![iris-approve-payout](https://i.imgur.com/8JOzMal.png)

#### Reject
3. You need to add the reasons when rejecting the payout. Iris only provide one reason column, If you rejecting with multiple payouts the reasons will same to all payout. The payout status will change to `Rejected`
![iris-reject-payout](https://i.imgur.com/qXSV7I6.png)


### Payouts History
The Payouts history is an easy way for you to view your payout history. You are able to view payout history in the Iris Portal. To get to the Payout History, head over to Payouts menu, and select Payout History. From this page, you’ll be able to view and download information regarding any payouts that you create (User creator) with details status.

![iris-payout-history](https://i.imgur.com/LuE7CV9.png)

#### Details Payout Status
| Status       | Description                                     |
| ------------ | ----------------------------------------------- |
| Queued       | Payout is waiting to be executed                |
| Approved     | Payout request is `approved` by approver user   |
| Rejected     | Payout request is `rejected` by approver user   |
| Processed    | Payout request is sent to the bank and completed|
| Completed    | Payout request is sent to the bank and received by beneficiary account |
| Failed       | Payout didn’t go through |



### Channels / Iris Top up account
Using an aggregator scheme, a partner will have a deposit account that can be topped up from time to time using various channels. This page top-up information channel for Aggregator Partner. Any payout/disbursement will be done from this deposit account as the source of funds.
![Iris-Topup-channels](https://i.imgur.com/Ub0S7w9.png)

>Tips: For sandbox environment, You can visit our [Mock Payment Provider](https://simulator.sandbox.midtrans.com/permata/va/index) and go to Permata Virtual Account payment page. Input your VA number and click `Cek Transaksi`


#### Notification
Iris allows partners to receive realtime notifications about IRIS related information (payout & top up, etc), by configuring a endpoint url on the Iris Portal. Iris Notification through HTTP(S) POST / Webhook will be sent to the partner's server when the transaction is completed the process and when transaction status changes. Partner can utilize the HTTP(S) POST notification to update a payout status.

Enable Iris HTTP(S) POST Notification by setting the Notification URL at `Settings - Notification`. We highly recommended using https:// to ensure security.
![](https://i.imgur.com/Pie4GTd.png)

> Make sure to input the Notification URL that can be reached from Public Internet. Midtrans will not be able to send a notification to localhost, URL protected with auth/password, URL behind VPN, unusual destination port, etc. Though don't worry, you can then utilize signature_key or method explained below to make sure it's security

> Tips: If you are still developing your notification handler on localhost, you can utilize these service to expose your localhost server to public internet: Ngrok, Serveo, Localhost.Run, etc. Once you have obtain the internet accessible url, you can input it to the notification url field on Iris Portal.


#### Balance Threshold
The Balance Threshold feature is to remind you if the balance over the set threshold. e.g: The balance threshold set on IDR 1,000,000,- your current balance IDR 1,500,000,-. At the same time, you will send money to one of the suppliers IDR 1,800,000. Then balance threshold will send you a notification via email, that your balance has been passed the threshold limit.

There are no min or max limits for threshold value, the most important thing is numbers
![iris-balance-threshold](https://i.imgur.com/WDMY39l.png)