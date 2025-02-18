import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SpeciesDTO } from '../models/species.dto';
import { PokemonDetailsDTO } from '../models/pokemon.dto';
import { PokemonListDTO } from '../models/pokemon-list.dto';
import { EvolutionChainDTO } from '../models/evolution.chain.dto';
import { parsePokemonDTO, Pokemon } from '../models/pokemon.model';
import { PokemonAbilitiesDTO } from '../models/pokemon-abilities.dto';
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
      transformResponse: async (response: PokemonDetailsDTO) => {
        const notHiddenAbilities = response.abilities.filter((a) => !a.is_hidden);

        // Get abilities and text meaning
        const abilitiesData = await Promise.all(notHiddenAbilities.map((a) => axios.get<PokemonAbilitiesDTO>(a.ability.url)));

        // Get evolution data
        const { data: speciesData } = await axios.get<SpeciesDTO>(response.species.url);
        const { data: evolutionChain } = await axios.get<EvolutionChainDTO>(speciesData.evolution_chain.url);

        return parsePokemonDetailsDto({ ...response, abilitiesData: abilitiesData.map(({ data }) => data), chain: evolutionChain.chain });
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
