class ATM {
    constructor(transactionProcessor, cashDispenser) {
        this.transactionProcessor = transactionProcessor;
        this.cashDispenser = cashDispenser;
        this.card = null;
        this.account = null;
    }

    insertCard(card) {
        this.card = card;
        console.log("Card inserted.");
    }

    enterPin(pin) {
        if (this.card && this.card.validatePin(pin)) {
            this.account = this.card.linkedAccount;
            console.log("PIN validated.");
        } else {
            console.log("Invalid PIN.");
            this.card = null;
        }
    }

    checkBalance() {
        if (this.account) {
            console.log(`Balance: ₹${this.account.getBalance()}`);
        } else {
            console.log("No account authenticated.");
        }
    }

    withdraw(amount) {
        if (!this.account) {
            console.log("No account authenticated.");
            return;
        }

        const success = this.transactionProcessor.processWithdrawal(this.account, amount);
        if (success && this.cashDispenser.dispense(amount)) {
            console.log("Withdrawal successful.");
        } else {
            console.log("Withdrawal failed.");
        }
    }

    deposit(amount) {
        if (!this.account) {
            console.log("No account authenticated.");
            return;
        }

        this.transactionProcessor.processDeposit(this.account, amount);
        console.log("Deposit successful.");
    }

    ejectCard() {
        console.log("Card ejected.");
        this.card = null;
        this.account = null;
    }
}

export default ATM;
