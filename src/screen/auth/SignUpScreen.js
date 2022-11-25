import { useState } from 'react';
import { Input } from '@rneui/themed';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authCon } from '../../firebase/config';
import { colores } from '../../theme/colores';
import { globalStyle } from '../../theme/globalStyle';
import { AntDesign } from '@expo/vector-icons';
import { ActivityLoand } from '../util/ActivityLoand';



export const SignUpScreen = ({ navigation }) => {

    const [whatch, setWhacth] = useState(true);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const [isLoad, setIsLoad] = useState(false);

    const createUser = () => {
        if (email !== '' && pass !== '') {
            setIsLoad(true);
            createUserWithEmailAndPassword(authCon, email, pass)
                .then((userCredential) => {
                    setIsLoad(false);
                    // navigation.navigate('SignInScrren');
                })
        } else {
            alert("Los campos sin obligatorio");
            setIsLoad(false);
        }
    }



    if (isLoad) return <ActivityLoand />

    return (
        <View style={{ ...globalStyle.containerGlobal, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={{ marginBottom: 40 }}
                source={require('../../assets/icons/logoHome.png')}
            />

            <Input
                placeholder='Correo Eletronico'
                inputContainerStyle={styles.input}
                keyboardType="email-address"
                onChangeText={(e) => setEmail(e)}
            />
            <Input
                placeholder='Clave'
                inputContainerStyle={styles.input}
                secureTextEntry={whatch}
                onChangeText={(e) => setPass(e)}
                rightIcon={<View>
                    {
                        (!whatch) ?
                            <TouchableOpacity onPress={() => setWhacth(true)}>
                                <AntDesign name="eyeo" size={24} color={colores.blue} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={() => setWhacth(false)}>
                                <Image source={require('../../assets/icons/group.png')} />
                            </TouchableOpacity>
                    }
                </View>}
            />

            <TouchableOpacity style={globalStyle.btnLogin} onPress={() => createUser()}>
                <Text style={globalStyle.txtBtnLogin}>Registrar</Text>
            </TouchableOpacity>

            <View style={globalStyle.footerAuth}>
                <Text style={globalStyle.txtFooterAuth}>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignInScrren')}>
                    <Text style={{ ...globalStyle.txtFooterAuth, color: colores.blue, fontWeight: '900' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colores.greyLine,
        height: 44,
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: colores.grey,
        marginHorizontal: -10,
        borderWidth: 1,
        borderBottomWidth: 1,
    }
})