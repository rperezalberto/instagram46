
import { View, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';
import { RenderItemPostComponent } from '../../util/RenderItemPostComponent';





export const DetailPost = () => {

    const { dataPerfil, dataPerfilPost } = useSelector(state => state.profile);

    return (
        <View >
            <FlatList
                data={dataPerfilPost}
                keyExtractor={item => item.id}
                renderItem={({ item, index, separators }) => <RenderItemPostComponent item={item} index={index} dataPerfil={dataPerfil} />}
            />
        </View>
    )
}




