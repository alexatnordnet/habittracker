/**
 * Date utility functions for the habit tracker
 */

/**
 * Convert a date to a local date string in YYYY-MM-DD format
 * @param {Date} date - The date to format
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getLocalDateString = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is today
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

/**
 * Check if a date is in the future
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is in the future
 */
export const isFutureDate = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

/**
 * Check if a date is in the current month
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is in the current month
 */
export const isCurrentMonth = (date) => {
  const today = new Date();
  return date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

/**
 * Check if a month is in the future
 * @param {Date} date - The date to check
 * @returns {boolean} True if the month is in the future
 */
export const isFutureMonth = (date) => {
  const today = new Date();
  return (
    date.getFullYear() > today.getFullYear() || 
    (date.getFullYear() === today.getFullYear() && date.getMonth() > today.getMonth())
  );
};

/**
 * Format a date for display based on the view
 * @param {Date} date - The date to format
 * @param {string} view - The current view (day, week, month, year)
 * @returns {string} Formatted date string for display
 */
export const formatDisplayDate = (date, view) => {
  if (view === 'day' || view === 'week') {
    // For day/week view, just return the date number
    return date.getDate().toString();
  }
  
  if (view === 'month') {
    return date.getDate().toString();
  }
  
  if (view === 'year') {
    return date.toLocaleDateString('en-US', { month: 'short' });
  }
  
  return date.toLocaleDateString();
};

/**
 * Get the current month and year for display
 * @returns {string} The current month and year (e.g., "May 2023")
 */
export const getCurrentMonthYear = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

/**
 * Get the current year for display
 * @returns {string} The current year (e.g., "2023")
 */
export const getCurrentYear = () => {
  return new Date().getFullYear().toString();
};

/**
 * Generate dates for the day view (just today)
 * @returns {Date[]} Array with today's date
 */
export const getDatesForDayView = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return [today];
};

/**
 * Generate dates for the week view (Monday to Sunday)
 * @returns {Date[]} Array of dates for the week
 */
export const getDatesForWeekView = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = [];

  // Get days from Monday to Sunday
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1; // Calculate days to subtract to get to Monday
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - daysFromMonday + i);
    dates.push(date);
  }

  return dates;
};

/**
 * Generate dates for the month view (calendar grid)
 * @returns {Date[]} Array of dates for the month
 */
export const getDatesForMonthView = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = [];
  
  const year = today.getFullYear();
  const month = today.getMonth();
  
  // First day of current month
  const firstDay = new Date(year, month, 1);
  firstDay.setHours(0, 0, 0, 0);
  // Last day of current month
  const lastDay = new Date(year, month + 1, 0);
  lastDay.setHours(0, 0, 0, 0);
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc)
  let firstDayOfWeek = firstDay.getDay();
  // Adjust for Monday as first day of week
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  // Add days from previous month to fill the calendar
  for (let i = 0; i < firstDayOfWeek; i++) {
    const prevDate = new Date(year, month, -i);
    prevDate.setHours(0, 0, 0, 0);
    dates.unshift(prevDate);
  }
  
  // Add all days from current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }
  
  // Add days from next month to complete the grid (to make rows of 7)
  const remainingDays = (7 - dates.length % 7) % 7;
  for (let i = 1; i <= remainingDays; i++) {
    const nextDate = new Date(year, month + 1, i);
    nextDate.setHours(0, 0, 0, 0);
    dates.push(nextDate);
  }

  return dates;
};

/**
 * Generate dates for the year view (12 months)
 * @returns {Date[]} Array of dates for the year
 */
export const getDatesForYearView = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dates = [];
  
  const currentYear = today.getFullYear();
  
  // Add all months of the year
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentYear, i, 1);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }

  return dates;
};

/**
 * Get dates for a particular view
 * @param {string} view - The current view (day, week, month, year)
 * @returns {Date[]} Array of dates for the view
 */
export const getDatesForView = (view) => {
  switch (view) {
    case 'day':
      return getDatesForDayView();
    case 'week':
      return getDatesForWeekView();
    case 'month':
      return getDatesForMonthView();
    case 'year':
      return getDatesForYearView();
    default:
      return getDatesForDayView();
  }
};
