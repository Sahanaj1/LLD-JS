class Seat {
    constructor(seatNumber,type, price ) {
        this.seatNumber = seatNumber; // Unique identifier for the seat
        this.price = price; // Price of the seat
        this.type = type; // Type of the seat (e.g., regular, premium, etc.)
        this.isBooked = false; // Indicates whether the seat is booked or not
    }

    book() {
        if (!this.isBooked) {
            this.isBooked = true; // Mark the seat as booked
        } else {
            throw new Error(`Seat ${this.seatNumber} is already booked.`);
        }
    }
}

export default Seat; // Export the Seat class for use in other modules