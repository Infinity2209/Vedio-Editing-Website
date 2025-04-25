'use client';

export default function SubtitleItem({ subtitle, isSelected, onSelect, onUpdate, onRemove }) {
    const handleTimeChange = (field, value) => {
        onUpdate(subtitle.id, { [field]: parseFloat(value) });
    };

    const handleTextChange = (e) => {
        onUpdate(subtitle.id, { text: e.target.value });
    };

    return (
        <div
            className={`p-3 rounded-lg transition-colors cursor-pointer
        ${isSelected ? 'bg-blue-200/30 border border-blue-500' : 'bg-slate-400 hover:bg-slate-700'}
      `}
            onClick={onSelect}
        >
            <div className="flex justify-between items-start mb-2">
                <div>
                    <span
                        className="inline-block px-2 py-0.5 text-xs rounded"
                        style={{
                            color: '#000',
                            backgroundColor: subtitle.style?.backgroundColor || 'transparent',
                            fontFamily: subtitle.style?.fontFamily || 'inherit'
                        }}
                    >
                        {subtitle.style?.fontSize || 14}px
                    </span>
                </div>
                <button
                    className="text-black hover:text-gray-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(subtitle.id);
                    }}
                    aria-label="Remove subtitle"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="relative mb-2">
                <input
                    value={subtitle.text}
                    onChange={handleTextChange}
                    className="w-full bg-slate-900 border-none rounded p-2 text-sm text-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Subtitle text"
                    aria-label="Subtitle text"
                />
            </div>
            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                    <span className="text-black">Start:</span>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={subtitle.startTime}
                        onChange={(e) => handleTimeChange('startTime', e.target.value)}
                        className="w-16 bg-slate-900 border-none rounded p-1 text-xs text-white"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Subtitle start time in seconds"
                    />
                    <span className="text-black">s</span>
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-black">End:</span>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={subtitle.endTime}
                        onChange={(e) => handleTimeChange('endTime', e.target.value)}
                        className="w-16 bg-slate-900 border-none rounded p-1 text-xs text-white"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Subtitle end time in seconds"
                    />
                    <span className="text-black">s</span>
                </div>
            </div>
        </div>
    );
}
