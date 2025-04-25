import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
  volume: number;
  isMuted: boolean;
  type: string;
}

interface AudioState {
  audioTracks: AudioTrack[];
}

const initialState: AudioState = {
  audioTracks: [],
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addAudioTrack(state, action: PayloadAction<AudioTrack>) {
      state.audioTracks.push(action.payload);
    },
    updateAudioTrack(state, action: PayloadAction<{ id: string; changes: Partial<AudioTrack> }>) {
      const { id, changes } = action.payload;
      const track = state.audioTracks.find(t => t.id === id);
      if (track) {
        Object.assign(track, changes);
      }
    },
    removeAudioTrack(state, action: PayloadAction<string>) {
      state.audioTracks = state.audioTracks.filter(t => t.id !== action.payload);
    },
  },
});

export const { addAudioTrack, updateAudioTrack, removeAudioTrack } = audioSlice.actions;
export default audioSlice.reducer;
