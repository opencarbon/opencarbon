/**
 * Mobile-responsive navbar from 
 * https://ansonlowzf.com/add-hide-on-scroll-and-back-to-top-features-to-material-ui-navbar/
 */

/**
 * components/BackToTop.js 
 * 
 * Back to top button for mobile-responsive navbar
 */ 

import * as React from "react";
import { Zoom, useScrollTrigger } from "@material-ui/core";

const style = {
  position: `fixed`,
  bottom: `50px`,
  right: `100px`,
  zIndex: `99`
};

const BackToTop = ({ children }) => {
  const trigger = useScrollTrigger();

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" style={style}>
        {children}
      </div>
    </Zoom>
  );
};

export default BackToTop;
