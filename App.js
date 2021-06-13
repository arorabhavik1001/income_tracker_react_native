import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import {
  StyleSheet,
  View,
} from "react-native";

const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} options={{
          headerStyle: {
            backgroundColor: '#f4511e',
            padding: 'none'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Login" component={Login} options={{
          title: "Sign In"
        }} />
      </Stack.Navigator>
    </NavigationContainer>
      {/* <Home/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#121212",
    height: "100%",
    // marginTop: statusBarHeight,
    padding: 10,
  },
});

export default App;