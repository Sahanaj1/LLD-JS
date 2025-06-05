class Show {
    constructor(id, movie, startTime, seatLayout) {
        this.id = id; // Unique identifier for the show
        this.movie = movie; // Movie object associated with the show
        this.startTime = startTime; // Start time of the show
        this.seats = new Map(); // Number of seats booked for the show, initialized to 0

        seatLayout.forEach(seat => {
            this.seats.set(seat.seatNumber, seat); // Initialize the seats map with seat objects
        });
    }


    getAvailableSeats() {
        return Array.from(this.seats.values()).filter(seat=> !seat.isBooked); // Return an array of available seats
    }

    bookSeats(seatNumbers){
        for (let num of seatNumbers) {
            const seat = this.seats.get(num);
            if(!seat) {
                throw new Error(`Seat ${seat} is not available for booking.`);
            }
            seat.book();
        }
    }

    calculateTotalCost(seatNumbers){
        return seatNumbers.reduce((total, seatNumber) => {
            const seat = this.seats.get(seatNumber);
            if (!seat) {
                throw new Error(`Seat ${seatNumber} is not booked.`);
            }
            return total + seat.price; // Assuming each seat has a price property
        }, 0); // Calculate the total cost of booked seats
    }
}

export default Show; // Export the Show class for use in other modules