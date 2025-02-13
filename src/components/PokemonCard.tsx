import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import { Pokemon } from '../types/pokemon';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();

  const handleOpenPokemonCard = () => navigate(`/pokemon/${pokemon.name}`);

  return (
    <Card
      sx={{
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
      onClick={handleOpenPokemonCard}
    >
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
};
