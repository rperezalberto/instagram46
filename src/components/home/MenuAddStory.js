import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyle } from '../../theme/globalStyle';
import { colores } from '../../theme/colores';


export const MenuAddStory = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={[globalStyle.container, { marginTop: 5 }]} onPress={() => navigation.navigate('Home')} >
            <Ionicons name="close" size={36} color={colores.white} />
        </TouchableOpacity>
    )
}
