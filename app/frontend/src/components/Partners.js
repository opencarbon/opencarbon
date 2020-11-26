/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/Partners.js 
 * 
 * Partners page
 */ 

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { globalstyle } from '../styles/globalstyle';

class Partners extends Component {

  render() {

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h2" gutterBottom>
                    Partners
                </Typography>

                <Box mt={8}>
                    <a target="_new" href="https://icebreakerone.org/">
                        <img alt="Icebreaker One" width="374" height="126" src="/static/partners/01_IB1_Logo_Yellow_Roundel_Grey_Words_rgb.png" />
                    </a>
                </Box>

            </Box>
        </Container>
    );
  }
}

export default withStyles(globalstyle)(Partners);

