import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from '../PokemonCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
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
  };

  const renderCard = (showBorder = false) => {
    render(
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
    await userEvent.click(screen.getByRole('button'));
    expect(mockNavigate).toHaveBeenCalledWith('/pokemon/bulbasaur');
  });

  it('shows border when showBorder prop is true', () => {
    renderCard(true);
    const card = screen.getByRole('button');
    expect(card).toHaveStyle({ border: '2px solid #30a7d7' });
  });
}); 