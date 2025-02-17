import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, IconButton } from '@mui/material';

export const DetailsWrapper = styled(Box)({
  backgroundColor: '#ffffff',
  flex: 1,
  width: '100%',
  paddingBottom: 64,
});

export const LoadingWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
});

export const DetailsContainer = styled(Container)({
  '& > div': {
    padding: '32px 0',
  },
});

export const ContentBox = styled(Box)({
  padding: '32px 0',
});

export const BackButton = styled(IconButton)({
  marginBottom: 16,
});

export const PokemonInfoSection = styled(Box)({
  marginBottom: 32,
});

export const PokemonName = styled(Typography)({
  textTransform: 'capitalize',
  marginBottom: 16,
});

export const PokemonNumber = styled(Typography)({
  marginBottom: 24,
});

export const TypesSection = styled(Box)({
  marginBottom: 32,
});

export const TypesWrapper = styled(Box)({
  display: 'flex',
  gap: 8,
});

export const AttributesGrid = styled(Grid)({
  marginBottom: 32,
});

export const StatsSection = styled(Box)({
  marginBottom: 32,
});

export const SectionTitle = styled(Typography)({
  marginBottom: 16,
  color: '#212121',
  fontWeight: 600,
});

export const TypeBadge = styled(Typography)<{ $bgColor: string }>(({ $bgColor }) => ({
  backgroundColor: $bgColor,
  color: 'white',
  padding: '8px 16px',
  borderRadius: 4,
  textTransform: 'capitalize',
}));

export const PokemonImageSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});
