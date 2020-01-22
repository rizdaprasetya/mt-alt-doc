## Security in Midtrans

##### *Security is our top priority in Midtrans. We monitor both internal and external factors to ensure the security of your payment is going to Midtrans.*
------------------

### Midtrans Security

1. **PCI DSS**<br>
	PCI-DSS (Payment Card Industry Data Security Standard) is a certificate or license issued by the PCI Security Standards Council to maintain the security of all transaction activities through Midtrans payment systems. Midtrans have implemented all security standards set by the PCI Standard Council on network and payment systems to minimize any security risk that could interfere with transaction processes in our system.

	Midtrans has been audited by the QSA (Qualified Security Assessor) certified by PCI Council and currently Midtrans is PCI compliant with [PCI Service Provider Level 1](http://www.visa.com/splisting/searchGrsp.do?companyNameCriteria=midtrans) certification. This is the most stringent level of certification available in the payments industry.

2. **ISO 27001**<br>
	ISO27001 (or commonly known as ISO / IEC 27001) is a certificate or license issued by the Internal Standards Organization (ISO) which regulates security management information system. We have implemented the ISO27001 standard on our system and network to maintain the security of our information.

3. **AES 256**<br>
	AES (Advanced Encryption Standard) is an encryption standard that was issued by the National Institute of Standards and Technology (NIST) it is generally used to maintain the confidentiality of data. Midtrans uses AES-256 as a standart of encryption of all transaction data that goes into and out of our system.

4. **Fraud Detection System**<br>
	Midtrans analyzes, processes, and manages each transactions in detail with our machine learning tool. After these steps, Midtrans will analyze the behavior patterns using the payment location,email detail, time, etc.

	Source: [https://midtrans.com/security](https://midtrans.com/security)

### HTTPS for Secure Connections

Midtrans forces HTTPS for all services using TLS (SSL), including our public website and Merchant Administration Portal.

- `midtrans.min.js` is served only over HTTPS and is hosted in our server (production). We suggest merchants not to host midtrans.min.js themselve.
- `snap.js` is served only over HTTPS and is hosted in our server (production). We suggest merchants not to host snap.js themselves.

Please make sure your system are able to communicate with Midtrans securely by referring to [this article about SSL/TLS](https://blog.midtrans.com/time-to-upgrade-to-tls-version-1-2/)

### Card Data Secure Transmission

By following above points, all the data transmission coming from customer device to Midtrans should be encrypted over the network layer via SSL/HTTPS. That means data transmission is end-to-end encrypted (customer-to-midtrans), and secure from any 3rd party. Only Customer and Midtrans side can see the real value of data being transmitted. Unless a 3rd party have direct control over the user’s device (which means already compromised anyway) or he able to decrypt SSL/HTTPS.

In order to ensure the customer-to-midtrans encryption are properly implemented, merchants are required to use official Midtrans provided javascript library for card transaction (midtrans.min.js, snap.js, or Mobile SDK) and strictly prohibited to record card credentials to their own system, unless PCI DSS certified. 

Some auditors may falsely report can see credentials transmitted in plain text, it is because the audit happen on the customer device itself. So of course the data are expected to be visible from customer device. Auditor should try to check from non customer device, for example from network layer (as 3rd party between midtrans and customer). Auditor will see the data is encrypted from 3rd party.

Additionally HTTPs GET method encrypt any GET query / request credentials (via TLS/HTTPS), it may expose the destination web domain to proxy, but **will not** expose any parameter.

### Sensitive Data Encryption

Security always become a primary concern in PT Midtrans and all transactions processed by our system will always be securely encrypted. Midtrans never store any sensitive information in the system and all transactions are transmitted and processed via secure network.

All encryption and security procedure are following PCI-DSS standards to ensure that we achieved highest security protection.

### Vulnerability Disclosure

​Midtrans is always open to any input or suggestion related to our security from. If you believe you have found a bug in Midtrans, please contact `security@midtrans.com` or `support@midtrans.com` and we will respond as soon as possible. We thank you for your cooperation in not disclosing these issues publicly.

### Keep Your Server Key Secured

The Server Key you obtained from your Midtrans account is strictly informed only to You as Merchant. Server Key should be kept secret and also become your responsibility to keep it secret. To ensure Server Key secured from your end, please refer to [this article](https://blog.midtrans.com/bagaimana-cara-menyimpan-server-key-dengan-aman/).