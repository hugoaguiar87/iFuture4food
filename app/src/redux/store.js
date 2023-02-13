import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import tokenReducer from "./reducers/tokenReducer";
import cartReducer from "./reducers/cartReducer";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducers = combineReducers({
    configToken: tokenReducer,
    configCart: cartReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: {
        reducer: persistedReducer
    },
    middleware: [thunk]
});

export const persistor = persistStore(store);