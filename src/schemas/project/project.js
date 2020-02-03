import gql from 'graphql-tag';
import { MANUFACTURER_FIELDS, SYSTEM_FIELDS } from '../manufacturer';
import { ELEVATION_FIELDS } from './elevation';
import { SYSTEM_SET_FIELDS } from './system-set';

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
                    ...SystemFields
                    manufacturerByManufacturerId {
                        ...ManufacturerFields
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
    ${SYSTEM_FIELDS}
    ${MANUFACTURER_FIELDS}
`;
