# Video Editor Frontend

This project is a React/Next.js based video editor frontend application with Redux state management. It supports uploading video files, previewing videos, and editing video timelines with features such as adding/removing scenes, drag-and-drop clip rearranging, and mock cut/edit functionality.

## Features

- Upload video files in mp4, webm, and ogg formats with drag & drop or file selector.
- Video preview with play, pause, stop, fullscreen, render simulation, and download.
- Timeline view showing video clips with thumbnails and durations.
- Timeline clip controls: Add Scene, Remove Scene, Cut, Edit (mock implementations).
- Drag-and-drop reordering of timeline clips.
- Redux state management for videos, clips, current time, and duration.
- Responsive UI with Tailwind CSS styling.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open `http://localhost:3000` in your browser.

## Usage

- Upload videos using the Upload section.
- Preview videos in the preview panel.
- Use the timeline to manage clips and scenes.
- Use the timeline buttons below each clip to add/remove scenes or perform mock cut/edit.
- Drag clips in the timeline to reorder them.

## Notes

- The cut and edit functions are currently mock implementations and show alerts.
- The render function simulates rendering progress and allows downloading a dummy video file.
- The project uses `react-dnd` for drag-and-drop functionality; ensure the DndProvider wraps the editor components.

## Dependencies

- React 18+
- Next.js 13+
- Redux Toolkit
- react-redux
- react-dnd
- react-dnd-html5-backend
- uuid

## Development

- The Redux slices are located in `app/lib/redux/slices/`.
- Components are organized under `app/components/video-editor/`.
- Styling is done with Tailwind CSS.

## License

MIT License
