/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/Contact.js 
 * 
 * Contact us page
 */ 

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { globalstyle } from '../styles/globalstyle';

class Contact extends Component {

  render() {

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h2" gutterBottom>
                    Contact
                </Typography>
                <Typography variant="body1" >
                    Drop us an email at <strong>info@opencarbon.uk</strong>
                </Typography>
            </Box>
        </Container>
    );
  }
}

export default withStyles(globalstyle)(Contact);

