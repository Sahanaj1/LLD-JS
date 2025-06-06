//singleton ATM class implementation


class ATM {
  // Private static instance
  static #instance = null;

  constructor() {
    if (ATM.#instance) {
      throw new Error("Use ATM.getInstance() to get the singleton instance.");
    }
    this.cashAvailable = 100000; // initial cash in ATM
    this.balance = 0; // user's balance
  }

  static getInstance() {
    if (!ATM.#instance) {
      ATM.#instance = new ATM();
    }
    return ATM.#instance;
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
    this.cashAvailable += amount;
    console.log(`Deposited ₹${amount}. Current balance: ₹${this.balance}`);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Withdrawal amount must be positive.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient account balance.");
      return;
    }
    if (amount > this.cashAvailable) {
      console.log("ATM has insufficient cash.");
      return;
    }
    this.balance -= amount;
    this.cashAvailable -= amount;
    console.log(`Withdrawn ₹${amount}. Current balance: ₹${this.balance}`);
  }

  getBalance() {
    console.log(`Current balance: ₹${this.balance}`);
    return this.balance;
  }
}

// ------ Usage ------

try {
  // Direct constructor call will throw error
  // const atm = new ATM(); // Uncommenting will throw Error
} catch (e) {
  console.log(e.message);
}

// Get singleton instance
const atm = ATM.getInstance();

atm.deposit(5000);
atm.withdraw(1500);
atm.getBalance();

// Try getting instance again (same instance)
const atm2 = ATM.getInstance();

console.log("Same instance? ", atm === atm2); // true

// Trying withdrawal beyond balance
atm.withdraw(10000);
