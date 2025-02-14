import { parsePokemonDTO, Pokemon } from './pokemon.model';
import { EvolutionChainDTO } from './evolution.chain.dto';
import { ExtendedPokemonDetailsDTO } from './pokemon.dto';
import { PokemonAbilitiesDTO } from './pokemon-abilities.dto';

export interface Ability {
  name: string;
  text: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;
  abilities: Ability[];
  evolution: Pokemon[];
  number: string;
  stats: Record<string, number>;
  types: string[];
  height: number;
  weight: number;
}

const buildFullImageUrl = (id: number) =>
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`;

const getAllEvolutions = (chain: EvolutionChainDTO['chain']): Pokemon[] => {
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

const parseAbility = (ability: PokemonAbilitiesDTO) => {
  const entry = ability.effect_entries.find((entry) => entry.language.name === 'en');

  return { name: ability.name, text: entry?.effect || '' };
};

export const parsePokemonDetailsDto = ({
  id,
  name,
  types,
  stats,
  height,
  weight,
  abilitiesData,
  chain,
}: ExtendedPokemonDetailsDTO): PokemonDetails => {
  const abilities = abilitiesData.map(parseAbility);

  const evolution = getAllEvolutions(chain);

  return {
    id: id,
    name: name,
    abilities,
    evolution,
    number: id.toString().padStart(3, '0'),
    image: buildFullImageUrl(id),
    types: types.map((t) => t.type.name),
    stats: stats.reduce((acc, stat) => ({ ...acc, [stat.stat.name]: stat.base_stat }), {} as Record<string, number>),
    height: height / 10,
    weight: weight / 10,
  };
};
