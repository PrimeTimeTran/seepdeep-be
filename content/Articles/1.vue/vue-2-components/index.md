---
createdAt: 2023-11-02
title: Components
description: Components
---
# Components

By default place components in the :inline{value=components} directory.

## Conventions

### Naming

Name components with pascal case.

```sh [root]
.
├── components
│   ├── ComponentOne.vue
│   ├── ComponentTwo.vue
│   └── ...
└── App.vue
```

Group components by function/feature in subdirectories.

```sh [root]
.
├── components
│   ├── Navbar
│   │   ├── NavbarItem.vue
│   │   ├── NavbarContainer.vue
│   │   └── ...
│   └── Sidebar
│       ├── SidebarItem.vue
│       ├── SidebarContainer.vue
│       └── ...
└── App.vue
```

#### Resources

For domain specific resources follow this pattern as well.

```sh
.
├── components
│   └── Todos
│       ├── TodosList.vue
│       ├── TodosForm.vue
│       └── TodosMeta.vue
└── App.vue
```

#### The

If there is "one" of something then convention is the prefix with "The".

```sh [root]
.
├── components
│   ├── Todos
│   │   └── ...
│   ├── TheNavbar
│   │   └── ...
│   └── TheSidebar
│       └── ...
└── App.vue
```

#### Base Components

Base components should begin with V, Base, or App.

```sh [root]
.
├── components
│   ├── Todos
│   │   └── ...
│   ├── TheNavbar
│   │   └── ...
│   ├── TheSidebar
│   │   └── ...
│   ├── VButton
│   ├── VIcon
│   ├── VTable
│   └── ...
└── App.vue
```

::card
#info
Conventions helps others onboard quickly. 
They're community conventions.
::


### Scripts

If you initialized your project with the default :inline{value="vue create"} command

:inline{value="$ npx vue create hello-world"}

You'll see a project structure like this:

```vue [./component.vue]
.
├── public
└── src
    ├── assets
    ├── components
    ├── router
    ├── stores
    └── views
```

You could then import and use components like so.

```vue [./views/HomeView.vue] {2,7}
<script setup lang="ts">
import Todos from '../components/Todos.vue'
</script>

<template>
  <main>
    <Todos />
  </main>
</template>
```

If you're using :inline{value=Nuxt} then you don't have to import anything from the :inline{value=components} dir as :inline{value=Nuxt} will do it for you automatically.

```vue [./views/HomeView.vue] {2}
<script setup lang="ts">
import Todos from '../components/Todos.vue'  // [!code  --]
</script>

<template>
  <main>
    <Todos />
  </main>
</template>
```

It's more useful to bind values to a user event though

::card
#info
All HTML tags are supported. div, img, span, textarea, canvas, etc...
::

### Script

The script tag is used for defining JS.

```vue [./component.vue] {2}
<script>
const message = 'Hello Vue'
</script>

<template>
  <h1>Hello Vue!</h1>
</template>
```

## Handlebars

With [handlebar](https://handlebarsjs.com/guide/) syntax we use the JS variables inside the template.

```vue [./component.vue] {6}
<script>
const message = 'Hello Vue'
</script>

<template>
  <h1>{{ message }}</h1>
</template>
```





### Events

We can handle events by binding an handler using :inline{value="v-on"}. We use it with an event we're
listening for. For example :inline{value="v-on:click"}

```vue
<template>
  <button v-on:click="console.log('Clicked')">
    Log clicked
  </button>
</template>
```

The :inline{value="@"} we saw earlier allows us to listen for or bind to future events.

```vue
<template>
  <button v-on:click="console.log('Clicked')">  // [!code  --]
  <button @click="console.log('Clicked')">  // [!code  ++]
    Log clicked
  </button>
</template>
```

The syntax :inline{value="@click"} is shorthand for bind :inline{value="v-on:click"}

```js [diff.js]
export default {
  data () {
    return {
      msg: 'Removed' // [!code  --]
      msg: 'Added' // [!code  ++]
    }
  }
}
```

```js [focus.js]
export default {
  data() {
    return {
      msg: 'Focused!', // [!code  focus]
    }
  },
}
```

## Scripts


### Props

```vue [./component.vue] {}
<script setup>
</script>

<template>
</template>
```

```vue [./component.vue] {}
<script setup>

</script>
<template>
</template>
```



[Script syntax](https://vuejs.org/api/sfc-script-setup.html)

## Styles

## Props

```bash
components
├── AComponent.vue
└── BComponent.vue
```



<!-- ### Lifecycle
### Composition
### Options -->