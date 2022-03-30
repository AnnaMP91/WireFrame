import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';

const paths = {
  'demandview': 'Demand View',
  // 'poreview': 'PO Review',
  'actionreview': 'History'

}

export default function ButtonAppBar() {

  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div>
            {Object.keys(paths).map((pathKey, index) => (

              location.pathname !== `/${pathKey}` &&
              <Link to={`/${pathKey}`} style={{ textDecoration: 'none', color: 'white' }} key={index}>
                <Button color="inherit">{paths[pathKey]}</Button>
              </Link>
            ))}
          </div>
        </Toolbar>
      </AppBar>
    </Box >
  );
}