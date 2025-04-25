import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Border {
  width: number;
  color: string;
  radius: number;
}

interface Overlay {
  id: string;
  name: string;
  url: string;
  position: Position;
  size: Size;
  opacity: number;
  border: Border;
  rotation: number;
  zIndex: number;
}

interface OverlayState {
  overlays: Overlay[];
}

const initialState: OverlayState = {
  overlays: [],
};

const overlaySlice = createSlice({
  name: 'overlay',
  initialState,
  reducers: {
    addOverlay(state, action: PayloadAction<Overlay>) {
      state.overlays.push(action.payload);
    },
    updateOverlay(state, action: PayloadAction<{ id: string; changes: Partial<Overlay> }>) {
      const { id, changes } = action.payload;
      const overlay = state.overlays.find(o => o.id === id);
      if (overlay) {
        Object.assign(overlay, changes);
      }
    },
    removeOverlay(state, action: PayloadAction<string>) {
      state.overlays = state.overlays.filter(o => o.id !== action.payload);
    },
  },
});

export const { addOverlay, updateOverlay, removeOverlay } = overlaySlice.actions;
export default overlaySlice.reducer;
