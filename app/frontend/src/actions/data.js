/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * actions/data.js 
 * 
 * React redux data actions
 * Handles data submissions to backend database using react redux methodology
 */ 

import { API_URL } from "../constants";

export const submitData = (data) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};  
      let body = JSON.stringify(data);
  
      return fetch(API_URL + "/organisations/", {headers, method: "POST", body})
        .then(res => {

          if (res.status === 400) {
            res.json().then(data => {
              console.log("Error", data);
            });
            throw res;
          } else if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }

        })
        .then(res => {

          if (res.status === 201) {
            return dispatch({type: 'SUBMIT_DATA', data: res.data});
          } else if (res.status === 401 || res.status === 403) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }

        })
    }
  }