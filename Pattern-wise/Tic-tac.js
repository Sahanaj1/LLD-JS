//this uses the State Design Pattern to manage the game state transitions

// -------- GameState Interface --------
class GameState {
  constructor(context) {
    this.context = context;
  }

  makeMove(row, col) {
    throw new Error("makeMove must be implemented");
  }
}

// -------- Player X State --------
class PlayerXState extends GameState {
  makeMove(row, col) {
    if (this.context.board[row][col] !== '') {
      console.log("⛔ Invalid move. Cell is occupied.");
      return;
    }

    this.context.board[row][col] = 'X';
    this.context.printBoard();

    if (this.context.checkWinner('X')) {
      console.log("🎉 Player X wins!");
      this.context.setState(new GameOverState(this.context));
    } else if (this.context.isDraw()) {
      console.log("🤝 It's a draw!");
      this.context.setState(new GameOverState(this.context));
    } else {
      this.context.setState(new PlayerOState(this.context));
    }
  }
}

// -------- Player O State --------
class PlayerOState extends GameState {
  makeMove(row, col) {
    if (this.context.board[row][col] !== '') {
      console.log("⛔ Invalid move. Cell is occupied.");
      return;
    }

    this.context.board[row][col] = 'O';
    this.context.printBoard();

    if (this.context.checkWinner('O')) {
      console.log("🎉 Player O wins!");
      this.context.setState(new GameOverState(this.context));
    } else if (this.context.isDraw()) {
      console.log("🤝 It's a draw!");
      this.context.setState(new GameOverState(this.context));
    } else {
      this.context.setState(new PlayerXState(this.context));
    }
  }
}

// -------- Game Over State --------
class GameOverState extends GameState {
  makeMove(row, col) {
    console.log("🏁 Game is over. No more moves allowed.");
  }
}

// -------- Game Context --------
class GameContext {
  constructor() {
    this.board = Array.from({ length: 3 }, () => ['', '', '']);
    this.state = new PlayerXState(this);
  }

  setState(state) {
    this.state = state;
  }

  makeMove(row, col) {
    this.state.makeMove(row, col);
  }

  checkWinner(symbol) {
    const b = this.board;
    const win =
      [0, 1, 2].some(i => b[i][0] === symbol && b[i][1] === symbol && b[i][2] === symbol) || // rows
      [0, 1, 2].some(i => b[0][i] === symbol && b[1][i] === symbol && b[2][i] === symbol) || // cols
      (b[0][0] === symbol && b[1][1] === symbol && b[2][2] === symbol) || // diag
      (b[0][2] === symbol && b[1][1] === symbol && b[2][0] === symbol);   // anti-diag
    return win;
  }

  isDraw() {
    return this.board.flat().every(cell => cell !== '');
  }

  printBoard() {
    console.log("\nCurrent Board:");
    this.board.forEach(row => {
      console.log(row.map(cell => cell || '-').join(" | "));
    });
    console.log("");
  }
}

// -------- Run Simulation --------
const game = new GameContext();

// X O X
// O X O
// O X X -> X wins
game.makeMove(0, 0); // X
game.makeMove(0, 1); // O
game.makeMove(0, 2); // X
game.makeMove(1, 0); // O
game.makeMove(1, 1); // X
game.makeMove(1, 2); // O
game.makeMove(2, 1); // X
game.makeMove(2, 0); // O
game.makeMove(2, 2); // X (wins)

game.makeMove(0, 0); // Should say game over
