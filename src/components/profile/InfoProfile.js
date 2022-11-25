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
                    <View style={styles.avatarGrey}>
                        <View style={styles.avatarWhite}>
                            {
                                (dataPerfil.avatar) ? <Image
                                    style={globalStyle.avatarImg}
                                    source={{ uri: dataPerfil.avatar }}
                                />
                                    : <IconAvatar name={'user'} size={50} color={colores.grey} />
                            }

                        </View>
                    </View>
                    <View style={styles.contInfo}>
                        <Text style={styles.txtNum}>{lengthPost}</Text>
                        <Text style={styles.txtInfoNum}>Publicaciones</Text>
                    </View>

                    <View style={styles.contInfo}>
                        <Text style={styles.txtNum}>834</Text>
                        <Text style={styles.txtInfoNum}>Seguidores</Text>
                    </View>

                    <View style={styles.contInfo}>
                        <Text style={styles.txtNum}>162</Text>
                        <Text style={styles.txtInfoNum}>Seguidos</Text>
                    </View>
                </View>


                <View style={{ marginVertical: 10 }}>
                    <Text style={globalStyle.txtNameAvatar}>{(dataPerfil.userName) ? dataPerfil.userName : emailName}</Text>
                    <Text>{(dataPerfil.bio) ? dataPerfil.bio : emailName}</Text>
                </View>


                <TouchableOpacity style={styles.btnEdit} onPress={() => navigator.navigate('EdictInfoProfile')}>
                    <Text style={styles.txtBtn}>Editar Perfil</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    avatarGrey: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: colores.grey,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarWhite: {
        width: 96,
        height: 96,
        backgroundColor: colores.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contInfo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtNum: {
        fontSize: 16,
        fontWeight: '900',
        color: colores.black
    },
    txtInfoNum: {
        fontSize: 13,
        fontWeight: '400',
        color: colores.black
    },
    btnEdit: {
        height: 29,
        borderColor: colores.grey,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBtn: {
        fontSize: 13,
        fontWeight: '900',
        lineHeight: 18,
    }
})