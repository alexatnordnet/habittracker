export default function ViewSelector({ currentView, onViewChange }) {
  const views = ['week', 'month', 'year'];
  
  return (
    <div className="flex mb-4 border rounded overflow-hidden">
      {views.map(view => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`flex-1 py-2 px-3 text-sm capitalize ${
            currentView === view 
              ? 'bg-blue-500 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {view}
        </button>
      ))}
    </div>
  );
}