import React from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import {
  MantineProvider, ColorSchemeProvider, ColorScheme, Paper
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Router from './routes/Router';

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <div className="App">
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }}>
          <NotificationsProvider>
            <Paper>
              <Router />
            </Paper>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
