import { useState } from 'react'

export default function HabitForm({ onAddHabit }) {
  const [habitName, setHabitName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAddHabit(habitName.trim());
      setHabitName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="New habit name"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button 
          type="submit"
          className="px-4 py-2 border-2 border-dotted border-gray-800 rounded hover:bg-gray-100 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}