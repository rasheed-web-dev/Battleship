/* eslint-disable no-undef */
import { Gameboard } from './gameboard.js';
import { Ship } from './ship.js';

describe('Gameboard Class', () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  it('Should make a board with default size', () => {
    expect(board.size).toBe(7);
  });

  it('Should make a board with custom size', () => {
    let newBoard = new Gameboard(7);
    expect(newBoard.size).toBe(7);
  });

  it('Should place a ship at 0 0 horizontally', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    expect(
      board.board[0][0] == 's' &&
        board.board[0][1] == 's' &&
        board.board[0][2] == 's' &&
        board.board[0][3] == 'e'
    ).toBe(true);
  });

  it('Should place a ship at 0 0 vertically', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = false));
    expect(
      board.board[0][0] == 's' &&
        board.board[1][0] == 's' &&
        board.board[2][0] == 's' &&
        board.board[3][0] == 'e'
    ).toBe(true);
  });

  it('Should place a ship at 1 1 horizontally', () => {
    let ship = new Ship(3);
    board.place(ship, 1, 1, (horizontal = true));
    expect(
      board.board[1][1] == 's' &&
        board.board[1][2] == 's' &&
        board.board[1][3] == 's' &&
        board.board[1][4] == 'e'
    ).toBe(true);
  });

  it('Should not place a length 2 ship at 0 7 horizontally', () => {
    let ship = new Ship(2);
    expect(() => {
      board.place(ship, 0, 7, true);
    }).toThrow('Invalid Position');
  });

  it('Should not place a length 2 ship at 7 0 vertically', () => {
    let ship = new Ship(2);
    expect(() => {
      board.place(ship, 7, 0, false);
    }).toThrow('Invalid Position');
  });

  it('Should recieve attack at 0 0 with no ship', () => {
    board.recieveAttack(0, 0);
    expect(board.board[0][0]).toBe('m');
  });

  it('Should recieve attack at 0 0 with a ship', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    board.recieveAttack(0, 0);
    expect(board.board[0][0]).toBe('h');
  });

  it('Should not recieve attack if already hit', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    board.recieveAttack(0, 0);
    expect(() => {
      board.recieveAttack();
    }).toThrow();
  });

  it('Should keep track of missed attacks', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    board.recieveAttack(0, 0);
    board.recieveAttack(1, 0);
    expect(board.board[1][0]).toBe('m');
  });

  it('Should know when all ships are sunk', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    board.recieveAttack(0, 0);
    board.recieveAttack(0, 1);
    board.recieveAttack(0, 2);
    expect(board.hasShips()).toBe(false);
  });

  it('Should know when ships are remaining', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = true));
    board.recieveAttack(1, 0);
    board.recieveAttack(2, 1);
    board.recieveAttack(3, 2);
    expect(board.hasShips()).toBe(true);
  });
});
