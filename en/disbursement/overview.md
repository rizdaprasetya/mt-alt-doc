# Disbursement (Iris) Overview

Iris is Midtrans’ cash management solution that allows you to **disburse/payouts/transfer payments to any bank accounts** in Indonesia securely and easily. Iris connects to the banks’ hosts for you to enable seamless transfer using integrated APIs.

![Iris Illustration](https://storage.googleapis.com/go-merchant-production.appspot.com/uploads/2020/11/59d58817e872cc6052f7161b4fc18c18_811b73f424b3b631e50cfe7a9f019871_compressed.png ':size=500')

In summary the overall flow consist of these steps:
1. **Add** source of **funds**:
    * Aggregator Scheme: Top-up/deposit funds to your Iris account via the Iris Dashboard, Or
    * Facilitator Scheme: Connect your bank account as a source of fund.
2. **Add beneficiaries (fund recipient)** easily via dashboard, or integrate via API.
3. **Send disbursement/payout** instantly in just a few clicks through the Dashboard, or integrate via API.

<!-- @TODO: Need some visual, request to MKT team or maybe from Iris sales deck-->

## Glossary
For the purpose of standardization and to prevent misunderstanding, below are the terms we use in this documentation:

- **Partner**: Iris’ main user (You). A partner will be given access to Iris’ API and Dashboard.
- **Beneficiary**: Destination account whereby the payout/transfer is intended to.
- **Payout**: also known as disbursement, refers to action of funds being transferred out to the beneficiary, from your balance/source of funds.
- **Maker/Creator**: Partner’s user account role that can create payout.
- **Approver**: Partner’s user account role that can approve a payout.
- **Iris Dashboard**: also known as Iris portal, refers to a web portal where partner can login and manage payouts, accounts, configurations, etc.

## Business Flow
Iris comes in 2 different schemes (from business perspective): **aggregator** or **facilitator**.

<!-- @TODO: add visual to explain the diff  -->
 
### Aggregator
Using the aggregator scheme, a partner will have a deposit account balance that can be topped up from time to time using various channels. Any payout will be done from this balance as the source of funds.
 
Aggregator scheme is characterized by the following:
- Source of funds comes from Midtrans’ bank accounts;
- Partners can top up their deposit balance before payouts; and
- Faster onboarding process.  

### Facilitator
Facilitator scheme lets a partner use their own bank account as the source of funds for payouts. In addition to initiating transfers and payouts, partners can inquire balance and check statements using Iris’ API.
 
The facilitator scheme is characterized by the following:
- Source of funds comes from Partners’ own bank accounts;
- Payouts can be done as long as the account balance is sufficient; and
- Onboarding process involves registering partners’ bank accounts to the bank and Midtrans.

## Features
### Real Time Transfers
- Midtrans disbursement service connects directly to the banks’ hosts for transfer activities to ensure all disbursement is done real time;
- Other transfer types such as SKN (Kliring) and Bank Indonesia’s RTGS are also supported.

### Transfer Types
- All transfer are done via real-time transfer for the following banks:
  - Mandiri
  - CIMB
  - BCA
  - Danamon
  - BNI
- The rest of the banks will be done via SKN (Sistem Kliring Nasional).


### Easy to Integrate API
- Our [RESTful API](https://iris-docs.midtrans.com) enable our partners to integrate to our solution seamlessly;
- Iris’ API support: balance inquiry, create transfer, approve transfer, view statements, etc.

### Web Dashboard and Analytics
- Midtrans provides a dashboard for our partners to see all transfers history as well as analytics of their transfer activities;
- The same dashboard can also be used to create transfer requests for transfers/payouts through csv/excel file upload.


## Next Step
<br>
<div class="my-card">

#### [Account & Dashboard Usage](/en/disbursement/dashboard-usage.md)
Learn about Iris disbursement account and the dashboard usage.
</div>

<div class="my-card">

#### [API Integration](https://iris-docs.midtrans.com/#setting-up-iris)
Learn how to integrate via API.
</div>