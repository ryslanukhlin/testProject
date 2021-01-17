/* eslint-disable max-len */
/* eslint-disable guard-for-in */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputMask from 'react-input-mask';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
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

function Register() {
  const classes = useStyle();
  const [showPassword, setShow] = React.useState(false);
  const [form, setFrom] = React.useState({
    name: '',
    famuly: '',
    tell: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [registerStatus, setRegStatus] = React.useState(false);
  const [errFrom, setErrorsForm] = React.useState({
    name: { status: false, msg: '' },
    famuly: { status: false, msg: '' },
    tell: { status: false, msg: '' },
    email: { status: false, msg: '' },
    password: { status: false, msg: '' },
    repeatPassword: { status: false, msg: '' },
  });

  const handlerForm = (event) => {
    setFrom({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const register = async () => {
    const response = await fetch(`http://${config.serverLink}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });
    if (response.status !== 200) {
      const result = await response.json();
      const errors = {};
      const obj = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const item in errFrom) {
        obj[item] = { status: false, msg: '' };
      }
      // eslint-disable-next-line array-callback-return
      result.errors.map((err) => {
        errors[err.param] = { status: true, msg: err.msg };
      });
      setErrorsForm({ ...obj, ...errors });
    }
    if (response.status === 200) {
      setRegStatus(true);
    }
  };

  return (
    <section className="register">
      <form className={classes.form} noValidate>
        <Container maxWidth="md">
          <Snackbar open={registerStatus} autoHideDuration={6000} onClose={() => setRegStatus(false)}>
            <Alert onClose={() => setRegStatus(false)} severity="success">
              registration was successful
            </Alert>
          </Snackbar>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="First Name"
                autoFocus
                value={form.name}
                onChange={handlerForm}
                error={errFrom.name.status}
                helperText={errFrom.name.msg}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="famuly"
                label="Last Name"
                name="lastName"
                value={form.famuly}
                onChange={handlerForm}
                error={errFrom.famuly.status}
                helperText={errFrom.famuly.msg}
              />
            </Grid>
            <Grid item xs={12}>
              <InputMask mask="+7 (999) 999-9999" value={form.tell} onChange={handlerForm}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="tell"
                  label="Tell"
                  name="tell"
                  error={errFrom.tell.status}
                  helperText={errFrom.tell.msg}
                />
              </InputMask>
            </Grid>
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
                error={errFrom.email.status}
                helperText={errFrom.email.msg}
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
                error={errFrom.password.status}
                helperText={errFrom.password.msg}
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Repeat-password"
                label="Repeat-password"
                type={showPassword ? 'text' : 'password'}
                id="repeatPassword"
                value={form.repeatPassword}
                onChange={handlerForm}
                error={errFrom.repeatPassword.status}
                helperText={errFrom.repeatPassword.msg}
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
            onClick={register}
          >
            Sign Up
          </Button>
        </Container>
      </form>
    </section>
  );
}

export default Register;
