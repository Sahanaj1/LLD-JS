// Car Rental Service with Proxy Pattern

// -------- Interface (optional simulation) --------
class ICarRentalService {
  rentCar(user, car) {
    throw new Error("Method not implemented");
  }
}

// -------- Real Service --------
class CarRentalService extends ICarRentalService {
  rentCar(user, car) {
    console.log(`🚗 Car '${car}' has been rented to ${user.name}`);
  }
}

// -------- Proxy --------
class CarRentalProxy extends ICarRentalService {
  constructor() {
    super();
    this.realService = new CarRentalService();
  }

  rentCar(user, car) {
    if (!user.isVerified) {
      console.log(`❌ Access Denied: ${user.name} is not verified`);
      return;
    }

    console.log(`✅ Access Granted: ${user.name} is verified`);
    this.realService.rentCar(user, car);
  }
}

// -------- User Class --------
class User {
  constructor(name, isVerified = false) {
    this.name = name;
    this.isVerified = isVerified;
  }
}

// -------- Usage --------
const user1 = new User("Alice", true);
const user2 = new User("Bob", false);

const rentalProxy = new CarRentalProxy();

rentalProxy.rentCar(user1, "Honda City");     // Should succeed
rentalProxy.rentCar(user2, "Tesla Model 3");  // Should fail
