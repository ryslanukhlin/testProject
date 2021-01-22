/* eslint-disable max-len */
/* eslint-disable guard-for-in */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import config from '../config';

const useStyle = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch();
  const classes = useStyle();
  const [showPassword, setShow] = React.useState(false);
  const [form, setFrom] = React.useState({
    email: '',
    password: '',
  });
  const [loginError, setLogError] = React.useState(false);
  const handlerForm = (event) => {
    setFrom({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const login = async () => {
    const response = await fetch(`http://${config.serverLink}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });
    if (response.status !== 200) setLogError(true);
    else {
      const json = await response.json();
      dispatch({ type: 'LOGIN', payload: json });
    }
  };

  if (isAuth) return <Redirect to="/" />;// is auth to redirect home

  return (
    <section className="login">
      <form className={classes.form} noValidate>
        <Container maxWidth="md">
          <Snackbar open={loginError} autoHideDuration={6000} onClose={() => setLogError(false)}>
            <Alert onClose={() => setLogError(false)} severity="error" variant="filled">
              invalid username or password
            </Alert>
          </Snackbar>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handlerForm}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={form.password}
                onChange={handlerForm}
                InputProps={{
                  endAdornment:
  <InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      onClick={() => setShow(!showPassword)}
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>,
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Sign In
          </Button>
        </Container>
      </form>
    </section>
  );
}

export default Login;
