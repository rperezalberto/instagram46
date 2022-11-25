import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyle } from '../../theme/globalStyle';
import { colores } from '../../theme/colores';



export const StoryProfile = () => {

    const dataHistorial = [
        {
            name: 'Friends',
            img: require('../../assets/imgPost/Friends.png'),
        },
        {
            name: 'Sport',
            img: require('../../assets/imgPost/Sport.png')
        },
        {
            name: 'Design',
            img: require('../../assets/imgPost/Design.png')
        },
        {
            name: 'Friends',
            img: require('../../assets/imgPost/Friends.png'),
        },
        {
            name: 'Sport',
            img: require('../../assets/imgPost/Sport.png')
        },
        {
            name: 'Design',
            img: require('../../assets/imgPost/Design.png')
        }
    ]


    return (
        <ScrollView style={[globalStyle.container, styles.container]} horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.containerClick}>
                <View style={styles.containerStory}>
                    <View style={styles.subContainerStoy}>
                        <Ionicons name="add" size={24} color={colores.black} />
                    </View>
                </View>
                <Text>New</Text>
            </TouchableOpacity>


            {
                dataHistorial.map((item, index) => (
                    <TouchableOpacity style={styles.containerClick} key={index}>
                        <View style={styles.containerStory}>
                            <View style={styles.subContainerStoy}>
                                <Image source={item.img} />
                            </View>
                        </View>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>

                ))
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    containerClick: {
        width: 64,
        height: 80,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    containerStory: {
        width: 64,
        height: 64,
        borderRadius: 100,
        backgroundColor: colores.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subContainerStoy: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colores.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});