import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PokemonListResponse, Pokemon } from '../types/pokemon';

const getIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/?$/);
  return matches ? parseInt(matches[1]) : 0;
};

const getPokemonImageUrl = (id: number): string => {
  const paddedId = id.toString().padStart(3, '0');
  return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${paddedId}.png`;
};

const transformPokemonResponse = (pokemon: PokemonListResponse['results'][0]): Pokemon => {
  const id = getIdFromUrl(pokemon.url);
  return {
    id,
    name: pokemon.name,
    image: getPokemonImageUrl(id),
  };
};

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<Pokemon[], void>({
      query: () => 'pokemon?limit=151',
      transformResponse: (response: PokemonListResponse) => response.results.map(transformPokemonResponse),
    }),
  }),
});

export const { useGetPokemonListQuery } = pokemonApi;
