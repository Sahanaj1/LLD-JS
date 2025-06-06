//Snake and Ladder Game using Abstract Factory Pattern

// Abstract Factory
class GameFactory {
  createBoard() { throw new Error("createBoard not implemented"); }
  createDice() { throw new Error("createDice not implemented"); }
  createPlayer(name) { throw new Error("createPlayer not implemented"); }
}

// Concrete Factory
class StandardGameFactory extends GameFactory {
  createBoard() {
    const snakes = { 16: 6, 48: 30, 62: 19, 88: 24, 95: 56, 97: 78 };
    const ladders = { 2: 38, 7: 14, 8: 31, 15: 26, 28: 84, 21: 42, 36: 44, 51: 67 };
    return new Board(100, snakes, ladders);
  }

  createDice() {
    return new Dice(6);
  }

  createPlayer(name) {
    return new Player(name);
  }
}

// Board
class Board {
  constructor(size, snakes, ladders) {
    this.size = size;
    this.snakes = snakes;
    this.ladders = ladders;
  }

  move(position, steps) {
    let newPos = position + steps;
    if (newPos > this.size) return position;
    if (this.snakes[newPos]) {
      console.log(`Oops! Snake at ${newPos}, go to ${this.snakes[newPos]}`);
      newPos = this.snakes[newPos];
    } else if (this.ladders[newPos]) {
      console.log(`Yay! Ladder at ${newPos}, climb to ${this.ladders[newPos]}`);
      newPos = this.ladders[newPos];
    }
    return newPos;
  }
}

// Dice
class Dice {
  constructor(faces) {
    this.faces = faces;
  }

  roll() {
    return Math.floor(Math.random() * this.faces) + 1;
  }
}

// Player
class Player {
  constructor(name) {
    this.name = name;
    this.position = 0;
  }

  moveTo(pos) {
    this.position = pos;
  }
}

// Game Controller
class Game {
  constructor(factory, playerNames) {
    this.board = factory.createBoard();
    this.dice = factory.createDice();
    this.players = playerNames.map(name => factory.createPlayer(name));
    this.winner = null;
  }

  start() {
    let turn = 0;
    while (!this.winner) {
      const currentPlayer = this.players[turn % this.players.length];
      const roll = this.dice.roll();
      console.log(`${currentPlayer.name} rolls a ${roll}`);
      const newPos = this.board.move(currentPlayer.position, roll);
      currentPlayer.moveTo(newPos);
      console.log(`${currentPlayer.name} is now at position ${newPos}`);
      if (newPos === this.board.size) {
        this.winner = currentPlayer;
        console.log(`🏆 ${currentPlayer.name} wins!`);
        break;
      }
      turn++;
    }
  }
}

// ---------- Run Game ----------
const factory = new StandardGameFactory();
const game = new Game(factory, ["Alice", "Bob"]);
game.start();
