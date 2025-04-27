# Project Documentation

## Project Title and Overview
This is a video editor frontend application built with Next.js, React, Redux Toolkit, and Tailwind CSS. It provides features such as video upload, timeline editing, subtitles, image overlays, audio control, and exporting the edited video.

## Prerequisites and Installation Instructions
- Node.js (version 16 or higher recommended)
- npm (comes with Node.js) or yarn

### Installation Steps:
1. Clone the repository or download the source code.
2. Navigate to the project directory:
   ```bash
   cd video-editor-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

## Running the Application

### Development Mode
To start the development server with hot-reloading:
```bash
npm run dev
```
Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

### Production Mode
To build the application for production:
```bash
npm run build
```
To start the production server:
```bash
npm start
```

## Usage Instructions
- Upload videos using the upload section. Users can select video files in formats like MP4, WebM, MOV, and AVI. The app shows upload progress and a preview of the uploaded video.
- Edit the video timeline by adding, selecting, and moving video clips. The timeline supports zooming and shows time markers and current playback position.
- Add and manage subtitles with options to add new subtitles, edit text, set start and end times, and style subtitles. An auto-generate subtitle feature is planned.
- Add image overlays by uploading images (PNG, JPG, SVG). Users can adjust overlay properties such as position, size, opacity, rotation, and border styling.
- Control audio settings including enabling/disabling original audio, managing multiple audio tracks with volume and mute controls, and adding background music audio tracks.
- Export the final edited video with options to select format (MP4, MOV, WebM, GIF), resolution (480p to 4K), quality, and whether to include subtitles and overlays. The export process shows progress and estimated file size.

## Project Structure Overview
- `app/` - Contains the main Next.js app components and pages.
  - `page.tsx` - Main entry page rendering the VideoEditor component wrapped with Redux Provider.
  - `layout.tsx` - Root layout component importing global styles and rendering page content.
- `app/components/video-editor/` - Core video editor components implementing main features:
  - `VideoEditor.tsx` - Main video editor UI with tabs for Upload, Subtitles, Image Overlays, Export, and preview/timeline display.
  - `upload/UploadSection.tsx` - Handles video file uploads with progress and preview.
  - `subtitles/Subtitles.tsx` - Manages subtitle list, adding, editing, and styling subtitles.
  - `image-overlay/ImageOverlay.tsx` - Manages image overlays with upload and adjustment controls.
  - `export/Export.tsx` - Provides export options and progress for final video output.
  - `timeline/Timeline.tsx` - Displays and manages video clips and subtitles on a scalable timeline.
  - `audio/AudioControl.tsx` - Controls audio tracks, volume, mute, and background music.
  - Other supporting components for subtitles, overlays, timeline clips, preview, etc.
- `app/components/ui/` - Reusable UI components such as buttons, inputs, sliders, tabs, switches, labels, textareas, etc., used throughout the app for consistent styling and behavior.
- `app/lib/redux/` - Redux store setup and slices managing application state for video clips, subtitles, overlays, audio tracks, and UI overlays.
- `app/globals.css` - Global CSS styles including Tailwind CSS base, components, and utilities.
- `tailwind.config.js` - Configuration file for Tailwind CSS customizing theme and plugins.

## Detailed Folder/File Structure
```
.gitignore
next-env.d.ts
package-lock.json
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.json
app/
app/globals.css
app/layout.tsx
app/page.tsx
app/components/
app/components/ui/
app/components/ui/Button.tsx
app/components/ui/input.tsx
app/components/ui/label.tsx
app/components/ui/radio-group.tsx
app/components/ui/select.tsx
app/components/ui/slider.tsx
app/components/ui/switch.tsx
app/components/ui/tabs-part1.tsx
app/components/ui/tabs-part2.tsx
app/components/ui/tabs.tsx
app/components/ui/textarea.tsx
app/components/video-editor/
app/components/video-editor/Header.tsx
app/components/video-editor/VideoEditor.tsx
app/components/video-editor/VideoEditorNew.tsx
app/components/video-editor/audio/
app/components/video-editor/audio/AudioControl.tsx
app/components/video-editor/export/
app/components/video-editor/export/Export.tsx
app/components/video-editor/image-overlay/
app/components/video-editor/image-overlay/ImageOverlay.tsx
app/components/video-editor/image-overlay/ImageOverlayItem.tsx
app/components/video-editor/preview/
app/components/video-editor/preview/Preview.tsx
app/components/video-editor/subtitles/
app/components/video-editor/subtitles/SubtitleEditor.tsx
app/components/video-editor/subtitles/SubtitleItem.tsx
app/components/video-editor/subtitles/Subtitles.tsx
app/components/video-editor/subtitles/SubtitleStyler.tsx
app/components/video-editor/timeline/
app/components/video-editor/timeline/Timeline.tsx
app/components/video-editor/timeline/TimelineClip.tsx
app/components/video-editor/timeline/TimelineSubtitle.tsx
app/components/video-editor/upload/
app/components/video-editor/upload/Upload.tsx
app/components/video-editor/upload/UploadSection.tsx
app/lib/
app/lib/utils.js
app/lib/redux/
app/lib/redux/store.js
app/lib/redux/store.ts
app/lib/redux/slices/
app/lib/redux/slices/audioSlice.ts
app/lib/redux/slices/overlaySlice.js
app/lib/redux/slices/overlaySlice.ts
app/lib/redux/slices/subtitleSlice.ts
app/lib/redux/slices/videoSlice.ts
```

## Technologies Used
- Next.js (version 13.4.4)
- React (version 18.2.0)
- Redux Toolkit (version 1.9.5)
- React DnD (version 16.0.1)
- React Player (version 2.16.0)
- Tailwind CSS (version 3.3.2)
- TypeScript (version 5.0.4)
- ESLint (version 8.44.0)

## Key Scripts
- `npm run dev` - Start development server with hot-reloading
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## License Information
This project is private and not licensed for public use.
