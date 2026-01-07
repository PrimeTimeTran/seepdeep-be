# Topics

Binary Search
6857653fff85feed0e9e480e

Sliding Window
685491fd781604a302338d2d

Two Pointers
68576607ff85feed0e9e480f

Hash Table
6855cbb3781604a302338d2e

Hash Set
685767e2ff85feed0e9e4810

Greedy
6857675b781604a302338d2f

String
68577abbff85feed0e9e4811

Stack
68577acfff85feed0e9e4812

Graph
68579774ff85feed0e9e4813

Prefix Sum
685797f9ff85feed0e9e4814

Dynamic Programming
685dc659f956817861cf6f7d

```
db['topics'].insertOne({
  name: "Dynamic Programming"
})
```

# Add Topics to Problem

```mongo
db["topics"].updateOne(
  { _id: ObjectId("685dc659f956817861cf6f7d") },
  { $push: { problems: ObjectId("685dcaf71450b2609545990b") } }
)

db["problems"].updateOne(
  { _id: ObjectId("685dcaf71450b2609545990b") },
  { $push: { topics: ObjectId("685dc659f956817861cf6f7d") } }
)
```
