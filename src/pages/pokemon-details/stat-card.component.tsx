import React from 'react';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Typography, Paper } from '@mui/material';

interface StatCardProps {
  stat: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, value }) => (
  <Grid size={{ xs: 6 }}>
    <StatContainer>
      <StatName variant="body2" color="text.secondary">
        {stat.replace('-', ' ')}
      </StatName>
      <Typography variant="h6">{value}</Typography>
    </StatContainer>
  </Grid>
);

const StatContainer = styled(Paper)({
  padding: 16,
});

const StatName = styled(Typography)({
  textTransform: 'capitalize',
});
