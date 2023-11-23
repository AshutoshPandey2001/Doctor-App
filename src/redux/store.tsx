import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import uiReducer from './action/UiSlice';


const rootReducer = combineReducers({
    ui: uiReducer,
});

// const persistConfig = {
//     key: 'root', // key for AsyncStorage
//     storage: AsyncStorage,
//     whitelist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


