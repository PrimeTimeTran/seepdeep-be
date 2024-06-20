---
title: Turbosip Content Management System(CMS)
date: 2023-11-07T21:47:19.266Z
description: Intro to how the CMS works
---

# Turbosip Content Management System(CMS)

### FAQ

#### Where is my content stored?

Content created in the admin panel generate markdown files inside of ./backend/content.

Further nesting is determined by content type and slug/name of the file.

For example this content's file is located at 
`./backend/content/articles/index.md`

And the path on the site is 

`http://localhost:3000/articles`


#### How to access content with a date in the name?

For a file thats located at the following path named `2023-11-07-first-article.md`.

`./backend/content/articles/2023-11-07-first-article.md`

It can be accessed at this URL:

`http://localhost:3000/articles/2023-11-07-first-article`