import { EvolutionChainDTO } from './evolution.chain.dto';
import { PokemonAbilitiesDTO } from './pokemon-abilities.dto';

export interface AbilityItemDTO {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}
export interface PokemonDetailsDTO {
  id: number;
  name: string;
  abilities: AbilityItemDTO[];
  types: { type: { name: string } }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  height: number;
  weight: number;
  species: { name: string; url: string };
}

export interface ExtendedPokemonDetailsDTO extends PokemonDetailsDTO {
  abilitiesData: PokemonAbilitiesDTO[];
  chain: EvolutionChainDTO['chain'];
}
