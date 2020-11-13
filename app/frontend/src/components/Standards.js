/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * components/Standards.js 
 * 
 * Standards page containing detailed description of Open Carbon standard
 */ 

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import JSONPretty from 'react-json-pretty';
import { dataObjectSchema } from "../schemas/opencarbon.js";
import { globalstyle } from '../styles/globalstyle';
import '../styles/jsonpretty.css';

class Standards extends Component {

  render() {
    const {classes} = this.props    

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h2" gutterBottom>
                    Standards
                </Typography>

                <Typography variant="h5" align="left" color="textSecondary" component="p">
                  Our carbon emissions JSON format has been designed to be simple to read and easy to use
                </Typography>    

                <Box mt={4}>
                  <Typography variant="h5">
                    Open Carbon Standard
                  </Typography>
                </Box>

                <Box bgcolor="primary.light" p={1} pl={3} mt={2}>
                    <Typography variant="body1">
                      <JSONPretty data={dataObjectSchema}>
                      </JSONPretty>
                    </Typography>
                </Box>

                <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                      Note: all parameter values are strings where they are not explicitly arrays.
                    </Typography>
                </Box>

                <Box mt={2}>
                    <Typography variant="body1" gutterBottom>
                      The latest Open Carbon JSON schema can be downloaded at:
                    </Typography>
                </Box>

                <Box bgcolor="primary.light" p={1} pl={2} mt={2}>
                    <Typography variant="h6">
                      <a target="_new" style={{textDecoration: 'none'}} href="/schema.json">https://opencarbon.uk/schema.json</a>
                    </Typography>
                </Box>

                <Box mt={14} mb={2}>
                    <Typography variant="h6">
                      Organisation parameters
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>id</code></TableCell>
                        <TableCell>A locally-unique identifier for the organisation, created by removing all non alphanumeric characters from the organisation's name and converting to lowercase.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>name<br/><strong>(required)</strong></code></TableCell>
                        <TableCell>Name of the organisation. If a separate open carbon repository is hosted on an organisation's website, this field can be used to specify an organisation's individual sites, departments or other subunits.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>parent</code></TableCell>
                        <TableCell>Name of parent organisation. If a separate open carbon repository is hosted on an organisation's website, the parent organisation field should contain the name of the main organisation.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>osm</code></TableCell>
                        <TableCell>The URL of an <a target="_new" href="https://www.openstreetmap.org/">Open Street Map</a> 'way', 'node', or 'relation' specifically tied to the organisation's carbon emissions data. If a separate open carbon repository is hosted on an organisation's website, this field can be used to specify a distinct geolocator (and distinct emissions dataset) for each separate physical site the organisation manages.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>datasources</code></TableCell>
                        <TableCell>An array of published data sources containing carbon emissions data for the organisation (see <strong>Data source parameters</strong>, below).</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box mt={6} mb={2}>
                    <Typography variant="h6">
                      Data source parameters
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>sourceurl</code></TableCell>
                        <TableCell>The internet address of the data source. This could be a published company annual report, a webpage containing carbon emissions, or a link to a separate open carbon data repository, for example <strong>opencarbon.yourorganisation.com</strong></TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>sourcepage</code></TableCell>
                        <TableCell>The page number(s), where possible, of the data provided in <code>dataitems</code> within the original data source. This field is designed to assist manual data compilation/verification so can be extended to include text descriptors, for example "Footnotes, p12".</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>sourcecomments</code></TableCell>
                        <TableCell>Comments relating to the data within <code>dataitems</code>, for example "field 'X' was estimated from other fields in the document".</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>periodstart</code></TableCell>
                        <TableCell>The start date of the period the data in <code>dataitems</code> relates to. This string should be in the format:<br/><br/><code>YYYY-MM-DDT00:00:00</code><br/><br/> 
                        If there is data in a data source that relates to multiple different periods, a separate data source object should be created for each period.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>periodend</code></TableCell>
                        <TableCell>The end date of the period the data in <code>dataitems</code> relates to. This string should be in the format:<br/><br/><code>YYYY-MM-DDT00:00:00</code><br/><br/> 
                        If there is data in a data source that relates to multiple different periods, a separate data source object should be created for each period.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>dataitems</code></TableCell>
                        <TableCell>An array of carbon-emissions-related data items (see <strong>Data item parameters</strong>, below). Note that each data item in <code>dataitems</code> must specifically relate to the time period between <code>periodstart</code> and <code>periodend</code>.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box mt={6} mb={2}>
                    <Typography variant="h6">
                      Data item parameters
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Key</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>measure</code></TableCell>
                        <TableCell>A specific code to describe the type of data being provided, for example <code>scope1</code> for "Scope 1 Emissions". All possible values for this field are listed under <strong>Data item measure codes</strong>, below.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>unit</code></TableCell>
                        <TableCell>The units associated with the <code>value</code> field for this data item. Possible values are <code>TCO2E</code> (Metric Tonnes of CO<sub>2</sub>-equivalent) and <code>M2</code> (metres<sup>2</sup> floor area).</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>value</code></TableCell>
                        <TableCell>The numeric or other value for this particular data item. For all current data item measures, the <code>value</code> field should be a string version of a floating point value, for example <code>"12345.678"</code>.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box mt={6} mb={2}>
                    <Typography variant="h6">
                      Data item measure codes
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow className={classes.tableRow}>
                        <TableCell><code>scope1</code></TableCell>
                        <TableCell>Scope 1 emissions in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>scope2.location</code></TableCell>
                        <TableCell>Scope 2 emissions, according to location-based method of carbon accounting, in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>scope2.market</code></TableCell>
                        <TableCell>Scope 2 emissions, according to market-based method of carbon accounting, in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>scope1and2.location</code></TableCell>
                        <TableCell>Combined scope 1 and 2 emissions, according to location-based method of carbon accounting, in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>scope1and2.market</code></TableCell>
                        <TableCell>Combined scope 1 and emissions, according to market-based method of carbon accounting, in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>scope3</code></TableCell>
                        <TableCell>Scope 3 emissions in metric tonnes CO<sub>2</sub>-equivalent.</TableCell>
                      </TableRow>
                      <TableRow className={classes.tableRow}>
                        <TableCell><code>floor.area</code></TableCell>
                        <TableCell>Average total floor area in metres<sup>2</sup> of organisational entity generating reported emissions during period specified in parent data source. 
                        This figure is used to calculate the average emissions per metre<sup>2</sup> for the period specified. </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

            </Box>
        </Container>
    );
  }
}

export default withStyles(globalstyle)(Standards);

