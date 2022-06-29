import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
function isURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}
const App = ({ route, navigation }) => {

  const [hasCameraPermissions, setCamera] = React.useState(false);
  const [scanned, setScanned] = React.useState(false);
  const [scannedData, setScannedData] = React.useState('');
  const [buttonState, setButtonState] = React.useState('normal');

  const getCameraPermissions = async () => {
   await Permissions.askAsync(Permissions.CAMERA);
      setButtonState('clicked');
      setScanned(false);
      setCamera(true);
    };

 const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setButtonState('normal');
    navigation.navigate("Workout", { data: data})
  };

    if (hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject} />
      )
      }
      else {
        return (
          <View style={styles.container}>
            <Text style={styles.displayText}>
              {hasCameraPermissions === true
                ? scannedData
                : 'Request Camera Permission'}
            </Text>
            <TouchableOpacity
              onPress={getCameraPermissions}
              style={styles.scanButton}
              title="Bar Code Scanner">
              <Text style={styles.buttonText}>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  
  
  export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  displayText: {
    fontSize: 20,
  },
  url: {
    fontSize: 20,
    color: 'blue',
  },
  scanButton: {
    backgroundColor: '#c4c4c4',
    padding: 10,
    margin: 10,
    borderRadius: 15
  },
  buttonText: {
    fontSize: 22,
  },
});