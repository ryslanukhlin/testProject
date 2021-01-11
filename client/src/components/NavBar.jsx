/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { amber } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[500],
    },
  },
});

function NavBar() {
  const history = useHistory();
  const classes = useStyles();
  const [drawerIsActive, setDrawerIsActive] = React.useState(false);
  const navItems = [
    {
      text: 'home',
      uri: '/',
    },
    {
      text: 'blog',
      uri: '/blog',
    },
    {
      text: 'chat',
      uri: '/chat',
    },
  ];

  const toPatch = (uri) => {
    setDrawerIsActive(false);
    history.push(uri);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar color="red">
          <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={() => setDrawerIsActive(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button onClick={toPatch.bind(this, '/login')}>Login</Button>
          <Button onClick={toPatch.bind(this, '/register')}>Register</Button>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer anchor="left" open={drawerIsActive} onClose={() => setDrawerIsActive(false)} onOpen={() => setDrawerIsActive(true)}>
        <List className={classes.list}>
          {navItems.map((item) => (
            <ListItem button key={item.uri} onClick={toPatch.bind(this, item.uri)}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </ThemeProvider>
  );
}

export default NavBar;