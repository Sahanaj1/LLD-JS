//This uses the Decorator Design Pattern to allow dynamic addition of toppings to pizzas.

// Base Pizza interface
class Pizza {
    getCost() {
        throw new Error("Abstract method - must be implemented");
    }

    getDescription() {
        throw new Error("Abstract method - must be implemented");
    }
}

// Concrete Pizza implementation
class MargheritaPizza extends Pizza {
    getCost() {
        return 5.00;
    }

    getDescription() {
        return "Margherita Pizza";
    }
}

class VeggiePizza extends Pizza {
    getCost() {
        return 6.50;
    }

    getDescription() {
        return "Veggie Pizza";
    }
}

// Base Decorator
class PizzaDecorator extends Pizza {
    constructor(pizza) {
        super();
        this.decoratedPizza = pizza;
    }

    getCost() {
        return this.decoratedPizza.getCost();
    }

    getDescription() {
        return this.decoratedPizza.getDescription();
    }
}

// Concrete Decorators (Toppings)
class Pepperoni extends PizzaDecorator {
    getCost() {
        return this.decoratedPizza.getCost() + 1.50;
    }

    getDescription() {
        return this.decoratedPizza.getDescription() + ", Pepperoni";
    }
}

class Mushroom extends PizzaDecorator {
    getCost() {
        return this.decoratedPizza.getCost() + 1.00;
    }

    getDescription() {
        return this.decoratedPizza.getDescription() + ", Mushroom";
    }
}

class ExtraCheese extends PizzaDecorator {
    getCost() {
        return this.decoratedPizza.getCost() + 0.75;
    }

    getDescription() {
        return this.decoratedPizza.getDescription() + ", Extra Cheese";
    }
}

class Jalapeno extends PizzaDecorator {
    getCost() {
        return this.decoratedPizza.getCost() + 0.50;
    }

    getDescription() {
        return this.decoratedPizza.getDescription() + ", Jalapeno";
    }
}

// Usage
let pizza = new MargheritaPizza();
console.log(`${pizza.getDescription()} - $${pizza.getCost().toFixed(2)}`);

pizza = new ExtraCheese(pizza);
console.log(`${pizza.getDescription()} - $${pizza.getCost().toFixed(2)}`);

pizza = new Mushroom(pizza);
pizza = new Pepperoni(pizza);
console.log(`${pizza.getDescription()} - $${pizza.getCost().toFixed(2)}`);

// Another pizza with different toppings
let veggiePizza = new VeggiePizza();
veggiePizza = new Mushroom(veggiePizza);
veggiePizza = new Jalapeno(veggiePizza);
console.log(`${veggiePizza.getDescription()} - $${veggiePizza.getCost().toFixed(2)}`);