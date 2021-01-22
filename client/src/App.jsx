import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div style={{ marginTop: 90 }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/blog" exact component={() => <div>blog</div>} />
          <Route path="/chat" exact component={() => <div>chat</div>} />
          <Route
            path="/login"
            exact
            component={Login}
          />
          <Route path="/register" exact component={Register} />
          <Route path="*" component={() => <div>404</div>} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
