/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// src/queue.ts
var Queue = /** @class */function () {
  function Queue(config) {
    if (config === void 0) {
      config = {
        maxQueueSize: 100
      };
    }
    this.queue = [];
    this.maxQueueSize = config.maxQueueSize;
  }
  // Add an action to the queue
  Queue.prototype.add = function (action) {
    if (this.queue.length >= this.maxQueueSize) {
      this.queue.shift(); // Remove the oldest action if the queue exceeds the max size
    }
    this.queue.push(action);
  };
  // Retrieve all queued actions
  Queue.prototype.get = function () {
    return __spreadArray([], this.queue, true); // Return a copy of the queue to avoid direct mutation
  };
  // Remove an action from the queue by its ID
  Queue.prototype.remove = function (actionId) {
    this.queue = this.queue.filter(function (action) {
      return action.id !== actionId;
    });
  };
  // Clear all actions in the queue
  Queue.prototype.clear = function () {
    this.queue = [];
  };
  // Check if the queue is empty
  Queue.prototype.isEmpty = function () {
    return this.queue.length === 0;
  };
  // Get the size of the queue
  Queue.prototype.size = function () {
    return this.queue.length;
  };
  return Queue;
}();

// src/storage.ts
var Storage = /** @class */function () {
  function Storage() {}
  // Save data to localStorage (or any other persistence layer)
  Storage.save = function (key, value) {
    try {
      var stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  };
  // Retrieve data from localStorage
  Storage.load = function (key) {
    try {
      var value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error('Error loading from localStorage', error);
      return null;
    }
  };
  // Clear data from localStorage
  Storage.clear = function (key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error clearing from localStorage', error);
    }
  };
  // Clear all localStorage data
  Storage.clearAll = function () {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing all localStorage data', error);
    }
  };
  return Storage;
}();

var Sync = /** @class */function () {
  function Sync(queue) {
    this.queue = queue;
  }
  // Start syncing the actions from the queue
  Sync.prototype.start = function () {
    return __awaiter(this, void 0, void 0, function () {
      var actions, _i, actions_1, action, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            actions = this.queue.get();
            if (actions.length === 0) {
              console.log('No actions to sync.');
              return [2 /*return*/];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6,, 7]);
            _i = 0, actions_1 = actions;
            _a.label = 2;
          case 2:
            if (!(_i < actions_1.length)) return [3 /*break*/, 5];
            action = actions_1[_i];
            // Simulating API call or syncing with the server
            return [4 /*yield*/, this.syncAction(action)];
          case 3:
            // Simulating API call or syncing with the server
            _a.sent();
            console.log("Action synced: ".concat(action.type));
            this.queue.clear(); // Clear queue after successful sync
            _a.label = 4;
          case 4:
            _i++;
            return [3 /*break*/, 2];
          case 5:
            return [3 /*break*/, 7];
          case 6:
            error_1 = _a.sent();
            console.error('Sync failed:', error_1);
            return [3 /*break*/, 7];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  // Simulate syncing an action
  Sync.prototype.syncAction = function (action) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
          setTimeout(function () {
            // Simulate an API request
            console.log("Syncing action: ".concat(action.type));
            resolve();
          }, 1000);
        })];
      });
    });
  };
  return Sync;
}();

// src/conflict.ts
var LatestActionStrategy = /** @class */function () {
  function LatestActionStrategy() {}
  LatestActionStrategy.prototype.resolve = function (localAction, remoteAction) {
    // Resolve conflict by choosing the latest action (based on timestamp)
    return localAction.timestamp > remoteAction.timestamp ? localAction : remoteAction;
  };
  return LatestActionStrategy;
}();

// src/utils.ts
// Check if the device is online
function isOnline() {
  return navigator.onLine;
}
// Get the current timestamp
function getCurrentTimestamp() {
  return Date.now();
}

// src/index.ts
var OfflineSync = /** @class */function () {
  function OfflineSync(config) {
    var _this = this;
    this.queue = new Queue(config);
    this.sync = new Sync(this.queue);
    this.conflictResolution = new LatestActionStrategy();
    // Load the queue from localStorage if there are any saved actions
    var savedActions = Storage.load('offlineActions');
    if (savedActions) {
      savedActions.forEach(function (action) {
        return _this.queue.add(action);
      });
    }
  }
  // Add an action to the queue and save to localStorage
  OfflineSync.prototype.addAction = function (action) {
    var timestamp = getCurrentTimestamp();
    this.queue.add(__assign(__assign({}, action), {
      timestamp: timestamp
    }));
    // Save the updated queue to localStorage
    Storage.save('offlineActions', this.queue.get());
  };
  // Start the syncing process
  OfflineSync.prototype.startSync = function () {
    if (isOnline()) {
      this.sync.start();
    } else {
      console.log('Offline. Queuing actions.');
    }
  };
  // Resolve conflicts between local and remote actions
  OfflineSync.prototype.resolveConflict = function (localAction, remoteAction) {
    return this.conflictResolution.resolve(localAction, remoteAction);
  };
  return OfflineSync;
}();

export { OfflineSync as default };
//# sourceMappingURL=index.esm.js.map
