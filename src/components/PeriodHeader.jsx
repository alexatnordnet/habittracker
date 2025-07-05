export default function PeriodHeader({ currentView, timeOffset }) {
  const getPeriodTitle = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let targetDate;
    
    switch (currentView) {
      case 'day':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + timeOffset);
        if (timeOffset === 0) return 'Today';
        if (timeOffset === -1) return 'Yesterday';
        return targetDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        });
        
      case 'week':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + (timeOffset * 7));
        
        // Get the start and end of the week (Monday to Sunday)
        const currentDay = targetDate.getDay();
        const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
        const weekStart = new Date(targetDate);
        weekStart.setDate(targetDate.getDate() - daysFromMonday);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        
        return `${weekStart.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        })} - ${weekEnd.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })}`;
        
      case 'month':
        targetDate = new Date(today.getFullYear(), today.getMonth() + timeOffset, 1);
        return targetDate.toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        });
        
      case 'year':
        targetDate = new Date(today.getFullYear() + timeOffset, 0, 1);
        return targetDate.getFullYear().toString();
        
      default:
        return 'Today';
    }
  };

  return (
    <div className="text-center mb-3">
      <h2 className="text-base font-medium text-gray-800">
        {getPeriodTitle()}
      </h2>
    </div>
  );
}
