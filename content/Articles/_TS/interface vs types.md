Whats the difference?
```ts
type Wizard = {
  name: string
  age: number
}

interface Muggle {
  name: string 
  age: number
}

const w: Wizard = {}
const m: Muggle = {}
```

Types can be used for primitives.
Interfaces throw an error here.

```ts
type SWizard = string

interface SMuggle = string

const w: SWizard = {}
const m: SMuggle = {}
```


Types can use ors whereas Interfaces throw errors
```ts
type SType = string | number
const wizard: SType = 'Wizard'

interface Muggle {
  name: string
} | {}


const muggle: Muggle = { name: 'Muggle' }
```


Types can use the `&` where with interfaces you have to use extends.
```ts
type SType = { name: string } & { age: number }

interface N {
  age: number
}

interface Muggle extends N {
  name: string
}

const wizard: SType = { name: 'Harry', age: 18 }
const muggle: Muggle = { name: 'Muggle', age: 18 }
```

Interfaces benefits
- Can merge multiple interfaces
- Good for extending current types/features of JS
- Might be code smell within outcode smell?