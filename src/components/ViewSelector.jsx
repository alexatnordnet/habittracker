export default function ViewSelector({ currentView, onViewChange }) {
  const views = ['day', 'week', 'month', 'year'];
  
  return (
    <div className="flex rounded-lg overflow-hidden p-1">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium capitalize transition-colors ${
            currentView === view 
              ? 'border-2 border-dotted border-gray-800 bg-gray-100' 
              : 'border border-gray-200 hover:bg-gray-100'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}