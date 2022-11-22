import { describe, expect, it } from 'vitest';
import { getMoonScore } from '../utils/moonScore';

describe('getMoonScore', () => {
  it('should return blank for score 0', () => {
    const score = getMoonScore(0);
    expect(score).toBe('');
  });

  // TODO: Add missing test cases here
  // for ALL possible outputs of this helper function
  // Tip: don't repeat implementation details in the test
  // just rely on inputs/outputs

  it('should render 5 full moons if score 100', () => {
    const score = getMoonScore(100);

    // {n} matches the previous regex token exactly n times
    expect(score).toMatch(/^(🌕){5}$/);
  });

  // handle multiples of 20 (0%, 20%, ..., 100%)

  it('should render multiples of twenty', () => {
    for (let moonCount=0; moonCount<=5; moonCount++){
      const score = getMoonScore(moonCount * 20);
      expect(score).toBe('🌕'.repeat(moonCount));
    }
  });

  // handle non-multiples of 20 (remainder present) by testing step boundaries

  it('should render no halves, lower bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.01 ) * 20);
    expect(score).toBe('🌕'.repeat(int_part));
  });

  it('should render no halves, upper bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.39) * 20);
    expect(score).toBe('🌕'.repeat(int_part));
  });

  it('should render half a moon, lower bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.400001) * 20);  // handle floating point errs w/ +ve epsilon: 1e-6
    expect(score).toBe('🌕'.repeat(int_part) + '🌗');
  });

  it ('should render half a moon, upper bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.5) * 20);
    expect(score).toBe('🌕'.repeat(int_part) + '🌗');
  });

  it('should render full moon, lower bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.51) * 20);
    expect(score).toBe('🌕'.repeat(int_part + 1));
  });

  it('should render full moon, upper bound', () => {
    const int_part = Math.floor(Math.random() * 4.99);
    const score = getMoonScore((int_part + 0.99) * 20);
    expect(score).toBe('🌕'.repeat(int_part + 1));
  });

});
