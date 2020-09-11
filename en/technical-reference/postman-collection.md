# Midtrans API Postman Collection
<hr>

[Postman](https://www.getpostman.com/) is a user friendly tool that make it easy for you to quickly send and test REST API request without doing complex programming.

Midtrans provide Postman Collection that you can import and then you can play and test around with Midtrans API in no time.

## Midtrans API Postman Collection
This Postman collection covers the following API:
* [Snap API](http://snap-docs.midtrans.com)
* [Core API](http://api-docs.midtrans.com)

### Download Link

- Direct Download:

- [Download from Postman](https://app.getpostman.com/run-collection/af068be08b5d1a422796)
- Github Source: [Repo Link](https://github.com/midtrans/Midtrans-Payment-API-Postman-Collections)


### Usage Instruction

1. Download and open [Postman](https://www.getpostman.com)
2. Import:
    - Use above links to import/download the collection: 

        [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/af068be08b5d1a422796)
3. [Register to Midtrans](/en/midtrans-account/overview)
4. [Login](http://dashboard.midtrans.com) to Midtrans, switch to **Sandbox**, go to menu `Settings > Access Keys`. Copy your **Server Key**
5. In Postman, open **Midtrans Payment API** folder then choose one request you want to try, click on `Authorization` tab (beside Headers tab)
6. Select **Type** as `Basic Auth`, fill **Username** with your **Server Key** (looks like this `SB-Mid-server-abc123cde456`). Leave **Password** field blank, click **Update Request**

![Postman Usage](./../../asset/image/tech-ref-postman-collection.png)

7. Now you can `save` then click `send` the request. You will get server response.

### Production Mode

All endpoint used in this postman collection is for `sandbox transaction`, to switch to `production` change endpoint URL from:

`https://api.sandbox.midtrans.com/../..`
to `https://api.midtrans.com/../..`

Simply remove the `sandbox.` from url. Then update your Server Key with your production account Server Key.

### Troubleshooting

If you encounter this error message:
```json
{
  "error_messages": [
    "Access denied due to unauthorized transaction, please check client or server key",
    "Visit https://snap-docs.midtrans.com/#request-headers for more details"
  ]
}
```
- Please make sure you do step 4-7 properly like instructed in **[Usage Instruction](#usage-instruction)** section.
- Please make sure you are using correct **Server Key** (Serverkey for sandbox & production are different).

## Midtrans Iris API Postman Collection
This Postman collection covers the Iris API

### Usage instruction

1. Download and open [Postman](https://www.getpostman.com)
2. Import:
    - Use this link to import/download the collection: 

	[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/f05d0d597076943acbb3)
3. [Login](https://app.sandbox.midtrans.com/iris/) to Iris Midtrans Sandbox, click your username/email address on top right. Copy your **API KEY**.
4. In Postman, choose one request you want to try, click on `Authorization` tab (beside Headers tab)
5. Select **Type** as `Basic Auth`, fill **Username** with your **API Key** (looks like this `IRIS-abcdeabc-23ed-2132-xxxx-xxxxxxxxxx`). Leave **Password** field blank, click **Update Request**
6. Now you can `save` then click `send` the request. You will get server response.

### Production Mode
To switch to Production API url, change variable `{{iris_base_url_sandbox}}` to `{{iris_base_url_production}}` on the request URL. And update your `Authorization` with production IRIS API_KEY.