import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { shades } from '../../theme';
import { addToCart } from '../../state';
import { useParams } from 'react-router-dom';
import Item from '../../components/Item';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState('description'); // Tab description toggle
  const [count, setCount] = useState(1); // Item count to add
  const [item, setItem] = useState(null); // Backend Item
  const [items, setItems] = useState([]); // Backend Items as related products

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const getItem = useCallback(async () => {
    try {
      const item = await fetch(
        `http://localhost:1337/api/items/${itemId}?populate=image`,
        { method: 'GET' }
      );
      const itemJson = await item.json();
      console.log('data', itemJson.data);
      setItem(itemJson.data);
    } catch (error) {
      // Note! Todo proper error handling
      console.log('error', error);
    }
  }, [itemId]);

  // Call backend API from Strapi to get items as related products
  const getItems = useCallback(async () => {
    try {
      const items = await fetch(
        'http://localhost:1337/api/items?populate=image',
        {
          method: 'GET',
        }
      );
      const itemsJson = await items.json();
      setItems(itemsJson.data);
    } catch (error) {
      // Todo: Proper error handling here
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId, getItem, getItems]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width={'80%'} m='80px auto'>
      {/* Image, Description, and Buttons */}
      <Box display='flex' flexWrap={'wrap'} columnGap='40px'>
        {/* IMAGE */}
        {/* Three values: flex-grow | flex-shrink | flex-basis */}
        <Box flex='1 1 40%' mb='40px'>
          <img
            alt={item?.name}
            width='100%'
            height='100%'
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ ojbectFit: 'contain' }}
          />
        </Box>
        {/* ACTIONS */}
        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent={'space-between'}>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>
          <Box m='65px 0 25px 0'>
            <Typography variant='h3'>{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          {/* COUNT and BUTTON */}
          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border={`1.5px solid ${shades.neutral[300]}`}
              mr='20px'
              p='2px 5px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: 0,
                minWidth: '150px',
                padding: '10px 40px',
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m='20px 0 5px 0' display='flex'>
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: '5px' }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m='20px 0'>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label='DESCRIPTION' value='description'></Tab>
          <Tab label='REVIEWS' value='reviews'></Tab>
        </Tabs>
      </Box>

      <Box display='flex' flexWrap={'wrap'} gap='15px'>
        {value === 'description' && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === 'reviews' && <div>REVIEWS Component goes here</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt='50px' width='100%'>
        <Typography variant='h3' fontWeight={'bold'}>
          Related Products
        </Typography>
        <Box
          mt='20px'
          display='flex'
          flexWrap={'wrap'}
          columnGap='1.33%'
          justifyContent={'space-between'}
        >
          {items.slice(0, 4).map((item, i) => (
            <Item key={`${item.name}-${i}`} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
