---
createdAt: 2023-11-01
title: Mocking API Requests in (RNTL)
description: Mocking API Requests in RNTL
---



Project Structure

```sh
.
├── app.test.js
├── tabs.test.js
├── demos
│   ├── demo-api.test.js
│   ├── demo-navigation.js
│   └── navigation.test.js
├── mocks
│   ├── handlers.js
│   ├── responses.js
│   └── server.js
├── setup
│   ├── api.setup.js
│   ├── jest.setup.js
│   ├── navigation.setup.js
│   └── redux.setup.js
```

```js
import { describe } from '@jest/globals';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import '@testing-library/jest-native/extend-expect';
import { act, render, screen } from '@testing-library/react-native';

export function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getStuff() {
      const r = await fetch('http://www.google.com');
      const j = await r.json();
      setItems(JSON.parse(j));
    }
    getStuff();
  }, []);

  return (
    <View>
      {items.map((i) => (
        <Text key={i}>{i}</Text>
      ))}
    </View>
  );
}

describe('APIs', () => {
  test('are mocked by testing framework', async () => {
    render(<App />);
    await act(async () => {
      const val = await screen.findByText(/Spam/i);
      expect(val).toBeOnTheScreen();
    });
  });
});
```