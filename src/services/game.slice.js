import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        gameInformation: {}
        },
        reducers: {
        gameInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { gameInfo } = gameSlice.actions;

export const gameData = (state) => state.game;

export default gameSlice.reducer;