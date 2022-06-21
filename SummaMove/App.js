import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Workout from "./components/Workout";

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator 
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen component={Login} name="Loginscreen"></Stack.Screen>
        <Stack.Screen component={Register} name="Registerscreen"></Stack.Screen>
        <Stack.Screen component={Home} name="Homescreen"></Stack.Screen>
        <Stack.Screen component={Workout} name="Workout"></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;