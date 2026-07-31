import { Player } from './player.js';
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

function createGame() {
  let player1 = new Player();
  let player2 = new Player('cpu');
  let currentTurn = player1;

  const ships = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2,
  };

  function setupGameBoards(player1Board, player2Board) {
    const placeDefaultShips = (board) => {
      board.place(new Ship(ships.Carrier), 0, 0, true);

      board.place(new Ship(ships.Battleship), 2, 0, false);

      board.place(new Ship(ships.Cruiser), 2, 3, true);

      board.place(new Ship(ships.Submarine), 3, 5, false);

      board.place(new Ship(ships.Destroyer), 6, 2, true);
    };

    placeDefaultShips(player1Board);
    placeDefaultShips(player2Board);
  }

  setupGameBoards(player1.board, player2.board);
  player1.board.printBoard();

  function attack(y, x) {
    const enemyBoard = currentTurn === player1 ? player2.board : player1.board;

    try {
      const result = enemyBoard.receiveAttack(y, x);

      if (result === 'miss') {
        currentTurn = currentTurn === player1 ? player2 : player1;
      }

      return result;
    } catch (error) {
      console.log(error.message);
      return false; // Invalid move, try again
    }
  }

  function cpuMakeMove() {
    let validMove = false;
    let y, x;

    while (!validMove) {
      y = Math.floor(Math.random() * player1.board.size);
      x = Math.floor(Math.random() * player1.board.size);

      if (
        player1.board.board[y][x] !== 'h' &&
        player1.board.board[y][x] !== 'm'
      ) {
        validMove = true;
      }
    }

    console.log(`CPU attacks: ${y}, ${x}`);
    attack(y, x);
  }
}

createGame();
