import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Typography, Paper, IconButton, CircularProgress } from '@mui/material';

import { getTypeColor } from '../utils/colors';
import { StatCard } from '../components/StatCard';
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
          <BackButton onClick={goBack}>
            <ArrowBackIcon />
          </BackButton>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ImageWrapper>
                <img src={pokemon.image} alt={pokemon.name} />
              </ImageWrapper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoSection>
                <PokemonName variant="h4">{pokemon.name}</PokemonName>
                <PokemonNumber variant="body1" color="text.secondary">
                  #{pokemon.number}
                </PokemonNumber>

                <TypesSection>
                  <SectionTitle variant="h6">Types</SectionTitle>
                  <TypesWrapper>{pokemon.types.map(renderType)}</TypesWrapper>
                </TypesSection>

                <AbilityInfoCard>
                  <AbilityTitle variant="h6">Height</AbilityTitle>
                  <AbilityValue>{pokemon.height} m</AbilityValue>
                  <AbilityTitle variant="h6">Weight</AbilityTitle>
                  <AbilityValue>{pokemon.weight} kg</AbilityValue>
                  {pokemon.ability && <AbilityTitle variant="h6">{pokemon.ability.name}</AbilityTitle>}
                </AbilityInfoCard>

                {pokemon.stats && (
                  <StatsSection>
                    <SectionTitle variant="h6">Stats</SectionTitle>
                    <Grid container spacing={2}>
                      {Object.entries(pokemon.stats).map(renderStat)}
                    </Grid>
                  </StatsSection>
                )}
              </InfoSection>
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

const ImageWrapper = styled(Paper)({
  padding: 32,
  height: '100%',
  '& img': {
    width: '100%',
    height: 'auto',
    maxHeight: 400,
    objectFit: 'contain',
  },
});

const InfoSection = styled(Box)({
  marginBottom: 32,
});

const TypesWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
});

const ContentBox = styled(Box)({
  padding: '32px 0',
});

const BackButton = styled(IconButton)({
  marginBottom: 16,
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

const StatsSection = styled(Box)({
  marginBottom: 0,
});

const SectionTitle = styled(Typography)({
  marginBottom: 16,
});

const TypeBadge = styled(Typography)<{ $bgColor: string }>(({ $bgColor }) => ({
  backgroundColor: $bgColor,
  color: 'white',
  padding: '8px 16px',
  borderRadius: 4,
  textTransform: 'capitalize',
}));

const AbilityInfoCard = styled(Paper)({
  backgroundColor: '#30a7d7',
  borderRadius: 8,
  padding: 16,
});

const AbilityTitle = styled(Typography)({
  color: 'white',
});
const AbilityValue = styled(Typography)({
  color: '#212121',
});
