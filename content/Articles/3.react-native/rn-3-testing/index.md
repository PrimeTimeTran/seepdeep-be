---
createdAt: 2023-10-30
title: Testing with Jest & RNTL
description: Testing with Jest & React Native Testing Library
---

# Testing with Jest & React Native Testing Library

Testing is tough. Doing it right is tougher.

Testing is already hard.

Adding tests to a React Native project is harder when accounting for navigation, Redux, and hydration.

Here is how I've done it


## Setup Navigators

<details>
  <summary>Navigators Complete | Code</summary>

  ### Navigators
  ```js
  import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';

  import * as React from 'react';
  import 'react-native-gesture-handler';
  import { createStackNavigator } from '@react-navigation/stack';

  const { Screen, Navigator } = createStackNavigator();

  export default function Navigation() {
    const options = {};

    return (
      <Navigator>
        <Screen name="Home" component={HomeScreen} />
        <Screen options={options} name="Details" component={DetailsScreen} />
      </Navigator>
    );
  }

  function HomeScreen({ navigation }) {
    const [items] = React.useState(
      new Array(20).fill(null).map((_, idx) => idx + 1)
    );

    const onOpacityPress = (item) => navigation.navigate('Details', item);

    return (
      <View>
        <Text style={styles2.header}>List of numbers from 1 to 20</Text>
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          data={items}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onOpacityPress(item)}
              style={styles2.row}
            >
              <Text>Item number {item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  function DetailsScreen(props) {
    const item = Number.parseInt(props.route.params, 10);

    return (
      <View>
        <Text style={styles3.header}>Showing details for {item}</Text>
        <Text style={styles3.body}>the number you have chosen is {item}</Text>
      </View>
    );
  }

  const styles2 = StyleSheet.create({
    header: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 16,
    },
    row: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderBottomColor: '#DDDDDD',
      borderBottomWidth: 1,
    },
  });

  const styles3 = StyleSheet.create({
    header: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 16,
    },
    body: {
      textAlign: 'center',
    },
  });
  ```
</details>

## Setup Tests

<details>
  <summary>Tests Complete | Code</summary>

  ### Tests
  ```js
  import * as React from 'react';
  import { NavigationContainer } from '@react-navigation/native';

  import { act, render, screen, fireEvent } from '@testing-library/react-native';

  import '@testing-library/jest-native/extend-expect';

  import Navigation from './demo-navigation';

  describe('Testing react navigation', () => {
    test('page contains the header and 10 items', async () => {
      const component = (
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      );
      render(component);
      await act(async () => {
        const header = await screen.findByText('List of numbers from 1 to 20');
        const items = await screen.findAllByText(/Item number/);
        expect(items.length).toBe(10);
        expect(header).toBeOnTheScreen();
      });
    });

    test('clicking on one item takes you to the details screen', async () => {
      const component = (
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      );

      render(component);

      await act(async () => {
        const toClick = await screen.findByText('Item number 5');

        await fireEvent(toClick, 'press');

        const newHeader = await screen.findByText('Showing details for 5');
        const newBody = await screen.findByText(
          'the number you have chosen is 5'
        );

        expect(newHeader).toBeOnTheScreen();
        expect(newBody).toBeOnTheScreen();
      });
    });
  });
  ```
</details>

```js
function getTestSafePlatform() {
  if (process.env.NODE_ENV == 'test') return true;
  return Platform.OS === 'ios';
}
```
