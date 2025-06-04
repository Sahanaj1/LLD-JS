class ParkingSpot{
    constructor(id, type, isOccupied = false,vehicle = null) {
        this.vehicle = vehicle; // Vehicle currently parked in this spot, null if empty
        this.id = id;
        this.type = type;
        this.isOccupied = isOccupied; // Indicates if the parking spot is currently occupied
    }

    assignSpot(vehicle) {
        if (!this.isOccupied) {
            this.vehicle = vehicle; // Assign the vehicle to this parking spot
            this.isOccupied = true; // Mark the spot as occupied
        } else {
            throw new Error("Parking spot is already occupied.");
        }
    }

    freeSpot() {
        if (this.isOccupied) {
            this.vehicle = null; // Remove the vehicle from this parking spot
            this.isOccupied = false; // Mark the spot as empty
        } else {
            throw new Error("Parking spot is already empty.");
        }
    }
}

export default ParkingSpot; // Export the ParkingSpot class for use in other modules