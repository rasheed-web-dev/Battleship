/* eslint-disable no-undef */
import { Player } from './player.js';

describe('Player Class', () => {
  let p1;
  let p2;

  beforeEach(() => {
    p1 = new Player();
    p2 = new Player('cpu');
  });

  it('Should make 2 players', () => {
    expect(p1.type).toBe('human');
    expect(p2.type).toBe('cpu');
  });

  it('Should have different boards for players', () => {
    expect(p1.board !== p2.board).toBe(true);
  });
});
