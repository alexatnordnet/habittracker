export default function ViewSelector({ currentView, onViewChange }) {
  const views = ['week', 'month', 'year'];
  
  return (
    <div className="flex rounded-lg overflow-hidden bg-gray-100 p-1">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`flex-1 py-2 px-3 rounded text-sm font-medium capitalize transition-colors ${
            currentView === view 
              ? 'bg-blue-500 text-white' 
              : 'bg-transparent text-gray-700 hover:bg-gray-200'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}