import { useState } from 'react'
import HabitForm from './components/HabitForm'
import HabitItem from './components/HabitItem'
import ViewSelector from './components/ViewSelector'
import useLocalStorage from './hooks/useLocalStorage'
import { getLocalDateString } from './utils/dateUtils'

function App() {
  const [habits, setHabits] = useLocalStorage('habits', [])
  const [currentView, setCurrentView] = useLocalStorage('currentView', 'day')
  
  // Export habits data to CSV
  const exportToCSV = () => {
    // Format data suitable for import into spreadsheets
    let csvContent = "Habit,Date,Completed\n";
    
    habits.forEach(habit => {
      const dates = Object.keys(habit.completions || {}).sort();
      
      if (dates.length === 0) {
        // Include habit even if no completions
        csvContent += `"${habit.name}","",-\n`;
      } else {
        dates.forEach(date => {
          csvContent += `"${habit.name}","${date}",${habit.completions[date] ? 1 : 0}\n`;
        });
      }
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "habit-tracker-export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    // Ensure consistent date string format
    let dateStr;
    if (date) {
      dateStr = date; // Already a string from our components
    } else {
      dateStr = getLocalDateString(new Date());
    }
    
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
        
        {/* Export button */}
        {habits.length > 0 && (
          <div className="mt-4 flex justify-end">
            <button 
              onClick={exportToCSV}
              className="w-24 py-2 px-4 rounded transition-colors text-center border-2 border-dotted border-gray-800 hover:bg-gray-100"
            >
              Export
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App