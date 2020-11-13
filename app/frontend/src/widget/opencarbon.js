/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * widget/opencarbon.js
 * 
 * Creates Open Carbon "JSON Data" field widget used in Django conventionally-rendered admin forms
 * Note: fails to run on IE though this also affects the Material UI administration interface
 */ 

"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var MaterialUI = require("@material-ui/core");
var MaterialJsonSchemaForm = require("@rjsf/material-ui").default;

var schemasOpenCarbon = require("../schemas/opencarbon.js");
var functionsOpenCarbon = require("../functions/opencarbon.js");


/**
 * OpenCarbonField
 * 
 * React component that holds state for form
 * @param {*} props 
 */
const OpenCarbonField = (props) => {
	const [formData, setFormData] = React.useState(functionsOpenCarbon.convertForExternal(props.formData));

	return (
		<MaterialJsonSchemaForm children={true} schema={props.schema} 
		formData={formData}
		onChange={e => {setFormData(e.formData);props.onChange(functionsOpenCarbon.convertForInternal(props.schema, e.formData))}} />
	);
};


/**
 * 
 * RenderField
 * 
 * Renders Open Carbon field
 * @param {*} schema: Schema to use
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var RenderField = (schema, onChange, formData, domID) => {
	ReactDOM.render(<OpenCarbonField schema={schema} formData={formData} onChange={onChange} /> ,
	document.querySelector('#' + domID));
};

/**
 * 
 * OrganisationField
 * 
 * Renders Open Carbon Organisation field
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var OrganisationField = (onChange, formData, domID) => {
	RenderField(schemasOpenCarbon.schemaOpenCarbonOrganisation, onChange, formData, domID);
};


/**
 * 
 * DataSourcesField
 * 
 * Renders Open Carbon Data Sources field
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var DataSourcesField = (onChange, formData, domID) => {
	RenderField(schemasOpenCarbon.schemaOpenCarbonDataSources, onChange, formData, domID);
};

/**
 * 
 * DataSourceField
 * 
 * Renders Open Carbon Data Source field
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var DataSourceField = (onChange, formData, domID) => {
	RenderField(schemasOpenCarbon.schemaOpenCarbonDataSource, onChange, formData, domID);
};

/**
 * 
 * DataItemsField
 * 
 * Renders Open Carbon Data Items field
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var DataItemsField = (onChange, formData, domID) => {
	RenderField(schemasOpenCarbon.schemaOpenCarbonDataItems, onChange, formData, domID);
};

/**
 * 
 * DataItemField
 * 
 * Renders Open Carbon Data Item field
 * @param {*} onChange: Pointer to function to call when data is changed 
 * @param {*} formData: Initial data to supply to form
 * @param {*} domID: DOM id where the field will be rendered 
 */
var DataItemField = (onChange, formData, domID) => {
	RenderField(schemasOpenCarbon.schemaOpenCarbonDataItem, onChange, formData, domID);
};


module.exports = {
	schemasOpenCarbon,
	OrganisationField,
	DataSourcesField,
	DataSourceField,
	DataItemsField,
	DataItemField
};
