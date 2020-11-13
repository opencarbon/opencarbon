/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/BuildData.js 
 * 
 * Build data page allows user to create JSON data file according to Open Carbon standard
 * Uses react-jsonschema-form component to generate interactive form off a JSON-schema-like variable
 */ 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router'
import { withStyles } from "@material-ui/core/styles";
import Form from "@rjsf/material-ui";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FileSaver from "file-saver";

import { globalstyle } from '../styles/globalstyle';

import { schemaOpenCarbonDefaultValues, schemaOpenCarbonOrganisation, schemaOpenCarbonUI } from "../schemas/opencarbon.js";
import { convertForInternal, convertForExternal } from "../functions/opencarbon.js";

class BuildData extends Component {

    constructor(props) {
      super(props);

      this.state = {
        formData: schemaOpenCarbonDefaultValues,        
        jsonField: JSON.stringify(convertForExternal(schemaOpenCarbonDefaultValues), null, 2)
      }
    }

    onChange = (submitteddata) => {
        this.setState({
            formData: submitteddata.formData, 
            jsonField: JSON.stringify(convertForInternal(schemaOpenCarbonOrganisation, submitteddata.formData), null, 2)
        });
    }

    downloadJSON = () => {
        var blob = new Blob([this.state.jsonField], {type: "application/json;charset=utf-8"});
        FileSaver.saveAs(blob, "opencarbon.json");
    }

    render () {

        return (

            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h2" gutterBottom>
                        Build Open Carbon Datafile
                    </Typography>
                    <Box mt={2}>
                        <Typography variant="body1" gutterBottom>
                            Complete the form below to create an <strong>Open Carbon JSON</strong> file for your website. 
                            You will need to upload this file to your website to make the data public. 
                            A suggested location for this file is <strong>opencarbon.yourdomain</strong>
                        </Typography>
                        <Typography variant="body1">
                            To directly submit data to our central database instead, <a href="/adddata">click here</a>
                        </Typography>

                    </Box>
 
                    <Typography variant="h6" >
                        <Form children={true} schema={schemaOpenCarbonOrganisation}
                            uiSchema = {schemaOpenCarbonUI}
                            onChange={this.onChange}
                            formData={this.state.formData}
                            />
                    </Typography>                

                    <Box mt={2} mb={2}>
                        <Button variant="contained" onClick={this.downloadJSON} color="primary">
                            Download Open Carbon JSON file
                        </Button>
                    </Box>

                    <Box mt={4} mb={4}>
                        <Typography variant="body1">
                            Once you have uploaded this file to your organisation's website, 
                            add the internet address of the file to our central database via our <a target="_new" href="/adddata">Add data</a> link                           
                        </Typography>
                    </Box>

                    <TextField inputProps={{ style: { fontFamily: "Monospace" } }}
                        id="opencarbon-json-data"
                        label="Open Carbon JSON (read-only)"
                        fullWidth
                        multiline
                        rows={20}
                        value={this.state.jsonField}
                        variant="outlined"
                        >
                    </TextField>

                </Box>
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
)(BuildData));

