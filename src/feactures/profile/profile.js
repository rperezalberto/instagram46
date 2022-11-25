import { createSlice } from '@reduxjs/toolkit';
import { signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authCon } from '../../firebase/config';



const initialState = {
    id: '',
    email: '',
    likeId: '',
    ListLikeUser: '',
    token: null,
    dataPerfil: "",
    dataPerfilPost: []
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        restoreToke: (state, action) => {
            state.token = action.payload;
        },

        getEmail: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        },

        getDataPerfil: (state, action) => {
            state.dataPerfil = action.payload;
        },

        getDataPostProfile: (state, action) => {
            state.dataPerfilPost.push(action.payload);
        },

        likePostInfo: (state, action) => {
            state.likeId = action.payload;
        },

        listLikeDataInfo: (state, action) => {
            state.ListLikeUser = action.payload;
        },

        // Salir de la session
        signOutSession: (state, action) => {
            state.token = null;
            AsyncStorage.removeItem('@token');
            state.dataUserLogin = {}
            state.dataPerfilPost = [];

            signOut(authCon)
                .then(() => {
                    // console.log('Cerrando');
                }).catch((error) => {
                    console.log(error);
                });
        },
    }
})


export const { restoreToke, getDataPerfil, getEmail, getDataPostProfile, listLikeDataInfo, likePostInfo, signOutSession } = profileSlice.actions;
export default profileSlice.reducer;