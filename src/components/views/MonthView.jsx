import React from 'react';
import { isCurrentMonth, isFutureMonth, getLocalDateString } from '../../utils/dateUtils';

export default function MonthView({ habit, dates, onToggle }) {
  // Week day headers
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Current month title
  const currentMonthYear = new Date().toLocaleDateString('en-US', { 
    month: 'long', year: 'numeric' 
  });

  return (
    <div className="h-full flex flex-col">
      <div className="text-center mb-1">
        {currentMonthYear}
      </div>
      
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map(day => (
          <div key={day} className="text-xs text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 flex-grow">
        {dates.map((date, index) => {
          if (!date) return <div key={index} className="empty-cell"></div>;
          
          const dateString = getLocalDateString(date);
          const isCompleted = habit.completions?.[dateString] || false;
          const belongsToCurrentMonth = isCurrentMonth(date);
          const isFutureDate = date > new Date();
          
          return (
            <button 
              key={index}
              onClick={() => belongsToCurrentMonth && !isFutureDate && onToggle(habit.id, dateString)}
              disabled={!belongsToCurrentMonth || isFutureDate}
              className={`
                flex items-center justify-center
                rounded-sm text-center transition-all duration-200
                aspect-square h-8
                ${isCompleted ? 'bg-teal-600 text-white' : 
                  !belongsToCurrentMonth ? 'bg-gray-200 text-gray-400' :
                  isFutureDate ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
                  'border border-dotted hover:bg-gray-100 hover:scale-105 active:scale-95'}
                ${date.getDate() === new Date().getDate() && belongsToCurrentMonth ? 'ring-1 ring-gray-400' : ''}
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