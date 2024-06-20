---
createdAt: 2023-10-30
title: Object Oriented Programming
description: An introduction to OOP with Dart
---

# Overview Flutter

An overview of Flutter


```
abstract class Animal {}

mixin NoisyAnimal on Animal {
  String makeNoise();
}

class Dog extends Animal with NoisyAnimal {
  @override
  String makeNoise() => 'Bark!';
}

class Cat extends Animal with NoisyAnimal {
  @override
  String makeNoise() => 'Meow!';
}

class Snail extends Animal {}

void main() {
  Animal dog = Dog();
  Animal cat = Cat();
  Animal snail = Snail();

  print(dog is NoisyAnimal); // true
  print(cat is NoisyAnimal); // true
  print(snail is NoisyAnimal); // false
}
```