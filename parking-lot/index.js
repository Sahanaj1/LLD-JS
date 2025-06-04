import Vehicle from './Vehicle.js';
import ParkingSpot from './ParkingSpot.js';
import Ticket from './Ticket.js';
import ParkingManager from './ParkingManager.js';
import ParkingLot from './ParkingLot.js';

// Setup
const spots = [
  new ParkingSpot("S1", "compact"),
  new ParkingSpot("S2", "bike"),
  new ParkingSpot("S3", "large")
];

const lot = new ParkingLot(spots);
const manager = new ParkingManager(lot);

// Test
const vehicle1 = new Vehicle("MH12AB1234", "car");
manager.parkVehicle(vehicle1);
console.log("Vehicle parked:", vehicle1);

setTimeout(() => {
  const closedTicket = manager.unparkVehicle('MH12AB1234');
  console.log("Unparked ticket:", closedTicket);
  console.log("Parking fee:", closedTicket.fee);
}, 10000);
