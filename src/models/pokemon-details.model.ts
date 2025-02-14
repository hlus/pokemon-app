import { parsePokemonDTO, Pokemon } from './pokemon.model';
import { EvolutionChainDTO } from '../services/dto/evolution.chain.dto';
import { ExtendedPokemonDetailsDTO } from '../services/dto/pokemon.dto';

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  ability: {
    name: string;
    text: string;
  } | null;
  evolution: Pokemon[];
  number: string;
  stats: Record<string, number>;
  types: string[];
  height: number;
  weight: number;
}

const buildFullImageUrl = (id: number) =>
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`;

const getEvolvesToChain = (chain: EvolutionChainDTO['chain']): Pokemon[] => {
  const result: Pokemon[] = [parsePokemonDTO(chain.species)];

  const recurse = (evolvesTo: EvolutionChainDTO['chain']['evolves_to'][0]) => {
    result.push(parsePokemonDTO(evolvesTo.species));

    if (evolvesTo.evolves_to.length > 0) {
      recurse(evolvesTo.evolves_to[0]);
    }
  };

  if (chain.evolves_to.length > 0) {
    recurse(chain.evolves_to[0]);
  }

  return result;
};

export const parsePokemonDetailsDto = ({
  id,
  name,
  types,
  abilities,
  stats,
  height,
  weight,
  effect_entries,
  chain,
}: ExtendedPokemonDetailsDTO): PokemonDetails => {
  const abilityNotHidden = abilities.find((a) => !a.is_hidden)?.ability;

  let ability = null;
  if (abilityNotHidden) {
    const entry = effect_entries.find((entry) => entry.language.name === 'en');
    if (entry) {
      ability = { name: abilityNotHidden.name, text: entry.effect };
    }
  }

  const evolution = getEvolvesToChain(chain);

  return {
    id: id,
    name: name,
    ability,
    evolution,
    number: id.toString().padStart(3, '0'),
    image: buildFullImageUrl(id),
    types: types.map((t) => t.type.name),
    stats: stats.reduce((acc, stat) => ({ ...acc, [stat.stat.name]: stat.base_stat }), {} as Record<string, number>),
    height: height / 10,
    weight: weight / 10,
  };
};
