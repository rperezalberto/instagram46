import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchScreen } from '../screen/search/SearchScreen';
import { SharedScreen } from '../screen/shared/SharedScreen';
import { FollowingScreen } from '../screen/follow/FollowingScreen';
import { StackProfile } from './PerfilNavigation/StackProfile';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyle } from '../theme/globalStyle';
import { StackHome } from './homeNavigation/StackHome';
import { getDataPofileInfo } from '../feactures/home/Home';


const Tabs = createBottomTabNavigator();

export const TabsNavigation = () => {

    const { dataPerfil } = useSelector(state => state.profile);
    const dispatch = useDispatch();


    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerStyle: {
                    elevation: 1,
                    shadowOpacity: 10,
                },

            }}
        >
            <Tabs.Screen
                name="StackHome"
                component={StackHome}
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            dispatch(getDataPofileInfo('reset'));
                            return <Image source={require('../assets/icons/HomeBlack.png')} />
                        } else {
                            dispatch(getDataPofileInfo('reset'));
                            return <Image source={require('../assets/icons/home.png')} />
                        }
                    }

                }}
            />

            <Tabs.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (focused)
                        ?
                        <Image source={require('../assets/icons/SearchBlack.png')} />
                        :
                        <Image source={require('../assets/icons/search.png')} />
                }}
            />

            <Tabs.Screen
                name='Shared'
                component={SharedScreen}
                options={{
                    tabBarIcon: ({ focused }) => (focused)
                        ?
                        <Image source={require('../assets/icons/VideoBlack.png')} />
                        :
                        <Image source={require('../assets/icons/VideoBlack.png')} />
                }}
            />

            <Tabs.Screen
                name='Following'
                component={FollowingScreen}
                options={{
                    tabBarIcon: ({ focused }) => (focused)
                        ?
                        <Image source={require('../assets/icons/LikeBlack.png')} />
                        :
                        <Image source={require('../assets/icons/Like.png')} />
                }}
            />

            <Tabs.Screen
                name='StackProfile'
                component={StackProfile}
                options={{
                    headerShown: false,
                    tabBarIcon: (({ focused }) => {
                        if (dataPerfil.avatar) {
                            dispatch(getDataPofileInfo('reset'));
                            return <Image source={{ uri: dataPerfil.avatar }} style={{ width: 30, height: 30, borderRadius: 100 }} />
                        } else {
                            if (focused) {
                                return <Image source={require('../assets/icons/ProfileBlack.png')} style={globalStyle.icon} />
                            } else {
                                return <Image source={require('../assets/icons/Profile.png')} style={globalStyle.icon} />
                            }
                        }
                    })
                }}
            />


        </Tabs.Navigator>
    )
}


const styles = StyleSheet.create({
    headerImg: {

    }
});