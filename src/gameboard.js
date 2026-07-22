// in board: e is empty cell, s is ship cell, h is hit ship, m is missed hit

class Gameboard {
  constructor(size = 7) {
    this.size = size;
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill('e')
    );
  }

  place(ship, y, x, horizontal = true) {
    let shipLen = ship.len;

    let isValidPosition;
    if (horizontal) {
      isValidPosition = shipLen + x <= this.size ? true : false;
    } else {
      isValidPosition = shipLen + y <= this.size ? true : false;
    }

    if (this.board[y][x] == 's') {
      isValidPosition = false;
    }

    if (!isValidPosition) {
      throw new Error('Invalid Position');
    }

    if (horizontal) {
      let placement = x;
      for (let i = 0; i < shipLen; i++) {
        this.board[y][placement] = 's';
        placement++;
      }
    } else {
      let placement = y;
      for (let i = 0; i < shipLen; i++) {
        this.board[placement][x] = 's';
        placement++;
      }
    }
  }

  recieveAttack(y, x) {
    if (this.board[y][x] == 'h' || this.board[y][x] == 'm') {
      throw new Error('Already attacked here');
    }

    if (this.board[y][x] == 's') {
      this.board[y][x] = 'h';
    } else {
      this.board[y][x] = 'm';
    }
  }
}

export { Gameboard };
