import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";

const App = ({route, navigation}) => {
    console.log('test');
    console.log(route.params);
  return (
    <View style={styles.container}>
        <View style={styles.grid}>
          <Text>Home screen</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  grid:{

    flex: 1,
    width: "100%",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    borderColor: "#7a42f4",
    borderWidth: 1,
    width: 250,
    padding: 10,
  },
  gray: {
    color: "gray",
    marginBottom: 5,
    marginTop: 25,
    textAlign:"center",
  },
});
export default App;
