// ---------- Abstract Component ----------
class BookingEntity {
  display(indent = 0) {
    throw new Error("display() must be implemented");
  }
}

// ---------- Leaf: Seat ----------
class Seat extends BookingEntity {
  constructor(seatNumber) {
    super();
    this.seatNumber = seatNumber;
    this.isBooked = false; // to simulate concurrency
    this.lock = false; // simple lock flag for concurrency
  }

  display(indent = 0) {
    const status = this.isBooked ? "🔴 Booked" : "🟢 Available";
    console.log(" ".repeat(indent) + `🎟️ Seat: ${this.seatNumber} - ${status}`);
  }

  // Simulate concurrency safe booking using async method
  async book(userId) {
    // Wait until lock is free (simulate lock acquisition)
    while (this.lock) {
      await new Promise(resolve => setTimeout(resolve, 10)); // spin wait
    }
    this.lock = true;

    try {
      if (this.isBooked) {
        console.log(`❌ Seat ${this.seatNumber} is already booked! User ${userId} failed to book.`);
        return false;
      }
      // Simulate some booking delay
      await new Promise(resolve => setTimeout(resolve, 100));
      this.isBooked = true;
      console.log(`✅ Seat ${this.seatNumber} successfully booked by user ${userId}.`);
      return true;
    } finally {
      this.lock = false;
    }
  }
}

// ---------- Composite: Show ----------
class Show extends BookingEntity {
  constructor(showName) {
    super();
    this.showName = showName;
    this.children = [];
  }

  addSeat(seat) {
    this.children.push(seat);
  }

  display(indent = 0) {
    console.log(" ".repeat(indent) + `🎬 Show: ${this.showName}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// ---------- Composite: Screen ----------
class Screen extends BookingEntity {
  constructor(screenName) {
    super();
    this.screenName = screenName;
    this.children = [];
  }

  addShow(show) {
    this.children.push(show);
  }

  display(indent = 0) {
    console.log(" ".repeat(indent) + `🖥️ Screen: ${this.screenName}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// ---------- Composite: Theater ----------
class Theater extends BookingEntity {
  constructor(theaterName) {
    super();
    this.theaterName = theaterName;
    this.children = [];
  }

  addScreen(screen) {
    this.children.push(screen);
  }

  display(indent = 0) {
    console.log(" ".repeat(indent) + `🏛️ Theater: ${this.theaterName}`);
    this.children.forEach(child => child.display(indent + 2));
  }
}

// ---------- Usage ----------

(async () => {
  // Create seats
  const seat1 = new Seat("A1");
  const seat2 = new Seat("A2");
  const seat3 = new Seat("B1");

  // Create shows and add seats
  const show1 = new Show("Avengers: Endgame - 6 PM");
  show1.addSeat(seat1);
  show1.addSeat(seat2);

  const show2 = new Show("Inception - 9 PM");
  show2.addSeat(seat3);

  // Create screens and add shows
  const screen1 = new Screen("Screen 1");
  screen1.addShow(show1);
  screen1.addShow(show2);

  // Create theater and add screens
  const theater = new Theater("PVR Cinemas");
  theater.addScreen(screen1);

  // Display initial structure
  theater.display();

  // Simulate concurrent booking attempts for the same seat
  await Promise.all([
    seat1.book("User1"),
    seat1.book("User2"),
    seat2.book("User3"),
  ]);

  console.log("\nAfter booking attempts:");
  theater.display();
})();
