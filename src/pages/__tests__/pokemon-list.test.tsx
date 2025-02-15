import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

import { PokemonList } from '../pokemon-list/pokemon-list.page';
import { pokemonApi } from '../../services/pokemon.api';

const createMockStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
  });

describe('PokemonSearch', () => {
  const renderSearch = () => {
    render(
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders search input', () => {
    renderSearch();
    expect(screen.getByPlaceholderText('Enter pokemon name...')).toBeInTheDocument();
  });

  it('filters pokemon list based on search input', async () => {
    renderSearch();
    const searchInput = screen.getByPlaceholderText('Enter pokemon name...');

    await userEvent.type(searchInput, 'bulb');

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('ivysaur')).not.toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', () => {
    renderSearch();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
