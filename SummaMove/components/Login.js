import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-web";

const App = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder="Username"></TextInput>
        <TextInput style={styles.input} placeholder="Password"></TextInput>
        <Button
          title="Login"
          color="#7a42f4"
          onPress={() => Alert.alert("Button with adjusted color pressed")}
        />
        <Text style={styles.gray}>Heb je nog geen account?</Text>
        <Button
          title="Register"
          color="#7a42f4"
          onPress={() => {navigation.navigate("Registerscreen")}}
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
    textAlign:"center",
  },
});
export default App;
