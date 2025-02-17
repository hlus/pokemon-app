import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AbilityCell } from '../ability-cell.component';

describe('AbilityCell', () => {
  const mockAbility = {
    name: 'overgrow',
    text: 'Powers up Grass-type moves when the Pokémon is in trouble.',
  };

  const renderAbilityCell = () => {
    return render(<AbilityCell ability={mockAbility} />);
  };

  it('renders ability name correctly', () => {
    renderAbilityCell();
    expect(screen.getByText('overgrow')).toBeInTheDocument();
  });

  it('shows tooltip text in aria-label', () => {
    renderAbilityCell();
    const card = screen.getByLabelText(mockAbility.text);
    expect(card).toBeInTheDocument();
  });

  it('applies correct styling to ability name', () => {
    renderAbilityCell();
    const abilityName = screen.getByText('overgrow');
    expect(abilityName).toHaveStyle({
      color: '#30a7d7',
      textTransform: 'capitalize',
    });
  });

  it('renders info icon with correct color', () => {
    renderAbilityCell();
    const infoIcon = screen.getByTestId('AbilityInfoIcon');
    expect(infoIcon).toHaveStyle({
      color: '#30a7d7',
    });
  });
}); 