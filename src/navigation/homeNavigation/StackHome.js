import { Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { AddPhotoStory } from "../../screen/home/AddPhotoStory";
import { HomeScreen } from '../../screen/home/HomeScreen';
import { HomeMenu } from '../../components/home/HomeMenu';
import { globalStyle } from '../../theme/globalStyle';
import { colores } from '../../theme/colores';
import { MenuAddStory } from '../../components/home/MenuAddStory';
import { EditPhotoStory } from '../../components/home/EditPhotoStory';
import { StoryProgressive } from '../../components/home/StoryProgressive';
import { ProfileInfo } from '../../screen/home/ProfileInfo';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { getDataPofileInfo } from '../../feactures/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';



const Stack = createStackNavigator();


export const StackHome = ({ navigation }) => {

    const { geProfileActive } = useSelector(state => state.home);

    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            screenOptions={{
                // headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: "",
                    headerLeft: () => <Image source={require('../../assets/icons/logoHome.png')} style={globalStyle.container} />,
                    headerRight: () => <HomeMenu />,
                }}
            />

            <Stack.Screen
                name="AddPhotoStory"
                component={AddPhotoStory}
                options={{
                    title: 'Agregar a historia',
                    headerTitleAlign: 'center',
                    headerLeft: () => <MenuAddStory />,
                    headerTitleStyle: {
                        color: colores.white,
                    },
                    headerStyle: {
                        backgroundColor: colores.black,
                        elevation: 0,
                    }
                }}
            />


            <Stack.Screen
                name='EditPhotoStory'
                component={EditPhotoStory}
                options={{
                    title: 'Editar imagen',
                    headerTitleAlign: 'center',
                    headerLeft: () => <MenuAddStory />,
                    headerTitleStyle: {
                        color: colores.white,
                    },
                    headerStyle: {
                        backgroundColor: colores.black,
                        elevation: 0,
                    }
                }}
            />

            <Stack.Screen
                name='StoryProgressive'
                component={StoryProgressive}
                options={{
                    title: '',
                    headerTitleAlign: 'center',
                    headerLeft: () => <MenuAddStory />,
                    headerTitleStyle: {
                        color: colores.white,
                    },
                    headerStyle: {
                        backgroundColor: colores.black,
                        elevation: 0,
                    }
                }}
            />

            <Stack.Screen
                name='ProfileInfo'
                component={ProfileInfo}
                options={{
                    title: geProfileActive.userName,
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        return (
                            <View style={[globalStyle.container, { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                <TouchableOpacity style={{ marginRight: 20 }}>
                                    <Fontisto name="bell" size={24} color={colores.black} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Fontisto name="more-v-a" size={20} color={colores.black} />
                                </TouchableOpacity>
                            </View>
                        )
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity style={globalStyle.container} onPress={() => {
                                navigation.goBack();
                                dispatch(getDataPofileInfo('reset'));
                            }}>
                                <MaterialIcons name="arrow-back" size={24} color={colores.black} />
                            </TouchableOpacity>
                        )
                    }
                }}
            />

        </Stack.Navigator>
    )
}