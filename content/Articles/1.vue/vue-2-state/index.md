---
createdAt: 2023-11-02
title: State
description: State
---

# State in Vue

## Intro  

Like most JS frameworks Vue supports state. And like the others Vue has component & global state.

Let's build a Todo list to learn how to CRUD using local & global state in Vue.

## Local

Start by defining the :inline{value=TodosContainer.vue} component. 

### Create

Start with defining your state vars. 

The :inline{value=newTodo} var will hold the new todo we're adding & :inline{value=todos} our list of todos.

```vue [./components/Todos/TodosContainer.vue] {2-3}
<script setup>
const todos = ref([])
const newTodo = ref('')
</script>

<template>
  <div>
    <h1>Todos</h1>
  </div>
</template>
```

Next add an input to update :inline{value=newTodo}. 

Update :inline{value=newTodo} when the input changes by binding it to the input using :inline{value=v-model}

```vue [./components/Todos/TodosContainer.vue] {11}
<script setup>
const todos = ref([])
const newTodo = ref('')
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
    />
  </div>
</template>
```

Next define a handler, :inline{value=addTodo}, that implements the logic of adding a :inline{value=todo} to our :inline{value=todos} list.

```vue [./components/Todos/TodosContainer.vue] {5-13}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
    />
  </div>
</template>
```

And lastly trigger :inline{value=addTodo} when the user hits the enter key by binding :inline{value=addTodo} to the enter key up event.

```vue [./components/Todos/TodosContainer.vue] {23}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo" +!!!
    />
  </div>
</template>
```

You'll now see :inline{value=todos} update when you enter a new todo and press enter in your console.

### Read

Next use a :inline{value=v-for} to render the :inline{value=todos}.

```vue [./components/Todos/TodosContainer.vue] {25-33}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
      </li>
    </ul>
  </div>
</template>
```

Next implement the ability to add a todo by defining the handler & a state var :inline{value=newTodo} to hold the name of the todo

<!-- 
- We bind the newTodo variable to the input.
- We bind the enter key up event to invoke the :inline{value=addTodo()} function.
- We define :inline{value=addTodo()} which creates a new todo :inline{value=object} & add it to our :inline{value=todos} array.
- We refactor each todo item to be an :inline{value=object} so that we can support done status & more in the future.
We also bind the enter  -->

### Update

Now let's add the ability to update a todo. 

Define a function to toggle the status of a todo, :inline{value=toggleStatus}.

```vue [./components/Todos/TodosContainer.vue] {14-19}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
function toggleStatus(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  const todo = todos.value[idx]
  todo.done = !todo.done
  todos.value[idx] = todo
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
      </li>
    </ul>
  </div>
</template>
```

Bind :inline{value=toggleStatus} to the :inline{value=@click} of each todo item.

Also make sure to pass the id of the todo to :inline{value=toggleStatus} as well.

```vue [./components/Todos/TodosContainer.vue]
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
function toggleStatus(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  const todo = todos.value[idx]
  todo.done = !todo.done
  todos.value[idx] = todo
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        @click="toggleStatus(todo.id)" +!!!
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
      </li>
    </ul>
  </div>
</template>
```

Lastly programmatically add the class :inline{value=.done} to each todo item.

Also define a class :inline{value=.done} in the style tag which will give the todo a line-through if it's status is done.

```vue [./components/Todos/TodosContainer.vue] {35, 46-49}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
function toggleStatus(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  const todo = todos.value[idx]
  todo.done = !todo.done
  todos.value[idx] = todo
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        :class="{ done: todo.done }"
        @click="toggleStatus(todo.id)"
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
      </li>
    </ul>
  </div>
</template>

<style>
.done {
  color: indianred;
  text-decoration: line-through;
}
</style>
```

### Delete

The last thing we need to do is add the ability to remove a todo item.

Define :inline{value=removeTodo} which finds a todo in the list via id and removes it from the list.

```vue [./components/Todos/TodosContainer.vue] {20-23}
<script setup>
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
function toggleStatus(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  const todo = todos.value[idx]
  todo.done = !todo.done
  todos.value[idx] = todo
}
function removeTodo(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  todos.value.splice(idx, 1)
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        :class="{ done: todo.done }"
        @click="toggleStatus(todo.id)"
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
      </li>
    </ul>
  </div>
</template>

<style>
.done {
  color: indianred;
  text-decoration: line-through;
}
</style>
```

Bind :inline{value=removeTodo} to an :inline{value=@click} event of an HTML element of your choice.

I imported & used an icon here.

Once :inline{value=@click} of the todo item is triggered you'll see the todo removed from the list.

```vue [./components/Todos/TodosContainer.vue] {2, 45}
<script setup>
import XIcon from '~/assets/images/icons/XIcon.vue'
const todos = ref([])
const newTodo = ref('')

function addTodo() {
  const todo = {
    done: false,
    name: newTodo.value,
    id: todos.value.length + 1,
  }
  todos.value.push(todo)
  newTodo.value = ''
}
function toggleStatus(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  const todo = todos.value[idx]
  todo.done = !todo.done
  todos.value[idx] = todo
}
function removeTodo(id) {
  const idx = todos.value.findIndex((t) => t.id === id)
  todos.value.splice(idx, 1)
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <input
      autofocus
      v-model="newTodo"
      class="text-black px-1"
      @keyup.enter="addTodo"
    />
    <ul>
      <li
        :key="todo.id"
        v-for="todo of todos"
        :class="{ done: todo.done }"
        @click="toggleStatus(todo.id)"
        class="flex flex-row justify-between"
      >
        <span v-text="todo.name" />
        <XIcon @click="removeTodo(todo.id)" />
      </li>
    </ul>
  </div>
</template>

<style>
.done {
  color: indianred;
  text-decoration: line-through;
}
</style>
```

## Global

### Intro

It's often the case that state needs to be shared throughout the application.

To achieve this a parent component could define state and pass it to it's children using props. 

This works but it creates a few problems:
  - The parent component bloats.
  - Components are now tightly coupled.
  - Components now have parent/child hierarchy.

Vue has a better solution:

### useState()

The :inline{value=useState} method is provided by Vue. 

To refactor :inline{value=todos} to a global state do the following. 

Refactor the initialization of :inline{value=todos} to the following:


```vue [./components/Todos/TodosContainer.vue]
<script setup>
const todos = ref([]) -!!!
const todos = useState('todos', () => []) +!!!

// etc...
</script>

<template>
  <!-- etc... -->
</template>

<style>
/* etc... */
</style>
```

Now you can use the same state in other components by calling :inline{value=useState()} again.

This case for example, you grab the todos and count the done and undone to provide additional context to the user.

```vue [./components/Todos/TodosMeta.vue]
<script setup>
const todos = useState('todos', () => [])
const countDone = computed(() => todos.value.filter((t) => t.done).length)
const countUndone = computed(() => todos.value.filter((t) => !t.done).length)
</script>
<template>
  <div>
    <div>
      <label>Done Count</label>
      <div>
        <span v-text="countDone" />
      </div>
    </div>
    <div>
      <label>Undone Count</label>
      <div>
        <span v-text="countUndone" />
      </div>
    </div>
  </div>
</template>
```


Now you'll see that when you add a :inline{value=todo} to your :inline{value=todos} list then both components, :inline{value=TodosMeta} & :inline{value=TodosContainer} update.



## Pinia