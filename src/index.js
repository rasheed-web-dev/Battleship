import './styles.css';
import { createGame } from './game.js';

const game = createGame();

const statusDisplay = document.getElementById('status-display');
const playerBoardElement = document.getElementById('player-board');
const cpuBoardElement = document.getElementById('cpu-board');

const rotateBtn = document.getElementById('rotate-btn');
const shipsContainer = document.getElementById('ships-container');

let isHorizontal = true;
let setupPhase = true;

rotateBtn.addEventListener('click', () => {
  isHorizontal = !isHorizontal;
  shipsContainer.classList.toggle('vertical-ships');
});

function renderBoards() {
  playerBoardElement.innerHTML = '';
  cpuBoardElement.innerHTML = '';

  const state = game.getState();

  state.player1Board.forEach((row, y) => {
    row.forEach((cellValue, x) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (cellValue === 's') cell.classList.add('ship');
      if (cellValue === 'm') cell.classList.add('miss');
      if (cellValue === 'h') cell.classList.add('hit');

      cell.dataset.y = y;
      cell.dataset.x = x;

      cell.addEventListener('dragover', (e) => e.preventDefault());
      cell.addEventListener('drop', handleDrop);

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

    shipElement.setAttribute('draggable', 'true');
    shipElement.id = ship.name;

    shipElement.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('length', ship.length);
      e.dataTransfer.setData('id', ship.name);
    });

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

function handleDrop(e) {
  if (!setupPhase) return;

  const length = parseInt(e.dataTransfer.getData('length'));
  const shipId = e.dataTransfer.getData('id'); // I'll be honest this I copied from online...
  const y = parseInt(e.target.dataset.y);
  const x = parseInt(e.target.dataset.x);

  const success = game.placePlayerShip(length, y, x, isHorizontal);

  if (success) {
    document.getElementById(shipId).remove();
    renderBoards();

    if (shipsContainer.children.length === 0) {
      setupPhase = false;
      document.getElementById('setup-controls').style.display = 'none';
      shipsContainer.style.display = 'none';
      document.getElementById('status-display').textContent =
        'Game Started! Your Turn.';
    }
  }
}

function handleAttack(e) {
  if (setupPhase) return;

  const y = parseInt(e.target.dataset.y);
  const x = parseInt(e.target.dataset.x);

  game.playRound(y, x);

  renderBoards();
}

function updateStatus(state) {
  if (state.isGameOver) {
    statusDisplay.textContent =
      state.currentTurn === 'human' ? 'You Won!' : 'CPU Won!';
  } else {
    statusDisplay.textContent =
      state.currentTurn === 'human' ? 'Your Turn' : 'Enemy Turn';
  }
}

renderBoards();
renderShips();
