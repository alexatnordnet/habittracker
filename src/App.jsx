import { useState } from 'react'
import HabitForm from './components/HabitForm'
import HabitItem from './components/HabitItem'
import ViewSelector from './components/ViewSelector'
import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const [habits, setHabits] = useLocalStorage('habits', [])
  const [currentView, setCurrentView] = useState('week')
  
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
    const dateStr = date || new Date().toISOString().split('T')[0];
    
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
        <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
        
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
        
        <HabitForm onAddHabit={addHabit} />
        
        <div className="mt-4">
          {habits.length === 0 ? (
            <p className="text-gray-600 text-center py-4">No habits yet. Add one above!</p>
          ) : (
            <div className="border rounded divide-y">
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
      </div>
    </div>
  )
}

export default App