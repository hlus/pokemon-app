import React from 'react';
import Grid from '@mui/material/Grid2';
import { CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getTypeColor } from '../../utils/colors';
import { Ability } from '../../models/pokemon-details.model';
import { StatCard } from '../../components/stat-card.component';
import { AbilityCell } from '../../components/ability-cell.component';
import { useGetPokemonDetailsQuery } from '../../services/pokemon.api';
import { PokemonImage } from '../../components/pokemon-image.component';
import { AttributeCell } from '../../components/attribute-cell.component';
import { PokemonEvolution } from '../../components/pokemon-evolution.component';
import {
  BackButton,
  PokemonImageSection,
  TypeBadge,
  PokemonNumber,
  PokemonName,
  TypesSection,
  SectionTitle,
  TypesWrapper,
  AttributesGrid,
  StatsSection,
  DetailsWrapper,
  LoadingWrapper,
  DetailsContainer,
  ContentBox,
  PokemonInfoSection,
} from './pokemon-details.styles';

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
