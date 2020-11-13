/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/AddData.js 
 * 
 * Add data page displays add carbon data form using 'react-jsonschema-form' component
 * Complex form schema is loaded from schema file 
 * Uses Google reCAPTCHA to prevent spam submissions
 */ 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router'
import ReCAPTCHA from "react-google-recaptcha";
import { withStyles } from "@material-ui/core/styles";

import Form from "@rjsf/material-ui";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { data } from "../actions";
import { schemaOpenCarbonDefaultValues, schemaOpenCarbonOrganisationPublic, schemaOpenCarbonUI } from "../schemas/opencarbon.js";
import GOOGLE_RECAPTCHA_SITE_KEY from '../constants/recaptcha.js';

import { globalstyle } from '../styles/globalstyle';

class AddData extends Component {

    constructor(props) {
      super(props);

      this.state = {
        formData: schemaOpenCarbonDefaultValues,        
        recaptchaerror: false,        
      }

      this.recaptchaRef = React.createRef();      
    }

    onSubmit = (submitteddata) => {      
      const formdata = {...this.state.formData};
      const recaptchaValue = this.recaptchaRef.current.getValue();
      this.setState({recaptchaerror: (recaptchaValue === '')});

      if (recaptchaValue !== '') {
        formdata['recaptcha_response'] = recaptchaValue;
        this.props.submitData(formdata).then(() => {
          this.props.history.push({pathname: '/datasubmitted'});
        });
      }

      return false;
    }

    onChange = (submitteddata) => {
      this.setState({formData: submitteddata.formData});
    }

    transformErrors = (errors) => {
      // Due to possible confusing errors on dates 
      // - errors may still be displayed after dates are corrected - 
      // remove all error reporting

      return [];

      // return errors.map(error => {
      //     if ((error.property === ".data") && (error.name === 'minItems')) {
      //       error.stack = "Please add at least one data source";
      //       error.message = "Please add at least one data source";
      //     }
      //     if ((error.params !== undefined) && (error.params.format !== undefined) && (error.params.format === 'date')) {
      //       error.stack = "Please enter date. If no format shown, use YYYY-MM-DD";
      //       error.message = "Please enter date. If no format shown, use YYYY-MM-DD";
      //     } 
      //     return error;
      // });
    }

    render () {

        let recaptchaerror_top = (null);
        let recaptchaerror_bottom = (null);
        if (this.state.recaptchaerror) {
          recaptchaerror_top = (<Typography variant="h6" color="error" gutterBottom>Please scroll to bottom and click "I'm not a robot"</Typography>);
          recaptchaerror_bottom = (<Typography variant="h6" color="error" gutterBottom>Please click "I'm not a robot"</Typography>);
        }

        return (

            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h2" gutterBottom>
                        Submit Carbon Data
                    </Typography>
                    <Typography variant="h5" align="left" color="textSecondary" component="p">
                      To help us improve access to publicly available emissions data, enter details of data sources below.
                    </Typography>                

                    {recaptchaerror_top}
                    <Typography variant="h6" >
                        <Form schema={schemaOpenCarbonOrganisationPublic}
                            uiSchema = {schemaOpenCarbonUI}
                            transformErrors={this.transformErrors}
                            onChange={this.onChange}
                            formData={this.state.formData}
                            onSubmit={this.onSubmit} />
                    </Typography>                
                </Box>

                {recaptchaerror_bottom}

                <ReCAPTCHA
                  ref={this.recaptchaRef}
                  sitekey={GOOGLE_RECAPTCHA_SITE_KEY}
                />                
            </Container>
                          
        );
    }
}

export const mapStateToProps = state => {
    return {
        data: state.data,
    }
}
    
export const mapDispatchToProps = dispatch => {
    return {
        submitData: (submitteddata) => {
            return dispatch(data.submitData(submitteddata));
        },      
    }
}  
    
export default withRouter(compose(
    connect(
      mapStateToProps,
      mapDispatchToProps, 
    ),
    withStyles(globalstyle),    
)(AddData));

