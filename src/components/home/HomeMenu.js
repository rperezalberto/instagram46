import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { globalStyle } from '../../theme/globalStyle'

export const HomeMenu = () => {
    return (
        <View style={globalStyle.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.space}>
                    <Image source={require('../../assets/icons/add.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.space}>
                    <Image source={require('../../assets/icons/LikeMenu.png')} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../../assets/icons/msg.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    space: {
        marginRight: 10
    }
})