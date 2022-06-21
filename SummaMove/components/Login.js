import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";
import { getCurrentToken, setToken } from "./Authorizartion";

const App = ({ route, navigation }) => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const login = async (navigation) => {
    const response = await fetch("http://node7.consulhosting.nl:24187/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    // let acces_token = null;
    if (response.status === 200) {
      const json = await response.json()
      console.log(json)
      console.log(json.acces_token)
      setToken(json.acces_token);
      navigation.navigate("Homescreen", { token: json.acces_token, userid: json.userid });
    } else {
      Alert.alert("Je hebt iets niet goed ingevoerd");
    }
  };
  getCurrentToken((token) => {
    console.log(token)
  })
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welkom!</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setusername(text)}
          placeholder="Username"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
        ></TextInput>
        <Button
          title="Login"
          color="#7a42f4"
          onPress={() => {
            login(navigation);
          }}
        />
        <Text style={styles.gray}>Heb je nog geen account?</Text>
        <Button
          title="Register"
          color="#7a42f4"
          onPress={() => {
            navigation.navigate("Registerscreen");
          }}
        />
        <Text style={styles.gray}>Ga verder als gast zonder account</Text>
        <Button
          title="Ga verder"
          color="#7a42f4"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    textAlign: "center",
  },
});
export default App;
