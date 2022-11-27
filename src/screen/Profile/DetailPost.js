
import { View, FlatList, } from 'react-native';
import { useSelector } from 'react-redux';

import { RenderItemPostComponent } from '../../components/profile/RenderItemPostComponent';




export const DetailPost = () => {

    const { dataPerfil, dataPerfilPost, ListLikeUser } = useSelector(state => state.profile);

    // console.log(ListLikeUser);

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




