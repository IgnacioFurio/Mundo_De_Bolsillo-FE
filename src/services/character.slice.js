import { createSlice } from '@reduxjs/toolkit';

export const characterSlice = createSlice({
    name: 'character',
    initialState: {
        characterInformation: {}
        },
        reducers: {
        characterInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { characterInfo } = characterSlice.actions;

export const characterData = (state) => state.character;

export default characterSlice.reducer;