# Video Editor Frontend

This is a video editor frontend application built with Next.js, React, Redux Toolkit, and Tailwind CSS. It provides features such as video upload, timeline editing, subtitles, image overlays, audio control, and exporting the edited video.

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (comes with Node.js) or yarn

## Installation

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

## Usage

- Upload videos using the upload section.
- Edit the video timeline, add subtitles, and image overlays.
- Control audio settings.
- Export the final edited video using the export feature.

## Project Structure

- `app/` - Contains the main Next.js app components and pages.
- `app/components/video-editor/` - Core video editor components like timeline, subtitles, preview, upload, export, etc.
- `app/components/ui/` - Reusable UI components such as buttons, inputs, sliders, tabs, etc.
- `app/lib/redux/` - Redux store and slices for managing application state.
- `app/globals.css` - Global styles including Tailwind CSS imports.
- `tailwind.config.js` - Tailwind CSS configuration.

## Technologies Used

- Next.js
- React
- Redux Toolkit
- Tailwind CSS
- TypeScript
- React DnD
- React Player

## License

This project is private and not licensed for public use.
