/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/NotFound.js 
 * 
 * Not Found page
 */ 

import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
          <Typography variant="h2" gutterBottom>
              Not found
          </Typography>

          <Typography variant="h5" align="left" color="textSecondary" component="p">
            The page you are looking for does not exist
          </Typography>                
      </Box>
    </Container>
  )
}

export default NotFound