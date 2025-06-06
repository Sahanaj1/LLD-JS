// Elevator System using Chain of Responsibility Pattern

// ----------- Abstract Handler -----------
class RequestHandler {
  setNext(handler) {
    this.next = handler;
    return handler;
  }

  handle(request) {
    if (this.next) return this.next.handle(request);
    return null;
  }
}

// ----------- Concrete Handlers -----------

class ValidateHandler extends RequestHandler {
  handle(request) {
    if (request.floor < 0 || request.floor > 10) {
      console.log("❌ Invalid floor request");
      return null;
    }
    console.log("✅ Floor request validated");
    return super.handle(request);
  }
}

class AssignHandler extends RequestHandler {
  constructor(elevators) {
    super();
    this.elevators = elevators;
  }

  handle(request) {
    let assigned = this.elevators.reduce((prev, curr) =>
      Math.abs(curr.floor - request.floor) < Math.abs(prev.floor - request.floor) ? curr : prev
    );
    request.elevator = assigned;
    console.log(`🛗 Elevator ${assigned.id} assigned to request`);
    return super.handle(request);
  }
}

class DoorHandler extends RequestHandler {
  handle(request) {
    console.log(`🚪 Elevator ${request.elevator.id} opening doors at floor ${request.floor}`);
    console.log(`🚪 Doors closing`);
    return super.handle(request);
  }
}

class MovementHandler extends RequestHandler {
  handle(request) {
    const elevator = request.elevator;
    console.log(`🚀 Moving Elevator ${elevator.id} from floor ${elevator.floor} to floor ${request.floor}`);
    elevator.floor = request.floor;
    return super.handle(request);
  }
}

// ----------- Elevator Class -----------

class Elevator {
  constructor(id, floor = 0) {
    this.id = id;
    this.floor = floor;
  }
}

// ----------- Elevator System -----------

class ElevatorSystem {
  constructor() {
    this.elevators = [new Elevator(1, 0), new Elevator(2, 5)];

    // Setting up the chain
    this.chain = new ValidateHandler();
    this.chain
      .setNext(new AssignHandler(this.elevators))
      .setNext(new DoorHandler())
      .setNext(new MovementHandler());
  }

  handleRequest(floor) {
    const request = { floor };
    this.chain.handle(request);
  }
}

// ----------- Usage -----------

const system = new ElevatorSystem();

system.handleRequest(3);  // valid
system.handleRequest(11); // invalid
system.handleRequest(7);  // valid
