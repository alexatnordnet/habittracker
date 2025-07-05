import React from 'react';
import { isToday, getLocalDateString } from '../../utils/dateUtils';

export default function WeekView({ habit, dates, onToggle }) {
  return (
    <div className="grid grid-cols-7 gap-1 h-[180px]">
      {dates.map((date, index) => {
        if (!date) return <div key={index} className="empty-cell"></div>;
        
        const dateString = getLocalDateString(date);
        const isCompleted = habit.completions?.[dateString] || false;
        const isFutureDate = date > new Date(); // Check against actual current date
        
        return (
          <button 
            key={index}
            onClick={() => !isFutureDate && onToggle(habit.id, dateString)}
            disabled={isFutureDate}
            className={`
              flex items-center justify-center flex-col
              rounded text-center transform transition-all duration-200
              h-20 w-11
              ${isCompleted ? 'bg-teal-600 text-white scale-100 hover:bg-teal-700' : 
                isFutureDate ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
                'border border-dotted hover:bg-gray-100 hover:scale-105 active:scale-95'}
              ${isToday(date) ? 'ring-1 ring-gray-400' : ''}
            `}
          >
            <div className="text-xs mb-1">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className="font-bold text-base">
              {date.getDate()}
            </div>
          </button>
        );
      })}
    </div>
  );
}