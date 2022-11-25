import { useEffect, useState } from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestoreCon } from "../../firebase/config";
import { getDataProfile } from "../../feactures/home/Home";
import { colores } from "../../theme/colores";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export const AddStory = () => {
    const { token } = useSelector(state => state.profile);
    const [dataProfile, setDataProfile] = useState();

    const navigation = useNavigation();

    const dispatch = useDispatch();


    const addStoryPhoto = () => {

    }


    const addStoryHome = async () => {

        const docRef = collection();
    }



    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        // console.log('Inagenes');

        if (result.cancelled) {
            return null;
        } else {
            setImage(result.uri);
        }
    }


    useEffect(() => {
        const getProfle = async () => {
            onSnapshot(doc(firestoreCon, 'usuario', token), (document) => {
                dispatch(getDataProfile(document.data()));
                setDataProfile(document.data());
            });
        }
        getProfle();
    }, []);






    return (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => navigation.navigate('AddPhotoStory')}>
            <View style={styles.containerStory}>
                <View style={styles.subContainer}>
                    <Image source={(dataProfile) ? { uri: dataProfile.avatar } : require('../../assets/imgAvatar/oval.png')} style={styles.img} />
                    <View style={styles.circleWhite}>
                        <View style={styles.circleBlue}>
                            <Ionicons name="add" size={18} color={colores.white} />
                        </View>
                    </View>
                </View>
            </View>
            <Text>Tu historia</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    circleWhite: {
        position: 'absolute',
        bottom: 0,
        right: -5,
        width: 23,
        height: 23,
        backgroundColor: colores.white,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleBlue: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: '#0095F6',
        justifyContent: 'center',
        alignItems: 'center'
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
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 100,
    }
})