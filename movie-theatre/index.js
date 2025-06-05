import Booking from "./Booking.js";
import Show from "./Show.js";
import User from "./User.js";
import Theatre from "./Theatre.js";
import LocationService from "./LocationService.js";
import Seat from "./Seat.js";
import Movie from "./Movie.js";
import { SeatType } from "./SeatType.js";

const seatLayout = [
  new Seat(1, SeatType.REGULAR, 150),
  new Seat(2, SeatType.REGULAR, 150),
  new Seat(3, SeatType.PREMIUM, 250),
  new Seat(4, SeatType.PREMIUM, 250),
  new Seat(5, SeatType.RECLINER, 350),
];

// Step 2: Setup movie, show, theatre
const movie1 = new Movie(1, "Inception", 148);
const show1 = new Show(101, movie1, "2025-06-05T19:00", seatLayout);
const theatre1 = new Theatre(1, "PVR Bangalore", "Bangalore");
theatre1.addShow(show1);

// Step 3: Location & user
const locationService = new LocationService([theatre1]);
const user = new User(100, "Sahana", "Bangalore");

// Step 4: User books seats
const userLocationTheatres = locationService.getTheatresByLocation(user.location);
const selectedShow = userLocationTheatres[0].getShowsByMovie(1)[0];

console.log("Available seats:");
selectedShow.getAvailableSeats().forEach(seat => {
  console.log(`Seat ${seat.seatNumber}: ${seat.type} - ₹${seat.price}`);
});

const booking = new Booking(user, selectedShow, [2, 3, 5]);
booking.confirm();
