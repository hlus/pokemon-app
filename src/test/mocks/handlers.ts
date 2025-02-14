import { rest } from 'msw';

export const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        count: 2,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      })
    );
  }),

  rest.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
          { base_stat: 49, stat: { name: 'attack' } },
        ],
        height: 7,
        weight: 69,
      })
    );
  }),
]; 