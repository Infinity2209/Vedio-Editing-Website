'use client';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        <h1 className="text-2xl font-semibold tracking-wide">
          Video Editor
        </h1>
        <nav className="flex space-x-4">
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded shadow hover:bg-blue-400 transition-colors duration-300">
            Save Project
          </button>
          <button className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded shadow hover:bg-gray-200 transition-colors duration-300">
            Help
          </button>
        </nav>
      </div>
    </header>
  );
}
