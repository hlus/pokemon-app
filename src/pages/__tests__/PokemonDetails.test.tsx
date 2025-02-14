import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PokemonDetails } from '../PokemonDetails.page';
import { pokemonApi } from '../../services/pokemon.api';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ name: 'bulbasaur' }),
  };
});

describe('PokemonDetails', () => {
  const mockPokemonData = {
    id: 1,
    name: 'bulbasaur',
    number: '001',
    image: 'pokemon-image.png',
    types: ['grass', 'poison'],
    stats: {
      hp: 45,
      attack: 49,
    },
    height: 7,
    weight: 69,
    abilities: [
      {
        name: 'overgrow',
        text: 'Powers up Grass-type moves when the Pokémon is in trouble.',
      },
    ],
    evolution: [],
  };

  const createTestStore = () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    store.dispatch(pokemonApi.util.upsertQueryData('getPokemonDetails', 'bulbasaur', mockPokemonData));

    return store;
  };

  const renderDetails = () => {
    const store = createTestStore();
    return {
      store,
      ...render(
        <Provider store={store}>
          <BrowserRouter>
            <PokemonDetails />
          </BrowserRouter>
        </Provider>
      ),
    };
  };

  it('shows loading state initially', () => {
    renderDetails();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders pokemon details after loading', async () => {
    renderDetails();

    const pokemonName = await screen.findByText('bulbasaur');

    expect(pokemonName).toBeInTheDocument();
    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('displays stats section after loading', async () => {
    renderDetails();

    const statsHeading = await screen.findByText('Stats');
    expect(statsHeading).toBeInTheDocument();

    const hpValue = await screen.findByText('45');
    const attackValue = await screen.findByText('49');

    expect(hpValue).toBeInTheDocument();
    expect(attackValue).toBeInTheDocument();
  });
});
