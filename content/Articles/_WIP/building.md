---
createdAt: 2023-11-22
title: Nuxt troubleshooting
---
https://nuxt.com/docs/getting-started/deployment

- Create local build
npx nuxi generate 

Pre render config

## Troubleshooting

- When TS complaining about unable to find types.
Try removing mongoose def in nuxt.config.ts, running tsc, adding back