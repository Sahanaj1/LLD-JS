// ----- Imports -----
import Card from "./Card.js";
import BankAccount from "./BankAccount.js";
import TransactionProcessor from "./TransactionProcessor.js";
import CashDispenser from "./CashDispenser.js";
import ATM from "./Atm.js";

// ----- Setup -----

// Create a bank account with ₹10,000 balance
const account = new BankAccount("ACC123", 10000);

// Create a card linked to that account
const card = new Card("CARD123", 1234, account);

// Create required ATM components
const cashDispenser = new CashDispenser(50000); // ATM loaded with ₹50,000
const transactionProcessor = new TransactionProcessor();

// Create the ATM
const atm = new ATM(transactionProcessor, cashDispenser);

// ----- ATM Usage Simulation -----
console.log("==== ATM SESSION STARTED ====");

atm.insertCard(card);              // Insert card
atm.enterPin(1234);               // Enter correct PIN
atm.checkBalance();               // Check balance
atm.withdraw(2000);               // Withdraw ₹2000
atm.deposit(1000);                // Deposit ₹1000
atm.checkBalance();               // Check balance again
atm.ejectCard();                  // Eject card

console.log("==== ATM SESSION ENDED ====");
