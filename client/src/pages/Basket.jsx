/* eslint-disable max-len */
/* eslint-disable no-const-assign */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Delete } from '@material-ui/icons';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  TextField,
} from '@material-ui/core';
import config from '../config';

const useStyle = makeStyles({
  basket: {
    display: 'flex',
    justifyContent: 'center',
  },
  basketBotton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
});

function Basket() {
  const classes = useStyle();
  const basket = useSelector((state) => state.productsReducer.basket);
  const dispatch = useDispatch();
  const commonPrice = basket.reduce((sum, item) => sum + item.price, 0);
  const [OrderDialog, setOrderDialog] = React.useState(false);
  const [form, setFrom] = React.useState({
    city: '',
    street: '',
    house: '',
    date: '',
  });
  const [addBasketOk, setAddBasketOk] = React.useState(false);
  const [addBasketErr, setAddBasketErr] = React.useState(false);

  const onChangeForm = ((event) => {
    setFrom({
      ...form,
      [event.target.id]: event.target.value,
    });
  });

  const addOrder = async () => {
    const response = await fetch(`http://${config.serverLink}/api/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form }),
    });
    setOrderDialog(false);
    if (response.status === 200) {
      setAddBasketOk(true);
      dispatch({ type: 'CLEARBASKET' });
      localStorage.removeItem('basket');
    } else {
      setAddBasketErr(true);
    }
  };

  const removeBasket = (index) => {
    const localStorageBasket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      localStorageBasket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(localStorageBasket));
    }
    dispatch({ type: 'REMOVEBASKET', payload: index });
  };

  return (
    <section className={classes.basket}>
      {basket.length === 0
        ? (
          <h1>basket is null!</h1>
        )
        : (
          <Container>
            <Snackbar open={addBasketOk} autoHideDuration={6000} onClose={() => setAddBasketOk(false)}>
              <Alert onClose={() => setAddBasketOk(false)} severity="success" variant="filled">
                add order was successful
              </Alert>
            </Snackbar>
            <Snackbar open={addBasketErr} autoHideDuration={6000} onClose={() => setAddBasketErr(false)}>
              <Alert onClose={() => setAddBasketErr(false)} severity="error" variant="filled">
                add order was successful
              </Alert>
            </Snackbar>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>name</TableCell>
                      <TableCell align="right">count</TableCell>
                      <TableCell align="right">price</TableCell>
                      <TableCell align="right" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {basket.map((item, index) => (
                      // eslint-disable-next-line no-underscore-dangle
                      <TableRow key={item._id}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={removeBasket.bind(this, index)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.basketBotton}>
                  <Button variant="contained" color="primary" onClick={() => setOrderDialog(true)}>Order</Button>
                  <Typography variant="h4" style={{ textAlign: 'right' }}>
                    Common price: {commonPrice}
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Dialog fullWidth open={OrderDialog} onClose={() => setOrderDialog(false)}>
              <DialogTitle>page for adding an order</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <form>
                    <TextField fullWidth margin="normal" label="city" id="city" variant="outlined" value={form.city} onChange={onChangeForm} />
                    <TextField fullWidth margin="normal" label="street" id="street" variant="outlined" value={form.street} onChange={onChangeForm} />
                    <TextField fullWidth margin="normal" label="house" id="house" variant="outlined" value={form.house} onChange={onChangeForm} />
                    <TextField fullWidth margin="normal" label="date" id="date" variant="outlined" value={form.date} onChange={onChangeForm} />
                  </form>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOrderDialog(false)} color="primary">
                  Disagree
                </Button>
                <Button onClick={() => addOrder()} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
    </section>
  );
}

export default Basket;
