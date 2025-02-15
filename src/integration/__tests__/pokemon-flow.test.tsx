import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import mockedList from './mock/pokemon-list.json';
import mockedBulbasaurDetails from './mock/bulbasaur-details.json';
import mockedIvysaurDetails from './mock/ivysaur-details.json';

import { Pokemon } from '../../models/pokemon.model';
import { pokemonApi } from '../../services/pokemon.api';
import { PokemonList } from '../../pages/pokemon-list/pokemon-list.page';
import { PokemonDetails } from '../../pages/pokemon-details/pokemon-details.page';
import { PokemonDetails as PokemonDetailsModel } from '../../models/pokemon-details.model';

describe('Pokemon Search to Details Flow', () => {
  const mockPokemonList: Pokemon[] = mockedList;
  const mockPokemonBulbasaur: PokemonDetailsModel = mockedBulbasaurDetails;
  const mockPokemonIvysaur: PokemonDetailsModel = mockedIvysaurDetails;

  const createTestStore = () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    store.dispatch(pokemonApi.util.upsertQueryData('getPokemonList', undefined, mockPokemonList));
    store.dispatch(pokemonApi.util.upsertQueryData('getPokemonDetails', mockPokemonBulbasaur.name, mockPokemonBulbasaur));
    store.dispatch(pokemonApi.util.upsertQueryData('getPokemonDetails', mockPokemonIvysaur.name, mockPokemonIvysaur));

    return store;
  };

  it('allows user to search and navigate to pokemon details', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const searchInput = await screen.findByPlaceholderText('Enter pokemon name...');
    fireEvent.change(searchInput, { target: { value: 'bulb' } });

    const pokemonCard = await screen.findByText('bulbasaur');
    expect(pokemonCard).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pokemon-card-bulbasaur'));

    const detailsTitle = await screen.findByRole('heading', { name: 'bulbasaur', level: 4 });
    expect(detailsTitle).toBeInTheDocument();

    expect(screen.getByText('Types')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();

    const backButton = screen.getByLabelText('back');
    fireEvent.click(backButton);

    expect(await screen.findByPlaceholderText('Enter pokemon name...')).toBeInTheDocument();
  });

  it('handles search filtering correctly', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonList />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText('bulbasaur');
    const searchInput = screen.getByPlaceholderText('Enter pokemon name...');

    fireEvent.change(searchInput, { target: { value: 'ivy' } });
    await screen.findByText('ivysaur');

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });

    fireEvent.change(searchInput, { target: { value: '' } });

    await screen.findByText('bulbasaur');
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
