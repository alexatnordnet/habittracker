import { useState, useEffect } from 'react';

export default function HabitStats({ habit, view, onToggle }) {
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    setStats(generateStats(habit, view));
  }, [habit, view]);
  
  // Normalize date to midnight in local timezone
  const normalizeDate = (date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  };
  
  // Get ISO date string (YYYY-MM-DD) for consistent date representation
  const getISODateString = (date) => {
    const normalized = normalizeDate(date);
    return normalized.toISOString().split('T')[0];
  };
  
  // Get dates for the current view
  const generateStats = (habit, view) => {
    const dates = getDatesForView(view);
    
    return dates.map(date => {
      if (date === null) {
        return { isEmpty: true };
      }
      
      // Create consistent date string format for all views
      const normalizedDate = normalizeDate(date);
      const dateStr = getISODateString(normalizedDate);
      
      const completed = view === 'year' 
        ? isMonthCompleted(habit, normalizedDate.getFullYear(), normalizedDate.getMonth())
        : habit.completions?.[dateStr] || false;
      
      return {
        date: dateStr,
        displayDate: formatDisplayDate(normalizedDate, view),
        completed,
        isCurrentMonth: isCurrentMonth(normalizedDate),
        isFutureMonth: isFutureMonth(normalizedDate),
        isToday: isToday(normalizedDate)
      };
    });
  };
  
  // Check if date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if all days in a month are completed
  const isMonthCompleted = (habit, year, month) => {
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Check if all days in the month are completed
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      const dateStr = getISODateString(date);
      if (!habit.completions?.[dateStr]) {
        return false;
      }
    }
    
    return lastDay > 0; // Return true only if there were days to check
  };
  
  // Generate array of dates based on the current view
  const getDatesForView = (view) => {
    const today = normalizeDate(new Date());
    const dates = [];
    
    if (view === 'week') {
      // Get days from Monday to Sunday
      const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate days to subtract to get to Monday
      
      for (let i = 0; i < 7; i++) { // 7 days in a week
        const date = new Date(today);
        date.setDate(today.getDate() - daysFromMonday + i);
        dates.push(normalizeDate(date));
      }
      
      // Add placeholder dates for week view to center the row
      // We want the week view to be in the center rows of the 6-row grid
      const rowToPlace = 2; // Third row (0-indexed)
      const emptyBefore = rowToPlace * 7; // Number of empty slots before
      const emptyAfter = (5 - rowToPlace) * 7; // Number of empty slots after
      
      // Add empty slots before
      for (let i = 0; i < emptyBefore; i++) {
        dates.unshift(null);
      }
      
      // Add empty slots after
      for (let i = 0; i < emptyAfter; i++) {
        dates.push(null);
      }
    }
    else if (view === 'month') {
      // Get all days in current month in a calendar layout
      const year = today.getFullYear();
      const month = today.getMonth();
      
      // First day of current month
      const firstDay = normalizeDate(new Date(year, month, 1));
      // Last day of current month
      const lastDay = normalizeDate(new Date(year, month + 1, 0));
      
      // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc)
      let firstDayOfWeek = firstDay.getDay();
      // Adjust for Monday as first day of week
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      
      // Add days from previous month to fill the calendar
      for (let i = 0; i < firstDayOfWeek; i++) {
        const prevDate = new Date(year, month, -i);
        dates.unshift(normalizeDate(prevDate));
      }
      
      // Add all days from current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        const date = new Date(year, month, i);
        dates.push(normalizeDate(date));
      }
      
      // Add days from next month to complete the grid (to make rows of 7)
      const remainingDays = (7 - dates.length % 7) % 7;
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month + 1, i);
        dates.push(normalizeDate(nextDate));
      }
    }
    else if (view === 'year') {
      // Get all 12 months of the current year
      const currentYear = today.getFullYear();
      
      // Add all months of the year
      for (let i = 0; i < 12; i++) {
        const date = new Date(currentYear, i, 1);
        dates.push(normalizeDate(date));
      }
    }
    
    return dates;
  };
  
  // Check if date is in current month
  const isCurrentMonth = (date) => {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
  
  // Check if month is in the future
  const isFutureMonth = (date) => {
    const today = new Date();
    return (
      date.getFullYear() > today.getFullYear() || 
      (date.getFullYear() === today.getFullYear() && date.getMonth() > today.getMonth())
    );
  };

  // Get current month and year for display
  const getCurrentMonthYear = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get current year for display
  const getCurrentYear = () => {
    return new Date().getFullYear().toString();
  };
  
  // Format date for display based on view
  const formatDisplayDate = (date, view) => {
    if (view === 'week') {
      // For week view, show both day name and date
      return `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()}`;
    }
    
    if (view === 'month') {
      return date.getDate().toString();
    }
    
    if (view === 'year') {
      return date.toLocaleDateString('en-US', { month: 'short' });
    }
    
    return date.toLocaleDateString();
  };
  
  // Include week day headers for month view
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="mt-2">
      {/* Title for month/year view */}
      <div className="h-8">
        {view === 'month' && (
          <div className="text-center font-medium">
            {getCurrentMonthYear()}
          </div>
        )}
        
        {view === 'year' && (
          <div className="text-center font-medium">
            {getCurrentYear()}
          </div>
        )}
      </div>
      
      {/* Week day headers for month view */}
      <div className="h-6">
        {view === 'month' && (
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map(day => (
              <div key={day} className="text-xs text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div 
        className="grid gap-1 h-[180px]" 
        style={{
          gridTemplateColumns: `repeat(${view === 'week' ? 7 : view === 'month' ? 7 : 4}, 1fr)`,
          gridTemplateRows: view === 'year' ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)'
        }}
      >
        {stats.map((stat, index) => (
          stat.isEmpty ? (
            <div key={index} className="empty-cell"></div>
          ) : (
            <button 
              key={index} 
              onClick={() => {
                // Only toggle if not year view
                if (view !== 'year') {
                  onToggle(habit.id, stat.date);
                }
              }}
              disabled={view === 'year' || (view === 'month' && !stat.isCurrentMonth)}
              className={`
                flex items-center justify-center
                rounded text-center transition-colors 
                ${stat.completed ? 'bg-green-500 text-white' : 
                  (view === 'month' && !stat.isCurrentMonth) ? 'bg-gray-200 text-gray-400' : 
                  (view === 'year' && stat.isFutureMonth) ? 'bg-gray-200 text-gray-400' : 
                  'border border-dotted hover:bg-gray-100'}
                ${view === 'year' ? 'cursor-default' : ''}
                ${stat.isToday ? 'ring-1 ring-gray-400' : ''}
              `}
            >
              <span className="text-xs font-medium block">{stat.displayDate}</span>
            </button>
          )
        ))}
      </div>
    </div>
  );
}