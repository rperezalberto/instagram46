import { createStackNavigator } from '@react-navigation/stack';
import { SignInScrren } from '../screen/auth/SignInScrren';
import { SignUpScreen } from '../screen/auth/SignUpScreen';
import { colores } from '../theme/colores';

const Stack = createStackNavigator();


export const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                title: '',
                headerShown: false,
                headerTintColor: colores.black,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0
                }
            }}
        >
            <Stack.Screen
                name='SignInScrren'
                component={SignInScrren}
            />

            <Stack.Screen
                name='SignUp'
                component={SignUpScreen}
            />

        </Stack.Navigator>
    )
}