import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dataPerfil: '',
    dataHomePost: []
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
        }
    }
})


export const { getDataProfile, getDataHomePost } = homeSlice.actions;
export default homeSlice.reducer;