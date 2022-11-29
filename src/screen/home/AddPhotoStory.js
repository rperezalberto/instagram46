import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { colores } from '../../theme/colores';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export const AddPhotoStory = () => {

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
                navigation.navigate('EditPhotoStory', result);
            }
        }

    }




    const albumPicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            navigation.navigate('EditPhotoStory', result);
        }
    }



    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: colores.black }}>
            <StatusBar style='light' />
            <TouchableOpacity style={styles.containerPhoto} onPress={() => camaraPicker()}>
                <View style={styles.containerCamera}>
                    <MaterialIcons name="add-a-photo" size={32} color={colores.white} />
                </View>
                <View style={styles.contianerTxt}>
                    <Text style={styles.txt}>Cámara</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerPhoto} onPress={() => albumPicker()}>
                <View style={styles.containerCamera}>
                    <MaterialIcons name="add-photo-alternate" size={32} color={colores.white} />
                </View>
                <View style={styles.contianerTxt}>
                    <Text style={styles.txt}>Album</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    containerPhoto: {
        width: '50%',
        height: 300,
        backgroundColor: '#181818',
        marginHorizontal: 2
    },
    containerCamera: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    contianerTxt: {
        position: 'absolute',
        bottom: 0,
        margin: 15,
    },
    txt: {
        color: colores.white,
        fontSize: 18,
        fontWeight: '700'
    }
})