import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PokemonImage } from '../pokemon-image.component';

describe('PokemonImage', () => {
  const mockProps = {
    image: 'pokemon-image.png',
    name: 'bulbasaur',
  };

  const renderPokemonImage = () => {
    return render(<PokemonImage {...mockProps} />);
  };

  it('renders image with correct src and alt', () => {
    renderPokemonImage();
    const image = screen.getByAltText(mockProps.name);
    expect(image).toHaveAttribute('src', mockProps.image);
  });

  it('renders image within container', () => {
    renderPokemonImage();
    const container = screen.getByAltText(mockProps.name).closest('div');
    expect(container).toBeInTheDocument();
  });
}); 