import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#0288d1' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Image Converter
        </Typography>
        <Button color="inherit" sx={{ ml: 2 }} href="/signup">
          Sign Up
        </Button>
        <Button color="inherit" sx={{ ml: 2 }} href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
