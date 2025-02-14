import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from '../PokemonCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    image: 'pokemon-image.png',
    number: '001',
    types: ['grass'],
    stats: {},
    height: 7,
    weight: 69,
    abilities: [],
    evolution: [],
  };

  const renderCard = (showBorder = false) => {
    return render(
      <BrowserRouter>
        <PokemonCard pokemon={mockPokemon} showBorder={showBorder} />
      </BrowserRouter>
    );
  };

  it('renders pokemon information correctly', () => {
    renderCard();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'pokemon-image.png');
  });

  it('navigates to pokemon details on click', async () => {
    renderCard();
    const card = screen.getByTestId('pokemon-card-bulbasaur');
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/bulbasaur');
  });

  it('shows border when showBorder prop is true', () => {
    renderCard(true);
    const card = screen.getByTestId('pokemon-card-bulbasaur');
    expect(card).toHaveStyle({ border: '2px solid #30a7d7' });
  });
}); 