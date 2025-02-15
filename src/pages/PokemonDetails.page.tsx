import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionMarkIcon from '@mui/icons-material/HelpOutline';
import { Box, Container, Typography, Paper, IconButton, CircularProgress, Tooltip } from '@mui/material';

import { getTypeColor } from '../utils/colors';
import { StatCard } from '../components/StatCard';
import { Pokemon } from '../models/pokemon.model';
import { PokemonCard } from '../components/PokemonCard';
import { useGetPokemonDetailsQuery } from '../services/pokemon.api';

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

  const renderPokemonCard = (pokemonEvolution: Pokemon) => (
    <PokemonCard key={pokemonEvolution.id} showBorder={pokemonEvolution.id === pokemon?.id} pokemon={pokemonEvolution} />
  );

  const renderStat = ([stat, value]: [string, number]) => <StatCard key={stat} stat={stat} value={value} />;

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
                <PokemonImageCard>
                  <PokemonImageWrapper>
                    <PokemonImage src={pokemon.image} alt={pokemon.name} />
                  </PokemonImageWrapper>
                </PokemonImageCard>

                {pokemon.evolution && pokemon.evolution.length > 0 && (
                  <EvolutionSection>
                    <SectionTitle variant="h6">Evolution</SectionTitle>
                    <Grid container spacing={2}>
                      {pokemon.evolution.map(renderPokemonCard)}
                    </Grid>
                  </EvolutionSection>
                )}
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
                  <AttributeGridItem size={{ xs: 6 }}>
                    <AttributeCard>
                      <AttributeTitle variant="h6">Height</AttributeTitle>
                      <AttributeValue>{pokemon.height} m</AttributeValue>
                    </AttributeCard>
                  </AttributeGridItem>
                  
                  <AttributeGridItem size={{ xs: 6 }}>
                    <AttributeCard>
                      <AttributeTitle variant="h6">Weight</AttributeTitle>
                      <AttributeValue>{pokemon.weight} kg</AttributeValue>
                    </AttributeCard>
                  </AttributeGridItem>

                  {pokemon.abilities.map((ability) => (
                    <AttributeGridItem size={{ xs: 6 }} key={ability.name}>
                      <AttributeCard>
                        <AbilityHeader>
                          <AttributeTitle variant="h6">{ability.name}</AttributeTitle>
                          <Tooltip title={ability.text} arrow>
                            <AbilityInfoIcon color="primary" />
                          </Tooltip>
                        </AbilityHeader>
                      </AttributeCard>
                    </AttributeGridItem>
                  ))}
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

const PokemonImageCard = styled(Paper)({
  padding: 32,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  backgroundColor: '#f5f5f5',
});

const PokemonImageWrapper = styled(Box)({
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  position: 'relative',
});

const PokemonImage = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
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

const AttributeGridItem = styled(Grid)({
  display: 'flex',
});

const AttributeCard = styled(Paper)({
  padding: 16,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
});

const AttributeTitle = styled(Typography)({
  color: '#30a7d7',
  textTransform: 'capitalize',
  fontWeight: 600,
});

const AttributeValue = styled(Typography)({
  color: '#212121',
  fontWeight: 500,
});

const StatsSection = styled(Box)({
  marginBottom: 32,
});

const EvolutionSection = styled(Box)({
  marginBottom: 0,
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

const AbilityHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  justifyContent: 'center',
});

const AbilityInfoIcon = styled(QuestionMarkIcon)({
  fontSize: 20,
  cursor: 'help',
  color: '#30a7d7',
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: '#1976d2',
  },
});
