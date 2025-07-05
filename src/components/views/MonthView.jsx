import React from 'react';
import { isCurrentMonth, isFutureMonth, getLocalDateString } from '../../utils/dateUtils';

export default function MonthView({ habit, dates, onToggle }) {
  // Week day headers
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Get the target month from the first date that's roughly in the middle of our date range
  // This handles the case where we have padding dates from previous/next months
  const targetDate = dates && dates.length > 14 ? dates[14] : (dates && dates[0]);

  return (
    <div className="h-full flex flex-col">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map(day => (
          <div key={day} className="text-xs text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-grow h-[200px]">
        {dates.map((date, index) => {
          if (!date) return <div key={index} className="empty-cell"></div>;
          
          const dateString = getLocalDateString(date);
          const isCompleted = habit.completions?.[dateString] || false;
          
          // Check if this date belongs to the target month we're viewing
          const belongsToTargetMonth = targetDate ? 
            (date.getMonth() === targetDate.getMonth() && date.getFullYear() === targetDate.getFullYear()) : 
            false;
          
          const isFutureDate = date > new Date(); // Check against actual current date
          
          return (
            <button 
              key={index}
              onClick={() => belongsToTargetMonth && !isFutureDate && onToggle(habit.id, dateString)}
              disabled={!belongsToTargetMonth || isFutureDate}
              className={`
                flex items-center justify-center
                rounded-sm text-center transition-all duration-200
                aspect-square h-8
                ${isCompleted ? 'bg-teal-600 text-white' : 
                  !belongsToTargetMonth ? 'bg-gray-200 text-gray-400' :
                  isFutureDate ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
                  'border border-dotted hover:bg-gray-100 hover:scale-105 active:scale-95'}
                ${date.getDate() === new Date().getDate() && isCurrentMonth(date) ? 'ring-1 ring-gray-400' : ''}
              `}
            >
              <span className="text-xs font-medium">
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}