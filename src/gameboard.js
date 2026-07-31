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

    if (!this.board[y]) {
      throw new Error('Invalid Position: Row out of bounds');
    }

    let isValidPosition;
    if (horizontal) {
      isValidPosition = shipLen + x <= this.size ? true : false;
    } else {
      isValidPosition = shipLen + y <= this.size ? true : false;
    }

    if (!isValidPosition) {
      throw new Error('Invalid Position: Out of bounds');
    }

    if (horizontal) {
      for (let i = 0; i < shipLen; i++) {
        if (this.board[y][x + i] === 's') {
          throw new Error('Invalid Position: Overlaps another ship');
        }
      }
    } else {
      for (let i = 0; i < shipLen; i++) {
        if (!this.board[y + i] || this.board[y + i][x] === 's') {
          throw new Error('Invalid Position: Overlaps another ship');
        }
      }
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

  receiveAttack(y, x) {
    if (this.board[y][x] == 'h' || this.board[y][x] == 'm') {
      throw new Error('Already attacked here');
    }

    if (this.board[y][x] == 's') {
      this.board[y][x] = 'h';
      return 'hit';
    } else {
      this.board[y][x] = 'm';
      return 'miss';
    }
  }

  hasShips() {
    if (this.containsValue('s')) {
      return true;
    }
    return false;
  }

  containsValue(value) {
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        if (this.board[y][x] === value) {
          return true;
        }
      }
    }
    return false;
  }

  printBoard() {
    const header =
      '   ' + Array.from({ length: this.size }, (_, i) => i).join(' ');
    console.log(header);

    this.board.forEach((row, rowIndex) => {
      const formattedRow = row.map((cell) => (cell ? cell : '.')).join(' ');
      console.log(`${rowIndex}  ${formattedRow}`);
    });
  }
}

export { Gameboard };
