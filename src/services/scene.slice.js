import { createSlice } from '@reduxjs/toolkit';

export const sceneSlice = createSlice({
    name: 'scene',
    initialState: {
        sceneInformation: {}
        },
        reducers: {
        sceneInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { sceneInfo } = sceneSlice.actions;

export const sceneData = (state) => state.scene;

export default sceneSlice.reducer;