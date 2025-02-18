import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Typography, IconButton, CircularProgress } from '@mui/material';

import { StatCard } from './stat-card.component';
import { getTypeColor } from '../../utils/colors';
import { AbilityCell } from './ability-cell.component';
import { PokemonImage } from './pokemon-image.component';
import { AttributeCell } from './attribute-cell.component';
import { Ability } from '../../models/pokemon-details.model';
import { PokemonEvolution } from './pokemon-evolution.component';
import { useGetPokemonDetailsQuery } from '../../services/pokemon.api';

export const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading } = useGetPokemonDetailsQuery(name ?? '');

  const goBack = () => navigate(-1);

  const renderType = (type: string) => (
    <TypeBadge key={type} variant="body2" $bgColor={getTypeColor(type)}>
      {type}
    </TypeBadge>
  );

  const renderStat = ([stat, value]: [string, number]) => <StatCard key={stat} stat={stat} value={value} />;

  const renderAbility = (ability: Ability) => <AbilityCell key={ability.name} ability={ability} />;

  if (isLoading) {
    return (
      <DetailsWrapper>
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      </DetailsWrapper>
    );
  }

  if (!pokemon) return null;

  return (
    <DetailsWrapper>
      <DetailsContainer maxWidth="lg">
        <ContentBox>
          <BackButton onClick={goBack} aria-label="back">
            <ArrowBackIcon />
          </BackButton>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <PokemonImageSection>
                <PokemonImage image={pokemon.image} name={pokemon.name} />

                {pokemon.evolution && pokemon.evolution.length > 0 && <PokemonEvolution pokemon={pokemon} />}
              </PokemonImageSection>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <PokemonInfoSection>
                <PokemonName variant="h4" color="text.primary">
                  {pokemon.name}
                </PokemonName>
                <PokemonNumber variant="body1" color="text.secondary">
                  #{pokemon.number}
                </PokemonNumber>

                <TypesSection>
                  <SectionTitle variant="h6">Types</SectionTitle>
                  <TypesWrapper>{pokemon.types.map(renderType)}</TypesWrapper>
                </TypesSection>

                <AttributesGrid container spacing={2}>
                  <AttributeCell attribute="Height" value={`${pokemon.height} m`} />
                  <AttributeCell attribute="Weight" value={`${pokemon.weight} kg`} />

                  {pokemon.abilities.map(renderAbility)}
                </AttributesGrid>

                {pokemon.stats && (
                  <StatsSection>
                    <SectionTitle variant="h6">Stats</SectionTitle>
                    <Grid container spacing={2}>
                      {Object.entries(pokemon.stats).map(renderStat)}
                    </Grid>
                  </StatsSection>
                )}
              </PokemonInfoSection>
            </Grid>
          </Grid>
        </ContentBox>
      </DetailsContainer>
    </DetailsWrapper>
  );
};

const DetailsWrapper = styled(Box)({
  backgroundColor: '#ffffff',
  flex: 1,
  width: '100%',
  paddingBottom: 64,
});

const LoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

const DetailsContainer = styled(Container)({
  '& > div': {
    padding: '32px 0',
  },
});

const ContentBox = styled(Box)({
  padding: '32px 0',
});

const BackButton = styled(IconButton)({
  marginBottom: 16,
});

const PokemonInfoSection = styled(Box)({
  marginBottom: 32,
});

const PokemonName = styled(Typography)({
  textTransform: 'capitalize',
  marginBottom: 16,
});

const PokemonNumber = styled(Typography)({
  marginBottom: 24,
});

const TypesSection = styled(Box)({
  marginBottom: 32,
});

const TypesWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
});

const AttributesGrid = styled(Grid)({
  marginBottom: 32,
});

const StatsSection = styled(Box)({
  marginBottom: 32,
});

const SectionTitle = styled(Typography)({
  marginBottom: 16,
  color: '#212121',
  fontWeight: 600,
});

const TypeBadge = styled(Typography)<{ $bgColor: string }>(({ $bgColor }) => ({
  backgroundColor: $bgColor,
  color: 'white',
  padding: '8px 16px',
  borderRadius: 4,
  textTransform: 'capitalize',
}));

const PokemonImageSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
