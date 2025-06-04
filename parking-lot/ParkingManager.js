import Ticket from './Ticket.js';

class ParkingManager {
  constructor(parkingLot) {
    this.parkingLot = parkingLot;
    this.tickets = new Map();
  }

  parkVehicle(vehicle) {
    const spot = this.parkingLot.findAvailableSpot(vehicle.type);
    if (!spot) {
      throw new Error("No available parking spot for this vehicle type.");
    }

    this.parkingLot.assignSpot(spot, vehicle);
    const ticket = new Ticket(Date.now(), vehicle.licensePlate);
    this.tickets.set(ticket.vehicleNumber, ticket);
    return ticket;
  }

  unparkVehicle(ticketId) {
    const ticket = this.tickets.get(ticketId);
    if (!ticket) {
      throw new Error("Invalid ticket ID.");
    }

    ticket.close();
    const spot = this.parkingLot.spots.find(
      (spot) => spot.vehicle && spot.vehicle.licensePlate === ticket.vehicleNumber
    );

    if (spot) {
      this.parkingLot.removeSpot(spot);
    } else {
      throw new Error("Vehicle not found in parking lot.");
    }

    this.tickets.delete(ticketId);
    return ticket;
  }
}

export default ParkingManager;
