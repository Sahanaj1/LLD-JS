class Game {
    constructor (player1, player2, board){
        this.player1 = player1;
        this.player2 = player2;
        this.board = board;
        this.currentPlayer = player1;
    }

    switchPlayer (){
        this.currentPlayer = this.currentPlayer ===this.player1 ? this.player2 : this.player1;
    }

    playMove ( row, col){
        const symbol = this.currentPlayer.getSymbol();
        const moved = this.board.makeMove(row, col, symbol);
        if (!moved) {
            throw new Error("Invalid move. Cell already occupied.");
        }
        this.board.printGrid();

        if(this.board.checkWin(symbol)){
            console.log(`${this.currentPlayer.getPlayer()} wins!`);
            return true; // Game over
        }

        if(this.board.isFull()){
            console.log("It's a draw!");
            return true; // Game over
        }

        this.switchPlayer();
        return false; // Game continues
    }

    startGame(moves){
        console.log("game started!")

        for (let move of moves) {
            const { row, col } = move;
            const gameOver = this.playMove(row, col);
            if (gameOver) {
                break; // Exit if the game is over
            }
        }
        console.log("Game ended!");
    }
}

export default Game;