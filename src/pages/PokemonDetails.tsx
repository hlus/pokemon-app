import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Container, Typography, Grid, Paper, IconButton, CircularProgress } from '@mui/material';

import { getTypeColor } from '../utils/colors';
import { StatCard } from '../components/StatCard';
import { useGetPokemonDetailsQuery } from '../services/pokemonApi';

export const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading } = useGetPokemonDetailsQuery(name ?? '');

  const renderStatCard = ([stat, value]: [string, number]) => (
    <Grid item xs={6} key={stat}>
      <StatCard stat={stat} value={value} />
    </Grid>
  );

  const goBack = () => navigate(-1);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) return null;

  return (
    <Box sx={{ bgcolor: '#ffffff', flex: 1, width: '100%', pb: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <IconButton onClick={goBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <img src={pokemon.image} alt={pokemon.name} style={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain' }} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h4" sx={{ textTransform: 'capitalize', mb: 2 }}>
                  {pokemon.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  #{pokemon.number}
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Types
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {pokemon.types.map((type) => (
                      <Typography
                        key={type}
                        variant="body2"
                        sx={{
                          bgcolor: getTypeColor(type),
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 1,
                          textTransform: 'capitalize',
                        }}
                      >
                        {type}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {pokemon.stats && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Stats
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(pokemon.stats).map(renderStatCard)}
                    </Grid>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
