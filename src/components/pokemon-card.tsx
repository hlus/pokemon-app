import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Card, CardMedia, CardContent, Typography, CardMediaTypeMap, TypographyTypeMap } from '@mui/material';

import { Pokemon } from '../models/pokemon.model';

interface Props {
  pokemon: Pokemon;
  showBorder?: boolean;
}

export const PokemonCard: React.FC<Props> = ({ pokemon, showBorder }) => {
  const navigate = useNavigate();

  const onCardClick = () => navigate(`/pokemon/${pokemon.name}`);

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <PokemonCardContainer data-testid={`pokemon-card-${pokemon.name}`} showBorder={showBorder} onClick={onCardClick}>
        <PokemonImage component="img" image={pokemon.image} alt={pokemon.name} />
        <CardContent>
          <PokemonName gutterBottom variant="h6" component="div">
            {pokemon.name}
          </PokemonName>
          <Typography variant="body2" color="text.secondary">
            #{pokemon.id.toString().padStart(3, '0')}
          </Typography>
        </CardContent>
      </PokemonCardContainer>
    </Grid>
  );
};

const PokemonCardContainer = styled(Card)<{ showBorder?: boolean }>(({ showBorder }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  border: showBorder ? '2px solid #30a7d7' : 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
}));

const PokemonName = styled(Typography)({
  textTransform: 'capitalize',
}) as OverridableComponent<TypographyTypeMap>;

const PokemonImage = styled(CardMedia)({
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
  height: 200,
}) as OverridableComponent<CardMediaTypeMap<object, 'div'>>;
