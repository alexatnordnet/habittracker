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
      <div className="w-full flex gap-4">
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="New habit name"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button 
          type="submit"
          className="w-24 py-2 px-4 rounded transition-colors text-center border-2 border-dotted border-gray-800 hover:bg-gray-100"
        >
          Add
        </button>
      </div>
    </form>
  );
}