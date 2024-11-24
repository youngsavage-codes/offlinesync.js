// src/sync.ts
import Queue from './queue';

class Sync {
  private queue: Queue;

  constructor(queue: Queue) {
    this.queue = queue;
  }

  // Start syncing the actions from the queue
  async start(): Promise<void> {
    const actions = this.queue.get();
    if (actions.length === 0) {
      console.log('No actions to sync.');
      return;
    }

    try {
      for (const action of actions) {
        // Simulating API call or syncing with the server
        await this.syncAction(action);
        console.log(`Action synced: ${action.type}`);
        this.queue.clear(); // Clear queue after successful sync
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  }

  // Simulate syncing an action
  private async syncAction(action: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate an API request
        console.log(`Syncing action: ${action.type}`);
        resolve();
      }, 1000);
    });
  }
}

export default Sync;
