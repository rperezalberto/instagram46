import { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colores } from '../theme/colores';
import { Avatar } from '@rneui/themed'
import { globalStyle } from '../theme/globalStyle';

import { AntDesign } from '@expo/vector-icons';
import { LikeButtonInfo } from '../screen/util/InfoIconFunction';

import { doc, getDoc } from 'firebase/firestore';
import { firestoreCon } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { ActivityLoand } from '../screen/util/ActivityLoand';
import { useNavigation } from '@react-navigation/native';



export const RenderItemHome = ({ item, index }) => {
    const [isLike, setIsLike] = useState(false);
    const [dataHomePost, setDataHomePost] = useState();
    const [isLoad, setIsLoad] = useState(true);

    const dispatch = useDispatch();

    // const { ListLikeUser } = useSelector(state => state.profile);
    const navigation = useNavigation();


    const getHomePostExit = async (item) => {
        setIsLoad(true);
        const docRef = doc(firestoreCon, 'usuario', item.id);
        const datos = await getDoc(docRef);
        const data = datos.data();
        setDataHomePost(data);
        setIsLoad(false);
    }

    useEffect(() => {
        getHomePostExit(item);
    }, [])

    if (isLoad) return <ActivityLoand />

    return (
        <View key={index}>
            {/* Menu del avatar post */}
            <View style={[globalStyle.container, styles.menuAvatar]} key={index}>
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate('ProfileInfo', { dataHomePost: dataHomePost })}>
                    <Avatar
                        rounded
                        source={(dataHomePost.avatar) ? { uri: dataHomePost.avatar } : require('../assets/imgPerfil/Oval.png')}
                    />

                    <View style={{ marginHorizontal: 5 }}>
                        <Text style={styles.txtName}>{dataHomePost.userName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.txtAddress}>{dataHomePost.name} </Text>
                        </View>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../assets/icons/more.png')} />
                </TouchableOpacity>
            </View>


            {/* imagenes publicadas del post */}
            <View >
                <View key={index} style={{ width: '100%', backgroundColor: 'red' }}>
                    <Image source={(item) ? { uri: item.imgPost } : require('../assets/imgPerfil/Oval.png')} style={styles.img} />
                </View>


                <View style={[globalStyle.container, styles.containerLike]}>

                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity style={styles.imgMargin} onPress={() => LikeButtonInfo(item, dataHomePost)}>
                            {
                                (isLike.like) ? <AntDesign name="heart" size={24} color="red" /> : <Image source={require('../assets/icons/Like.png')} />
                            }


                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imgMargin}>
                            <Image source={require('../assets/icons/Comment.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.imgMargin}>
                            <Image source={require('../assets/icons/Message.png')} />
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity>
                        <Image source={require('../assets/icons/Save.png')} />
                    </TouchableOpacity>

                </View>

                <View style={[globalStyle.container]} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <TouchableOpacity> */}
                        <Image
                            source={{ uri: dataHomePost.avatar }}
                        />
                        {/* </TouchableOpacity> */}
                        {/* <Text style={styles.txtComen}> Liked by </Text>
                        <Text style={[styles.txtComen, { fontWeight: '900' }]}>craig_love </Text>
                        <Text style={styles.txtComen}>and </Text>
                        <Text style={[styles.txtComen, { fontWeight: '900' }]}> 44,686 others </Text> */}
                    </View>

                    <View style={{ alignItems: 'flex-start' }}>
                        <Text style={[styles.txtComen, { fontWeight: '900' }]}> {dataHomePost.userName}</Text>
                        <Text style={[styles.txtComen,]}> {(dataHomePost) && item.decrpImg}</Text>
                    </View>
                </View>


            </View>
        </ View>
    )
}


const styles = StyleSheet.create({
    menuAvatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14
    },
    txtName: {
        fontSize: 13,
        fontWeight: '900',
        color: colores.black
    },
    txtAddress: {
        fontSize: 11
    },
    img: {
        width: '100%',
        height: 375
    },
    containerLike: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
    },
    imgMargin: {
        marginHorizontal: 4
    },
    txtComen: {
        fontSize: 13,
        color: colores.black
    }
})