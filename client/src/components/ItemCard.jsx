/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function ItemCard({ item, index }) {
  const [isAddBasket, setAddBasket] = React.useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const [errAddBasketItem, setErrAddBasktet] = React.useState(false);

  React.useEffect(() => {
    const indexAddBasket = JSON.parse(localStorage.getItem('basket'))[index];
    if (indexAddBasket) {
      setAddBasket(true);
    }
  }, []);
  // eslint-disable-next-line no-shadow
  const addBasket = (item) => {
    if (!isAuth) {
      return setErrAddBasktet(true);
    }
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      localStorage.setItem('basket', JSON.stringify([...basket, item]));
    } else {
      localStorage.setItem('basket', JSON.stringify([item]));
    }
    dispatch({ type: 'ADDBASKET', payload: item });
    setAddBasket(true);
  };

  // eslint-disable-next-line no-shadow
  const removeBasket = (index) => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      const newArr = [
        ...basket.slice(0, index),
        ...basket.slice(index + 1),
      ];
      localStorage.setItem('basket', JSON.stringify(newArr));
    }
    dispatch({ type: 'REMOVEBASKET', payload: index });
    setAddBasket(false);
  };

  return (
    // eslint-disable-next-line no-underscore-dangle
    // eslint-disable-next-line react/prop-types
    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
      <Snackbar
        open={errAddBasketItem}
        autoHideDuration={6000}
        onClose={() => setErrAddBasktet(false)}
      >
        <Alert onClose={() => setErrAddBasktet(false)} severity="error" variant="filled">
          you need to log in
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          // eslint-disable-next-line react/prop-types
          title={item.name}
          // eslint-disable-next-line react/prop-types
          subheader={item.price}
        />
        <CardMedia
          style={{ height: '200px', width: '100%' }}
          image="https://p0.zoon.ru/preview/jZqpAobbcKWGlUEQAknZIw/2400x1500x85/1/6/8/original_5846210766d71a4a438b456a_5846217645254.jpg"
        />
        <CardContent style={{ height: 115 }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          {!isAddBasket ? (
            <Button onClick={addBasket.bind(this, item)}>add to cart</Button>
          ) : (
            <Button onClick={removeBasket.bind(this, index)}>remove to cart</Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ItemCard;
