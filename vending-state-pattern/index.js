// ---------- State Interface ----------
class State {
  insertMoney(amount) {
    throw new Error("insertMoney() not implemented");
  }

  selectItem(item) {
    throw new Error("selectItem() not implemented");
  }

  dispenseItem() {
    throw new Error("dispenseItem() not implemented");
  }
}

// ---------- Concrete States ----------
class IdleState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney(amount) {
    console.log(`₹${amount} inserted.`);
    this.machine.balance += amount;
    this.machine.setState(this.machine.hasMoneyState);
  }

  selectItem() {
    console.log("Insert money first.");
  }

  dispenseItem() {
    console.log("Insert money and select an item first.");
  }
}

class HasMoneyState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney(amount) {
    console.log(`₹${amount} added to balance.`);
    this.machine.balance += amount;
  }

  selectItem(item) {
    if (!this.machine.inventory[item]) {
      console.log(`${item} is not available.`);
      return;
    }

    const price = this.machine.inventory[item].price;
    if (this.machine.balance < price) {
      console.log(`Insufficient balance. ${item} costs ₹${price}`);
      return;
    }

    this.machine.selectedItem = item;
    this.machine.setState(this.machine.dispensingState);
    this.machine.dispenseItem();
  }

  dispenseItem() {
    console.log("Select an item first.");
  }
}

class DispensingState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney() {
    console.log("Please wait, dispensing item...");
  }

  selectItem() {
    console.log("Already processing an item...");
  }

  dispenseItem() {
    const item = this.machine.selectedItem;
    const product = this.machine.inventory[item];

    if (product.count <= 0) {
      console.log(`${item} is sold out.`);
      this.machine.setState(this.machine.soldOutState);
      return;
    }

    product.count -= 1;
    this.machine.balance -= product.price;

    console.log(`Dispensing ${item}...`);
    console.log(`Remaining balance: ₹${this.machine.balance}`);

    this.machine.selectedItem = null;

    if (this.machine.balance === 0) {
      this.machine.setState(this.machine.idleState);
    } else {
      this.machine.setState(this.machine.hasMoneyState);
    }
  }
}

class SoldOutState extends State {
  constructor(machine) {
    super();
    this.machine = machine;
  }

  insertMoney() {
    console.log("Item sold out. Refunding...");
    this.machine.setState(this.machine.idleState);
  }

  selectItem() {
    console.log("Item sold out.");
  }

  dispenseItem() {
    console.log("Nothing to dispense.");
  }
}

// ---------- Vending Machine ----------
class VendingMachine {
  constructor(inventory) {
    this.idleState = new IdleState(this);
    this.hasMoneyState = new HasMoneyState(this);
    this.dispensingState = new DispensingState(this);
    this.soldOutState = new SoldOutState(this);

    this.state = this.idleState;
    this.inventory = inventory; // { coke: {price: 30, count: 2}, chips: {...} }
    this.balance = 0;
    this.selectedItem = null;
  }

  setState(state) {
    this.state = state;
  }

  insertMoney(amount) {
    this.state.insertMoney(amount);
  }

  selectItem(item) {
    this.state.selectItem(item);
  }

  dispenseItem() {
    this.state.dispenseItem();
  }
}

// ---------- Test ----------
const inventory = {
  coke: { price: 30, count: 2 },
  chips: { price: 20, count: 1 },
  water: { price: 10, count: 0 },
};

const machine = new VendingMachine(inventory);

machine.selectItem("coke");            // Insert money first
machine.insertMoney(20);              // ₹20 inserted
machine.selectItem("coke");           // Not enough balance
machine.insertMoney(20);              // ₹20 added
machine.selectItem("coke");           // Dispensing
machine.insertMoney(10);              // Insert more money
machine.selectItem("water");          // Sold out
