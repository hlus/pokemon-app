import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { PokemonListDTO } from './dto/pokemon-list.dto';
import { parsePokemonDTO, Pokemon } from '../models/pokemon.model';
import { parsePokemonDetailsDto, PokemonDetails } from '../models/pokemon-details.model';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<Pokemon[], void>({
      query: () => 'pokemon?limit=153',
      transformResponse: (response: PokemonListDTO) => response.results.map(parsePokemonDTO),
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
      transformResponse: parsePokemonDetailsDto,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
