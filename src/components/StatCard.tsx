import React from 'react';
import Grid from '@mui/material/Grid2';
import { Typography, Paper } from '@mui/material';

interface StatCardProps {
  stat: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, value }) => (
  <Grid size={{ xs: 6 }}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
        {stat.replace('-', ' ')}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  </Grid>
);
