// src/storage.ts

class Storage {
    // Save data to localStorage (or any other persistence layer)
    static save(key: string, value: any): void {
      try {
        const stringValue = JSON.stringify(value);
        localStorage.setItem(key, stringValue);
      } catch (error) {
        console.error('Error saving to localStorage', error);
      }
    }
  
    // Retrieve data from localStorage
    static load(key: string): any {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          return JSON.parse(value);
        }
        return null;
      } catch (error) {
        console.error('Error loading from localStorage', error);
        return null;
      }
    }
  
    // Clear data from localStorage
    static clear(key: string): void {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error clearing from localStorage', error);
      }
    }
  
    // Clear all localStorage data
    static clearAll(): void {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing all localStorage data', error);
      }
    }
  }
  
  export default Storage;
  