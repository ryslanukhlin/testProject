import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './components/NavBar';
import Register from './pages/Register';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
  },
});

function App() {
  const count = useSelector((state) => state.userReducer.value);
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route path="/" exact component={() => <div>home</div>} />
        <Route path="/blog" exact component={() => <div>blog</div>} />
        <Route path="/chat" exact component={() => <div>chat</div>} />
        <Route path="/login" exact component={() => <div>{count}</div>} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
