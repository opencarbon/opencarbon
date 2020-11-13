/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/Endpoints.js 
 * 
 * Endpoints page describing how to access core JSON data stored on site
 */ 

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { globalstyle } from '../styles/globalstyle';

class Endpoints extends Component {

  render() {

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h2" gutterBottom>
                    Endpoints
                </Typography>

                <Box bgcolor="primary.light" p={1.5} mt={6}>
                    <Typography variant="h6">
                        <a href="/organisations" style={{textDecoration: 'none'}}>/organisations</a>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="body1">
                        Provides list of all published organisations, including their id, name, parent organisation and OSM (Open Street Map) link, if available. 
                        Detailed information about an organisation's emissions is not provided.
                    </Typography>
                </Box>

                <Box bgcolor="primary.light" p={1.5} mt={6}>
                    <Typography variant="h6">
                        <a href="/organisations?name=" style={{textDecoration: 'none'}}>/organisations?name=[name]</a>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                        Searches all published organisations by name and returns list of organisations whose name contains <code>[name]</code>, including their id, name, parent organisation and OSM (Open Street Map) link, if available. 
                        Detailed information about an organisation's emissions is not provided.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Special characters such as punctuation should be encoded when making API call. For example, for <strong>H&amp;M</strong>:
                    </Typography>
                    <Box mt={1}>
                        <Typography variant="body1">
                            <a href="/organisations?name=H%26M" style={{textDecoration: 'none'}}>/organisations?name=H%26M</a>
                        </Typography>
                    </Box>
                </Box>

                <Box bgcolor="primary.light" p={1.5} mt={6}>
                    <Typography variant="h6">
                        <a href="/organisations/[id]" style={{textDecoration: 'none'}}>/organisations/[id]</a>
                    </Typography>
                </Box>
                <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                        Provides detailed information about an organisation and its carbon emissions. 
                        The structure of the data follows <a href="/standards" style={{textDecoration: 'none', fontWeight: 'bold'}}>this specification</a>.
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <code>[id]</code> is organisation's unique identifier, a lowercase string created by removing all non-alphanumeric characters from  
                        organisation's name when record is initially created. 
                    </Typography>
                </Box>

            </Box>
        </Container>
    );
  }
}

export default withStyles(globalstyle)(Endpoints);

