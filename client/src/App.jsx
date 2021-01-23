import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { amber } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Basket from './pages/Basket';
import config from './config';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
  },
});

function App() {
  const dispatch = useDispatch();

  React.useEffect(async () => {
    const token = localStorage.getItem('jwt');
    const response = await fetch(`http://${config.serverLink}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    if (response.status === 200) {
      const resault = await response.json();
      dispatch({ type: 'LOGIN', payload: resault });
    }
  }, []);

  React.useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      basket.map((item) => dispatch({ type: 'ADDBASKET', payload: item }));
    }
  }, []);

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
          <Route path="/basket" exact component={Basket} />
          <Route path="*" component={() => <div>404</div>} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
