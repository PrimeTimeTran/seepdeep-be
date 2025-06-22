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

db['topics'].insertOne({
name: "Hash Set"
})

# Add Topics to Problem

db["topics"].updateOne(
{ _id: ObjectId("68577acfff85feed0e9e4812") },
{ $push: { problems: ObjectId("68577bd38bef6e4a2b953e8c") } }
)

db["problems"].updateOne(
{ _id: ObjectId("68577bd38bef6e4a2b953e8c") },
{ $push: { topics: ObjectId("68577acfff85feed0e9e4812") } }
)
