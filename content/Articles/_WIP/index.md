---
createdAt: 2023-11-01
title: Intro
description: Intro
navigation: false
---

## Nuxt Intro

Let's Create, Read, Update & Destroy a list of todos list.

In doing so we'll elevate our understanding of the core concepts of Nuxt.

- Components
- Local State
- Auto imports
- Composables


An initialized Nuxt project contains the following

```vue {3} [/app.vue]
<template>
  <div>
    <NuxtWelcome />
  </div>
</template>
```

## Create Todo & Read them

```vue {4-18, 22-32} [/app.vue] 
<template>
  <div>
    <h1>Todos</h1>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Enter a new todo and press Enter"
    />
    <ul>
      <li
        :key="todo"
        v-for="todo in todos"
      >
        <div>
          {{ todo }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const todos = ref([])
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push(newTodo.value)
    newTodo.value = ''
  }
}
</script>
```

## Update a todo

```vue {14-23, 41-45} [/app.vue] 
<template>
  <div>
    <h1>Todos</h1>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Enter a new todo and press Enter"
    />
    <ul>
      <li
        :key="todo"
        v-for="todo in todos"
      >
        <div>
          <input
            id="{{ todo }}"
            type="checkbox"
            :value="todo.done"
            name="{{ status }}"
            @click="toggleStatus(todo)"
          />
          {{ todo }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const todos = ref([])
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ done: false, name: newTodo.value })
    newTodo.value = ''
  }
}

const toggleStatus = (todo) => {
  const idx = todos.value.findIndex((t) => t.name == todo.name)

  todos.value[idx].done = !todos.value[idx].done
}
</script>

```

## Delete Todo

```vue {22-24, 49-54} [/app.vue] 
<template>
  <div>
    <h1>Todos</h1>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Enter a new todo and press Enter"
    />
    <ul>
      <li
        :key="todo"
        v-for="todo in todos"
      >
        <div>
          <input
            id="{{ todo }}"
            type="checkbox"
            :value="todo.done"
            name="{{ status }}"
            @click="toggleStatus(todo)"
          />
          <div @click="remove(todo)">
            {{ todo }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const todos = ref([])
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ done: false, name: newTodo.value })
    newTodo.value = ''
  }
}

const toggleStatus = (todo) => {
  const idx = todos.value.findIndex((t) => t.name == todo.name)

  todos.value[idx].done = !todos.value[idx].done
}

const remove = (name) => {
  const index = todos.value.indexOf(name)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}
</script>
```

## Local to Global

```vue {43} [/app.vue] 
<template>
  <div>
    <h1>Todos</h1>
    <input
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="Enter a new todo and press Enter"
    />

    <todos-meta />

    <ul>
      <li
        :key="todo"
        v-for="todo in todos"
      >
        <div>
          <input
            id="{{ todo }}"
            type="checkbox"
            :value="todo.done"
            name="{{ status }}"
            @click="toggleStatus(todo)"
          />
          <div @click="remove(todo)">
            {{ todo }}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <h1>Counter</h1>
  <p>Counter: {{ count }}</p>
  <p>Same Counter: {{ sameCounter }}</p>
  <p>
    <button @click="count--">-</button>
    <button @click="count++">+</button>
  </p>
</template>

<script setup>
import { ref } from 'vue'
const todos = useState('todos', () => [])
const newTodo = ref('')

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ done: false, name: newTodo.value })
    newTodo.value = ''
  }
}

const toggleStatus = (todo) => {
  const idx = todos.value.findIndex((t) => t.name == todo.name)

  todos.value[idx].done = !todos.value[idx].done
}

const remove = (name) => {
  const index = todos.value.indexOf(name)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}

const count = useState('counter', () => Math.round(Math.random() * 1000))
const sameCounter = useState('counter')
</script>
```

## Sibling Components/Global

```vue {8} [/components/todos-meta.vue]
<template>
  <h1>Total: {{ todos.length }}</h1>
  <h2>Done:{{ todos.filter((t) => t.done).length }}</h2>
  <h2>Undone:{{ todos.filter((t) => !t.done).length }}</h2>
</template>

<script setup>
defineProps(['todos'])
</script>

