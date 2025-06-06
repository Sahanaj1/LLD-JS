//this uses the adapter pattern

// ----- Target Interface -----
class VendingPaymentInterface {
  pay(amount) {
    throw new Error("Method 'pay()' must be implemented.");
  }
}

// ----- Adaptee (3rd-party wallet) -----
class ThirdPartyWallet {
  makePayment(amt) {
    console.log(`💰 Payment of ₹${amt} made via ThirdPartyWallet.`);
  }
}

// ----- Adapter -----
class WalletAdapter extends VendingPaymentInterface {
  constructor() {
    super();
    this.wallet = new ThirdPartyWallet();
  }

  pay(amount) {
    // Adapting pay() to makePayment()
    this.wallet.makePayment(amount);
  }
}

// ----- Vending Machine -----
class VendingMachine {
  constructor(paymentProvider) {
    this.paymentProvider = paymentProvider;
    this.items = {
      chips: 20,
      soda: 40,
      chocolate: 30,
    };
  }

  purchaseItem(itemName) {
    if (!this.items[itemName]) {
      console.log(`❌ Item "${itemName}" not available.`);
      return;
    }

    const price = this.items[itemName];
    console.log(`🛒 Purchasing ${itemName} for ₹${price}`);
    this.paymentProvider.pay(price);
    console.log(`✅ Purchase complete.\n`);
  }
}

// ----- Usage -----
const adapter = new WalletAdapter(); // adapter conforms to VendingPaymentInterface
const vendingMachine = new VendingMachine(adapter);

vendingMachine.purchaseItem("chips");
vendingMachine.purchaseItem("soda");
vendingMachine.purchaseItem("candy"); // Not available
