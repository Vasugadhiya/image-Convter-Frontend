// Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: '#0288d1', color: '#ffffff', py: 2, textAlign: 'center' }}
    >
      <Typography variant="body2">
        {'© '}
        <Link color="inherit" href="https://example.com">
          Your Company
        </Link>
        {' '}{new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
