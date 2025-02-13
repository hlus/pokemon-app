import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import { theme } from './theme/theme';
import { store } from './store/store';
import { PokemonSearch } from './components/PokemonSearch';

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <PokemonSearch />
    </ThemeProvider>
  </Provider>
);

export default App;
