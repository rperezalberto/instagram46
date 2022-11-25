import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { globalStyle } from '../../theme/globalStyle';
import { colores } from '../../theme/colores';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import { LoadImg } from '../../util/util';
import { ActivityLoand } from '../util/ActivityLoand';
import { firestoreCon, storageCon } from '../../firebase/config';





export const EdictInfoProfile = () => {

    const { dataPerfil, id } = useSelector(state => state.profile);

    const dispatch = useDispatch();

    const [name, setName] = useState((dataPerfil.name) ? dataPerfil.name : '');
    const [userName, setUserName] = useState((dataPerfil.userName) ? dataPerfil.userName : '');
    const [webSite, setWebSite] = useState((dataPerfil.webSite) ? dataPerfil.webSite : '');
    const [bio, setBio] = useState((dataPerfil.bio) ? dataPerfil.bio : '');
    const [cel, setCel] = useState((dataPerfil.cel) ? dataPerfil.cel : '');
    const [avatar, setAvatar] = useState((dataPerfil.avatar) ? dataPerfil.avatar : '');
    const [genero, setGenero] = useState((dataPerfil.genero) ? dataPerfil.genero : '');


    const [file, setfile] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setfile(result.uri);
        }
    }



    useEffect(() => {

        const uploadAvatar = async () => {
            try {
                setIsLoad(true);

                const img = await LoadImg(file);

                const refDocument = ref(storageCon, 'avatar/' + v4());
                await uploadBytes(refDocument, img);
                await getDownloadURL(refDocument)
                    .then(e => {
                        setAvatar(e);
                    })
            } catch (error) {
                console.log(error);
                console.log('Problemas')
            }
            setIsLoad(false);
        }
        uploadAvatar();
    }, [file])


    const updateProfile = async () => {

        try {
            const docRef = doc(firestoreCon, 'usuario', id);
            await updateDoc(docRef, {
                name: name,
                userName: userName,
                webSite: webSite,
                bio: bio,
                cel: cel,
                avatar: avatar,
                genero: genero
            });

            alert("Perfil modificado");

        } catch (error) {
            console.log(error);
        }
    }

    if (isLoad) return <ActivityLoand />


    return (
        <ScrollView>
            <View style={styles.containerImg}>
                <Image
                    style={globalStyle.avatarImg}
                    source={(avatar) ? { uri: avatar } : require('../../assets/imgPerfil/Oval.png')}
                />
                <TouchableOpacity onPress={() => imagePicker()}>
                    <Text style={styles.txtEdit}>Cambiar foto del perfil</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contanerInfo}>
                <View style={globalStyle.container}>
                    <View style={styles.containerForm}>
                        <Text style={styles.titleInput}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Pandari_j'
                            onChangeText={(e) => setName(e)}
                            value={name}
                        />
                    </View>

                    <View style={styles.containerForm}>
                        <Text style={styles.titleInput}>Usuario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Pandari_j'
                            onChangeText={(e) => setUserName(e)}
                            value={userName}
                        />
                    </View>

                    <View style={styles.containerForm}>
                        <Text style={styles.titleInput}>Website</Text>
                        <TextInput
                            style={styles.input}
                            // value='Pandari_j'
                            onChangeText={(e) => setWebSite(e)}
                            placeholder='Website'
                            value={webSite}
                        />
                    </View>

                    <View style={styles.containerForm}>
                        <Text style={styles.titleInput}>Bio</Text>
                        <TextInput
                            style={[styles.input, { borderBottomWidth: 0 }]}
                            placeholder='Digital goodies designer @pixsellz 
                        Everything is designed.'
                            onChangeText={(e) => setBio(e)}
                            multiline={true}
                            value={bio}
                        />
                    </View>
                </View>
            </View>



            <View style={[globalStyle.container]}>
                <View style={styles.contianerTitle}>
                    <Text style={{ fontSize: 15, color: colores.blue, fontWeight: '400' }}>Cambiar a cuenta profesional</Text>
                </View>
                <View style={styles.contianerTitle}>
                    <Text style={{ fontSize: 15, color: colores.black, fontWeight: '900' }}>Información privada</Text>
                </View>

                <View style={styles.containerForm}>
                    <Text style={styles.titleInput}>Telefono</Text>
                    <TextInput
                        style={styles.input}
                        // value='Pandari_j'
                        onChangeText={(e) => setCel(e)}
                        keyboardType={'phone-pad'}
                        placeholder='+1 202 555 0147'
                        value={cel}
                    />
                </View>

                <View style={styles.containerForm}>
                    <Text style={styles.titleInput}>Genero</Text>
                    <Picker
                        style={styles.input}
                        selectedValue={genero}
                        // onChangeText={(e) =>setGenero(e)}
                        onValueChange={(itemValue, itemIndex) =>
                            setGenero(itemValue)
                        }>
                        <Picker.Item label="Genero" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Femenino" value="Femenino" />
                    </Picker>
                </View>

            </View>
            <Button
                title='Enviar'
                onPress={() => updateProfile()}
            />


        </ScrollView>
    )
}


const styles = StyleSheet.create({
    containerImg: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contanerInfo: {
        paddingVertical: 10,
        // borderWidth: StyleSheet.hairlineWidth,
    },
    txtEdit: {
        fontSize: 13,
        color: colores.blue,
        fontWeight: '900',
        marginVertical: 10
    },
    containerForm: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48
    },
    titleInput: {
        fontSize: 15,
        color: colores.black,
        fontWeight: '400'
    },
    input: {
        width: '75%',
        height: 48,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    contianerTitle: {
        marginVertical: 20
    }
});