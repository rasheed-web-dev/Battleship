import { Gameboard } from './gameboard.js';

class Player {
  constructor(type = 'human') {
    this.type = type;
    this.board = new Gameboard();
  }
}

export { Player };
