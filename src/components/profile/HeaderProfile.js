import React from 'react'
import { View } from 'react-native'
import { InfoProfile } from './InfoProfile'
import { StoryProfile } from './StoryProfile'

export const HeaderProfile = () => {
    return (
        <View>
            <InfoProfile />
            <StoryProfile />
        </View>
    )
}
