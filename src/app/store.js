import { configureStore } from "@reduxjs/toolkit";


import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import gameSlice from "../services/game.slice";

import thunk from 'redux-thunk';

const reducers = combineReducers({
    game: gameSlice 
})

const persistConfig = {
    key: 'root',
    storage,
}
    
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});