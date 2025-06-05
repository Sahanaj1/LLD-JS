class Board {
    constructor() {
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }

    printGrid(){
        this.grid.forEach(row => {
            console.log(row.join(' | '));
            console.log('---------');
        })
    }

    makeMove ( row,col, symbol){
        if(this.grid[row][col]==''){
            this.grid[row][col] = symbol;
            return true;
        }
        return false;
    }

    isFull(){
        return this.grid.every(row => row.every(cell => cell !== ''));
    }

    checkWin(symbol){
        for ( let i= 0; i< 3; i++){
            if ( this.grid[i].every(cell => cell[i] === symbol) || 
                 this.grid[i].map((row)=> row[i]).every(cell => cell === symbol)){ 
                return true;
            }
        }

        if( [0,1,2].every (i=> this.grid[i][i]=== symbol) || 
            [0,1,2].every (i=> this.grid[i][2-i]=== symbol)){
            return true;
        }
        return false;
    }

    reset (){
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
    }
}

export default Board;