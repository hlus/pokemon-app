import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Box, Container, TextField, Typography, CircularProgress } from '@mui/material';

import { Pokemon } from '../../models/pokemon.model';
import { useDebounce } from '../../hooks/useDebounce';
import { PokemonCard } from '../../components/pokemon-card';
import { useGetPokemonListQuery } from '../../services/pokemon.api';

export const PokemonList: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const debouncedSearch = useDebounce(searchTerm);
  const { data: pokemonList = [], isLoading } = useGetPokemonListQuery();

  const filteredPokemon = React.useMemo(
    () =>
      debouncedSearch.trim() ? pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())) : pokemonList,
    [pokemonList, debouncedSearch]
  );

  const renderPokemonCard = React.useCallback((pokemon: Pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  return (
    <Root>
      <StyledContainer maxWidth="lg">
        <SearchBar>
          <TextField
            fullWidth
            label="Search Pokémon"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Enter pokemon name..."
          />
        </SearchBar>

        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <GridListContainer container spacing={3}>
            {filteredPokemon.map(renderPokemonCard)}
            {filteredPokemon.length === 0 && (
              <EmptyStateContainer>
                <Typography variant="h6" color="text.secondary">
                  No Pokémon found
                </Typography>
              </EmptyStateContainer>
            )}
          </GridListContainer>
        )}
      </StyledContainer>
    </Root>
  );
};

const Root = styled(Box)({
  backgroundColor: '#ffffff',
  flex: 1,
  width: '100%',
});

const StyledContainer = styled(Container)({
  paddingTop: 32,
  paddingBottom: 64,
});

const SearchBar = styled(Box)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#ffffff',
  zIndex: 1,
});

const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '64px 0',
});

const GridListContainer = styled(Grid)({ paddingTop: 16 });

const EmptyStateContainer = styled(Box)({
  width: '100%',
  textAlign: 'center',
  padding: '64px 0',
});
