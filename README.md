# OfflineSync

**OfflineSync** is a lightweight, easy-to-use library for managing offline data synchronization in web and mobile applications. It allows actions to be queued while offline and automatically syncs them once the device is online. This ensures uninterrupted workflows for users even in the absence of network connectivity.

## Features

- **Automatic Queuing**: Queue actions when offline, ensuring no data is lost.
- **Online Sync**: Automatically sync queued actions with the server once the device goes online.
- **Conflict Resolution**: Choose a strategy for resolving conflicts (e.g., latest timestamp or custom resolution).
- **Offline Persistence**: Persist queued actions even if the app is closed or restarted.
- **Queue Management**: Easily retrieve, add, remove, and clear actions from the queue.
- **Customizable Sync Behavior**: Define custom behaviors for syncing different action types.

## Installation

To install OfflineSync, use npm or yarn:

```bash
# Using npm
npm install offlinesync

# Using yarn
yarn add offlinesync
```

## Usage
- **Initialize OfflineSync**: Start by initializing the OfflineSync instance with desired configuration options.

```tsx
import OfflineSync from 'offlinesync';

const offlineSync = new OfflineSync({
  maxQueueSize: 10, // Optional: Max number of actions in the queue
  conflictStrategy: 'latest', // Optional: Conflict resolution strategy
  persist: true, // Optional: Persist queue across sessions
});
```

## Configuration Options
- **maxQueueSize:** (Optional) Set a maximum queue size. If exceeded, older actions will be removed.
- **conflictStrategy:** (Optional) Defines how conflicts are handled. Options: 'latest', 'merge', or a custom function.
- **persist:** (Optional) If set to true, queued actions will be stored persistently (e.g., using localStorage).

## Adding Actions to the Queue
Queue actions using the addAction method. Each action requires a type, data, id, and timestamp.

```tsx
offlineSync.addAction({
  type: 'ADD_TASK', // Action type
  data: { id: 1, description: 'Complete the task' }, // Action data
  id: 'task-1', // Unique action ID
  timestamp: Date.now(), // Timestamp of when the action was queued
});
```

## Syncing Queued Actions
To sync queued actions, simply use the sync() method:

```tsx
offlineSync.sync();
```
This will sync the queued actions once the device is online, and successfully synced actions will be removed from the queue.

## Retrieving the Queue
You can retrieve the current actions in the queue:

```tsx
const queue = offlineSync.queue.get();
console.log(queue); // Output: Array of actions in the queue
```

## Removing Actions from the Queue
You can remove an individual action from the queue by its ID:

```tsx
offlineSync.queue.remove('task-1'); // Remove specific action
```

To clear all actions from the queue:
```tsx
offlineSync.queue.clear(); // Clear entire queue
```

## Sync Strategies
OfflineSync offers several strategies to resolve conflicts when the same action is queued multiple times.

## Available Conflict Strategies
- **'latest':** Keeps the most recent action (based on timestamp).
- **'merge':** Merges conflicting actions (requires custom logic).
- **Custom:** You can define your own conflict resolution strategy.

Example of a custom conflict strategy:

```tsx
const offlineSync = new OfflineSync({
  conflictStrategy: (action1, action2) => {
    return action1.timestamp > action2.timestamp ? action1 : action2;
  },
});
```


### Key Sections of the README:

- **Overview**: Describes what the library does.
- **Features**: Highlights the key capabilities of the library.
- **Installation**: Instructions for installing the library.
- **Usage**: Shows how to initialize, add actions, sync, retrieve the queue, and manage actions.
- **Sync Strategies**: Details conflict resolution strategies.
- **Example Usage**: Provides an example of a real-world use case.
- **Queue Management**: Covers advanced operations on the queue.
- **Troubleshooting**: Offers solutions to common problems.

Feel free to copy and paste this markdown directly into your project's `README.md` file!


