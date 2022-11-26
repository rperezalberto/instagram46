import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestoreCon } from '../../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { StoryHome } from '../../components/home/StoryHome';
import { getDataHomePost } from '../../feactures/home/Home';

export const HomeScreen = () => {

    const { dataHomePost } = useSelector(state => state.home);
    const dispatch = useDispatch();

    // const [dataHome, setDataHome] = useState([]);


    const getDataHome = () => {
        onSnapshot(collection(firestoreCon, 'usuario'), (document) => {
            document.forEach(doc => {
                // setDataHome(doc.data());
                dispatch(getDataHomePost(doc.data()));
            })
        })
    }


    useEffect(() => {
        getDataHome();
    }, [])


    const storyHome = useMemo(() => <StoryHome />, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={dataHomePost}
                ListHeaderComponent={storyHome}
                renderItem={() => <Text>Hola Mundo</Text>}
                keyExtractor={item => item.createAt}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginVertical: 20,
    }
})
