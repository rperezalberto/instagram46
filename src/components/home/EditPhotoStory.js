import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { LoadImg } from '../../util/util';
import { colores } from '../../theme/colores';
import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons } from '@expo/vector-icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, collection, addDoc } from 'firebase/firestore';
import { storageCon, firestoreCon } from '../../firebase/config';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import { ActivityLoand } from '.././../screen/util/ActivityLoand';



export const EditPhotoStory = (result) => {
    const navigation = useNavigation();

    const ulrImg = result.route.params.uri;
    const [comment, setComment] = useState();
    const [isLoad, setIsLoad] = useState(false);

    const { id } = useSelector(state => state.profile);
    const { dataPerfil } = useSelector(state => state.home);

    let userName = dataPerfil.userName;


    const uploadPhoto = async () => {
        const refPhoto = ref(storageCon, 'historial/' + v4());
        const photoSti = await LoadImg(ulrImg);

        setIsLoad(true);
        await uploadBytes(refPhoto, photoSti);
        await getDownloadURL(refPhoto)
            .then(idPhoto => {
                addComment(idPhoto);
                // console.log(idPhoto);
            })
            .catch(error => {

                setIsLoad(false);
                console.log(error)
            })

        setIsLoad(false);
    }


    const addComment = async (idPhoto) => {
        const refDocument = collection(firestoreCon, 'estados');
        setIsLoad(true);
        await addDoc(refDocument, {
            idUser: id,
            comment,
            idPhoto,
            userName
        })
            .then(() => {
                navigation.navigate('Home');
            });
        setIsLoad(false);
    }


    if (isLoad) return <ActivityLoand />

    return (
        <View style={{ flex: 1, backgroundColor: colores.black }}>
            <View style={styles.container}>
                <Image
                    style={styles.container}
                    source={{ uri: ulrImg }}
                />
            </View>

            <View style={styles.containerTex}>
                <TextInput
                    style={styles.input}
                    placeholder='Añade un comentario...'
                    placeholderTextColor={colores.white}
                    selectionColor={colores.white}
                    onChangeText={(e) => setComment(e)}
                    multiline
                />
                <TouchableOpacity style={styles.containerClick} onPress={() => uploadPhoto()}>
                    <LinearGradient colors={["#FBAA47", "#D91A46", "#A60F93"]} style={styles.btn}>
                        <EvilIcons name="sc-telegram" size={30} color={colores.white} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colores.black,
    },
    containerTex: {
        // backgroundColor: 'red',
        width: '100%',
        // height: 50
        paddingVertical: 20
    },
    input: {
        color: colores.white,
        backgroundColor: '#1F2C34',
        width: '100%',
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingRight: 80
    },
    containerClick: {
        position: 'absolute',
        bottom: 25,
        right: 0,
        marginHorizontal: 20
    },
    btn: {
        width: 40,
        height: 40,
        right: 0,
        // backgroundColor: 'red',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})