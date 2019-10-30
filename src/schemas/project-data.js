import gql from 'graphql-tag';
import { ELEVATION_FIELDS } from './elevation-data';

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

export const SYSTEM_SET_DETAIL_OPTION_VALUE_FIELDS = gql`
    fragment SystemSetDetailOptionValueFields on SystemSetDetailOptionValue {
        __typename
        nodeId
        detailOptionValuePath
    }
`;

export const SYSTEM_SET_CONFIGURATION_OPTION_VALUE_FIELDS = gql`
    fragment SystemSetConfigurationOptionValueFields on SystemSetConfigurationOptionValue {
        __typename
        nodeId
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
        systemSetDetailOptionValuesBySystemSetId {
            nodes {
                ...SystemSetDetailOptionValueFields
            }
        }
        systemSetConfigurationOptionValuesBySystemSetId {
            nodes {
                ...SystemSetConfigurationOptionValueFields
            }
        }
    }
    ${SYSTEM_SET_FIELDS}
    ${SYSTEM_SET_OPTION_GROUP_VALUE_FIELDS}
    ${SYSTEM_SET_DETAIL_OPTION_VALUE_FIELDS}
    ${SYSTEM_SET_CONFIGURATION_OPTION_VALUE_FIELDS}
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
