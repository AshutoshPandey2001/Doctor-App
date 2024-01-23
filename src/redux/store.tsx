import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import uiReducer from './action/UiSlice';
import userReducer from './action/UserSlice';
import patientsReducer from './action/PatientsSlice';


const rootReducer = combineReducers({
    ui: uiReducer,
    user: userReducer,
    patients: patientsReducer
});

const persistConfig = {
    key: 'root', // key for AsyncStorage
    storage: AsyncStorage,
    whitelist: ['user', 'patients'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


