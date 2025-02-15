import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import mockPokemon from './mock/bulbasaur.json';

import { PokemonEvolution } from '../pokemon-evolution.component';

describe('PokemonEvolution', () => {
  const renderPokemonEvolution = () => {
    return render(
      <BrowserRouter>
        <PokemonEvolution pokemon={mockPokemon} />
      </BrowserRouter>
    );
  };

  it('renders evolution section title', () => {
    renderPokemonEvolution();
    expect(screen.getByText('Evolution')).toBeInTheDocument();
  });

  it('renders all evolution pokemon cards', () => {
    renderPokemonEvolution();

    const names = mockPokemon.evolution.map((pokemon) => pokemon.name);
    names.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('applies border to current pokemon card', () => {
    renderPokemonEvolution();
    const currentPokemonCard = screen.getByTestId(`pokemon-card-${mockPokemon.name}`);
    expect(currentPokemonCard).toHaveStyle({
      border: '2px solid #30a7d7',
    });
  });

  it('does not apply border to other pokemon cards', () => {
    renderPokemonEvolution();
    const otherPokemonCard = screen.getByTestId('pokemon-card-ivysaur');
    expect(otherPokemonCard).not.toHaveStyle({
      border: '2px solid #30a7d7',
    });
  });

  it('applies correct styling to section title', () => {
    renderPokemonEvolution();
    const title = screen.getByText('Evolution');
    expect(title).toHaveStyle({
      marginBottom: '16px',
      color: '#212121',
      fontWeight: 600,
    });
  });
});
