/* eslint-disable no-undef */
import { Ship } from './ship.js';

describe('Ship Class', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(5);
  });

  it('Should make a ship with length', () => {
    expect(ship.len).toBe(5);
  });

  it('Should make a ship with custom length', () => {
    let newShip = new Ship(3);
    expect(newShip.len).toBe(3);
  });

  it('Should not make a ship with 0 length', () => {
    expect(() => new Ship(0)).toThrow();
  });

  it('Should not make a ship with negative length', () => {
    expect(() => new Ship(-4)).toThrow();
  });

  it('Should have no hits at start', () => {
    expect(ship.hits).toBe(0);
  });

  it('Should have 1 hit after hit call', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('Should be sunk when hits are same as length', () => {
    expect(ship.isSunk()).toBe(false);
    while (ship.hits != ship.len) {
      ship.hit();
    }
    expect(ship.isSunk()).toBe(true);
  });
});
