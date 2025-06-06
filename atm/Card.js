class Card{
    constructor(cardNumber, pin,linkedAccount) {
        this.cardNumber = cardNumber;
        this.pin = pin;
        this.linkedAccount = linkedAccount;
    }

    validatePin(inputPin){
        return this.pin === inputPin;
    }
}

export default Card;