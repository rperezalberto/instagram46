import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { LinearGradient } from "expo-linear-gradient";
import { dataList } from "../../data/DataList";
import { colores } from '../../theme/colores'
import { AddStory } from "./AddStory";
import { firestoreCon } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getItemStory } from "../../feactures/home/Home";
import { useNavigation } from "@react-navigation/native";


export const StoryHome = () => {

    // const [dataStory, setDataStory] = useState([]);
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { getStory } = useSelector(state => state.home);

    const getDataStoty = async () => {

        onSnapshot(collection(firestoreCon, 'estados'), (document) => {
            document.forEach(item => {
                // setDataStory(item.data());
                dispatch(getItemStory(item.data()));
            })
        })
    }


    useEffect(() => {
        getDataStoty();
    }, []);



    return (
        <View style={styles.container}>
            <FlatList
                data={getStory}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('StoryProgressive', { ...item })}>
                            <LinearGradient colors={["#FBAA47", "#D91A46", "#A60F93"]} style={styles.containerStory}>
                                <View style={styles.subContainer}>
                                    <Image source={{ uri: item.idPhoto }} style={styles.img} />
                                </View>
                            </LinearGradient>
                            <Text>{item.userName}</Text>
                        </TouchableOpacity >
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                ListHeaderComponent={<AddStory />}
                keyExtractor={item => item.userName}
            />
        </View>
    )
}




// const _storyItem = ({ item }) => {
//     console.log(props)
//     return (
//         <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}  >
//             <LinearGradient colors={["#FBAA47", "#D91A46", "#A60F93"]} style={styles.containerStory}>
//                 <View style={styles.subContainer}>
//                     <Image source={{ uri: item.idPhoto }} style={styles.img} />
//                 </View>
//             </LinearGradient>
//             <Text>{item.userName}</Text>
//         </TouchableOpacity >
//     )
// }


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#262626',

    },
    containerStory: {
        width: 66,
        height: 66,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    subContainer: {
        backgroundColor: colores.white,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 56,
        height: 56,
        borderRadius: 100
    }
})