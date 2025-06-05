import Player from "./Player.js";
import Board from "./Board.js";
import Game from "./Game.js";

const player1 = new Player("Player 1", "X");
const player2 = new Player("Player 2", "O");
const board = new Board();

const game = new Game(player1, player2, board);
const moves = [
    { row: 0, col: 0 }, // Player 1
    { row: 0, col: 1 }, // Player 2
    { row: 1, col: 1 }, // Player 1
    { row: 0, col: 2 }, // Player 2
    { row: 2, col: 2 }, // Player 1
    { row: 1, col: 0 }, // Player 2
    { row: 2, col: 0 }, // Player 1
    { row: 1, col: 2 }, // Player 2
    { row: 2, col: 1 }  // Player 1
];
game.startGame(moves);
console.log("Game finished!");
console.log("Final Board State:");
board.printGrid();