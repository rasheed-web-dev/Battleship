import { Player } from './player.js';
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

function createGame() {
  let player1 = new Player();
  let player2 = new Player('cpu');

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
}

createGame();
