export default function TimeNavigation({ timeOffset, onNavigate, onResetToToday }) {
  const isAtCurrentPeriod = timeOffset === 0;
  
  return (
    <div className="flex items-center justify-between mb-3 py-1">
      {/* Previous button */}
      <button
        onClick={() => onNavigate(-1)}
        className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
        aria-label="Previous period"
      >
        <span className="text-base">‹</span>
      </button>
      
      {/* Today/Reset button - only show when not at current period */}
      <div className="flex-1 text-center">
        {!isAtCurrentPeriod && (
          <button
            onClick={onResetToToday}
            className="px-3 py-1 rounded text-xs font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
          >
            Back to Today
          </button>
        )}
      </div>
      
      {/* Next button - disabled if at current period */}
      <button
        onClick={() => onNavigate(1)}
        disabled={isAtCurrentPeriod}
        className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
          isAtCurrentPeriod 
            ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
            : 'border-gray-300 hover:bg-gray-100'
        }`}
        aria-label="Next period"
      >
        <span className="text-base">›</span>
      </button>
    </div>
  );
}
