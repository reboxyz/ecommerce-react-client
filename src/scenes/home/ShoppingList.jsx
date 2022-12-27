import React, { useEffect, useState } from 'react';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import Item from '../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../state';
import { useCallback } from 'react';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('all'); // Filter value used by Tabs
  const items = useSelector((state) => state.cart.items);
  console.log('items', items);

  // Note! Width exceeds 600px then it considered non-mobile
  const isNonMobile = useMediaQuery('(min-width:600px)');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  // Call backend API from Strapi to get items
  const getItems = useCallback(async () => {
    try {
      const items = await fetch(
        'http://localhost:1337/api/items?populate=image',
        {
          method: 'GET',
        }
      );
      const itemsJson = await items.json();
      dispatch(setItems(itemsJson.data)); // Note! Dispatch the 'setItems' action
    } catch (error) {
      // Todo: Proper error handling here
      console.log('error', error);
    }
  }, [dispatch]);

  useEffect(() => {
    getItems();
  }, [getItems]); /* //eslint-disable-line react-hooks/exhaustive-deps */

  const topRatedItems = items.filter(
    (item) => item.attributes.category === 'topRated'
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === 'newArrivals'
  );
  const bestSellerItems = items.filter(
    (item) => item.attributes.category === 'bestSellers'
  );

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h3' textAlign={'center'}>
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? 'block' : 'none' } }}
        sx={{
          m: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }}
      >
        <Tab label='ALL' value='all'></Tab>
        <Tab label='NEW ARRIVALS' value='newArrivals'></Tab>
        <Tab label='BEST SELLERS' value='bestSellers'></Tab>
        <Tab label='TOP RATED' value='topRated'></Tab>
      </Tabs>
      <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent={'space-around'}
        rowGap='20px'
        columnGap={'1.33%'}
      >
        {value === 'all' &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'newArrivals' &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'bestSellers' &&
          bestSellerItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {value === 'topRated' &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;
