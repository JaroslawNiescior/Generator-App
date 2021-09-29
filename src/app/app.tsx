import React, { useState } from 'react';
import { Box, Container, CssBaseline, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { plPL } from '@mui/material/locale';
import { Generator } from './generator/generator.page';
import { Router, Route, Switch } from 'react-router-dom';
import { TopBar } from '../components/topBar';
import { ROUTES } from '../components/consts';
import { HomePage } from './home/home.page';
import { Templates } from './templates/templates.page';
import { CreateTemplate } from './templates/components/createTemplate.component';
import history from '../history';
import { UpdateTemplate } from './templates/components/updateTemplate.component';

export const App: React.FC = () => {
  const [darkState, setDarkState] = useState(true);

  const theme = createTheme(
    {
      palette: {
        mode: darkState ? 'dark' : 'light',
      },
    },
    plPL,
  );

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <Router history={history}>
          <TopBar darkState={darkState} handleThemeChange={handleThemeChange} />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
              <Switch>
                <Route path={ROUTES.generator.href} component={Generator} />
                <Route path={ROUTES.templates.href} component={Templates} />
                <Route path={ROUTES.templateCreate.href} component={CreateTemplate} />
                <Route exact path={ROUTES.templateUpdate.href} component={UpdateTemplate} />
                <Route path={ROUTES.app.href} component={HomePage} />
              </Switch>
            </Container>
          </Box>
        </Router>
      </Box>
    </ThemeProvider>
  );
};
