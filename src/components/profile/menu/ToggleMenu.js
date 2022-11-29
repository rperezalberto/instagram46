import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colores } from '../../../theme/colores';
import { Ionicons } from '@expo/vector-icons';
import { globalStyle } from '../../../theme/globalStyle';
import { useDispatch } from 'react-redux';
import { signOutSession } from '../../../feactures/profile/profile';
// import { signOut } from '../../feactures/auth/authSlice';
// import { openToggle, openToggleAdd } from '../../feactures/perfil/perfilSlice';



export const ToggleMenu = () => {

    const dispatch = useDispatch();
    const dispatchToggle = useDispatch();

    return (
        <View style={styles.container}>

            <View style={[globalStyle.bgBotonToggle]}></View>

            <ScrollView style={styles.itemList}>
                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='ios-settings-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Configuracion</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='flag-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Tu Actividad</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='newspaper-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Archvio</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='qr-code-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Codigo QR</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='bookmark-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Guradar</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='ios-medical-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Mejores amigos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='md-star-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Favorito</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continaerTouchab}>
                    <Ionicons name='ios-fitness-outline' size={24} color={colores.white} />
                    <Text style={styles.txtTitle}>Centro de informacion COVID-19</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.continaerTouchab} onPress={() => {
                    dispatch(signOutSession());
                }}>
                    <Ionicons name="lock-closed-outline" size={24} color="black" />
                    <Text style={styles.txtTitle}>Salir</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: colores.black,
        zIndex: 2,
        // paddingHorizontal: 10,
        // paddingTop: 5
    },
    continaerTouchab: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    itemList: {
        flex: 1,
        marginTop: 10,
        padding: 5
    },
    txtTitle: {
        fontSize: 16,
        color: colores.white,
        marginHorizontal: 10
    }
})