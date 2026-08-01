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

      if (cellValue === 's') cell.style.backgroundColor = '#639a1f';

      playerBoardElement.appendChild(cell);
    });
  });

  state.player2Board.forEach((row, y) => {
    row.forEach((cellValue, x) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // data attributes so I know what cell is pressed
      cell.dataset.y = y;
      cell.dataset.x = x;

      cell.addEventListener('click', handleAttack);

      cpuBoardElement.appendChild(cell);
    });
  });

  updateStatus(state);
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
