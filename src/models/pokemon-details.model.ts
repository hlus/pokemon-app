import { PokemonDetailsDTO } from '../services/dto/pokemon.dto';

export interface PokemonDetails {
  id: number;
  name: string;
  image: string;

  number: string;
  stats: Record<string, number>;
  types: string[];
  height: number;
  weight: number;
}

const buildFullImageUrl = (id: number) =>
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${id.toString().padStart(3, '0')}.png`;

export const parsePokemonDetailsDto = ({ id, name, types, stats, height, weight }: PokemonDetailsDTO): PokemonDetails => ({
  id: id,
  name: name,
  number: id.toString().padStart(3, '0'),
  image: buildFullImageUrl(id),
  types: types.map((t) => t.type.name),
  stats: stats.reduce((acc, stat) => ({ ...acc, [stat.stat.name]: stat.base_stat }), {} as Record<string, number>),
  height: height / 10,
  weight: weight / 10,
});
