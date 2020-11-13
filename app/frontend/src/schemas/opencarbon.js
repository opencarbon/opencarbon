/** 
 * Copyright (c) Open Carbon, 2020
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * schemas/opencarbon.js
 * 
 * Stores schemas that manage data structures for Open Carbon
 * 
 * Data and UI schemas are used by react-jsonschemaform to build/validate public-facing 
 * add data form, and backend Django widget form for editing data once submitted
 * 'dataObjectSchema' contains data structure for display to user through '/standards' path
 */


 /**
 * schemaOpenCarbonDataItem
 * Second-level schema describing dataitem
 */
export const schemaOpenCarbonDataItem = {
    type: "object",
    properties: {
        measure: {
            type: "string", 
            title: "Measure", 
            enum: [
                "scope1",
                "scope2.location",
                "scope2.market",
                "scope1and2.location",
                "scope1and2.market",
                "scope3",
                "floor.area"
            ],
            enumNames: [
                "Scope 1 (Metric Tonnes CO2e)",
                "Scope 2 - Location-based (Metric Tonnes CO2e)",
                "Scope 2 - Market-based (Metric Tonnes CO2e)",
                "Scope 1 & 2 - Location-based (Metric Tonnes CO2e)",
                "Scope 1 & 2 - Market-based (Metric Tonnes CO2e)",
                "Scope 3 (Metric Tonnes CO2e)",
                "Floor area (m2)"
            ]
        },
        unit: {
            type: "string", 
            title: "Unit", 
            enum: [
                "TCO2E",
                "M2"
            ],
            enumNames: [
                "Metric Tonnes CO2e",
                "m2"
            ]
        },        
        value: {
            type: "string", 
            title: "Value"
        }                            
    }
}


/**
 * schemaOpenCarbonDataItemPublic
 * Second-level schema describing dataitem for public data additions 
 * Backend logic will determine the value of 'unit' based on 'measure'
 */
export const schemaOpenCarbonDataItemPublic = {
    type: "object",
    properties: {
        measure: {
            type: "string", 
            title: "Measure", 
            enum: [
                "scope1",
                "scope2.location",
                "scope2.market",
                "scope1and2.location",
                "scope1and2.market",
                "scope3",
                "floor.area"
            ],
            enumNames: [
                "Scope 1 (Metric Tonnes CO2e)",
                "Scope 2 - Location-based (Metric Tonnes CO2e)",
                "Scope 2 - Market-based (Metric Tonnes CO2e)",
                "Scope 1 & 2 - Location-based (Metric Tonnes CO2e)",
                "Scope 1 & 2 - Market-based (Metric Tonnes CO2e)",
                "Scope 3 (Metric Tonnes CO2e)",
                "Floor area (m2)"
            ]
        },
        value: {
            type: "string", 
            title: "Value"
        }                            
    }
}


/**
 * schemaOpenCarbonDataItems
 * Second-level nesting of dataitems
 */
export const schemaOpenCarbonDataItems = {
    type: "array",
    title: "Data",
    minItems: 0,
    items: schemaOpenCarbonDataItem
}

/**
 * schemaOpenCarbonDataItemsPublic
 * Second-level nesting of dataitems for public data additions 
 * Backend logic will determine the value of 'unit' based on 'measure'
 */
export const schemaOpenCarbonDataItemsPublic = {
    type: "array",
    title: "Data",
    minItems: 0,
    items: schemaOpenCarbonDataItemPublic
}

/**
 * schemaOpenCarbonDataSource
 * First-level schema describing datasource
 */
export const schemaOpenCarbonDataSource = {
    type: "object",
    required: ["sourceurl"],
    description: "Add data source information below",
    properties: {
        sourceurl: {
            type: "string", 
            format: "uri", 
            title: "Source URL, eg. annual report", default: "https://"
        },
        sourcepage: {
            type: "string", 
            title: "Page position (if applicable)"
        },
        sourcecomments: {
            type: "string", 
            title: "Notes / comments"
        },
        periodstart: {
            type: "string",
            format: "date", 
            title: "Period start",
            default: "YYYY-MM-DD"
        },
        periodend: {
            type: "string",
            format: "date",  
            title: "Period end",
            default: "YYYY-MM-DD"
        },
        dataitems: schemaOpenCarbonDataItems
    }
}

