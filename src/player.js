import { Gameboard } from './gameboard.js';

class Player {
  constructor(type = 'human') {
    this.type = type;
    this.board = new Gameboard();
  }

  chooseMove(enemyBoard, y, x) {
    enemyBoard.recieveAttack(y, x);
  }
}

export { Player };
