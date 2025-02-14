import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { theme } from './theme/theme';
import { store } from './store/store';
import { PokemonSearch } from './pages/PokemonSearch.page';
import { PokemonDetails } from './pages/PokemonDetails.page';

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokemonSearch />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);

export default App;
