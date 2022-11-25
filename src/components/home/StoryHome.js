import { useEffect, useMemo } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { dataList } from "../../data/DataList";
import { colores } from '../../theme/colores'
import { AddStory } from "./AddStory";


export const StoryHome = () => {



    // const addStory = useMemo(() => <AddStory />, []);


    return (
        <View style={styles.container}>
            <FlatList
                data={dataList}
                renderItem={_storyItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                ListHeaderComponent={<AddStory />}
            />
        </View>
    )
}




const _storyItem = ({ item }) => {
    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} key={item.id}>
            <LinearGradient colors={["#FBAA47", "#D91A46", "#A60F93"]} style={styles.containerStory}>
                <View style={styles.subContainer}>
                    <Image source={item.img} style={styles.img} />
                </View>
            </LinearGradient>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
}


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
        height: 56
    }
})