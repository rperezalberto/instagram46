import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import PhotoEditor from "@baronha/react-native-photo-editor";
import { LoadImg } from '../../util/util';
import { colores } from '../../theme/colores';

export const EditPhotoStory = (result) => {
    const ulrImg = result.route.params.uri;



    return (
        <View style={{ flex: 1, backgroundColor: colores.black }}>
            <View>
                <Image
                    style={{ width: 400, height: 400 }}
                    source={{ uri: ulrImg }}
                />
            </View>

            <View>
                <TextInput
                    placeholder='Añade un comentario...'
                    placeholderTextColor={colores.white}
                />
            </View>


        </View>
    )
}


const styles = StyleSheet.create({

})