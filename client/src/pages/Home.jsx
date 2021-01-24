/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import config from '../config';
import ItemCard from '../components/ItemCard';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsReducer.products);

  React.useEffect(async () => {
    const response = await fetch(`http://${config.serverLink}/api/products`);
    const resault = await response.json();
    dispatch({ type: 'GETPRODCTS', payload: resault.products });
  }, []);

  return (
    <section className="home">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {products.map((item, index) => (
            <ItemCard item={item} index={index} />
          ))}
        </Grid>
      </Container>
    </section>
  );
}

export default Home;
