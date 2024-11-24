// src/conflict.ts

interface ConflictResolutionStrategy {
  resolve(localAction: any, remoteAction: any): any;
}

class LatestActionStrategy implements ConflictResolutionStrategy {
  resolve(localAction: any, remoteAction: any): any {
    // Resolve conflict by choosing the latest action (based on timestamp)
    return localAction.timestamp > remoteAction.timestamp ? localAction : remoteAction;
  }
}

class MergeChangesStrategy implements ConflictResolutionStrategy {
  resolve(localAction: any, remoteAction: any): any {
    // Custom merge logic (this can be customized as per your needs)
    return {
      ...localAction,
      data: { ...localAction.data, ...remoteAction.data },
    };
  }
}

export { LatestActionStrategy, MergeChangesStrategy };
