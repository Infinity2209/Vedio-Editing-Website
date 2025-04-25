'use client';

import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import VideoEditor from './components/video-editor/VideoEditor';

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen bg-slate-900 py-5">
        <VideoEditor />
      </main>
    </Provider>
  );
}
