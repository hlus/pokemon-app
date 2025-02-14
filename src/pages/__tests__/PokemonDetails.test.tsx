import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, useParams } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { PokemonDetails } from '../PokemonDetails';
import { pokemonApi } from '../../services/pokemonApi';

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
    render(
      <Provider store={createMockStore()}>
        <BrowserRouter>
          <PokemonDetails />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders pokemon details', async () => {
    renderDetails();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('Types')).toBeInTheDocument();
      expect(screen.getByText('grass')).toBeInTheDocument();
      expect(screen.getByText('poison')).toBeInTheDocument();
    });
  });

  it('shows loading state while fetching data', () => {
    renderDetails();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays stats section', async () => {
    renderDetails();

    await waitFor(() => {
      expect(screen.getByText('Stats')).toBeInTheDocument();
      expect(screen.getByText('45')).toBeInTheDocument(); // HP value
      expect(screen.getByText('49')).toBeInTheDocument(); // Attack value
    });
  });
}); 