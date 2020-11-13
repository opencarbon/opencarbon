/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/DataMenu.js 
 * 
 * Page displaying different links to add Open Carbon data
 */ 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router'
import { withStyles } from "@material-ui/core/styles";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import { globalstyle } from '../styles/globalstyle';

class DataMenu extends Component {

    render () {
        const {classes} = this.props    

        return (

            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                            title="Submit data"
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            className={classes.cardHeader} />
                            <CardContent style={{minHeight: "32vh"}}>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        Add
                                    </Typography>
                                </div>
                                <ul>
                                    <Typography component="li" variant="subtitle1" align="center">
                                        Submit organisation's carbon data or related publications, eg. annual reports, to our central database
                                    </Typography>
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Link style={{width: '100%'}} variant="button" href="/adddata" >
                                    <Button fullWidth variant="contained" color="primary">
                                        Submit data
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                            title="Build data file"
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            className={classes.cardHeader} />
                            <CardContent style={{minHeight: "32vh"}}>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        Publish
                                    </Typography>
                                </div>
                                <ul>
                                    <Typography component="li" variant="subtitle1" align="center">
                                        Create Open Carbon compliant JSON datafiles from emissions data for publication on your website
                                    </Typography>
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Link style={{width: '100%'}} variant="button" href="/builddata" >
                                    <Button fullWidth variant="contained" color="primary">
                                        Build data file 
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                            title="Create repository"
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            className={classes.cardHeader} />
                            <CardContent style={{minHeight: "32vh"}}>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        Manage
                                    </Typography>
                                </div>
                                <ul>
                                    <Typography component="li" variant="subtitle1" align="center">
                                        Create Open Carbon data repositories - for effective management of public emissions data within large organisations                                        
                                    </Typography>
                                </ul>
                            </CardContent>
                            <CardActions fullWidth>
                                <Link style={{width: '100%'}} target="_new" fullWidth variant="button" href="https://github.com/opencarbon/opencarbon/" >
                                    <Button fullWidth variant="contained" color="primary">
                                        Create repository
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
          </Container>       
                          
        );
    }
}

export const mapStateToProps = state => {
    return {
    }
}
    
export const mapDispatchToProps = dispatch => {
    return {
    }
}  
    
export default withRouter(compose(
    connect(
      mapStateToProps,
      mapDispatchToProps, 
    ),
    withStyles(globalstyle),    
)(DataMenu));

