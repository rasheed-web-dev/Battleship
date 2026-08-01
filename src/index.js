import './styles.css';
import { createGame } from './game.js';

const game = createGame();

const statusDisplay = document.getElementById('status-display');
const playerBoardElement = document.getElementById('player-board');
const cpuBoardElement = document.getElementById('cpu-board');

function renderBoards() {
  playerBoardElement.innerHTML = '';
  cpuBoardElement.innerHTML = '';

  const state = game.getState();

  state.player1Board.forEach((row) => {
    row.forEach((cellValue) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (cellValue === 's') cell.classList.add('ship');
      if (cellValue === 'm') cell.classList.add('miss');
      if (cellValue === 'h') cell.classList.add('hit');

      playerBoardElement.appendChild(cell);
    });
  });

  state.player2Board.forEach((row, y) => {
    row.forEach((cellValue, x) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (cellValue === 'm') cell.classList.add('miss');
      if (cellValue === 'h') cell.classList.add('hit');

      cell.dataset.y = y;
      cell.dataset.x = x;

      if (cellValue !== 'h' && cellValue !== 'm') {
        cell.addEventListener('click', handleAttack);
      } else {
        cell.style.pointerEvents = 'none';
      }

      cpuBoardElement.appendChild(cell);
    });
  });

  updateStatus(state);
}

function renderShips() {
  const shipsContainer = document.getElementById('ships-container');
  shipsContainer.innerHTML = '';

  const shipsToPlace = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Cruiser', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Destroyer', length: 2 },
  ];

  shipsToPlace.forEach((ship) => {
    const shipElement = document.createElement('div');
    shipElement.classList.add('ship-shape');

    shipElement.dataset.length = ship.length;
    shipElement.dataset.name = ship.name;

    for (let i = 0; i < ship.length; i++) {
      const block = document.createElement('div');
      block.classList.add('ship-block');
      shipElement.appendChild(block);
    }

    shipsContainer.appendChild(shipElement);
  });
}

function handleAttack(e) {
  const y = parseInt(e.target.dataset.y);
  const x = parseInt(e.target.dataset.x);

  game.playRound(y, x);

  renderBoards();
}

function updateStatus(state) {
  if (state.isGameOver) {
    statusDisplay.textContent = `${state.currentTurn === 'human' ? 'CPU' : 'You'} Won!`;
  } else {
    statusDisplay.textContent =
      state.currentTurn === 'human' ? 'Your Turn' : 'Enemy Turn';
  }
}

renderBoards();
renderShips();
