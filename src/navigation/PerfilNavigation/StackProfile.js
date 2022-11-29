import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileMenu } from '../../components/profile/menu/ProfileMenu';
import { EdictInfoProfile } from '../../screen/Profile/EdictInfoProfile';
import { ProfileScrren } from '../../screen/Profile/ProfileScrren';
import { colores } from '../../theme/colores';
import { globalStyle } from '../../theme/globalStyle';
import { Ionicons } from '@expo/vector-icons';
import { DetailPost } from '../../screen/Profile/DetailPost';


const Stack = createStackNavigator();

export const StackProfile = ({ navigation }) => {


    const { dataPerfil, email } = useSelector(state => state.profile);

    const dispatch = useDispatch();

    const emailName = email.slice(0, email.indexOf('@'));


    return (
        <Stack.Navigator>
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScrren}
                options={{
                    title: (dataPerfil.userName) ? dataPerfil.userName : emailName,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: '900',
                    },
                    headerRight: () => <ProfileMenu />,

                }}
            />

            <Stack.Screen
                name="EdictInfoProfile"
                component={EdictInfoProfile}
                options={{
                    title: "Editar perfil",
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: '900',
                    },

                    headerLeft: () => (
                        <TouchableOpacity style={globalStyle.container} onPress={() => navigation.navigate('ProfileScreen')}>
                            <Ionicons name="close" size={32} color={colores.black} />
                        </TouchableOpacity>
                    ),

                    headerRight: () => (
                        <TouchableOpacity style={globalStyle.container}>
                            <Ionicons name="checkmark" size={32} color={colores.blue} />
                        </TouchableOpacity>
                    )

                }}
            />
            <Stack.Screen
                name="DetailPost"
                component={DetailPost}
                options={{ title: 'Publicaciónes' }}
            />

        </Stack.Navigator>
    )
}


