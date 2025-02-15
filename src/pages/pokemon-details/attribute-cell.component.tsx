import React from 'react';
import { Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

interface Props {
  attribute: string;
  value: string;
}

export const AttributeCell: React.FC<Props> = ({ attribute, value }) => (
  <AttributeGridItem size={{ xs: 6 }}>
    <AttributeCard>
      <AttributeTitle variant="h6">{attribute}</AttributeTitle>
      <AttributeValue>{value}</AttributeValue>
    </AttributeCard>
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

const AttributeTitle = styled(Typography)({
  color: '#30a7d7',
  textTransform: 'capitalize',
  fontWeight: 600,
});

const AttributeValue = styled(Typography)({
  color: '#212121',
  fontWeight: 500,
});
