# IP Addresses & API Domain
<hr>

## Notification IP Address

Midtrans sends (outgoing) [HTTP notifications / webhook](/en/after-payment/http-notification) status update from various IP addresses to your notification url (as backend to backend request). In case your system needs to whitelist IP addresses, please add Midtrans CIDR given below to your whitelist.
```
Production Environment:
103.208.23.0/24
103.208.23.6/32
103.127.16.0/23
103.127.17.6/32
34.87.92.33
34.87.59.67

Sandbox Environment:
34.101.68.130
34.101.92.69
```

!> **Changes Notice:** \
As part of improving our service reliability, (specific for Production Environment) around **20 January 2023**: \
\- We will be adding new IP addresses of: `34.87.92.33` and `34.87.59.67`. \
\- The older IP ranges with prefixes of `103.x.x.x` will gradually no longer be used a few weeks after that date. \
**Please ensure that your system is capable of accommodating this change** smoothly.


Although we are providing the IP list, we don’t quite recommend relying on IP whitelisting to ensure notification authenticity. Instead, we **strongly recommend you to verify the authenticity** by [implementing the methods explained here](/en/after-payment/http-notification.md#verifying-notification-authenticity).

?> If you are unable to **receive notification from Midtrans**, please ensure that your infrastructure is allowing HTTPs connection from the above-mentioned IP addresses. Additionally try to [follow this troubleshooting section](/en/after-payment/http-notification.md#suggestion-on-troubleshooting-http-notification-failures).

## API Domain Endpoint

Midtrans API endpoint is distributed and protected with multiple layers of security, it does not have any specific IP address. So, please whitelist our API domain names mentioned below.  

```
api.midtrans.com
api.sandbox.midtrans.com

app.midtrans.com
app.sandbbox.midtrans.com
```

?>If you are unable to **send request to Midtrans**, please ensure that you have whitelisted the above-mentioned domain name.

If it is necessary for you to whitelist IP addresses instead of the Domain name, you can refer to the [IP range list](https://www.cloudflare.com/ips-v4). Although this is not recommended. Do so at your own risk, as the IP range may change without notice, which poses the risk of breaking your integration. 


<!-- @Deprecated: iframing is blocked by the destination page -->
<!-- [API IP address range](https://www.cloudflare.com/ips-v4 ':include :type=iframe width=100% height=300px') -->
