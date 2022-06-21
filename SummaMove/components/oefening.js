import {View, Text, StyleSheet, ImageBackground} from 'react-native';



export default function Oefening({BackgroundImg, title, description, price}) {
    
    return  (
        <View style={styles.feedItemContainer}>
            <ImageBackground style={{height: '100%', width: 150, borderRadius: 10}} source={{uri: BackgroundImg}}>
            </ImageBackground>
            <View style={{width: 300,}}>
                <Text style={styles.feedTitle}>{title}</Text>
                <Text style={{textAlign: 'center',}}>{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedItemContainer: {
        width: '100%',
        backgroundColor:"black",
        margin: 15,
        height: 200,
        width: 150,
        flex: 1,
        flexDirection:'row',
    },
    feedTitle: {
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
  });   