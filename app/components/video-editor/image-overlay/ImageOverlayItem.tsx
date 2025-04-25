'use client';

export default function ImageOverlayItem({ overlay, isSelected, onSelect, onUpdate, onRemove }) {
    return (
        <div
            className={`p-3 rounded-lg transition-colors cursor-pointer
        ${isSelected ? 'bg-blue-900/30 border border-blue-500' : 'bg-slate-800 hover:bg-slate-700'}
      `}
            onClick={onSelect}
        >
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-white truncate max-w-xs">
                    {overlay.name}
                </h4>
                <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(overlay.id);
                    }}
                    aria-label="Remove overlay"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-slate-900 rounded overflow-hidden flex-shrink-0">
                    <img
                        src={overlay.url}
                        alt={overlay.name}
                        className="w-full h-full object-contain"
                        style={{
                            opacity: overlay.opacity / 100,
                            borderWidth: `${overlay.border.width}px`,
                            borderColor: overlay.border.color,
                            borderRadius: `${overlay.border.radius}px`,
                            transform: `rotate(${overlay.rotation}deg)`
                        }}
                    />
                </div>

                <div className="flex-grow space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Position: {overlay.position.x}%, {overlay.position.y}%</span>
                        <span>Size: {overlay.size.width}x{overlay.size.height}</span>
                    </div>

                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Opacity: {overlay.opacity}%</span>
                        <span>Rotation: {overlay.rotation}°</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
