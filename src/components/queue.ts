// src/queue.ts

interface Action {
    type: string;         // Action type (e.g., "create", "update", "delete")
    data: any;            // Action payload (the data to sync)
    timestamp: number;    // Timestamp when the action was created (used for conflict resolution)
    id?: string;          // Optional unique identifier for the action (useful for conflict resolution)
  }
  
  class Queue {
    private queue: Action[] = [];
    private maxQueueSize: number;
  
    constructor(config: { maxQueueSize: number } = { maxQueueSize: 100 }) {
      this.maxQueueSize = config.maxQueueSize;
    }
  
    // Add an action to the queue
    add(action: Action): void {
      if (this.queue.length >= this.maxQueueSize) {
        this.queue.shift(); // Remove the oldest action if the queue exceeds the max size
      }
      this.queue.push(action);
    }
  
    // Retrieve all queued actions
    get(): Action[] {
      return [...this.queue]; // Return a copy of the queue to avoid direct mutation
    }
  
    // Remove an action from the queue by its ID
    remove(actionId: string): void {
      this.queue = this.queue.filter(action => action.id !== actionId);
    }
  
    // Clear all actions in the queue
    clear(): void {
      this.queue = [];
    }
  
    // Check if the queue is empty
    isEmpty(): boolean {
      return this.queue.length === 0;
    }
  
    // Get the size of the queue
    size(): number {
      return this.queue.length;
    }
  }
  
  export default Queue;
  