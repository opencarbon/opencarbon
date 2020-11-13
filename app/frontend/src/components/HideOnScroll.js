/**
 * Mobile-responsive navbar from 
 * https://ansonlowzf.com/add-hide-on-scroll-and-back-to-top-features-to-material-ui-navbar/
 */

/**
 * components/HideOnScroll.js 
 * 
 * HideOnScroll for mobile-responsive navbar and 'scroll to top' button
 */ 

import * as React from "react";
import { Slide, useScrollTrigger } from "@material-ui/core";

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
