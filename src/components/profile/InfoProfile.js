import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { IconAvatar } from '../../util/util';
import { colores } from '../../theme/colores';
import { globalStyle } from '../../theme/globalStyle';
import { useNavigation } from '@react-navigation/native';



export const InfoProfile = () => {


    const [isLoad, setIsLoad] = useState(false);

    const { dataPerfil, dataPerfilPost, email } = useSelector(state => state.profile);

    const lengthPost = dataPerfilPost.length;

    const emailName = email.slice(0, email.indexOf('@'));

    useEffect(() => {
        email.email ? setIsLoad(true)
            : setIsLoad(false)

    }, []);

    const navigator = useNavigation()


    if (isLoad) return <ActivityLoand />

    return (
        <View >
            {/* <Image source={require()} /> */}
            <View style={[globalStyle.container, { backgroundColor: colores.white }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={globalStyle.avatarGrey}>
                        <View style={globalStyle.avatarWhite}>
                            {
                                (dataPerfil.avatar) ? <Image
                                    style={globalStyle.avatarImg}
                                    source={{ uri: dataPerfil.avatar }}
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
                        <Text style={globalStyle.txtNum}>834</Text>
                        <Text style={globalStyle.txtInfoNum}>Seguidores</Text>
                    </View>

                    <View style={globalStyle.contInfo}>
                        <Text style={globalStyle.txtNum}>162</Text>
                        <Text style={globalStyle.txtInfoNum}>Seguidos</Text>
                    </View>
                </View>


                <View style={{ marginVertical: 10 }}>
                    <Text style={globalStyle.txtNameAvatar}>{(dataPerfil.userName) ? dataPerfil.userName : emailName}</Text>
                    <Text>{(dataPerfil.bio) ? dataPerfil.bio : emailName}</Text>
                </View>


                <TouchableOpacity style={globalStyle.btnEdit} onPress={() => navigator.navigate('EdictInfoProfile')}>
                    <Text style={globalStyle.txtBtn}>Editar Perfil</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


