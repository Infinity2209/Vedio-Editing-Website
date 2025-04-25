import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Clip {
  id: string;
  name?: string;
  duration: number;
  thumbnail?: string;
}

interface VideoState {
  videos: string[]; // list of video URLs or IDs
  videoClips: Clip[];
  selectedClipId: string | null;
  currentTime: number;
  duration: number;
}

const initialState: VideoState = {
  videos: [],
  videoClips: [],
  selectedClipId: null,
  currentTime: 0,
  duration: 0,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    addVideo(state, action: PayloadAction<string>) {
      state.videos.push(action.payload);
    },
    removeVideo(state, action: PayloadAction<string>) {
      state.videos = state.videos.filter(video => video !== action.payload);
    },
    setVideoClips(state, action: PayloadAction<Clip[]>) {
      state.videoClips = action.payload;
    },
    moveClip(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
      const { fromIndex, toIndex } = action.payload;
      const [movedClip] = state.videoClips.splice(fromIndex, 1);
      state.videoClips.splice(toIndex, 0, movedClip);
    },
    selectClip(state, action: PayloadAction<string | null>) {
      state.selectedClipId = action.payload;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
  },
});

export const { addVideo, removeVideo, setVideoClips, moveClip, selectClip, setCurrentTime, setDuration } = videoSlice.actions;
export default videoSlice.reducer;
