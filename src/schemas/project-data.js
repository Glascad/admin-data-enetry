import gql from 'graphql-tag';
import { ELEVATION_FIELDS } from './elevation-data';
import { print } from 'graphql';

// FIELDS

export const PROJECT_FIELDS = gql`
    fragment ProjectFields on Project {
        __typename
        nodeId
        id
        name
        defaultElevation
        elevationsByProjectId {
            totalCount
        }
    }
`;

export const SYSTEM_SET_FIELDS = gql`
    fragment SystemSetFields on SystemSet {
        __typename
        nodeId
        id
        name
        systemId
        projectId
        systemOptionValuePath
    }
`;

export const SYSTEM_SET_OPTION_GROUP_VALUE_FIELDS = gql`
    fragment SystemSetOptionGroupValueFields on SystemSetOptionGroupValue {
        __typename
        nodeId
        optionName
        name
    }
`;

export const SYSTEM_SET_DETAIL_FIELDS = gql`
    fragment SystemSetDetailFields on SystemSetDetail {
        __typename
        nodeId
        systemDetailPath
        detailOptionValuePath
    }
`;

export const SYSTEM_SET_CONFIGURATION_FIELDS = gql`
    fragment SystemSetConfigurationFields on SystemSetConfiguration {
        __typename
        nodeId
        detailConfigurationPath
        configurationOptionValuePath
    }
`;


// ALL OF TYPE

// replace with RLS
export const ALL_PROJECTS = gql`
    fragment AllProjects on Query {
        __typename
        allProjects {
            nodes {
                ...ProjectFields
            }
        }
    }
    ${PROJECT_FIELDS}
`;

// ENTIRE TYPE

export const ENTIRE_SYSTEM_SET = gql`
    fragment EntireSystemSet on SystemSet {
        ...SystemSetFields
        systemSetOptionGroupValuesBySystemSetId(orderBy:OPTION_NAME_DESC) {
            nodes {
                ...SystemSetOptionGroupValueFields
            }
        }
        systemSetDetailsBySystemSetId {
            nodes {
                ...SystemSetDetailFields
            }
        }
        systemSetConfigurationsBySystemSetId {
            nodes {
                ...SystemSetConfigurationFields
            }
        }
    }
    ${SYSTEM_SET_FIELDS}
    ${SYSTEM_SET_OPTION_GROUP_VALUE_FIELDS}
    ${SYSTEM_SET_DETAIL_FIELDS}
    ${SYSTEM_SET_CONFIGURATION_FIELDS}
`;

// ${SD.ENTIRE_SYSTEM}

export const ENTIRE_PROJECT = gql`
    fragment EntireProject on Project {
        ...ProjectFields
        _elevations: elevationsByProjectId(orderBy: NAME_ASC) {
            nodes {
                ...ElevationFields
            }
        }
        systemSetsByProjectId {
            nodes {
                ...SystemSetFields
                systemBySystemId {
                    name
                    systemType
                    manufacturerByManufacturerId {
                        name
                    }
                }
                elevationsBySystemSetId {
                    totalCount
                }
            }
        }
    }
    ${PROJECT_FIELDS}
    ${ELEVATION_FIELDS}
    ${SYSTEM_SET_FIELDS}
`;

console.log(print(ENTIRE_SYSTEM_SET));
