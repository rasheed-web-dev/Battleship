class Ship {
  constructor(len) {
    if (len < 1) {
      throw new Error('Ship Length cannot be less than 1');
    }
    this.len = len;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits = this.hits + 1;
  }

  isSunk() {
    if (this.hits == this.len) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
    return this.sunk;
  }
}

export { Ship };
