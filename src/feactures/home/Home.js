import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dataPerfil: '',
    dataHomePost: [],
    getStory: []
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getDataProfile: (state, action) => {
            const token = AsyncStorage.getItem('@token');
            if (token) {
                state.dataPerfil = action.payload;
            } else {
                state.dataPerfil = initialState;
            }

        },
        getDataHomePost: (state, action) => {
            const token = AsyncStorage.getItem('@token');

            if (token) {
                state.dataHomePost.push(action.payload);
            } else {
                state.dataHomePost = initialState;
            }
            state.dataHomePost.push(action.payload);
        },
        getItemStory: (state, action) => {
            const token = AsyncStorage.getItem('@token');

            if (token) {
                state.getStory.push(action.payload);
            } else {
                state.getStory = initialState;
            }
        }
    }
})


export const { getDataProfile, getDataHomePost, getItemStory } = homeSlice.actions;
export default homeSlice.reducer;