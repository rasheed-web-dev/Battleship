class Gameboard {
  constructor(size = 7) {
    this.size = size;
    this.board = Array.from({ length: this.size }, () =>
      Array(this.size).fill(null)
    );
  }
}

export { Gameboard };
