// src/utils.ts

// Check if the device is online
export function isOnline(): boolean {
  return navigator.onLine;
}

// Get the current timestamp
export function getCurrentTimestamp(): number {
  return Date.now();
}
