import { useState, useEffect } from 'react';
import { Input } from '@rneui/themed';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colores } from '../../theme/colores';
import { globalStyle } from '../../theme/globalStyle';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { signIng } from '../../feactures/auth/Auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { authCon, firestoreCon } from '../../firebase/config';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ActivityLoand } from '../util/ActivityLoand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getEmail, restoreToke } from '../../feactures/profile/profile';



export const SignInScrren = ({ navigation }) => {


    const [whatch, setWhacth] = useState(true);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const dispatch = useDispatch();

    const [isLoad, setIsLoad] = useState(false);


    // Iniciar Session 
    const SignIn = async () => {
        setIsLoad(true)


        await signInWithEmailAndPassword(authCon, email, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                AsyncStorage.setItem('@token', user.uid);
                dispatch(restoreToke(user.uid));
            })
            .catch((error) => {
                console.log(error);
                alert(error);
                setIsLoad(false);
            });

        setIsLoad(false);
    }


    // Creamos los datos del usurio cuando se logea
    const getUserFromDatabase = async (authSignIn) => {
        const docRef = doc(firestoreCon, 'usuario', authSignIn.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return;
        } else {
            await setDoc(docRef, authSignIn);
        }
    }



    const getValue = async () => {
        const value = await AsyncStorage.getItem('@token');

        try {
            if (value !== null) {
                dispatch(restoreToke(value))
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {

        // Usuario registrado
        onAuthStateChanged(authCon, async user => {
            if (user) {
                const authSignIn = {
                    id: user.uid,
                    email: user.email,
                    createAt: user.metadata.creationTime
                }
                dispatch(signIng(authSignIn));
                getUserFromDatabase(authSignIn);
                dispatch(getEmail({ email: user.email, id: user.uid }));
            }
        })
        getValue();
    }, []);




    if (isLoad) return <ActivityLoand />


    return (
        <View style={{ ...globalStyle.containerGlobal, flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ marginBottom: 40 }}>
                <Image
                    source={require('../../assets/icons/logoHome.png')}
                />
            </View>


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

            <TouchableOpacity style={styles.restPass}>
                <Text style={styles.txtRestPass}>¿Se te olvidó tu contraseña?</Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ ...globalStyle.btnLogin, marginVertical: 20 }} onPress={() => SignIn()}>
                <Text style={globalStyle.txtBtnLogin}>iniciar sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerFb}>
                <Image source={require('../../assets/icons/IconFacebook.png')} />
                <Text style={styles.txtFb}>Iniciar con Facebook</Text>
            </TouchableOpacity>


            <View style={styles.containerLine}>
                <View style={styles.orLine}></View>
                <Text style={styles.txtLine}>O</Text>
                <View style={styles.orLine}></View>
            </View>


            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.txtCuenta}>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={{ ...styles.txtCuenta, color: colores.blue }}>Registrate</Text>
                </TouchableOpacity>
            </View>

            <View style={globalStyle.footerAuth}>
                <Text style={globalStyle.txtFooterAuth}>Instagram от Facebook</Text>
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
    },
    restPass: {
        alignSelf: 'flex-end',
    },
    txtRestPass: {
        color: colores.blue,
        fontSize: 12,
        fontWeight: '500'
    },
    containerFb: {
        flexDirection: 'row'
    },
    txtFb: {
        color: colores.blue,
        fontSize: 14,
        fontWeight: '900',
        marginHorizontal: 5
    },

    containerLine: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        marginVertical: 40,
        alignItems: 'center'
    },

    orLine: {
        backgroundColor: colores.greyLine,
        width: '46%',
        height: 1,
        // paddingHorizontal: 50
    },
    txtLine: {
        color: colores.grey,
        fontSize: 12,
        fontWeight: '900',
        marginHorizontal: 10
    },
    txtCuenta: {
        color: colores.grey,
        fontSize: 14,
        fontWeight: '400',
        marginHorizontal: 3
    },
})