import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ActivityIndicator,
  FlatList,
  Pressable
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";
import { getCurrentToken, setToken } from "./Authorizartion";

import Oefening from "./oefening";
const App = ({ route, navigation }) => {
  let AccessToken;
  getCurrentToken((token) => {
    // console.log("got:" + token)
    AccessToken = token;
  });
  const [isLoading, setLoading] = React.useState(true);
  const [oefeningen, setOefeningen] = React.useState([]);
  const url = "http://node7.consulhosting.nl:24187/spiergroep/oefening/" + route.params.data
  const getJobs = async () => {
    try {
      const response = await fetch(
        url,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: AccessToken,
          },
        }
      );

      if (response.status == 200) {
        const json = await response.json();
        setToken(json.acces_token);
        AccessToken = getCurrentToken()
        console.log(AccessToken + " nieuwe token");
        console.log(response)
        console.log(json)
        setOefeningen(json.oefening)





      } else {
        console.log("geen authorization")
      }
    } catch (e) {
      // console.error(e);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getJobs();
  }, [url]);
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, textAlign: "center",}}>welke oefening wil je uitvoeren,</Text>
      <Text style={{fontSize: 25, textAlign: "center",}}>{route.params.username}?</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={oefeningen}
          keyExtractor={({ oefeningen }, key) => key}
          renderItem={({ item }) => (
            
              <Oefening title={item.name} BackgroundImg={item.picture} description={item.description}/>

          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 50,
    height: '100%',
    width: "100%"
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
  displayContainer:{
    overflow: "scroll",
    margin: 'auto',
  }
});
export default App;
