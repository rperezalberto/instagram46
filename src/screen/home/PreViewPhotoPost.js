import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { globalStyle } from '../../theme/globalStyle';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { LoadImg } from '../../util/util';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { useNavigation } from '@react-navigation/native';
import { LoadImg } from '../../util/util';
import { colores } from '../../theme/colores';
import { firestoreCon, storageCon } from '../../firebase/config';
import { ActivityLoand } from '../util/ActivityLoand';

export const PreViewPhotoPost = ({ route }) => {
    const dataImg = route.params;


    const [img, setImg] = useState();
    const [viewImg, setViewImg] = useState();
    const [txtFooter, setTxtFooter] = useState();
    const [isLoad, setIsLoad] = useState(false);


    const { dataPerfil } = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // console.log(dataPerfil)

    useEffect(() => {
        const cleanImg = async () => {
            try {
                setViewImg(dataImg.uri);
                const isImage = await LoadImg(dataImg.uri);
                setImg(isImage);
            } catch (error) {
                console.log(error)
            }
        }
        cleanImg();
    }, [dataImg]);




    const uploadImgPost = async () => {

        try {
            setIsLoad(true)
            const refDocument = ref(storageCon, 'post/' + v4());
            await uploadBytes(refDocument, img);
            await getDownloadURL(refDocument)
                .then(urlImg => {
                    AddPost(urlImg)
                })
        } catch (error) {
            console.log(error)
            setIsLoad(false);
        }
        setIsLoad(false)
        navigation.navigate('StackProfile');
    }



    const AddPost = async (urlImg) => {

        try {
            console.log("Subiendo...");
            const docRef = collection(firestoreCon, 'usuario', dataPerfil.id, 'post');
            await addDoc(docRef, {
                id: dataPerfil.id,
                decrpImg: txtFooter,
                imgPost: urlImg
            })

        } catch (error) {
            console.log(error);
        }
    }
    if (isLoad) return <ActivityLoand />


    return (
        <View style={[globalStyle.container, { marginTop: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: viewImg }} style={styles.img} />
                <TextInput
                    style={styles.input}
                    placeholder={'Escribe un pie de foto o video...'}
                    multiline={true}
                    onChangeText={(e) => setTxtFooter(e)}
                />
            </View>
            <View style={{ marginVertical: 20 }}>
                <TouchableOpacity style={styles.btn} onPress={() => uploadImgPost()}>
                    <Text style={styles.txtBtn}>Publicar</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colores.blue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtBtn: {
        color: colores.white,
        padding: 8,
        fontWeight: '900'
    },
    img: {
        width: '20%',
        height: 60
    },
    input: {
        paddingHorizontal: 10,
        width: '80%'
    }
})