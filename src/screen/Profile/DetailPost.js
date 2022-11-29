
import { View, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';
import { globalStyle } from '../../theme/globalStyle';
import { RenderItemPostComponent } from '../../util/RenderItemPostComponent';





export const DetailPost = () => {

    const { dataPerfil, dataPerfilPost } = useSelector(state => state.profile);

    return (
        <View style={globalStyle.backgroundView}>
            <FlatList
                data={dataPerfilPost}
                keyExtractor={item => item.imgPost}
                renderItem={({ item, index, separators }) => <RenderItemPostComponent item={item} index={index} dataPerfil={dataPerfil} />}
            />
        </View>
    )
}




