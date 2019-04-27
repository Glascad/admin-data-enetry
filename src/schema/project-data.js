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
    }
`;

export const SYSTEM_SET_FIELDS = gql`
    fragment SystemSetFields on SystemSet {
        __typename
        nodeId
        id
    }
`;

// ALL OF TYPE

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
        __typename
        nodeId
        id
        systemBySystemIdAndSystemTypeId {
            ...EntireSystem
        }
        systemSetOptionValuesBySystemSetIdAndSystemIdAndSystemTypeId {
            nodes {
                systemOptionBySystemIdAndSystemOptionId {
                    ...EntireSystemOption
                }
                optionValueByOptionValueId {
                    ...OptionValueFields
                }
            }
        }
        elevationsBySystemSetId {
            totalCount
        }
    }
    ${SD.ENTIRE_SYSTEM}
    ${SD.ENTIRE_SYSTEM_OPTION}
    ${SD.OPTION_VALUE_FIELDS}
`;

export const ENTIRE_PROJECT = gql`
    fragment EntireProject on Project {
        ...ProjectFields
        elevationsByProjectId(orderBy: NAME_ASC) {
            nodes {
                ...EntireElevation
            }
        }
        systemSetsByProjectId {
            nodes {
                ...EntireSystemSet
            }
        }
    }
    ${PROJECT_FIELDS}
    ${ED.ENTIRE_ELEVATION}
    ${ENTIRE_SYSTEM_SET}
`;
