import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';

interface StatCardProps {
  stat: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, value }) => (
  <Grid item xs={6}>
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
        {stat.replace('-', ' ')}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Paper>
  </Grid>
);
