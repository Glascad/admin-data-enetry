import gql from 'graphql-tag';

import * as ED from './elevation-data';
import * as SD from './system-data';

// FIELDS

export const PROJECT_FIELDS = gql`
    fragment ProjectFields on Project {
        __typename
        nodeId
        id
        name
        defaultElevation
        # elevationsByProjectId {
        #     totalCount
        # }
    }
`;

export const SYSTEM_SET_FIELDS = gql`
    fragment SystemSetFields on SystemSet {
        __typename
        nodeId
        id
        name
        systemType
    }
`;

// ALL OF TYPE

// replace with RLS
export const ALL_PROJECTS = gql`
    fragment AllProjects on Query {
        __typename
        allProjects: getAllProjects {
            nodes {
                ...ProjectFields
            }
        }
    }
    ${PROJECT_FIELDS}
`;

// ENTIRE TYPE

export const ENTIRE_SYSTEM_SET_OPTION_VALUE = gql`
    fragment EntireSystemSetOptionValue on SystemSetOptionValue {
         __typename
        nodeId
        systemOptionBySystemIdAndOptionName {
            ...EntireSystemOption
        }
        optionValueBySystemIdAndOptionNameAndName {
            ...OptionValueFields
        }
    }
`;

export const ENTIRE_SYSTEM_SET = gql`
    fragment EntireSystemSet on SystemSet {
        __typename
        nodeId
        id
        systemBySystemId {
            ...EntireSystem
        }
        systemSetOptionValuesBySystemSetIdAndSystemIdAndSystemType {
            nodes {
               ...EntireSystemSetOptionValue
            }
        }
        elevationsBySystemSetId {
            totalCount
        }
    }
    ${SD.ENTIRE_SYSTEM}
    ${SD.ENTIRE_SYSTEM_OPTION}
    ${SD.OPTION_VALUE_FIELDS}
    ${ENTIRE_SYSTEM_SET_OPTION_VALUE}
`;

export const ENTIRE_PROJECT = gql`
    fragment EntireProject on Project {
        ...ProjectFields
        elevationsByProjectId(orderBy: NAME_ASC) {
            nodes {
                ...ElevationFields
                # ...EntireElevation
            }
        }
        systemSetsByProjectId {
            nodes {
                ...SystemSetFields
                systemBySystemId {
                    name
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
    ${ED.ELEVATION_FIELDS}
    ${SYSTEM_SET_FIELDS}
`;
