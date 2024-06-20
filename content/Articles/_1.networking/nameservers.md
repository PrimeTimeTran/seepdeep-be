---
createdAt: 2024-02-21
title: Understanding DNS from a hosting provider
navigation: false
description: Understanding DNS from a hosting provider
tags: DNS
# thumbnail: /public/images/uploads/nuxt-logo-landscape.png
---

### A 
A Record (Address Record): An A record maps a domain name to the IP address (IPv4) of the server hosting the website. It's used when you want to point a domain directly to an IP address. For example, if you want "yourdomain.com" to point to the IP address of your Netlify site, you would create an A record pointing to that IP address.

### CName
CNAME (Canonical Name): A CNAME record maps an alias or subdomain to the canonical (true) domain name. It's often used when you want to point one domain or subdomain to another domain name. For example, if you want "www.yourdomain.com" to point to "yourdomain.netlify.com", you would create a CNAME record for "www" pointing to "yourdomain.netlify.com".


