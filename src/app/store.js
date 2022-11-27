import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from '../feactures/auth/Auth';
import profileSlice from '../feactures/profile/profile';
import homeSlice from '../feactures/home/Home';

export const store = configureStore({
    reducer: combineReducers({
        auth: authSlice,
        profile: profileSlice,
        home: homeSlice
    })
});