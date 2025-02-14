import axios from 'axios';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SpeciesDTO } from './dto/species.dto';
import { PokemonDetailsDTO } from './dto/pokemon.dto';
import { PokemonListDTO } from './dto/pokemon-list.dto';
import { EvolutionChainDTO } from './dto/evolution.chain.dto';
import { PokemonAbilitiesDTO } from './dto/pokemon-abilities.dto';
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
      transformResponse: async (response: PokemonDetailsDTO) => {
        const abilityNotHidden = response.abilities.find((a) => !a.is_hidden)?.ability;

        // Get ability text
        let abilityData: PokemonAbilitiesDTO = { effect_entries: [], flavor_text_entries: [] };
        if (abilityNotHidden) {
          const { data } = await axios.get<PokemonAbilitiesDTO>(abilityNotHidden.url);
          abilityData = data;
        }

        // Get evolution data
        const { data: speciesData } = await axios.get<SpeciesDTO>(response.species.url);
        const { data: evolutionChain } = await axios.get<EvolutionChainDTO>(speciesData.evolution_chain.url);

        return parsePokemonDetailsDto({ ...response, effect_entries: abilityData.effect_entries, chain: evolutionChain.chain });
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailsQuery } = pokemonApi;
