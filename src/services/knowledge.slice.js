import { createSlice } from '@reduxjs/toolkit';

export const knowledgeSlice = createSlice({
    name: 'knowledge',
    initialState: {
        knowledgeInformation: {}
        },
        reducers: {
        knowledgeInfo: (state, action) => {
            return {
            ...state,
            ...action.payload
            }
        }
    }        
});

//export actions
export const { knowledgeInfo } = knowledgeSlice.actions;

export const knowledgeData = (state) => state.knowledge;

export default knowledgeSlice.reducer;