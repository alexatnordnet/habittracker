import HabitStats from './HabitStats';

export default function HabitItem({ habit, onToggle, onDelete, currentView }) {
  const today = new Date().toISOString().split('T')[0];
  const isCompleted = habit.completions?.[today];
  
  return (
    <div className="flex flex-col p-3 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => onToggle(habit.id)}
            className={`w-6 h-6 rounded-full border mr-3 flex items-center justify-center ${
              isCompleted ? 'bg-green-500 border-green-600' : 'border-gray-300'
            }`}
          >
            {isCompleted && <span className="text-white text-xs">✓</span>}
          </button>
          <span>{habit.name}</span>
        </div>
        
        <button 
          onClick={() => onDelete(habit.id)}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      
      {/* Show stats based on current view */}
      <HabitStats habit={habit} view={currentView} onToggle={onToggle} />
    </div>
  );
}