/**
 * schemaOpenCarbonDataSourcePublic
 * First-level schema describing datasource for public data additions 
 * Backend logic will determine the value of 'unit' based on 'measure'
 */
export const schemaOpenCarbonDataSourcePublic = {
    type: "object",
    required: ["sourceurl"],
    description: "Add data source information below",
    properties: {
        sourceurl: {
            type: "string", 
            format: "uri", 
            title: "Source URL, eg. annual report"
        },
        sourcepage: {
            type: "string", 
            title: "Page position (if applicable)"
        },
        sourcecomments: {
            type: "string", 
            title: "Notes / comments"
        },
        periodstart: {
            type: "string", 
            format: "date",
            title: "Period start",
            default: "YYYY-MM-DD"
        },
        periodend: {
            type: "string",
            format: "date", 
            title: "Period end",
            default: "YYYY-MM-DD"
        },
        dataitems: schemaOpenCarbonDataItemsPublic
    }
}

/**
 * schemaOpenCarbonDataSources
 * First-level nesting of datasources
 */
export const schemaOpenCarbonDataSources = {
    type: "array",
    title: "Data Sources",
    minItems: 1,
    items: schemaOpenCarbonDataSource
}

/**
 * schemaOpenCarbonDataSourcesPublic
 * First-level nesting of datasources for public data additions 
 * Backend logic will determine the value of 'unit' based on 'measure'
 */
export const schemaOpenCarbonDataSourcesPublic = {
    type: "array",
    title: "Data Sources",
    minItems: 1,
    items: schemaOpenCarbonDataSourcePublic
}

/**
 * schemaOpenCarbonOrganisation 
 * Top-level schema descrbing organisation
 */
export const schemaOpenCarbonOrganisation = {
    type: "object",
    required: ["name"],
    properties: {
        name: {
            type: "string", 
            title: "Name of organisation data relates to"
        },
        parent: {
            type: "string", 
            title: "Parent organisation (if applicable)"
        },
        osm: {
            type: "string", 
            title: "Open Street Map URL (if applicable)"
        },
        datasources: schemaOpenCarbonDataSources
    }
}

/**
 * schemaOpenCarbonOrganisationPublic
 * Top-level schema descrbing organisation for public data additions 
 * Backend logic will determine the value of 'unit' based on 'measure'
 */
export const schemaOpenCarbonOrganisationPublic = {
    type: "object",
    required: ["name"],
    properties: {
        name: {
            type: "string", 
            title: "Name of organisation data relates to"
        },
        parent: {
            type: "string", 
            title: "Parent organisation (if applicable)"
        },
        osm: {
            type: "string", 
            title: "Open Street Map URL (if applicable)"
        },
        datasources: schemaOpenCarbonDataSourcesPublic
    }
}


/**
 * Schema for defining custom UI on form
 */
export const schemaOpenCarbonUI = {
    datasources: {
        items: {
            // comments: {
            //     "ui:widget": "textarea",
            //     "ui:options": {
            //     rows: 5
            //     }
            // } 
        }
    }
}

/**
 * Schema for defining order within JSON (for ease of readability)
 */
export const schemaOpenCarbonJSONOrder = [   
    "id",
    "name", 
    "parent", 
    "osm", 
    "datasources",
    "sourceurl",
    "sourcepage",
    "sourcecomments",
    "periodstart",
    "periodend",
    "dataitems",
    "measure",
    "unit",
    "value"
]


/**
 * Default values for form
 */
export const schemaOpenCarbonDefaultValues = {
    name: "",
    parent: "",
    osm: "",
    datasources: [
        {
            sourceurl: "",
            sourcepage: "",
            sourcecomments: "",
            dataitems: []
        }
    ]
}

/**
 * Human-readable schema for public display
 */
export const dataObjectSchema = {
    id: "[Organisation id]",
    name: "[Organisation name]",
    parent: "[Parent organisation]",
    osm: "[Open Street Map URL]",
    datasources: [
        {
            sourceurl: "[Source URL]",
            sourcepage: "[Source page]",
            sourcecomments: "[Source comments]",
            periodstart: "[Period start]",
            periodend: "[Period end]",
            dataitems: [
                {
                    "measure": "[Data item measure]",
                    "unit": "[Data item unit]",
                    "value": "[Data item value]"
                },
            ]
        }
    ]
};
