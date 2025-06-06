class BankAccount {
    constructor(accountNumber, balance = 0) {
        this.accountNumber = accountNumber;
        // this.accountHolder = accountHolder;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.balance += amount;
        return this.balance;
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        this.balance -= amount;
        return this.balance;
    }

    getBalance() {
        return this.balance;
    }
}

export default BankAccount;