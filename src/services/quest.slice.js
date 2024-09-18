import { createSlice } from '@reduxjs/toolkit';

export const questSlice = createSlice({
    name: 'quest',
    initialState: {
        questInformation: {}
        },
        reducers: {
        questInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { questInfo } = questSlice.actions;

export const questData = (state) => state.location;

export default questSlice.reducer;