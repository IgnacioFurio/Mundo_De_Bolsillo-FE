import { configureStore } from "@reduxjs/toolkit";


import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//slices
import gameSlice from "../services/game.slice";
import worldSlice from "../services/world.slice";
import locationSlice from "../services/location.slice";
import characterSlice from "../services/character.slice";
import knowledgeSlice from "../services/knowledge.slice";

import thunk from 'redux-thunk';

const reducers = combineReducers({
    game: gameSlice,
    world: worldSlice,
    location: locationSlice,
    character: characterSlice,
    knowledge: knowledgeSlice
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