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
        board.board[0][2] == 's'
    ).toBe(true);
  });

  it('Should place a ship at 0 0 vertically', () => {
    let ship = new Ship(3);
    board.place(ship, 0, 0, (horizontal = false));
    expect(
      board.board[0][0] == 's' &&
        board.board[1][0] == 's' &&
        board.board[2][0] == 's'
    ).toBe(true);
  });

  it('Should place a ship at 1 1 horizontally', () => {
    let ship = new Ship(3);
    board.place(ship, 1, 1, (horizontal = true));
    expect(
      board.board[1][1] == 's' &&
        board.board[1][2] == 's' &&
        board.board[1][3] == 's'
    ).toBe(true);
  });

  it('Should not place a length 2 ship at 7 0 horizontally', () => {
    let ship = new Ship(2);
    expect(board.place(ship, 0, 7, (horizontal = true))).toThrow();
  });

  it('Should not place a length 2 ship at 0 7 vertically', () => {
    let ship = new Ship(2);
    expect(board.place(ship, 7, 0, (horizontal = false))).toThrow();
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
});
