import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from "firebase/auth";
import { authCon } from '../../firebase/config';

const initialState = {
    dataUserLogin: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


        // Pasamos las informacion del usuario a la hora de hacer login
        signIng: (state, action) => {
            state.token = action.payload.id;

            state.dataUserLogin.id = action.payload.id;
            state.dataUserLogin.email = action.payload.email;
            state.dataUserLogin.createAt = action.payload.createAt;
        },

    }
})

export const { signIng } = authSlice.actions;
export default authSlice.reducer;