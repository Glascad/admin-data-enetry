import gql from 'graphql-tag';

import * as ED from './elevation-data';

// FIELDS

export const PROJECT_FIELDS = gql`
    fragment ProjectFields on Project {
        __typename
        nodeId
        id
        name
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

export const ENTIRE_PROJECT = gql`
    fragment EntireProject on Project {
        ...ProjectFields
        elevationsByProjectId {
            nodes {
                ...EntireElevation
            }
        }
    }
    ${PROJECT_FIELDS}
    ${ED.ENTIRE_ELEVATION}
`;
