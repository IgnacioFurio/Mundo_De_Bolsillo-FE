import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        locationInformation: {}
        },
        reducers: {
        locationInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { locationInfo } = locationSlice.actions;

export const locationData = (state) => state.location;

export default locationSlice.reducer;