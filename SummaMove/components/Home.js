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
import { getCurrentToken, setToken, getUser } from "./Authorizartion";

import Oefening from "./oefening";
const App = ({ route, navigation }) => {

  // console.log(route.params);
  let AccessToken;
  getCurrentToken((token) => {
    // console.log("got:" + token)
    AccessToken = token;
  });
  
  const [isLoading, setLoading] = React.useState(true);
  const [oefeningen, setOefeningen] = React.useState([]);
  const url = "http://node7.consulhosting.nl:24187/spiergroepen"
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
        setOefeningen(json.oefeningen);
        console.log(json.oefeningen[1].id);
        // console.log(json.oefeningen);
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
      <Text style={{fontSize: 25, textAlign: "center",}}>Wat gaan we vandaag trainen,</Text>
      <Text style={{fontSize: 25, textAlign: "center",}}>{route.params.username}?</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={oefeningen}
          keyExtractor={({ oefeningen }, key) => key}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                navigation.navigate("Workout", { data: item.id, username: route.params.username});
              }}
            >
              <Oefening title={item.name} BackgroundImg={item.img} description={item.description}/>
              </Pressable>
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
