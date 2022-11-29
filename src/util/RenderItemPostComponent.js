import { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colores } from '../theme/colores';
import { Avatar } from '@rneui/themed'
import { globalStyle } from '../theme/globalStyle';

import { AntDesign } from '@expo/vector-icons';
import { LikeButtonInfo } from '../screen/util/InfoIconFunction';

import { doc, onSnapshot, collection, query, where, getDocs } from 'firebase/firestore';
import { firestoreCon } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { likePostInfo, listLikeDataInfo } from '../feactures/profile/profile';
import { ActivityLoand } from '../screen/util/ActivityLoand';
import { isLikePost } from '../feactures/home/Home';


export const RenderItemPostComponent = ({ item, index, dataPerfil }) => {


    const [isLike, setIsLike] = useState(false);
    const [isLikeTrue, setIsLikeTrue] = useState();
    const [isLoad, setIsLoad] = useState(false);

    const dispatch = useDispatch();


    // Obteniendo los datos de todos los post del usuario al dar click
    const getLikeExist = async () => {
        try {
            // console.log('Estoy pasando')
            const docRef = doc(firestoreCon, 'usuario', dataPerfil.id, 'post', item.id, 'like', item.id);
            onSnapshot(docRef, (docs) => {
                const dataLike = docs.data();
                if (dataLike) {
                    dispatch(likePostInfo(dataLike));
                    setIsLike(dataLike);
                    (dataLike.like) ? setIsLikeTrue(false) : setIsLikeTrue(true);
                    dispatch(isLikePost(isLike));
                }

            })

        } catch (error) {
            console.log(error);
        }
    }


    // const getProfileLike = async (id) => {
    //     try {
    //         // console.log(id);
    //         // setIsLoad(true)
    //         const q = query(collection(firestoreCon, 'usuario'), where("id", "==", 'BP9eNX1Bg0SyUu5R5H4TdSsGH133'));
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach(item => {
    //             dispatch(listLikeDataInfo(item.data()));
    //             console.log(item.data())
    //         })
    //         setIsLoad(false);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // // const da = useMemo(() => getLikeExist());

    useEffect(() => {
        getLikeExist();
        // getProfileLike();
    }, []);

    if (isLoad) return <ActivityLoand />

    return (
        <View key={index}>
            {/* Menu del avatar post */}
            <View style={[globalStyle.container, globalStyle.menuAvatar]} key={index}>
                <View style={{ flexDirection: "row" }} >
                    <Avatar
                        rounded
                        source={(dataPerfil.avatar) ? { uri: dataPerfil.avatar } : require('../assets/imgPerfil/Oval.png')}
                    />

                    <View style={{ marginHorizontal: 5 }}>
                        <Text style={globalStyle.txtName}>{dataPerfil.userName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={globalStyle.txtAddress}>Tokio </Text>
                            <Text style={globalStyle.txtAddress}>Japon</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity>
                    <Image source={require('../assets/icons/more.png')} />
                </TouchableOpacity>
            </View>


            {/* imagenes publicadas del post */}
            <View >


                <View key={index} style={{ width: '100%', backgroundColor: 'red' }}>
                    <Image source={{ uri: item.imgPost }} style={globalStyle.img} />
                </View>


                <View style={[globalStyle.container, globalStyle.containerLike]}>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={globalStyle.imgMargin} onPress={() => LikeButtonInfo(dataPerfil, item, isLikeTrue)}>
                            {
                                (isLike.like) ? <AntDesign name="heart" size={24} color="red" /> : <Image source={require('../assets/icons/Like.png')} />
                            }


                        </TouchableOpacity>

                        <TouchableOpacity style={globalStyle.imgMargin}>
                            <Image source={require('../assets/icons/Comment.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={globalStyle.imgMargin}>
                            <Image source={require('../assets/icons/Message.png')} />
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity>
                        <Image source={require('../assets/icons/Save.png')} />
                    </TouchableOpacity>

                </View>

                <View style={[globalStyle.container]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity>
                            <Image
                                source={{ uri: item.avatar }}
                            />
                        </TouchableOpacity>
                        <Text style={globalStyle.txtComen}> Liked by </Text>
                        <Text style={[globalStyle.txtComen, { fontWeight: '900' }]}>craig_love </Text>
                        <Text style={globalStyle.txtComen}>and </Text>
                        <Text style={[globalStyle.txtComen, { fontWeight: '900' }]}> 44,686 others </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[globalStyle.txtComen, { fontWeight: '900' }]}> {dataPerfil.userName} </Text>
                        <Text style={globalStyle.txtComen}> {item.decrpImg}</Text>
                    </View>
                </View>


            </View>
        </ View>
    )
}



