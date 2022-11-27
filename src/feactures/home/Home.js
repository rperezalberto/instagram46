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
            state.dataPerfil = action.payload;
        },
        getDataHomePost: (state, action) => {
            state.dataHomePost.push(action.payload);
        },
        getItemStory: (state, action) => {
            state.getStory.push(action.payload);
        },
        resetData: (state) => {
            state.dataPerfil = "";
            state.dataHomePost = [];
            state.getStory = [];
        }
    }
})


export const { getDataProfile, getDataHomePost, getItemStory, resetData } = homeSlice.actions;
export default homeSlice.reducer;