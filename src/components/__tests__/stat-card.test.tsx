import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatCard } from '../stat-card';

describe('StatCard', () => {
  const renderStatCard = (stat: string, value: number) => {
    return render(<StatCard stat={stat} value={value} />);
  };

  it('renders stat name correctly', () => {
    renderStatCard('hp', 45);
    expect(screen.getByText('hp')).toBeInTheDocument();
  });

  it('renders stat value correctly', () => {
    renderStatCard('attack', 49);
    expect(screen.getByText('49')).toBeInTheDocument();
  });

  it('formats hyphenated stat names correctly', () => {
    renderStatCard('special-attack', 65);
    expect(screen.getByText('special attack')).toBeInTheDocument();
  });

  it('applies correct styling to stat name', () => {
    renderStatCard('defense', 49);
    const statName = screen.getByText('defense');
    expect(statName).toHaveStyle({
      textTransform: 'capitalize',
    });
  });

  it('renders stat value with correct typography variant', () => {
    renderStatCard('speed', 45);
    const statValue = screen.getByText('45');
    expect(statValue).toHaveClass('MuiTypography-h6');
  });

  it('renders stat container with padding', () => {
    renderStatCard('hp', 45);
    const container = screen.getByText('hp').closest('div');
    expect(container).toHaveStyle({
      padding: '16px',
    });
  });
}); 