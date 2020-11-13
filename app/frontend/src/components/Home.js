/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/Home.js 
 * 
 * Home page for Open Carbon website
 */ 
 
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { globalstyle } from '../styles/globalstyle';

class Home extends Component {

  render() {
    const {classes} = this.props    

    return (
      <div>

        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Open Carbon
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
            An open data repository of public carbon data
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
                <Link variant="button" href="/datamenu" >
                    <Button variant="contained" color="primary">
                        Add carbon data
                    </Button>
                </Link>
            </Grid>
            <Grid item>
                <Link variant="button" href="/organisations/">
                    <Button variant="outlined" color="primary">
                        View organisations
                    </Button>
                </Link>
            </Grid>
          </Grid>
        </div>

      </div>
    );
  }
}

export default withStyles(globalstyle)(Home);

