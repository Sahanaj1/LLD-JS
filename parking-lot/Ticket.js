class Ticket {
    constructor(ticketId, vehicleNumber) {
        this.ticketId = ticketId; // Unique identifier for the ticket
        this.vehicleNumber = vehicleNumber; // Vehicle's license plate number
        this.entryTime =  new Date(); // Timestamp of when the vehicle entered the parking lot
        this.exitTime = null; // Timestamp of when the vehicle exits, initially null
        this.fee = 0; // Parking fee, initially set to 0
    }

    close() {
        this.exitTime = new Date(); // Set the exit time to now

        const durationInSeconds = Math.ceil((this.exitTime - this.entryTime) / 1000); // Get duration in seconds

        const ratePerSecond = 1; // ₹1 per second (or any other amount)
        this.fee = durationInSeconds * ratePerSecond;
    }

    
}

export default Ticket; // Export the Ticket class for use in other modules