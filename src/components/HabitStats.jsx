import { useState, useEffect } from 'react';

export default function HabitStats({ habit, view, onToggle }) {
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    setStats(generateStats(habit, view));
  }, [habit, view]);
  
  // Get dates for the current view
  const generateStats = (habit, view) => {
    const dates = getDatesForView(view);
    
    return dates.map(date => {
      const dateStr = date.toISOString().split('T')[0];
      const completed = habit.completions?.[dateStr] || false;
      
      return {
        date: dateStr,
        displayDate: formatDisplayDate(date, view),
        completed
      };
    });
  };
  
  // Generate array of dates based on the current view
  const getDatesForView = (view) => {
    const today = new Date();
    const dates = [];
    
    if (view === 'week') {
      // Get days from Monday to Sunday
      const today = new Date();
      const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate days to subtract to get to Monday
      
      for (let i = 0; i < 7; i++) { // 7 days in a week
        const date = new Date();
        date.setDate(today.getDate() - daysFromMonday + i);
        dates.push(date);
      }
    }
    else if (view === 'month') {
      // Get the last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        dates.push(date);
      }
    }
    else if (view === 'year') {
      // Get the last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(today.getMonth() - i);
        date.setDate(1); // Just use the first day of each month
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  // Format date for display based on view
  const formatDisplayDate = (date, view) => {
    if (view === 'week') {
      // For week view, show both day name and date
      return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}`;
    }
    
    if (view === 'month') {
      return date.toLocaleDateString('en-US', { day: 'numeric' });
    }
    
    if (view === 'year') {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
    
    return date.toLocaleDateString();
  };
  
  return (
    <div className="flex mt-2">
      {stats.map((stat, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-500 mb-1">{stat.displayDate}</div>
          <button 
            onClick={() => onToggle(habit.id, stat.date)}
            className={`w-4 h-4 rounded-full ${stat.completed ? 'bg-green-500' : 'bg-gray-200'} hover:opacity-80`}
          />
        </div>
      ))}
    </div>
  );
}