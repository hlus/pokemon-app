import { Box } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

interface Props {
  image: string;
  name: string;
}

export const PokemonImage: React.FC<Props> = ({ image, name }) => (
  <PokemonImageCard>
    <PokemonImageWrapper>
      <Image src={image} alt={name} />
    </PokemonImageWrapper>
  </PokemonImageCard>
);

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

const Image = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});
