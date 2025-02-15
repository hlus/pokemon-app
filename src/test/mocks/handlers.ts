import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      count: 2,
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
    });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:name', ({ params }) => {
    const { name } = params;
    return HttpResponse.json({
      id: name === 'bulbasaur' ? 1 : 2,
      name,
      number: name === 'bulbasaur' ? '001' : '002',
      image: 'pokemon-image.png',
      types: ['grass', 'poison'],
      stats: {
        hp: 45,
        attack: 49,
      },
      height: 7,
      weight: 69,
      abilities: [
        {
          name: 'overgrow',
          text: 'Powers up Grass-type moves when the Pokémon is in trouble.',
        },
      ],
      evolution: [],
    });
  }),
];
