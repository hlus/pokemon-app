import React from 'react';
import { TextField, Typography, CircularProgress } from '@mui/material';

import { Pokemon } from '../../models/pokemon.model';
import { useDebounce } from '../../hooks/useDebounce';
import { PokemonCard } from '../../components/pokemon-card';
import { useGetPokemonListQuery } from '../../services/pokemon.api';
import { EmptyStateContainer, GridListContainer, LoadingContainer, Root, SearchBar, StyledContainer } from './pokemon-list.styles';

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
