---
createdAt: 2023-11-02
title: Style
description: Style
---

# Style in Vue

Styling in Vue is a breeze. 

## Organization

It's most common to have a `<style>` tag last/at-the-bottom of SCFs.

```vue
<script setup>
</script>
<template>
</template>
<style>
/* css styles */
</style>
```

## Scoping

Adding a scoped attribute to the `<style>` limits the css to the component only, meaning that the styles don't cascade to child elements.

```vue
<script setup>
</script>
<template>
<div class="container">
  <!-- Child components -->
</div>
</template>
<style>
.container {
  background-color: red;
}
</style>
```

Children components which have the class `.container` won't have the background color property applied despite.

## Possibilities
We can use both style tags to get the best of both worlds.

```vue
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```


## Deep Selectors
If we want to target style the child elements/components we can use [deep selectors](https://vuejs.org/api/sfc-css-features.html).

```vue
<style scoped>
.a >>> .b { /* ... */ }
</style>
```

## CSS Modules
It's possible to define styles as a module. Doing so helps to prevent name collisions of classes.

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```


## Binding State
It's possible to make component state apply CSS styles as well.

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

In this case the `color` state variable defines the property to a CSS class which ultimately styles the template/component.

## Flexibility
It's possible to use [POJO's](https://stackoverflow.com/questions/52453407/the-difference-between-object-and-plain-object-in-javascript) & JS expressions together to produce dynamic styling as well.

Note that we have to wrap the expression with strings.

```vue
<script setup>
const theme = {
  color: 'red'
}
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```