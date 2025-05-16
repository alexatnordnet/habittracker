import React from 'react';
import { isToday, getLocalDateString } from '../../utils/dateUtils';

export default function DayView({ habit, date, onToggle, isFutureDate }) {
  const dateString = getLocalDateString(date);
  const isCompleted = habit.completions?.[dateString] || false;
  
  return (
    <button 
      onClick={() => !isFutureDate && onToggle(habit.id, dateString)}
      disabled={isFutureDate}
      className={`
        flex flex-col items-center justify-center
        rounded text-center transform transition-all duration-200
        h-36 w-36 mx-auto text-lg
        ${isCompleted ? 'bg-teal-600 text-white scale-100 hover:bg-teal-700' : 
          isFutureDate ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
          'border border-dotted hover:bg-gray-100 hover:scale-105 active:scale-95'}
        ${isToday(date) ? 'ring-1 ring-gray-400' : ''}
      `}
    >
      <div className="text-sm mb-2">Today</div>
      <div className="font-bold text-3xl mb-3">{date.getDate()}</div>
      <div className="text-xs">{date.toLocaleDateString('en-US', {weekday: 'long'})}</div>
    </button>
  );
}