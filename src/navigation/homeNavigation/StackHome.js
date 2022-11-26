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


const Stack = createStackNavigator();

// const navigation = useNavigation();

export const StackHome = () => {


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
        </Stack.Navigator>
    )
}