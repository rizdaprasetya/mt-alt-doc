# IP Addresses

### Midtrans Outgoing Notification IP Address

Midtrans sends payment notifications to merchants from several IP addresses. In case your system need to whitelists IP addresses, please add Midtrans CIDR below to your whitelist:
```
Production Environment:
103.208.23.0/24
103.208.23.6/32
103.127.16.0/23
103.127.17.6/32

Sandbox Environment:
103.58.103.177
```

In case you are unable to receive notification from Midtrans, please ensure that your infrastructure already allow/whitelist the IP above.

### API Endpoint

Midtrans API endpoint is distributed and protected with multiple layers of security, so it will not have any specific IP address. Please whitelist our API domain name instead:  
```
api.midtrans.com
app.midtrans.com
```

In any case you are unable to send request to Midtrans, please ensure that you already whitelisted the domain above.

If it really necessary to whitelist IP address instead of Domain, you can refer to the [following IP address list](https://www.cloudflare.com/ips-v4). Altough not recommended.