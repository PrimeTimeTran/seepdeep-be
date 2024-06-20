---
createdAt: 2023-10-30
title: React Navigation
description: React Navigation
---

# React Navigation


```jsx
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ExploreScreen from "../screens/ExploreScreen";
import StreamScreen from "../screens/StreamScreen";
import ClassWorkScreen from "../screens/ClassWorkScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import GradeScreen from "../screens/GradeScreen";
import ProvinceScreen from "../screens/ProvinceScreen";

import ExploreSVG from "../assets/explore.svg";
import BlueExploreSVG from "../assets/explore-blue.svg";
import StreamSVG from "../assets/stream.svg";
import BlueStreamSVG from "../assets/stream-blue.svg";
import ClassworkSVG from "../assets/classwork.svg";
import BlueClassworkSVG from "../assets/classwork-blue.svg";

import { AuthProvider, useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const tabBarLabelStyle = {
  fontSize: 12,
  fontStyle: "normal",
  fontWeight: 500,
};

function MainTabNavigator() {
  const { userIsLoggedIn } = useAuth();
  if (!userIsLoggedIn) return null;
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: "#5667FD",
        tabBarInactiveTintColor: "#364356",
        tabBarStyle: {
          padding: 0,
          paddingTop: 10,
          display: "flex",
          alignItems: "center",
        },
        tabBarVisible: false,
        headerShown: false,
        tabBarLabelStyle,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={({ route }) => ({
          title: "Explore",
          tabBarIcon: ({ focused, size }) => {
            return focused ? (
              <BlueExploreSVG width={size} height={size} />
            ) : (
              <ExploreSVG width={size} height={size} />
            );
          },
        })}
      />
      <Tab.Screen
        name="Stream"
        component={StreamScreen}
        options={({ route }) => ({
          title: "Stream",
          tabBarIcon: ({ focused, size }) => {
            return focused ? (
              <BlueStreamSVG width={size} height={size} />
            ) : (
              <StreamSVG width={size} height={size} />
            );
          },
        })}
      />
      <Tab.Screen
        name="ClassWork"
        component={ClassWorkScreen}
        options={({ route }) => ({
          title: "ClassWork",
          tabBarIcon: ({ focused, size }) => {
            return focused ? (
              <BlueClassworkSVG width={size} height={size} />
            ) : (
              <ClassworkSVG width={size} height={size} />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  const { userIsLoggedIn } = useAuth();
  if (userIsLoggedIn) return null;
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#F0F4F8",
        },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "", headerBackVisible: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "", headerBackVisible: false }}
      />
      <Stack.Screen
        name="GradeScreen"
        component={GradeScreen}
        options={{ title: "", headerBackVisible: false }}
      />
      <Stack.Screen
        name="ProvinceScreen"
        component={ProvinceScreen}
        options={{ title: "", headerBackVisible: false }}
      />
    </Stack.Navigator>
  );
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F4F5F9",
  },
};

function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <AuthStack />
        <MainTabNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default AppNavigator;
```