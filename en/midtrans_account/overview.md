# Midtrans Account

<TODO: elaborate about the basic of registering account to getting server key>

Before integrating with Midtrans, you need to register [here]([https://account.midtrans.com/register](https://account.midtrans.com/register)). After completing the registration you will be given access to your Merchant Administration Portal (MAP), where you shall have access to both sandbox and production environment. Access Keys are used to access Midtrans’ API. You can find them in Settings > Access Keys. The Access Keys are unique for every merchant. Please always keep it confidential.

You can use the sandbox environment during your development phase of integrating Midtrans’ payments system. You can also test dummy transactions on sandbox environment. The production environment is also available, but your production credentials will only be ready once you have completed all the necessary administrative steps.

# + Snap   

# ++ Snap Overview

<TODO: elaborate>

Note: getting started is moved out to "Midtrans Account", because it used on all product

# ++ Technical Integration

<TODO: elaborate>

## Backend Integration

## Frontend Integration

## Creating a test payment

Next Step:

* Handling Webhook HTTP Notification

* Taking Action of Payment

* Transaction Status Cycle and Action

# ++ Snap With Plugins

Plugin list and tutorials pages for each of it. From: [https://docs.midtrans.com/en/snap/integration.html](https://docs.midtrans.com/en/snap/integration.html)

# ++ Advanced Features

<TODO: elaborate>

## General Payment Features

### Custom Fields & Metadata

### Custom Transaction Expiry

### Overriding URL Redirection

## Credit Card

### 3 Domain Secure (3DS)

### Recurring Payment

### Saving Cards for Easy Subsequent Payment

### Recurring / Subscription Card Transaction

### Installment Payment

### Pre Authorization Payment

### Allowing Transactions from Specific BIN Only

### Enabling Payments using Card Loyalty Points

### Routing Transactions to Specific Acquiring

## Gopay

### Enabling Callback to Gojek App

## Bank Transfer / VA

### Custom VA Number

### Custom VA Description

## Alfamart

### Custom Alfamart Description [Name TBC]

# ++ Mobile SDK

<TODO: elaborate>

<TODO: paragraph if merchant use hybrid platform like flutter>

# + Customize Your Own - Core API

<TODO: elaborate>

++ Overview

++ Basic Card Payment

++ Installment Card Payment

++ Recurring and Saved Card Payment

++ GoPay Payment

++ Bank transfer Payment

++ Direct Debit Payment

++ Over The Counter Payment

++ Cardless Credit Payment

++ Advanced Features

# + Payment Link

<from current docs, plus maybe some new info>

<TODO: elaborate>

Payment link provides an easy way to accept payments from your customers. Midtrans will generate a link that redirects the customer to Midtrans’s payment page. No technical integration is required, suitable for small business owners of social media sellers (Instagram, Facebook, etc).

# + Disbursement - IRIS

<TODO: elaborate>

# + Developer Resource

# ++ Testing Payment on Sandbox

<from current docs, plus maybe some new info>

<TODO: elaborate>

# ++ Library & Plugins

<from current docs, plus maybe some new info>

# ++ Postman Collection

<from current docs, plus maybe some new info>

# + After Payment

# ++ Taking Action of Payment

<TODO: elaborate about what should be done after payment received. What can be the indication of payment success, including: dashboard, http notif, txn email notif, get status>

# ++ Handling Webhook HTTP Notification

<TODO: elaborate>

# ++ Transaction Status Cycle and Action

<TODO: elaborate about transaction status life cycle, add diagram. Explain how to approve, deny, refund, cancel, get status, etc>

# ++ Dashboard Usage and Action

<TODO: elaborate>

# ++ Receiving Your Fund / Payout

<TODO: elaborate>

# ++ Fraud and Dispute

<TODO: elaborate>

# + Security

<TODO: elaborate sub page HTTPS/TLS, PCI DSS, 3DS, etc>

# ++ HTTPS/TLS

# ++ PCI DSS

# ++ 3 Domain Secure (3DS)

# + Other Reference

# ++ IP Address

<from current docs, plus maybe some new info>

# ++ Error Code & Response?

Add these page: 

how to basic rest API, library, dev quickstart, going live