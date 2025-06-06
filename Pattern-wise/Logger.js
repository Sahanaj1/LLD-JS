// Logger Pattern Example: Null Object Pattern

// -------- ILogger (Interface Simulation) --------
class ILogger {
  log(message) {
    throw new Error("Method not implemented");
  }
}

// -------- Real Logger Implementation --------
class ConsoleLogger extends ILogger {
  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[LOG] ${timestamp} - ${message}`);
  }
}

// -------- Null Object Logger --------
class NullLogger extends ILogger {
  log(message) {
    // Do nothing
  }
}

// -------- Application Logic that uses logger --------
class Application {
  constructor(logger) {
    // Use NullLogger as fallback if no logger is provided
    this.logger = logger || new NullLogger();
  }

  run() {
    this.logger.log("Application started");
    // Simulate some operations
    this.logger.log("Running important operation");
    this.logger.log("Application finished");
  }
}

// -------- Usage --------

// Using a real logger
console.log("=== Using Real Logger ===");
const appWithLogger = new Application(new ConsoleLogger());
appWithLogger.run();

// Using a null logger
console.log("\n=== Using Null Logger ===");
const appWithoutLogger = new Application(new NullLogger());
appWithoutLogger.run();
