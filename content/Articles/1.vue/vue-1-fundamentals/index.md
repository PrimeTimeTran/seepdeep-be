---
createdAt: 2023-10-28
title: Fundamentals
description: Vue Fundamentals
---

# Vue Fundamentals

I think of building web apps as putting LEGOs together.

## Components

**_Components_** are the building blocks in Vue.

We create them by combining :inline{value=HTML}, :inline{value=CSS}, & :inline{value=JS}.

### Template

A component **must** contain an opening & closing :inline{value="template"} tag & template tags contain :inline{value=HTML}.

```js
function go() {
  const no = 'no'
  console.log('Jello World')
}
function hi() {
  let firm = 'worm'
  console.log('Jello World')
}
function bye() {
  console.log('Jello World')
}
function go() {
  console.log('Jello World')
}
```

```vue [./component.vue] {1,3}
<template>
  <h1>Wizards</h1>
  !!!!!
</template>
```

Templates contain 1 root tag(best practice).

```vue [./component.vue] {2, 9}
<template>
  <div>
    <h1>Wizards</h1>
    <ul>
      <li>Harry</li>
      <li>Ron</li>
      <li>Hermione</li>
    </ul>
  </div>
</template>
```

Both standard & semantic HTML tags are available.

```vue [./component.vue] {5-7, 9}
<template>
  <div>
    <h1>Wizards</h1>
    <ul>
      <li><b>Harry</b></li>
      <li><i>Ron</i></li>
      <li><strong>Hermione</strong></li>
    </ul>
    <input />
  </div>
</template>
```

Standard HTML attributes such as style, class, autofocus, etc... apply.

```vue [./component.vue] {3, 6, 13}
<template>
  <div>
    <h1 style="color: red">Wizards</h1>
    <ul>
      <li>
        <b style="font-size: 100px"> Harry </b>
      </li>
      <li><i>Ron</i></li>
      <li><strong>Hermione</strong></li>
    </ul>
    <input autofocus />
  </div>
</template>
```

Use none, one or many attributes is the technique used to create dynamic components.

Consider how adding this :inline{value=type} attribute & value changes the behavior of the :inline{value=input} tag for example.

```vue [./component.vue] {13}
<template>
  <div>
    <h1 :style="{ color: 'red' }">Wizards</h1>
    <ul>
      <li>
        <b style="font-size: 100px"> Harry </b>
      </li>
      <li><i>Ron</i></li>
      <li><strong>Hermione</strong></li>
    </ul>
    <input
      autofocus
      type="number"
    />
    !!!!!
  </div>
</template>
```

### Style

Separate HTML from CSS when possible.

Use a :inline{value=style} tag to extract CSS.

Placing CSS there helps when components grow & makes template easier to reason about.

```vue [./component.vue] {13-20}
<template>
  <div>
    <h1>Wizards</h1>
    <ul>
      <li>Harry</li>
      <li>Ron</li>
      <li>Hermione</li>
    </ul>
    <input autofocus />
  </div>
</template>

<style>
h1 {
  color: red;
}
b {
  font-size: 30px;
}
</style>
```

### Script

The :inline{value=script} tag is where we write :inline{value=JS} code.

We can define variables there for example, in this case :inline{value=wizard}.

```vue [./component.vue] {1-3}
<script setup>
const wizard = 'Programmer'
</script>

<template>
  <!-- html... -->
</template>
<style>
/* css... */
</style>
```

JS defined in the script tag can be used in the template using handlebars/mustaches.

```vue [./component.vue] {12}
<script setup>
const wizard = 'Programmer'
</script>

<template>
  <div>
    <h1>Wizards</h1>
    <ul>
      <li>Harry</li>
      <li>Ron</li>
      <li>Hermione</li>
      <li>{{ wizard }}</li>
    </ul>
    <input autofocus />
  </div>
</template>

<style>
h1 {
  color: red;
}
b {
  font-size: 30px;
}
</style>
```

### Directives

JS is also used to programmatically render HTML with the help of **_directives_**.

A simple directive is :inline{value="v-if"}.

It evaluates a JS statement and renders the HTML if the JS expression returns :inline{value='true'}.

```vue [./component.vue] {2}
<script setup>
const expression = 1 === 1
</script>

<template>
  <div v-if="expression">True</div>
</template>
```

Like all :inline{value=if} conditionals :inline{value='else'} statements can be added.

It's :inline{value='v-else'} in Vue.

```vue [./component.vue] {5}
<script setup>
const expression = 1 === 'one'
</script>

<template>
  <div v-if="expression">False</div>
  <div v-else>True</div>
</template>
```

And with the :inline{value='v-else-if'} an infinite number of possibilities results are possible.

```vue [./component.vue] {5,8,11,14,17}
<script setup>
const value = 1
</script>

<template>
  <div v-if="value === '1'">False</div>
  <div v-else-if="value === 'One'">False</div>
  <div v-else-if="value === 'Uno'">False</div>
  <div v-else-if="value === 'Un'">False</div>
  <!-- how many more ways might we be wrong...? 🤔 -->
</template>
```

There are many directives.

They all start with ' :inline{value=v-} '.

- :inline{value=v-if}
- :inline{value=v-else-if}
- :inline{value=v-else}
- :inline{value=v-for}
- :inline{value=v-html}
- :inline{value=v-text}
- etc...

### Interpolation

Separate JS from HTML when possible.

Doing so makes your code easier to understand.

To do so define a :inline{value=script} which will hold your JS.

