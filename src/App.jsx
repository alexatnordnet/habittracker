import { useState, useEffect } from 'react'
import HabitForm from './components/HabitForm'
import HabitItem from './components/HabitItem'
import ViewSelector from './components/ViewSelector'

function App() {
  const [habits, setHabits] = useState([])
  const [currentView, setCurrentView] = useState('week')
  
  // Load habits from localStorage on initial render
  useEffect(() => {
    const storedHabits = localStorage.getItem('habits')
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits))
    }
  }, [])
  
  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])
  
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