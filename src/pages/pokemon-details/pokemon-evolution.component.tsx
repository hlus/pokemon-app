import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { Pokemon } from '../../models/pokemon.model';
import { PokemonCard } from '../../components/pokemon-card';
import { PokemonDetails } from '../../models/pokemon-details.model';

interface Props {
  pokemon: PokemonDetails;
}

export const PokemonEvolution: React.FC<Props> = ({ pokemon }) => {
  const renderPokemonCard = (pokemonEvolution: Pokemon) => (
    <PokemonCard key={pokemonEvolution.id} showBorder={pokemonEvolution.id === pokemon?.id} pokemon={pokemonEvolution} />
  );

  return (
    <EvolutionSection>
      <SectionTitle variant="h6">Evolution</SectionTitle>
      <Grid container spacing={2}>
        {pokemon.evolution.map(renderPokemonCard)}
      </Grid>
    </EvolutionSection>
  );
};

const SectionTitle = styled(Typography)({
  marginBottom: 16,
  color: '#212121',
  fontWeight: 600,
});

const EvolutionSection = styled(Box)({
  marginBottom: 0,
});
