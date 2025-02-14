import { getIdFromUrl } from '../utils/get-id-from-url';
import { PokemonItemDTO } from '../services/dto/pokemon-list.dto';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const getPokemonImageUrl = (id: number): string =>
  `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${id.toString().padStart(3, '0')}.png`;

export const parsePokemonDTO = (pokemonDTO: PokemonItemDTO) => {
  const id = getIdFromUrl(pokemonDTO.url);

  return {
    id,
    name: pokemonDTO.name,
    image: getPokemonImageUrl(id),
  };
};
