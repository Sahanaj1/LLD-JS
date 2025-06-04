class ParkingLot {
    constructor(spots) {
        this.spots = spots;
    }

    findAvailableSpot(vehicleType){
        const rules = {
            'car': ['compact','large'],
            'bike' :[ 'compact', 'small'],
            'truck' : ['large']
        }

        for (const spot of this.spots){
            if(spot.isOccupied === false && rules[vehicleType].includes(spot.type)){
                return spot; // Return the first available spot that matches the vehicle type
            }
        }
        return null; // No available spot found for the vehicle type
    }

    assignSpot(spot,vehicle) {
        spot.assignSpot(vehicle); // Assign the vehicle to the parking spot
    }

    removeSpot(spot) {
        spot.freeSpot(); // Remove the vehicle from the parking spot
    }
}

export default ParkingLot; // Export the ParkingLot class for use in other modules