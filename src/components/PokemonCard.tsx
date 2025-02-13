import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => (
  <Card sx={{ height: '100%' }}>
    <CardMedia component="img" height="200" image={pokemon.image} alt={pokemon.name} sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }} />
    <CardContent>
      <Typography gutterBottom variant="h6" component="div" sx={{ textTransform: 'capitalize' }}>
        {pokemon.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        #{pokemon.id.toString().padStart(3, '0')}
      </Typography>
    </CardContent>
  </Card>
);
