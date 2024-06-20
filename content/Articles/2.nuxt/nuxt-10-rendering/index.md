---
createdAt: 2023-10-29
title: Rendering
description: Rendering Options
---

# Nuxt Rendering

- Universal Rendering
- Client-Side Rendering
- Hybrid Rendering 

## Universal Rendering

Combines both server & client side rendering strategies. [^1]

Pages are rendered on the server and sent to the client as a fully rendered HTML document. 

In the background JS code(older versions of Vue/React/Angular/etc) is loaded and that code takes over control of the document.

In this way the best of both server & client side rendering strategies are maintained.

There are tradeoff though. They follow:

### Pros

- Performance
- SEO

### Cons

- Limitations
- Cost


## Client Side Rendering



[^1]: [Official Nuxt documentation](https://nuxt.com/docs/guide/concepts/rendering)