import HabitStats from './HabitStats';

export default function HabitItem({ habit, onToggle, onDelete, currentView }) {
  return (
    <div className="p-4 pb-2 border rounded mb-2 relative">
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
      <HabitStats habit={habit} view={currentView} onToggle={onToggle} />
    </div>
  );
}