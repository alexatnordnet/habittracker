import { useState } from 'react'
import HabitForm from './components/HabitForm'
import HabitItem from './components/HabitItem'
import ViewSelector from './components/ViewSelector'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [habits, setHabits] = useLocalStorage('habits', [])
  const [currentView, setCurrentView] = useState('week')
  
  // Get local date string (YYYY-MM-DD) for consistent date representation
  const getLocalDateString = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Add a new habit
  const addHabit = (name) => {
    const newHabit = {
      id: Date.now().toString(),
      name,
      completions: {},
      createdAt: new Date().toISOString()
    }
    setHabits([...habits, newHabit])
  }
  
  // Toggle completion status for a specific date
  const toggleHabit = (id, date = null) => {
    // If date is provided directly use it, otherwise use today's date
    const dateStr = date || getLocalDateString(new Date());
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completions = {...habit.completions};
        completions[dateStr] = !completions[dateStr];
        return {...habit, completions};
      }
      return habit;
    }));
  }
  
  // Delete a habit
  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        {/* Habits list at the top */}
        <div className="mb-4">
          {habits.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No habits yet. Add one below!</p>
          ) : (
            <div className="mb-2">
              {habits.map(habit => (
                <HabitItem 
                  key={habit.id}
                  habit={habit}
                  onToggle={toggleHabit}
                  onDelete={deleteHabit}
                  currentView={currentView}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* View selector */}
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
        
        {/* Add habit form */}
        <div className="mt-4">
          <HabitForm onAddHabit={addHabit} />
        </div>
      </div>
    </div>
  )
}

export default App