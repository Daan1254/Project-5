import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Image, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";
import { getCurrentToken, setToken, setUser } from "./Authorizartion";
import { getLocals, setLocal } from "./Localization";

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
      // console.log(json)
      // console.log('hier');
      // console.log(json.acces_token)
      setToken(json.acces_token);
      setUser(json.userid)
      navigation.navigate("Homescreen", {  username:json.username });
    } else {
      Alert.alert("Je hebt iets niet goed ingevoerd");
    }
  };
  getCurrentToken((token) => {
    console.log(token)
  })


  let Locals = getLocals()
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{Locals.welcome_msg}</Text>
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
          title={Locals.lgn_btn_text}
          color="#7a42f4"
          onPress={() => {
            login(navigation);
          }}
        />
        <Text style={styles.gray}>{Locals.noAccount}</Text>
        <Button
          title={Locals.register}
          color="#7a42f4"
          onPress={() => {
            navigation.navigate("Registerscreen");
          }}
        />
        <Text style={styles.gray}>{Locals.futherAsGuest}</Text>
        <Button
          title={Locals.lgn_go}
          color="#7a42f4"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
        <Button
          title={Locals.select_lang}
          color="#7a42f4"
          
        />
        <View style={styles.flagContainer}>
          <Image
            source={{uri: "https://cdn.discordapp.com/attachments/991239131726360657/991239174407589949/NL.png"}}
            style={styles.flag}

          />
          <Pressable 
                      onPress={() => {
              setLocal("NL")
              Locals = getLocals()
            }}>
          <Image
            source={{uri: "https://cdn.discordapp.com/attachments/991239131726360657/991239174629904424/ENG.png"}}
            style={styles.flag}
            onPress={() => {setLocal("ENG")}}
          />
          </Pressable>

        </View>
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
  flagContainer: {
    width: 252,
    display: 'flex',
    justifyContent: "space-evenly",
    flexDirection: 'row'
  },
  flag: {
    width: 35,
    height: 25
  }
});
export default App;
