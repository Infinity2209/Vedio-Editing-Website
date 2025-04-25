import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    overlays: []
};

export const overlaySlice = createSlice({
    name: 'overlay',
    initialState,
    reducers: {
        addOverlay: (state, action) => {
            state.overlays.push(action.payload);
        },

        updateOverlay: (state, action) => {
            const { id, changes } = action.payload;
            const overlayIndex = state.overlays.findIndex(o => o.id === id);

            if (overlayIndex !== -1) {
                state.overlays[overlayIndex] = {
                    ...state.overlays[overlayIndex],
                    ...changes
                };
            }
        },

        removeOverlay: (state, action) => {
            state.overlays = state.overlays.filter(o => o.id !== action.payload);
        }
    }
});

export const {
    addOverlay,
    updateOverlay,
    removeOverlay
} = overlaySlice.actions;

export default overlaySlice.reducer;
