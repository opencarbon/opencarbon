/**
 * Mobile-responsive navbar from 
 * https://ansonlowzf.com/add-hide-on-scroll-and-back-to-top-features-to-material-ui-navbar/
 */

/**
 * components/Header.js 
 * 
 * Main navbar for mobile-responsive navbar
 */ 

import {
    AppBar,
    Container,
    Hidden,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Toolbar,
    Fab
} from "@material-ui/core";
import { KeyboardArrowUp } from "@material-ui/icons";
import * as React from "react";
import HideOnScroll from "./HideOnScroll";
import SideDrawer from "./SideDrawer";
import BackToTop from "./BackToTop";
  
const useStyles = makeStyles({
    navbarDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    navListDisplayFlex: {
      display: `flex`,
      justifyContent: `space-between`
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `white`
    }
});
  
const navLinks = [
    { title: `add data`, path: `/datamenu` },
    { title: `standards`, path: `/standards` },
    { title: `endpoints`, path: `/endpoints` },
    { title: `partners`, path: `/partners` },
    { title: `contact`, path: `/contact` },
];
  
const Header = () => {
    const classes = useStyles();
  
    return (
      <>
        <HideOnScroll>
          <AppBar position="fixed">
            <Toolbar component="nav">
              <Container maxWidth="md" className={classes.navbarDisplayFlex}>

                <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navListDisplayFlex} >
                    <a href="/" key="open carbon" className={classes.linkText}>
                    <ListItem button>
                        <ListItemText primary="Open Carbon" />
                    </ListItem>
                    </a>
                </List>

                <Hidden smDown>
                  <List
                    component="nav"
                    aria-labelledby="main navigation"
                    className={classes.navListDisplayFlex}
                  >
                    {navLinks.map(({ title, path }) => (
                      <a href={path} key={title} className={classes.linkText}>
                        <ListItem button>
                          <ListItemText primary={title} />
                        </ListItem>
                      </a>
                    ))}
                  </List>
                </Hidden>
                <Hidden mdUp>
                  <SideDrawer navLinks={navLinks} />
                </Hidden>
              </Container>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar id="back-to-top-anchor" />
  
        <BackToTop>
          <Fab color="primary" size="large" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </BackToTop>
      </>
    );
  };
  
  export default Header;
  