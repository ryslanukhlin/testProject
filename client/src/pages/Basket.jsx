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
import { Delete } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const useStyle = makeStyles({
  basket: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function Basket() {
  const classes = useStyle();
  const basket = useSelector((state) => state.productsReducer.basket);
  const dispatch = useDispatch();
  const commonPrice = basket.reduce((sum, item) => sum + item.price, 0);

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
              <Typography variant="h4" style={{ textAlign: 'right', width: '100%' }}>
                Common price: {commonPrice}
              </Typography>
            </Grid>
          </Container>
        )}
    </section>
  );
}

export default Basket;
