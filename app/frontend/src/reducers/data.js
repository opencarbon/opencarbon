/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * reducers/data.js 
 * 
 * React redux data reducer
 * 
 * Currently performs no action as no state needs to change after data is submitted
 */ 

import { initialStateData } from "./initializers"
  
export default function data(state=initialStateData, action) {
        
    switch (action.type) {
  
        case 'SUBMIT_DATA':
            return state;
                
        default:
            return state;
    }
}

