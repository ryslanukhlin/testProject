/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import Container from '@material-ui/core/Container';
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
import { useDispatch, useSelector } from 'react-redux';
import config from '../config';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  const addBasket = (item) => {
    const basket = JSON.parse(localStorage.getItem('basket'));
    if (basket) {
      localStorage.setItem('basket', JSON.stringify([...basket, item]));
    } else {
      localStorage.setItem('basket', JSON.stringify([item]));
    }
    dispatch({ type: 'ADDBASKET', payload: item });
  };

  React.useEffect(async () => {
    const response = await fetch(`http://${config.serverLink}/api/products`);
    const resault = await response.json();
    dispatch({ type: 'GETPRODCTS', payload: resault.products });
  }, []);

  return (
    <section className="home">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {products.map((item) => (
            // eslint-disable-next-line no-underscore-dangle
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <Card>
                <CardHeader
                  title={item.name}
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
                  <Button onClick={addBasket.bind(this, item)}>add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
