// src/index.ts
import Queue from './components/queue';
import Storage from './components/storage';
import Sync from './components/sync';
import { LatestActionStrategy } from './components/conflict';
import { isOnline, getCurrentTimestamp } from './components/utils';

class OfflineSync {
  private queue: Queue;
  private sync: Sync;
  private conflictResolution: LatestActionStrategy;

  constructor(config: { maxQueueSize: number; conflictStrategy: string }) {
    this.queue = new Queue(config);
    this.sync = new Sync(this.queue);
    this.conflictResolution = new LatestActionStrategy();

    // Load the queue from localStorage if there are any saved actions
    const savedActions = Storage.load('offlineActions');
    if (savedActions) {
      savedActions.forEach((action: any) => this.queue.add(action));
    }
  }

  // Add an action to the queue and save to localStorage
  addAction(action: any): void {
    const timestamp = getCurrentTimestamp();
    this.queue.add({ ...action, timestamp });

    // Save the updated queue to localStorage
    Storage.save('offlineActions', this.queue.get());
  }

  // Start the syncing process
  startSync(): void {
    if (isOnline()) {
      this.sync.start();
    } else {
      console.log('Offline. Queuing actions.');
    }
  }

  // Resolve conflicts between local and remote actions
  resolveConflict(localAction: any, remoteAction: any): any {
    return this.conflictResolution.resolve(localAction, remoteAction);
  }
}

export default OfflineSync;
