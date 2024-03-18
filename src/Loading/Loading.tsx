import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading(): JSX.Element {
  return (
    <Box 
      sx={{ display: 'flex' }}
      alignItems='center'
      justifyContent='center'
      marginTop='1rem'
    >
      <CircularProgress />
    </Box>
  );
}