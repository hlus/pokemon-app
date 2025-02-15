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

  it('applies correct styling to image container', () => {
    renderPokemonImage();
    const container = screen.getByAltText(mockProps.name).closest('div');
    expect(container).toHaveStyle({
      width: '100%',
      height: 0,
      paddingBottom: '100%',
      position: 'relative',
    });
  });

  it('applies correct styling to image card', () => {
    renderPokemonImage();
    const card = screen.getByAltText(mockProps.name).closest('div[class*="MuiPaper"]');
    expect(card).toHaveStyle({
      padding: '32px',
      backgroundColor: '#f5f5f5',
    });
  });

  it('applies correct styling to image', () => {
    renderPokemonImage();
    const image = screen.getByAltText(mockProps.name);
    expect(image).toHaveStyle({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    });
  });
}); 