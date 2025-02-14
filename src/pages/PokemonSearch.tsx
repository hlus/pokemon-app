import Grid from '@mui/material/Grid2';
import React, { useState, useMemo } from 'react';
import { TextField, Container, Box, CircularProgress } from '@mui/material';

import { Pokemon } from '../types/pokemon';
import { useDebounce } from '../hooks/useDebounce';
import { PokemonCard } from '../components/PokemonCard';
import { useGetPokemonListQuery } from '../services/pokemonApi';

export const PokemonSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm);
  const { data: pokemonList = [], isLoading } = useGetPokemonListQuery();

  const filteredPokemon = useMemo(
    () => pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())),
    [pokemonList, debouncedSearch]
  );

  const renderPokemonCard = (pokemon: Pokemon) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pokemon.id}>
      <PokemonCard pokemon={pokemon} />
    </Grid>
  );

  return (
    <Box sx={{ bgcolor: '#ffffff', flex: 1, width: '100%' }}>
      <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
        <Box sx={{ position: 'sticky', top: 0, bgcolor: '#ffffff', zIndex: 1 }}>
          <TextField
            fullWidth
            label="Search Pokémon"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                bgcolor: '#ffffff',
              },
            }}
          />
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ pt: 3 }}>
            {filteredPokemon.map(renderPokemonCard)}
          </Grid>
        )}
      </Container>
    </Box>
  );
};
