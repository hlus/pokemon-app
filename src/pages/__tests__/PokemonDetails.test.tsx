import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter, useParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PokemonDetails } from '../PokemonDetails.page';
import { pokemonApi } from '../../services/pokemon.api';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const createMockStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  });

describe('PokemonDetails', () => {
  beforeEach(() => {
    (useParams as any).mockReturnValue({ name: 'bulbasaur' });
  });

  const renderDetails = () => {
    return render(
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <PokemonDetails />
        </BrowserRouter>
      </Provider>
    );
  };

  it('shows loading state initially', () => {
    renderDetails();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // it('renders pokemon details after loading', async () => {
  //   renderDetails();

  //   // Wait for the pokemon name to appear
  //   const pokemonName = await screen.findByText('bulbasaur');
  //   expect(pokemonName).toBeInTheDocument();

  //   // Check for other elements that should be present
  //   expect(screen.getByText('Types')).toBeInTheDocument();
  //   expect(screen.getByText('grass')).toBeInTheDocument();
  //   expect(screen.getByText('poison')).toBeInTheDocument();
  // });

  // it('displays stats section after loading', async () => {
  //   renderDetails();

  //   // Wait for stats heading to appear
  //   const statsHeading = await screen.findByText('Stats');
  //   expect(statsHeading).toBeInTheDocument();

  //   // Check for stat values
  //   const hpValue = await screen.findByText('45');
  //   const attackValue = await screen.findByText('49');
    
  //   expect(hpValue).toBeInTheDocument();
  //   expect(attackValue).toBeInTheDocument();
  // });
});
