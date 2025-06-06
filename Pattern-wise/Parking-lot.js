// Parking Lot System using Factory Pattern

// Vehicle Factory
class VehicleFactory {
  static createVehicle(type, number) {
    switch (type) {
      case 'car': return new Car(number);
      case 'bike': return new Bike(number);
      case 'truck': return new Truck(number);
      default: throw new Error("Unknown vehicle type");
    }
  }
}

class Vehicle {
  constructor(number, type) {
    this.number = number;
    this.type = type;
  }
}
class Car extends Vehicle {
  constructor(number) {
    super(number, 'car');
  }
}
class Bike extends Vehicle {
  constructor(number) {
    super(number, 'bike');
  }
}
class Truck extends Vehicle {
  constructor(number) {
    super(number, 'truck');
  }
}

// Parking Spot Factory
class ParkingSpotFactory {
  static createSpot(type, id) {
    switch (type) {
      case 'small': return new SmallSpot(id);
      case 'medium': return new MediumSpot(id);
      case 'large': return new LargeSpot(id);
      default: throw new Error("Unknown spot type");
    }
  }
}

class ParkingSpot {
  constructor(id, type) {
    this.spotId = id;
    this.type = type;
    this.isAvailable = true;
  }

  occupy() {
    this.isAvailable = false;
  }

  vacate() {
    this.isAvailable = true;
  }
}

class SmallSpot extends ParkingSpot {
  constructor(id) {
    super(id, 'small');
  }
}
class MediumSpot extends ParkingSpot {
  constructor(id) {
    super(id, 'medium');
  }
}
class LargeSpot extends ParkingSpot {
  constructor(id) {
    super(id, 'large');
  }
}

// Ticket Class
class Ticket {
  constructor(vehicle, spot) {
    this.ticketId = 'T' + Math.floor(Math.random() * 10000);
    this.vehicleNumber = vehicle.number;
    this.spotId = spot.spotId;
    this.entryTime = new Date();
  }
}

// Parking Lot
class ParkingLot {
  constructor() {
    this.spots = [];
    this.activeTickets = new Map();
  }

  addSpot(spot) {
    this.spots.push(spot);
  }

  findAvailableSpot(vehicleType) {
    // Simple logic: cars/bikes -> medium/small, trucks -> large
    for (let spot of this.spots) {
      if (!spot.isAvailable) continue;

      if (
        (vehicleType === 'bike' && spot.type === 'small') ||
        (vehicleType === 'car' && (spot.type === 'medium' || spot.type === 'large')) ||
        (vehicleType === 'truck' && spot.type === 'large')
      ) {
        return spot;
      }
    }
    return null;
  }

  parkVehicle(vehicle) {
    const spot = this.findAvailableSpot(vehicle.type);
    if (!spot) {
      console.log(`🚫 No spot available for ${vehicle.type}`);
      return null;
    }
    spot.occupy();
    const ticket = new Ticket(vehicle, spot);
    this.activeTickets.set(ticket.ticketId, { ticket, spot });
    console.log(`✅ Vehicle parked. Ticket ID: ${ticket.ticketId}`);
    return ticket;
  }

  leaveSpot(ticketId) {
    const record = this.activeTickets.get(ticketId);
    if (!record) {
      console.log(`⚠️ Invalid ticket ID`);
      return;
    }
    const { spot, ticket } = record;
    spot.vacate();
    const duration = (new Date() - ticket.entryTime) / 1000;
    const fee = Math.ceil(duration / 60) * 10; // Rs. 10 per minute
    console.log(`✅ Vehicle ${ticket.vehicleNumber} left. Fee: ₹${fee}`);
    this.activeTickets.delete(ticketId);
  }
}

// ----------------------------------
// 🚗 Sample Run
// ----------------------------------
const lot = new ParkingLot();

// Add some spots
lot.addSpot(ParkingSpotFactory.createSpot('small', 'S1'));
lot.addSpot(ParkingSpotFactory.createSpot('medium', 'M1'));
lot.addSpot(ParkingSpotFactory.createSpot('large', 'L1'));

// Park a bike
const bike = VehicleFactory.createVehicle('bike', 'KA01AB1234');
const ticket1 = lot.parkVehicle(bike);

// Park a truck
const truck = VehicleFactory.createVehicle('truck', 'KA02TR4567');
const ticket2 = lot.parkVehicle(truck);

// Try leaving after 2 seconds
setTimeout(() => {
  lot.leaveSpot(ticket1.ticketId);
  lot.leaveSpot(ticket2.ticketId);
}, 2000);
