// For debugging localStorage issues
const localStorageAvailable = () => {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Simple utility to print localStorage contents
export const debugLocalStorage = () => {
  console.log('localStorage available:', localStorageAvailable());
  
  if (localStorageAvailable()) {
    try {
      const habits = localStorage.getItem('habits');
      console.log('Current localStorage habits:', habits);
      return habits;
    } catch (e) {
      console.error('Error reading localStorage:', e);
      return null;
    }
  }
  
  return null;
};

// Save to localStorage with error handling
export const saveToLocalStorage = (key, data) => {
  if (localStorageAvailable()) {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      return false;
    }
  }
  return false;
};

// Load from localStorage with error handling
export const loadFromLocalStorage = (key) => {
  if (localStorageAvailable()) {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData);
    } catch (e) {
      console.error('Error loading from localStorage:', e);
      return null;
    }
  }
  return null;
};