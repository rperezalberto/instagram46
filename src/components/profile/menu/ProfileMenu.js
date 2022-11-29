import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../../theme/colores';
import { globalStyle } from '../../../theme/globalStyle';
import { useDispatch } from 'react-redux';
import { openToggle, openToggleAdd } from '../../../feactures/profile/profile';

export const ProfileMenu = () => {

    const dispatch = useDispatch();


    return (
        <View>
            <View style={[globalStyle.container, styles.contianer]}>

                <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => dispatch(openToggleAdd(true))}>
                    <Ionicons name="add" size={32} color={colores.black} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => dispatch(openToggle(true))}>
                    <Image source={require('../../../assets/icons/Menu.png')} />
                </TouchableOpacity>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    contianer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
