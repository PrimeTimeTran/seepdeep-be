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

db['topics'].insertOne({
name: "Prefix Sum"
})

# Add Topics to Problem

db["topics"].updateOne(
{ _id: ObjectId("68579774ff85feed0e9e4813") },
{ $push: { problems: ObjectId("685a2363e9ae18e695c7334d") } }
)

db["problems"].updateOne(
{ _id: ObjectId("685a2363e9ae18e695c7334d") },
{ $push: { topics: ObjectId("68579774ff85feed0e9e4813") } }
)

<!-- "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix" -->
