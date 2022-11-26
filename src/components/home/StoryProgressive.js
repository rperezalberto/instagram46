import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { useWindowDimensions } from 'react-native';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { colores } from '../../theme/colores';

export const StoryProgressive = () => {

    const { width } = useWindowDimensions();
    const [time, setTime] = useState(0);

    const { getStory } = useSelector(state => state.home);


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


    console.log(getStory)



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
                source={{ uri: getStory[0].idPhoto }}
            />
            <View style={styles.containerTxt}>
                <Text style={styles.txt}>{getStory[1].comment}</Text>
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