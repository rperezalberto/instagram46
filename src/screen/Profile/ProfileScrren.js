import { useRef, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';

import { globalStyle } from '../../theme/globalStyle';
import { ToggleMenu } from '../../components/profile/menu/ToggleMenu';

import { doc, onSnapshot, collection } from 'firebase/firestore';
import { firestoreCon } from '../../firebase/config';
import { HeaderProfile } from '../../components/profile/HeaderProfile';
import { colores } from '../../theme/colores';
import { getDataPerfil, getDataPostProfile, openToggleAdd, openToggle, signOutSession } from '../../feactures/profile/profile';
import { ActivityLoand } from '../util/ActivityLoand';
import { useNavigation } from '@react-navigation/native';
import { AddPost } from '../../components/profile/menu/AddPost';



export const ProfileScrren = () => {


    const { dataPerfilPost, id, current, currentAdd } = useSelector(state => state.profile);

    const { width } = useWindowDimensions();
    let widthDime = (width / 3) - 3;

    const [isLoad, setIsLoad] = useState(false);

    const sheetRef = useRef(null);
    const sheetRefCreate = useRef(null);

    // current && sheetRef.current.snapTo(1);
    // currentAdd && sheetRef.current.snapTo(1);

    // console.log(sheetRef);

    current ? sheetRef.current.snapTo(1) : null;
    currentAdd ? sheetRefCreate.current.snapTo(1) : null;


    // console.log(current);

    const dispatch = useDispatch();

    const navitation = useNavigation();

    const getDataProfile = async () => {
        try {
            onSnapshot(doc(firestoreCon, 'usuario', id), (docs) => {
                const datas = docs.data();
                dispatch(getDataPerfil(datas));
            });

        } catch (error) {
            console.log(error);
        }
    }


    const getPostProfile = () => {
        try {
            // console.log('Estoy pasando');
            onSnapshot(collection(firestoreCon, 'usuario', id, 'post'), (documento) => {
                setIsLoad(false);
                documento.forEach(item => {
                    dispatch(getDataPostProfile(item.data()));
                    // console.log(item.data());
                })
            });

            setIsLoad(true);
        } catch (error) {
            console.log(error);
        }
        setIsLoad(true);
    }


    useEffect(() => {
        getDataProfile();
        getPostProfile();
    }, []);

    // console.log(dataPerfilPost)
    const ImgItem = ({ item, index }) => {
        // console.log('Valor de ' + index)
        return (
            <TouchableOpacity key={index} style={styles.containeImg} onPress={() => navitation.navigate('DetailPost')}>
                <Image source={{ uri: item.imgPost }} style={{ width: widthDime, height: 100, marginBottom: -15 }} />
                <Text>{item.name}</Text>
            </TouchableOpacity>
        )
    }



    // console.log(isLoad)
    if (isLoad) return <ActivityLoand />

    return (
        <View style={{ flex: 1 }}>
            <GestureHandlerRootView style={{ flex: 1, backgroundColor: colores.white }}>
                <FlatList
                    data={dataPerfilPost}
                    numColumns={3}
                    ListHeaderComponent={<HeaderProfile />}
                    keyExtractor={index => index.id}
                    renderItem={ImgItem}
                />
                <BottomSheet
                    ref={sheetRefCreate}
                    snapPoints={[0, 300]}
                    borderRadius={0}
                    // initialSnap={0}
                    onCloseEnd={() => dispatch(openToggleAdd(false))}
                    renderHeader={() => (
                        <View style={styles.contianerHeaderAdd}>
                            <View style={globalStyle.bgBotonToggle}></View>
                            <Text style={styles.txtHeaderToggle}>Crear</Text>
                        </View>
                    )}
                    renderContent={() => <AddPost />}
                />
                <BottomSheet
                    ref={sheetRef}
                    snapPoints={[0, 450]}
                    borderRadius={20}
                    initialSnap={0}
                    onCloseEnd={() => dispatch(openToggle(false))}
                    renderContent={() => <ToggleMenu />}
                />
            </GestureHandlerRootView >
        </View>
    )
}

const styles = StyleSheet.create({
    contianerHeaderAdd: {
        alignItems: 'center',
        backgroundColor: colores.black,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    txtHeaderToggle: {
        fontSize: 15,
        color: colores.white,
        fontWeight: '700',
        marginBottom: 10
    },
    containeImg: {
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',

    },

})