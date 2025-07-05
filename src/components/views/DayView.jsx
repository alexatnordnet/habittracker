import React from 'react';
import { isToday, getLocalDateString } from '../../utils/dateUtils';

export default function DayView({ habit, date, onToggle, isFutureDate }) {
  const dateString = getLocalDateString(date);
  const isCompleted = habit.completions?.[dateString] || false;
  const actuallyFuture = date > new Date(); // Check against actual current date
  
  return (
    <button 
      onClick={() => !actuallyFuture && onToggle(habit.id, dateString)}
      disabled={actuallyFuture}
      className={`
        flex flex-col items-center justify-center
        rounded text-center transform transition-all duration-200
        h-36 w-36 mx-auto text-lg
        ${isCompleted ? 'bg-teal-600 text-white scale-100 hover:bg-teal-700' : 
          actuallyFuture ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
          'border border-dotted hover:bg-gray-100 hover:scale-105 active:scale-95'}
        ${isToday(date) ? 'ring-1 ring-gray-400' : ''}
      `}
    >
      <div className="font-bold text-4xl mb-2">{date.getDate()}</div>
      <div className="text-sm">{date.toLocaleDateString('en-US', {weekday: 'long'})}</div>
    </button>
  );
}