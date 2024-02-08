import { createSlice } from '@reduxjs/toolkit';

export const worldSlice = createSlice({
    name: 'gaworldme',
    initialState: {
        worldInformation: {}
        },
        reducers: {
        worldInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { worldInfo } = worldSlice.actions;

export const worldData = (state) => state.world;

export default worldSlice.reducer;