import {View, Text, StyleSheet, ImageBackground} from 'react-native';



export default function Oefening({BackgroundImg, title, description, price}) {
    
    return  (
        <View style={styles.feedItemContainer}>
            <ImageBackground style={{height: '100%', width: 150, borderRadius: 20}} source={{uri: BackgroundImg}}>
            </ImageBackground>
            <View style={{width: "100%", textAlign: 'center', justifyContent: "center", flex: 1}}>
                <Text style={styles.feedTitle}>{title}</Text>
                <Text style={{textAlign: 'center', color: 'white'   }}>{description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedItemContainer: {
        backgroundColor:"#999897",
        margin: 15,
        height: 200,
        width: "90%",
        flex: 1,
        flexDirection:'row',
        borderRadius: 20,
    },
    feedTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
  });   