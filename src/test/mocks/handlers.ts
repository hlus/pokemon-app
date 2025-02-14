import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(
      {
        count: 2,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      },
      { status: 200 }
    );
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
    return HttpResponse.json(
      {
        id: 1,
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
        ],
        height: 7,
        weight: 69,
      },
      { status: 200 }
    );
  }),
];
