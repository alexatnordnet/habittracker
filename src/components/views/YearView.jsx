import React from 'react';
import { isFutureMonth, getLocalDateString } from '../../utils/dateUtils';

export default function YearView({ habit, dates, onToggle }) {
  return (
    <div className="h-full flex flex-col">
      {/* Year grid */}
      <div className="grid grid-cols-4 grid-rows-3 gap-1 h-[180px] flex-grow">
        {dates.map((date, index) => {
          if (!date) return <div key={index} className="empty-cell"></div>;
          
          // Check if month is completed (all days completed)
          const year = date.getFullYear();
          const month = date.getMonth();
          const isCompleted = isMonthCompleted(habit, year, month);
          const isFuture = isFutureMonth(date); // This correctly checks against actual current date
          
          return (
            <button 
              key={index}
              disabled={true} // Year view is not clickable
              className={`
                flex items-center justify-center
                rounded text-center cursor-default
                ${isCompleted ? 'bg-teal-600 text-white' : 
                  isFuture ? 'bg-gray-200 text-gray-400' :
                  'bg-gray-100'}
              `}
            >
              <span className="text-xs font-medium">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to check if all days in a month are completed
function isMonthCompleted(habit, year, month) {
  // Get the last day of the month
  const lastDay = new Date(year, month + 1, 0).getDate();
  
  // Check if all days in the month are completed
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month, day);
    const dateStr = getLocalDateString(date);
    if (!habit.completions?.[dateStr]) {
      return false;
    }
  }
  
  return lastDay > 0; // Return true only if there were days to check
}