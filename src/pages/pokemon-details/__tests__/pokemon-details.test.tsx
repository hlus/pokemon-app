import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { PokemonDetails } from '../pokemon-details.page';
import { pokemonApi } from '../../../services/pokemon.api';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ name: 'bulbasaur' }),
    useNavigate: () => mockNavigate,
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

  beforeEach(() => {
    mockNavigate.mockClear();
  });

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

  it('navigates back when clicking the back button', async () => {
    renderDetails();

    await screen.findByText('bulbasaur');

    const backButton = screen.getByLabelText('back');

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('displays pokemon abilities correctly', async () => {
    renderDetails();

    const abilityName = await screen.findByText('overgrow');
    expect(abilityName).toBeInTheDocument();

    const helpIcon = screen.getByTestId('AbilityInfoIcon');

    fireEvent.mouseOver(helpIcon);

    const tooltipText = await screen.findByText('Powers up Grass-type moves when the Pokémon is in trouble.');
    expect(tooltipText).toBeInTheDocument();
  });

  it('displays pokemon physical attributes', async () => {
    renderDetails();

    await screen.findByText('Height');
    await screen.findByText('7 m');
    await screen.findByText('Weight');
    await screen.findByText('69 kg');
  });

  it('displays pokemon number in correct format', async () => {
    renderDetails();
    const pokemonNumber = await screen.findByText('#001');
    expect(pokemonNumber).toBeInTheDocument();
  });

  it('handles null pokemon data gracefully', () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonDetails />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays evolution chain when available', async () => {
    const mockPokemonWithEvolution = {
      ...mockPokemonData,
      evolution: [
        {
          id: 1,
          name: 'bulbasaur',
          image: 'bulbasaur.png',
        },
        {
          id: 2,
          name: 'ivysaur',
          image: 'ivysaur.png',
        },
      ],
    };

    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    store.dispatch(pokemonApi.util.upsertQueryData('getPokemonDetails', 'bulbasaur', mockPokemonWithEvolution));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonDetails />
        </BrowserRouter>
      </Provider>
    );

    const evolutionTitle = await screen.findByText('Evolution');
    expect(evolutionTitle).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });

  it('applies correct styling to type badges', async () => {
    renderDetails();

    const typeBadges = await screen.findAllByText(/grass|poison/);
    typeBadges.forEach((badge) => {
      expect(badge).toHaveStyle({
        textTransform: 'capitalize',
        borderRadius: '4px',
        padding: '8px 16px',
      });
    });
  });
});
