import { Player } from './player.js';
import { Ship } from './ship.js';

export function createGame() {
  let player1 = new Player();
  let player2 = new Player('cpu');
  let currentTurn = player1;
  let gameOver = false;

  function playRound(y, x) {
    if (gameOver || currentTurn !== player1) {
      return;
    }

    const attackValid = attack(y, x);
    if (!attackValid) {
      return;
    }

    checkWinner();

    // If human missed and it's now the CPU's turn, let the CPU play
    while (!gameOver && currentTurn === player2) {
      cpuMakeMove();
      checkWinner();
    }
  }

  const ships = {
    Carrier: 5,
    Battleship: 4,
    Cruiser: 3,
    Submarine: 3,
    Destroyer: 2,
  };

  function setupCPUShips() {
    player2.board.place(new Ship(ships.Carrier), 0, 0, true);
    player2.board.place(new Ship(ships.Battleship), 2, 0, false);
    player2.board.place(new Ship(ships.Cruiser), 2, 3, true);
    player2.board.place(new Ship(ships.Submarine), 3, 5, false);
    player2.board.place(new Ship(ships.Destroyer), 6, 2, true);
  }
  setupCPUShips();

  function placePlayerShip(length, y, x, isHorizontal) {
    try {
      player1.board.place(new Ship(length), y, x, isHorizontal);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

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

  function checkWinner() {
    if (!player1.board.hasShips()) {
      gameOver = true;
      return 'cpu';
    }
    if (!player2.board.hasShips()) {
      gameOver = true;
      return 'player1';
    }
    return null;
  }

  function resetGame() {
    player1 = new Player();
    player2 = new Player('cpu');
    currentTurn = player1;
    gameOver = false;

    setupCPUShips();
  }

  function getState() {
    return {
      player1Board: player1.board.board,
      player2Board: player2.board.board,
      currentTurn: currentTurn.type,
      isGameOver: gameOver,
    };
  }

  return {
    attack,
    cpuMakeMove,
    checkWinner,
    playRound,
    resetGame,
    getState,
    placePlayerShip,
  };
}
