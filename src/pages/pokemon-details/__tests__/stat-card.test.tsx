import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatCard } from '../stat-card.component';

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

  it('renders stat value with correct typography variant', () => {
    renderStatCard('speed', 45);
    const statValue = screen.getByText('45');
    expect(statValue).toHaveClass('MuiTypography-h6');
  });
}); 