import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyle = makeStyles({
  basket: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function Basket() {
  const classes = useStyle();
  const basket = useSelector((state) => state.productsReducer.basket);
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {basket.map((item) => (
                      // eslint-disable-next-line no-underscore-dangle
                      <TableRow key={item.name}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="right">1</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Container>
        )}
    </section>
  );
}

export default Basket;
