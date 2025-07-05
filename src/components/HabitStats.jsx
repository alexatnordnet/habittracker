import React from 'react';
import { getDatesForView } from '../utils/dateUtils';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';

export default function HabitStats({ habit, view, onToggle, timeOffset = 0 }) {
  // Get dates for the current view with time offset
  const dates = getDatesForView(view, timeOffset);
  
  // Add placeholder dates for week view to center it
  let displayDates = dates;
  if (view === 'week') {
    const rowToPlace = 2; // Third row (0-indexed)
    const emptyBefore = rowToPlace * 7; // Number of empty slots before
    const emptyAfter = (5 - rowToPlace) * 7; // Number of empty slots after
    
    // Add empty slots before and after
    const placeholders = Array(emptyBefore).fill(null);
    const placeholdersAfter = Array(emptyAfter).fill(null);
    displayDates = [...placeholders, ...dates, ...placeholdersAfter];
  }
  
  // Render the appropriate view component
  return (
    <div className="mt-2">
      <div className="h-[240px]">
        {view === 'day' && (
          <div className="h-full flex items-center justify-center">
            <DayView 
              habit={habit} 
              date={dates[0]} 
              onToggle={onToggle} 
              isFutureDate={false} 
            />
          </div>
        )}
        
        {view === 'week' && (
          <WeekView 
            habit={habit} 
            dates={displayDates} 
            onToggle={onToggle} 
          />
        )}
        
        {view === 'month' && (
          <MonthView 
            habit={habit} 
            dates={dates} 
            onToggle={onToggle} 
          />
        )}
        
        {view === 'year' && (
          <YearView 
            habit={habit} 
            dates={dates} 
            onToggle={onToggle} 
          />
        )}
      </div>
    </div>
  );
}