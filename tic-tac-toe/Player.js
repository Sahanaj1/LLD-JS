class Player {
    constructor (name, symbol){
        this.name= name;
        this.symbol = symbol;
    }

    getPlayer (){
        return this.name;
    }

    getSymbol (){
        return this.symbol;
    }
}

export default Player;