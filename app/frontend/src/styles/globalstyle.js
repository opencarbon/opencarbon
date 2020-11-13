/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * styles/globalstyle.css 
 * 
 * Global CSS overrides that are fed into Material UI theme generator to generate global theme
 */ 

export const globalstyle = theme => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    tableRow: {
      verticalAlign: 'top',
    },
    tableNoWrap: {
      whiteSpace: 'nowrap',
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    spacing: {
      infoParagraph: 24,
    },  
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
});