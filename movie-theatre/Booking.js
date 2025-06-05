class Booking{
    constructor(user, show, seatNumbers){
        this.user = user; // User who made the booking
        this.show = show; // Show for which the booking is made
        this.seatNumbers = seatNumbers; // Array of seat numbers booked by the user
        this.bookingTime = new Date(); // Time when the booking was made
        this.price = this.show.calculateTotalCost(seatNumbers); // Total cost of the booking
    }

    confirm(){
        this.show.bookSeats(this.seatNumbers); // Book the seats in the show
        console.log(`Booking confirmed for user ${this.user.name} for show ${this.show.id} at ${this.bookingTime}. Total cost: $${this.price}`);
    }
}

export default Booking;