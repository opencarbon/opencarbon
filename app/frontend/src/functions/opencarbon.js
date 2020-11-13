 /** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
 /**
 * functions/opencarbon.js
 * 
 * Open Carbon generic functions for converting between internal and external data structures
 * 
 * Data and UI schemas are used by react-jsonschemaform to build/validate public-facing 
 * add data form, and backend Django widget form for editing data once submitted
 */

import { schemaOpenCarbonJSONOrder } from "../schemas/opencarbon.js";

/**
 * objectScan
 * 
 * Deep-scan nested object and run transform function on any key values where key matches searchkey
 * @param {*} searchkey 
 * @param {*} transform 
 */
function objectScan(searchkey, transform) {
	return function(obj) {
		return JSON.parse(JSON.stringify(obj, function(key, value) {
			if (key === searchkey) {
				return transform(value);
			} else {
				return value;
			}
		}));
	}
}

/**
 * returnExternalDate
 * 
 * Convert date into format required for external presentation
 * @param {*} value 
 */
function returnExternalDate(value) {
	// Simple processing on assumption date may contain timezone suffix
	if (value === undefined) return value;
	if (value.length > 10) value = value.substring(0, 10);
	return value;
}

/**
 * returnInternalDate
 * 
 * Convert date into format required for internal storage
 * @param {*} value 
 */
function returnInternalDate(value) {
	// Simple processing on assumption date may contain timezone suffix 
	// and that we need to append 'T00:00:00' to be consistent with standard
	if (value === undefined) return value;
	if (value.length > 10) value = value.substring(0, 10);
	return value + 'T00:00:00';
}

/**
 * orderData
 * 
 * Order JSON for ease of readability
 * JSON keys are essentially unordered but where we can, 
 * try and maintain an order for ease of readability
 * @param {*} data 
 */
function orderData(data) {
	var i;
	if (Array.isArray(data)) {
		for(i = 0; i < data.length; i++) {
			data[i] = orderData(data[i]);
		}
		return data;
	} else if (typeof data === 'object' && data !== null) {
		var neworder = {}
		for(i = 0; i < schemaOpenCarbonJSONOrder.length; i++) {
			var key = schemaOpenCarbonJSONOrder[i];
			if (data[key] !== undefined) neworder[key] = orderData(data[key]);
		}
		return neworder;
	} else {
		return data;
	}
}

/**
 * convertForInternal
 * 
 * Convert data into format required for internal storage
 * @param {*} data 
 */
export const convertForInternal = (schema, data) => {
	data = objectScan('periodstart', returnInternalDate)(data);
	data = objectScan('periodend', returnInternalDate)(data);
    data = orderData(data);    
	return data;
};

/**
 * convertForExternal
 * 
 * Convert data into format required for external presentation
 * @param {*} data 
 */
export const convertForExternal = (data) => {
	data = objectScan('periodstart', returnExternalDate)(data);
	data = objectScan('periodend', returnExternalDate)(data);
	return data;
}