import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { colores } from '../../theme/colores';

export const StoryProgressive = ({ route }) => {

    const { width } = useWindowDimensions();
    const [time, setTime] = useState(0);
    const infoPost = route.params;
    const navigation = useNavigation();

    let valor = 0;

    useEffect(() => {
        setTimeout(() => {
            let intel = setInterval(() => {
                valor += 0.09
                setTime(valor);
                if (valor >= 1) {
                    clearInterval(intel);
                    navigation.navigate('Home');
                }
            }, 1000);
        }, 1000);
    }, [])



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
            <Progress.Bar
                progress={time}
                width={width}
                color={colores.grey}
                animated={true}
                animationType='timing'
                indeterminateAnimationDuration={200}
                borderWidth={0}
                unfilledColor={colores.white}
            // indeterminate={true}

            />
            <Image
                style={{ width: '100%', height: '100%' }}
                source={{ uri: infoPost.idPhoto }}
            />
            <View style={styles.containerTxt}>
                <Text style={styles.txt}>{infoPost.comment}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerTxt: {
        position: 'absolute',
        bottom: 60,
        marginHorizontal: 3
    },
    txt: {
        color: colores.white,
        fontSize: 18
    }
})