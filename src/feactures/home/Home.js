import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dataPerfil: '',
    getStory: [],
    isLike: '',
    getDataStory: [],
    getDataHomePostValue: [],
    geProfileActive: '',
    dataProfileInfo: [],

}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getDataProfile: (state, action) => {
            state.dataPerfil = action.payload;
        },
        getgetDataStory: (state, action) => {
            state.getDataStory.push(action.payload);
        },
        getItemStory: (state, action) => {
            state.getStory.push(action.payload);
        },
        getDataHomePost: (state, action) => {
            state.getDataHomePostValue.push(action.payload);
        },
        isLikePost: (state, action) => {
            state.isLike = action.payload;
        },
        getProfileActive: (state, action) => {
            state.geProfileActive = action.payload;
        },
        getDataPofileInfo: (state, action) => {
            if (action.payload === 'reset') {
                state.dataProfileInfo = [];
                state.geProfileActive = '';
            } else {
                state.dataProfileInfo.push(action.payload);
            }
        },
        resetData: (state) => {
            state.dataPerfil = "";
            state.getDataStory = [];
            state.getStory = [];
            state.getDataHomePostValue = [];
            state.dataProfileInfo = [];
        }
    }
})


export const {
    getDataProfile,
    getgetDataStory,
    getItemStory,
    resetData,
    getDataHomePost,
    getDataHomePostValue,
    isLikePost,
    getProfileActive,
    getDataPofileInfo } = homeSlice.actions;
export default homeSlice.reducer;