class CashDispenser{
    constructor() {
        this.cashAvailable = 10000; // Initial cash available in the dispenser
    }

    dispense(amount) {
        if (amount <= 0) {
            throw new Error("Dispense amount must be positive");
        }
        if (amount > this.cashAvailable) {
            throw new Error("Insufficient cash in dispenser");
        }
        this.cashAvailable -= amount;
        return true; // Return the dispensed amount

    }
}

export default CashDispenser;