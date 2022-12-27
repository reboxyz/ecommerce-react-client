import React from 'react';
import { useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { shades } from '../../theme';

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box mt='70px' p='40px 0' backgroundColor={neutral.light}>
      <Box
        width={'80%'}
        margin='auto'
        display='flex'
        justifyContent={'space-between'}
        flexWrap='wrap'
        rowGap={'30px'}
        columnGap='clamp(20px, 30px, 40px)' // min, preferred, max
      >
        <Box width='clamp(20%, 30%, 40%)'>
          <Typography
            variant='h4'
            fontWeight={'bold'}
            mb='30px'
            color={shades.secondary[500]}
          >
            E-COMMER
          </Typography>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </div>
        </Box>
        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            About Us
          </Typography>
          <Typography mb='30px'>Careers</Typography>
          <Typography mb='30px'>Our Store</Typography>
          <Typography mb='30px'>Terms & Condition</Typography>
          <Typography mb='30px'>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Customer Care
          </Typography>
          <Typography mb='30px'>Help Center</Typography>
          <Typography mb='30px'>Track Your Order</Typography>
          <Typography mb='30px'>Corporate & Buld Purchasing</Typography>
          <Typography mb='30px'>Returns & Refund</Typography>
        </Box>

        <Box width='clamp(20%, 25%, 30%)'>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Contact Us
          </Typography>
          <Typography mb='30px'>
            50 North Whatever Blvd, Washington, DC 10501
          </Typography>
          <Typography mb='30px'>Email: something@something.com</Typography>
          <Typography mb='30px'>(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
