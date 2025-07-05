import HabitStats from './HabitStats';

export default function HabitItem({ habit, onToggle, onDelete, currentView, timeOffset }) {
  return (
    <div className="p-3 pb-3 border rounded mb-3 relative">
      <div className="absolute -top-2.5 left-2">
        <span className="bg-white px-2 text-sm font-medium text-gray-700">
          {habit.name}
        </span>
      </div>
      
      <button 
        onClick={() => onDelete(habit.id)}
        className="absolute right-2 top-2 text-gray-400 hover:text-gray-700 text-lg"
      >
        ×
      </button>
      
      {/* Calendar-style stats */}
      <HabitStats habit={habit} view={currentView} onToggle={onToggle} timeOffset={timeOffset} />
    </div>
  );
}