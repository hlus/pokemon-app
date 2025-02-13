import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PokemonListResponse, Pokemon, PokemonDetails, PokemonApiResponse } from '../types/pokemon';

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
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: (response: PokemonApiResponse): PokemonDetails => ({
        id: response.id,
        name: response.name,
        number: response.id.toString().padStart(3, '0'),
        image: `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${response.id.toString().padStart(3, '0')}.png`,
        types: response.types.map(t => t.type.name),
        stats: {
          hp: response.stats[0].base_stat,
          attack: response.stats[1].base_stat,
          defense: response.stats[2].base_stat,
          'special-attack': response.stats[3].base_stat,
          'special-defense': response.stats[4].base_stat,
          speed: response.stats[5].base_stat,
        },
        height: response.height / 10,
        weight: response.weight / 10,
      }),
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
