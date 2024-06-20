---
createdAt: 2023-10-28
title: Better switch statements in Dart
description: A better approach than a switch statement.
---

# Better than Switch | Dart

```dart
getHouse(name) {
  switch (name) {
    case 'Godric':
      return 'Gryffindor';
    case 'Salazar':
      return 'Slytherin';
    case 'Rowena':
      return 'Ravenclaw';
    case 'Helga':
      return 'Hufflepuff';
    default:
  }
}
```


```dart
getHouse(name) {
  final houseMap = {
    'Godric': 'Gryffindor',
    'Salazar': 'Slytherin',
    'Rowena': 'Ravenclaw',
    'Helga': 'Hufflepuff',
  };
  return houseMap[name] ?? 'Unknown';
}
```