```vue [./component.vue] {1-2}
<script setup></script>

<template>
  <div></div>
</template>
```

Now define the variables you want to use in your templates.

```vue [./component.vue] {2}
<script setup>
const pronoun = 'Harry'
</script>

<template></template>
```

Now you can interpolate the vars into the template with mustache/handlebar syntax.

```vue [./component.vue] {7}
<script setup>
const pronoun = 'Harry'
</script>

<template>
  <div>
    {{ pronoun }}
  </div>
</template>
```

You can create something magical by using multiples vars.

```vue [./component.vue] {9}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
</script>

<template>
  <div>{{ pronoun }} {{ verb }} {{ adjective }}</div>
</template>
```

Combing lists & loops in a :inline{value=v-for} creates enchanting possibilities.

```vue [./component.vue] {14,16}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
const spells = ['HTML', 'JS', 'Vue']
</script>

<template>
  <div>{{ pronoun }} {{ verb }} {{ adjective }}</div>
  <ul>
    <li v-for="spell of spells">
      <div>{{ spell }}</div>
    </li>
  </ul>
</template>
```

Especially if you combine new skills with previous abilities like the :inline{value=v-if} directive.

```vue [./component.vue] {16,17}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
const spells = ['HTML', 'JS', 'Vue']
</script>

<template>
  <div>{{ pronoun }} {{ verb }} {{ adjective }}</div>
  <ul>
    <li v-for="spell of spells">
      <div
        v-if="spell === 'Vue'"
        style="color: green"
      >
        {{ spell }}
      </div>
      <div v-else>{{ spell }}</div>
    </li>
  </ul>
</template>
```

Add a :inline{value=ternary} operator to simplify the your code a bit.

```vue [./component.vue] {16}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
const spells = ['HTML', 'JS', 'Vue']
</script>

<template>
  <div>{{ pronoun }} {{ verb }} {{ adjective }}</div>
  <ul>
    <li v-for="spell of spells">
      <div :style="{ color: spell === 'Vue' ? 'green' : 'black' }">
        {{ spell }}
      </div>
    </li>
  </ul>
</template>
```

We could have concatenated our vars earlier as well.

```vue [./component.vue] {10}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
const spells = ['HTML', 'JS', 'Vue']
</script>

<template>
  <div>
    {{ pronoun + verb + adjective }}
  </div>
  <ul>
    <li v-for="spell of spells">
      <div :style="{ color: spell === 'Vue' ? 'green' : 'black' }">
        {{ spell }}
      </div>
    </li>
  </ul>
</template>
```

And lastly, we can define functions in scripts and invoke them in the templates.

```vue [./component.vue] {7-9, 20}
<script setup>
const pronoun = 'Harry'
const verb = ' is '
const adjective = 'magical'
const spells = ['HTML', 'JS', 'Vue']

function hotSpell(spell) {
  return spell === 'Vue' ? 'green' : 'black'
}
</script>

<template>
  <div>
    {{ pronoun + verb + adjective }}
  </div>
  <ul>
    <li v-for="spell of spells">
      <div :style="{ color: hotSpell(spell) }">{{ spell }}</div>
    </li>
  </ul>
</template>
```

Combining HTML, JS, directives, handlebars & loops allows

### Binding

As data changes UI should as well.

But to make the UI reflect changes to data in real time we have to use **binding**.

For example, here we define :inline{value=num} and increment it every second with an an interval.

We expect the update to :inline{value=num} every second to update the UI.

```vue [./component.vue] {2, 4, 11, 14}
<script>
let num = 0
setInterval(() => {
  num += 1
}, 1000)
</script>

<template>
  <div
    :class="{
      'text-green-400': num % 2 == 0,
    }"
  >
    Color {{ num }}
  </div>
</template>
```

Yet the UI doesn't update every second like you'd think.

However if you log :inline{value=num} in the interval and inspecting it in the dev tools you'll see it updates.

![Preview](https://s5.gifyu.com/images/SRR0y.gif)

The issue can be solved by binding :inline{value=num} with :inline{value=ref()} provided by Vue.

First you have to update the way you define :inline{value=num}.

When defining :inline{value=num} invoke :inline{value=ref()} with it's initial value, :inline{value='0'}, and set that to :inline{value=num}

```vue [./component.vue] {2}
<script>
let num = 0 // [!code  --]
let num = ref(0) // [!code  ++]
setInterval(() => {
  num += 1
}, 1000)
</script>

<template>
  <div
    :class="{
      'text-green-400': num % 2 == 0,
    }"
  >
    Color {{ num }}
  </div>
</template>
```

Then change the update syntax by adding a :inline{value=.value}

```vue [./component.vue] {4}
<script>
let num = ref(0)
setInterval(() => {
  num += 1 // [!code  --]
  num.value += 1 // [!code  ++]
}, 1000)
</script>

<template>
  <div
    :class="{
      'text-green-400': num % 2 == 0,
    }"
  >
    Color {{ num }}
  </div>
</template>
```

Now you'll see that the UI updates in real time as you expect.

::card
#list

- Initialize vars with :inline{value=ref()}. <br/>
  - :inline{value="const value = ref(0)"} <br/>
- Reference and update the :inline{value=.value} property of vars you've bound. <br/>
  - :inline{value="num.value += 1"} <br/>
- In templates vars do not require :inline{value=".value"}. <br/>
  - :inline{value="Color {{ num }}"} <br/>
  - :inline{value="'text-green-400': (num % 2) == 0,"} <br/>
    ::

Learn how to organize components in your projects next.
