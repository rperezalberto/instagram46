import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { IconAvatar } from '../../util/util';
import { colores } from '../../theme/colores';
import { globalStyle } from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { firestoreCon } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { getDataPofileInfo, getProfileActive } from '../../feactures/home/Home';


export const ProfileInfo = ({ route }) => {
    const dataHomePost = route.params.dataHomePost;

    const { width } = useWindowDimensions();
    const [isLoad, setIsLoad] = useState(false);

    const { dataProfileInfo } = useSelector(state => state.home);
    const dispatch = useDispatch();



    const getProfilePost = () => {
        onSnapshot(collection(firestoreCon, 'usuario', dataHomePost.id, 'post'), (document) => {
            document.forEach(item => {
                dispatch(getDataPofileInfo(item.data()));
            })
        })
    }


    useEffect(() => {
        getProfilePost();
        dispatch(getProfileActive(dataHomePost));
    }, [])


    const lengthPost = dataProfileInfo.length;
    const navigator = useNavigation()
    const widthBtnMessage = ((width / 2) - 40);
    let widthDime = (width / 3) - 3;


    const _ItenPostProfile = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={styles.containeImg} onPress={() => navitation.navigate('DetailPost')}>
                <Image source={{ uri: item.imgPost }} style={{ width: widthDime, height: 100, marginBottom: -15 }} />
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }



    const _HeaderProfileInfo = () => {
        return (
            <View style={globalStyle.backgroundView}>
                {/* <Image source={require()} /> */}
                <View style={[globalStyle.container, { backgroundColor: colores.white }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={globalStyle.avatarGrey}>
                            <View style={globalStyle.avatarWhite}>
                                {
                                    (dataHomePost.avatar) ? <Image
                                        style={globalStyle.avatarImg}
                                        source={{ uri: dataHomePost.avatar }}
                                    />
                                        : <IconAvatar name={'user'} size={50} color={colores.grey} />
                                }

                            </View>
                        </View>
                        <View style={globalStyle.contInfo}>
                            <Text style={globalStyle.txtNum}>{lengthPost}</Text>
                            <Text style={globalStyle.txtInfoNum}>Publicaciones</Text>
                        </View>

                        <View style={globalStyle.contInfo}>
                            <Text style={globalStyle.txtNum}>0</Text>
                            <Text style={globalStyle.txtInfoNum}>Seguidores</Text>
                        </View>

                        <View style={globalStyle.contInfo}>
                            <Text style={globalStyle.txtNum}>0</Text>
                            <Text style={globalStyle.txtInfoNum}>Seguidos</Text>
                        </View>
                    </View>


                    <View style={{ marginVertical: 10 }}>
                        <Text style={globalStyle.txtNameAvatar}>{(dataHomePost.userName) ? dataHomePost.userName : emailName}</Text>
                        <Text>{dataHomePost.bio}</Text>
                    </View>


                    <View style={globalStyle.btnEdit} onPress={() => navigator.navigate('EdictInfoProfile')}>
                        <TouchableOpacity style={[globalStyle.btnInfoMessage, { width: widthBtnMessage }]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={globalStyle.txtBtnInfoMessage}>Siguiendo</Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color={colores.black} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyle.btnInfoMessage, { width: widthBtnMessage }]}>
                            <Text style={globalStyle.txtBtnInfoMessage}>Mensaje</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalStyle.btnInfoMessage}>
                            <MaterialIcons style={{ paddingHorizontal: 10 }} name="person-add-alt" size={24} color={colores.black} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }


    return (

        <View style={[globalStyle.backgroundView, { flex: 1, flexDirection: 'row', backgroundColor: 'red' }]}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dataProfileInfo}
                    ListHeaderComponent={_HeaderProfileInfo}
                    renderItem={_ItenPostProfile}
                    keyExtractor={item => item.imgPost}
                />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    containeImg: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
    },

})