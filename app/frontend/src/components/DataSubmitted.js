/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/DataSubmitted.js 
 * 
 * Data submitted page is displayed after user has successfully submitted data
 */ 

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { globalstyle } from '../styles/globalstyle';

class DataSubmitted extends Component {

  render() {

    return (
      <div>

              <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h3" gutterBottom>
                      Data submitted
                    </Typography>
                    <Typography variant="h5" align="left" color="textSecondary" component="p">
                      Thank you for your submission
                    </Typography>                
                    <p>Once we have verified your submission, we will add it to our public database</p>
                </Box>
            </Container>


      </div>
    );
  }
}

export default withStyles(globalstyle)(DataSubmitted);

