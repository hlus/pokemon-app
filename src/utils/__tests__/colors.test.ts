import { describe, it, expect } from 'vitest';
import { getTypeColor } from '../colors';

describe('getTypeColor', () => {
  it('returns correct color for known pokemon types', () => {
    expect(getTypeColor('fire')).toBe('#F08030');
    expect(getTypeColor('water')).toBe('#6890F0');
    expect(getTypeColor('grass')).toBe('#78C850');
  });

  it('returns default color for unknown type', () => {
    expect(getTypeColor('unknown')).toBe('#777777');
  });

  it('is case insensitive', () => {
    expect(getTypeColor('FIRE')).toBe('#F08030');
    expect(getTypeColor('Water')).toBe('#6890F0');
  });
}); 