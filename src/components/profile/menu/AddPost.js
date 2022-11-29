import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colores } from '../../../theme/colores';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalStyle } from '../../../theme/globalStyle';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import { LoadImg } from '../../util/util';


export const AddPost = () => {

    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);

    const navigation = useNavigation();



    const camaraPicker = async () => {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

        let permission = await ImagePicker.getCameraPermissionsAsync();


        if (permission.status === 'granted') {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                // aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                navigation.navigate('PreViewPhotoPost', result);
            }
        }

    }



    const pickerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [8, 8],
            quality: 1,
        })

        if (!result.cancelled) {
            navigation.navigate('PreViewPhotoPost', result);
        }
    }



    return (
        <View style={styles.continaer}>

            <TouchableOpacity style={[styles.containerICon, globalStyle.container]} onPress={camaraPicker}>
                <MaterialCommunityIcons name="movie-play-outline" size={24} color={colores.white} />
                <Text style={styles.txtTitle}>Reel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.containerICon, globalStyle.container]} onPress={pickerImage}>
                <MaterialCommunityIcons name="apps" size={24} color={colores.white} />
                <Text style={styles.txtTitle}>Publicacion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.containerICon, globalStyle.container]}>
                <MaterialCommunityIcons name="text-box-plus-outline" size={24} color={colores.white} />
                <Text style={styles.txtTitle}>Historia</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.containerICon, globalStyle.container]}>
                <MaterialCommunityIcons name="broadcast" size={24} color={colores.white} />
                <Text style={styles.txtTitle}>Video en Vivo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.containerICon, globalStyle.container]}>
                <MaterialCommunityIcons name="format-list-text" size={24} color={colores.white} />
                <Text style={styles.txtTitle}>Guia</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    continaer: {
        height: '100%',
        backgroundColor: colores.black
    },
    containerICon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13
    },
    txtTitle: {
        fontSize: 16,
        color: colores.white,
        marginHorizontal: 10
    }
})
