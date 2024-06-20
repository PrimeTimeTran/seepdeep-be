---
createdAt: 2023-10-30
title: Markdown
shortName: Markdown
---

# Markdown

Examples of markdown formatting

# Heading 1

```html
<h1>Heading 1</h1>
```

## Heading 2

```html
<h2>Heading 2</h2>
```

### Heading 3

```html
<h3>Heading 3</h3>
```

#### Heading 4

```html
<h4>Heading 1</h4>
```

##### Heading 5

```html
<h5>Heading 1</h5>
```

###### Heading 6

```html
<h6>Heading 1</h6>
```

## Formatting

The *quick* brown fox **jumps** over the \~lazy\~ dog.

## Ordered List

1. Alpha
2. Bravo
3. Charlie

## Unordered List

* JS
* TS
* Python

## Inline Code

- <code>Hello World!</code>
- `Hello World!`

## Quotes

> Back Ticks aren't supported!

## Code Blocks

### Dart

```dart 
void helloWorld() {
  print('Hello World')
}
```

### Javascript

```javascript
<template>
  <div class="pt-24">
    <ContentDoc class="prose dark:prose-invert" />
    <h2>Contact Form</h2>
  </div>
</template>
```

## Images

![10,000](https://imgs.xkcd.com/comics/ten_thousand_2x.png)

## Gifs

![homer](https://i.giphy.com/media/4pMX5rJ4PYAEM/giphy.webp)

## Tables

| Tables        | Are           | Cool  |
| ------------- | ------------- | ----- |
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      | $12   |
| zebra stripes | are neat      | $1    |

Colons can be used to align columns.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| *Still*  | `renders` | **nicely** |
| 1        | 2         | 3          |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

## Dropdowns

<details>
  <summary>Click me</summary>
  
  ### Heading
  1. Foo
  2. Bar
     * Baz
     * Qux

  ### Some Javascript
  ```js
  function logSomething(something) {
    console.log('Something', something);
  }
  ```
</details>