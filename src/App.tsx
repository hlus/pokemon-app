import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { theme } from './theme/theme';
import { store } from './store/store';
import { PokemonList } from './pages/pokemon-list/pokemon-list.page';
import { PokemonDetails } from './pages/pokemon-details/pokemon-details.page';

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
