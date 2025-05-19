export default function ViewSelector({ currentView, onViewChange }) {
  const views = ['day', 'week', 'month', 'year'];
  
  return (
    <div className="flex gap-4 justify-center">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`w-24 py-2 px-4 rounded transition-colors text-center ${
            currentView === view 
              ? 'border-2 border-dotted border-gray-800 bg-gray-100' 
              : 'border border-gray-200 hover:bg-gray-100 border-2'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}