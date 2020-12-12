/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * App.js
 * 
 * App pulls together header, content and footer for display and routes paths correctly
 */ 

import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import OpenCarbonApp from "./reducers";

import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import Header from "./components/Header";
import Home from './components/Home';
import DataMenu from './components/DataMenu';
import AddData from './components/AddData';
import BuildData from './components/BuildData';
import DataSubmitted from './components/DataSubmitted';
import Standards from './components/Standards';
import Endpoints from './components/Endpoints';
import Partners from './components/Partners';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

import { globalstyle } from './styles/globalstyle';

let store = createStore(OpenCarbonApp, applyMiddleware(thunk));

/**
 * Main class for app that builds content and routes paths for application
 */
class App extends Component {

  render() {
    const {classes} = this.props    

    return (

      <Provider store={store}>
        <BrowserRouter>

          <Header />
          
          <main>
            <div className={classes.heroContent}>
              <Container >

                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/datamenu" component={DataMenu} />
                  <Route exact path="/adddata" component={AddData} />
                  <Route exact path="/builddata" component={BuildData} />
                  <Route exact path="/datasubmitted" component={DataSubmitted} />
                  <Route exact path="/standards" component={Standards} />
                  <Route exact path="/endpoints" component={Endpoints} />
                  <Route exact path="/partners" component={Partners} />
                  <Route exact path="/contact" component={Contact} />
                  <Route component={NotFound} />
                </Switch>

              </Container>
            </div>
          </main>

          <footer className={classes.footer}>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                <Link variant="button" target="_new" href="https://icebreakerone.org/">
                    An Icebreaker One project
                </Link>
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p" gutterBottom>
                <Link variant="button" target="_new" href="https://eit.europa.eu/">
                    Supported by EIT Climate-KIC
                </Link>
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                <Link variant="button" href="https://github.com/opencarbon/opencarbon.git">
                    GitHub
                </Link>
            </Typography>
          </footer>

        </BrowserRouter>
      </Provider>
    )
  }
}

export default withStyles(globalstyle)(App);
