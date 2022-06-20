import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";

const App = ({route, navigation}) => {
    const [Email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const checkRegister = async (navigation) =>{

        if(username != "" && password != "" && confirm != ""&& Email != "" && password == confirm){
            const response = await fetch("http://node7.consulhosting.nl:24187/register", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username, 
                    'password': password,
                    'email':Email
                })
            })
            navigation.navigate("Loginscreen")
        }
        else{
            Alert.alert("Hebt niet alles goed ingevuld.");
        }
    }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
        <TextInput style={styles.input}  onChangeText={(text) => setemail(text)} placeholder="Email"></TextInput>
        <TextInput style={styles.input}  onChangeText={(text) => setusername(text)} placeholder="Username"></TextInput>
        <TextInput style={styles.input} onChangeText={(text) => setPassword(text)} placeholder="Password"></TextInput>
        <TextInput style={styles.input} onChangeText={(text) => setConfirm(text)} placeholder="Herhaal password"></TextInput>
        <Button
          title="Account aanmaken"
          color="#7a42f4"
          onPress={() => {checkRegister(navigation)}}
        />
        <Text style={styles.gray}>Heb je al een account?</Text>
        <Button
          title="Login Met bestaand account"
          color="#7a42f4"
          onPress={() => {navigation.navigate("Loginscreen")}}
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
    textAlign:"center",
  },
});
export default App;
