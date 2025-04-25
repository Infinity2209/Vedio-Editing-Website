import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubtitleStyle {
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  position: 'top' | 'middle' | 'bottom';
  align: 'left' | 'center' | 'right';
}

interface Subtitle {
  id: string;
  text: string;
  startTime: number;
  endTime: number;
  style: SubtitleStyle;
}

interface SubtitleState {
  subtitles: Subtitle[];
}

const initialState: SubtitleState = {
  subtitles: [],
};

const subtitleSlice = createSlice({
  name: 'subtitle',
  initialState,
  reducers: {
    addSubtitle(state, action: PayloadAction<Subtitle>) {
      state.subtitles.push(action.payload);
    },
    updateSubtitle(state, action: PayloadAction<{ id: string; changes: Partial<Subtitle> }>) {
      const { id, changes } = action.payload;
      const subtitle = state.subtitles.find(s => s.id === id);
      if (subtitle) {
        Object.assign(subtitle, changes);
      }
    },
    removeSubtitle(state, action: PayloadAction<string>) {
      state.subtitles = state.subtitles.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSubtitle, updateSubtitle, removeSubtitle } = subtitleSlice.actions;
export default subtitleSlice.reducer;
