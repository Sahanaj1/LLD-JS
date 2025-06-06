class TransactionProcessor {
    processWithdrawal(account, amount) {
        return account.withdraw(amount);
    }

    processDeposit(account, amount) {
        account.deposit(amount);
    }
}
export default TransactionProcessor;