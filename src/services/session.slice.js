import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionInformation: {}
        },
        reducers: {
        sessionInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { sessionInfo } = sessionSlice.actions;

export const sessionData = (state) => state.session;

export default sessionSlice.reducer;