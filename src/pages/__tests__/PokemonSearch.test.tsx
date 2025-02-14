import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { PokemonSearch } from '../PokemonSearch';
import { pokemonApi } from '../../services/pokemonApi';

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
          <PokemonSearch />
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