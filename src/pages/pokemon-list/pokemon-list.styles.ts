import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const Root = styled(Box)({
  backgroundColor: '#ffffff',
  flex: 1,
  width: '100%',
});

export const StyledContainer = styled(Container)({
  paddingTop: 32,
  paddingBottom: 64,
});

export const SearchBar = styled(Box)({
  position: 'sticky',
  top: 0,
  backgroundColor: '#ffffff',
  zIndex: 1,
});

export const LoadingContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  padding: '64px 0',
});

export const GridListContainer = styled(Grid)({ paddingTop: 16 });

export const EmptyStateContainer = styled(Box)({
  width: '100%',
  textAlign: 'center',
  padding: '64px 0',
});
