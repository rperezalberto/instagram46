import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { firestoreCon } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { StoryHome } from '../../components/home/StoryHome';
import { getDataHomePost, getgetDataStory } from '../../feactures/home/Home';
// import { RenderItemPostComponent } from '../../util/RenderItemPostComponent';
import { RenderItemHome } from '../../util/RenderItemHome';
import { ActivityLoand } from '../util/ActivityLoand';
import { colores } from '../../theme/colores';


export const HomeScreen = () => {

    const { getDataHomePostValue } = useSelector(state => state.home);
    const [isLoad, setIsLoad] = useState(false);
    // const { dataPerfil } = useSelector(state => state.profile);

    const { token } = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [dataHome, setDataHome] = useState();


    // console.log(dataHome);
    const getDataHome = async () => {
        const querySnapshot = await getDocs(collection(firestoreCon, 'usuario'));
        querySnapshot.forEach(item => {
            const data = item.data();
            getHomePost(data.id);
        })
        setIsLoad(false);
    }


    const getHomePost = async (id) => {
        const dfRef = await getDocs(collection(firestoreCon, 'usuario', id, 'post'));
        dfRef.forEach(items => {
            const data = items.data(data);
            dispatch(getDataHomePost(data));
            // getHomePostExit(id, data);
        })
    }




    useEffect(() => {
        getDataHome();
    }, [])


    const storyHome = useMemo(() => <StoryHome />, [])

    // const homeItem = useMemo(() => <RenderItemHome item={item} index={index} />, []);

    if (isLoad) return <ActivityLoand />

    return (
        <View style={[styles.container, { backgroundColor: colores.white }]}>
            <FlatList
                data={getDataHomePostValue}
                ListHeaderComponent={storyHome}
                keyExtractor={item => item.imgPost}
                renderItem={({ item, index }) => <RenderItemHome item={item} index={index} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginVertical: 20,
    }
})
