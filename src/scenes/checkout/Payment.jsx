import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

const Payment = ({ values, errors, touched, handleBlur, handleChange }) => {
  return (
    <Box m='30px 0'>
      {/* Contact Info */}
      <Box>
        <Typography sx={{ mb: '25px' }} fontSize='18px'>
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type='text'
          label='Email'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name='email'
          error={!!touched.email && !!errors.email} // !! short way to cast a variable to be a boolean which is true if it is set
          helperText={touched.email && errors.email}
          sx={{ gridColumn: 'span 4', marginBottom: '15px' }}
        />
        <TextField
          fullWidth
          type='text'
          label='Phone Number'
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name='phoneNumber'
          error={!!touched.phoneNumber && !!errors.phoneNumber} // !! short way to cast a variable to be a boolean which is true if it is set
          helperText={touched.phoneNumber && errors.phoneNumber}
          sx={{ gridColumn: 'span 4' }}
        />
      </Box>
    </Box>
  );
};

export default Payment;
