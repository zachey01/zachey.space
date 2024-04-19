---
description: Adding SSL certificates to Express.JS using Let's Encrypt (CertBot)
date: March 19, 2024
title: Adding SSL Certificate to Express.JS 🛡️
emoji: 🛡️
---

# How to Add Let's Encrypt SSL Certificate to an Express.js Application 🛡️

In this article, we will look at how to add a Let's Encrypt SSL certificate to your Express.js application to ensure a secure connection to your server.

Let's Encrypt is a free service that provides SSL certificates for websites. Using an SSL certificate helps protect the data transmitted between the client and the server and increases user trust in your site.

To begin, make sure you have Node.js and npm installed on your computer. Then install the `express` package using the following command:

```bash
npm install express
```

Now create an Express.js application and add the following code to create a server:

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

Next, let's install `certbot`, a tool for automatically obtaining and installing Let's Encrypt SSL certificates. Install `certbot` using the following command:

```bash
sudo apt-get install certbot
```

After installing `certbot`, run the following command to get an SSL certificate for your domain:

### Generating a Certificate 🔒

Now that Certbot is installed, you can invoke it to generate a certificate. You should run it as root:

```bash
certbot certonly --manual
```

...or run sudo from a non-root user:

```bash
sudo certbot certonly --manual
```

Here is a detailed description of the process:

The installation program will ask you to specify your website's domain.

Then it will ask for your email address:

```
➜ sudo certbot certonly --manual
Password: XXXXXXXXXXXXXXXXXX
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator manual, Installer None
Enter email address (used for urgent renewal and security notices) (Enter 'c' to
cancel): your@email.com
```

...and accept the ToS:

```
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory

(A)gree/(C)ancel: A
```

...and permission to share your email address:

```
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
```

...finally, we can enter the domain for which we want to use the SSL certificate:

```
Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
to cancel): zachey.space
```

...the installation program asks if it can log your IP address:

```
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for zachey.space

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - -
```

...and finally, we move on to the validation phase!

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

<рандомная строка>

And make it available on your web server at this URL:

http://zachey.space/.well-known/acme-challenge/<рандомная строка>
```

Now let's leave Certbot alone for a few minutes.

We need to confirm that we own the domain by creating a file named <random string> in the _.well-known/acme-challenge/_ folder.

> Note to self! The weird line I just put in will change every time you go through this process.

You will need to create a folder and file, as they do not exist by default.

After that you will have an SSL certificate! 🥳

## Add certificate to Express.JS 💉

Now add the following code to your Express.js application to use an SSL certificate:

```javascript
const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(80, () => {
  console.log("Server is running on port 3000");
});

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/zachey.space/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/zachey.space/fullchain.pem"),
};

https.createServer(options, app).listen(443, () => {
  console.log("Secure server is running on port 443");
});
```

Replace `zachey.space` with your domain and run your Express.js application. Now your server will use Let's Encrypt SSL certificate for secure connection.

I hope this article has helped you add Let's Encrypt SSL certificate to your Express.js application. A secure connection to your server is an important step to protect user data and increase trust in your website. 💫
