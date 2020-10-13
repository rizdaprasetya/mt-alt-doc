# IP Addresses & API Domain
<hr>

### Midtrans Outgoing Notification IP Address

Midtrans sends payment notifications from several IP addresses. In case your system needs to whitelist IP addresses, please add Midtrans CIDR given below to your whitelist.
```
Production Environment:
103.208.23.0/24
103.208.23.6/32
103.127.16.0/23
103.127.17.6/32

Sandbox Environment:
103.58.103.177
```

In case you are unable to **receive notification from Midtrans**, please ensure that your infrastructure has whitelisted the above-mentioned IP addresses.

### API Domain Endpoint

Midtrans API endpoint is distributed and protected with multiple layers of security, so it does not have any specific IP address. So, please whitelist our API domain names mentioned below.  
```
api.midtrans.com
app.midtrans.com
```

If you are unable to **send request to Midtrans**, please ensure that you have whitelisted the above-mentioned domain name.

If it is really necessary to whitelist IP addresses instead of the domain name, you can refer to the [IP address list](https://www.cloudflare.com/ips-v4). Although, please note, it is not recommended.
