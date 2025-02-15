import React from 'react';
import Grid from '@mui/material/Grid2';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { InfoOutlined } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';

import { Ability } from '../../models/pokemon-details.model';

interface Props {
  ability: Ability;
}

export const AbilityCell: React.FC<Props> = ({ ability }) => (
  <AttributeGridItem size={{ xs: 6 }} key={ability.name}>
    <Tooltip title={ability.text} arrow>
      <AttributeCard>
        <AbilityHeader>
          <AttributeTitle variant="h6">{ability.name}</AttributeTitle>
          <AbilityInfoIcon color="primary" />
        </AbilityHeader>
      </AttributeCard>
    </Tooltip>
  </AttributeGridItem>
);

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

const AbilityHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  width: '100%',
  justifyContent: 'center',
});

const AttributeTitle = styled(Typography)({
  color: '#30a7d7',
  textTransform: 'capitalize',
  fontWeight: 600,
});

const AbilityInfoIcon = styled(InfoOutlined)({
  color: '#30a7d7',
});
