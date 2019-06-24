import gql from 'graphql-tag';

// FIELDS

export const ELEVATION_FIELDS = gql`
    fragment ElevationFields on Elevation {
        __typename
        nodeId
        id
        name
        finishedFloorHeight
        sightline
        roughOpening {
            x
            y
        }
    }
`;

export const ELEVATION_CONTAINER_FIELDS = gql`
    fragment ElevationContainerFields on ElevationContainer {
        __typename
        nodeId
        id
        original
        contents
        daylightOpening {
            x
            y
        }
        customRoughOpening
    }
`;

export const CONTAINER_DETAIL_FIELDS = gql`
    fragment ContainerDetailFields on ContainerDetail {
        __typename
        nodeId
        id
        vertical
        firstContainerId
        secondContainerId
    }
`;

// ENTIRE TYPE

export const ENTIRE_CONTAINER_DETAIL = gql`
    fragment EntireContainerDetail on ContainerDetail {
        ...ContainerDetailFields
        detailOptionValuesByContainerDetailId {
            nodes {
                nodeId
                optionValueId
            }
        }
    }
    ${CONTAINER_DETAIL_FIELDS}
`;

export const ENTIRE_ELEVATION = gql`
    fragment EntireElevation on Elevation {
        ...ElevationFields
        elevationContainersByElevationId {
            nodes {
                ...ElevationContainerFields
            }
        }
        containerDetailsByElevationId {
            nodes {
                ...EntireContainerDetail
            }
        }
    }
    ${ELEVATION_FIELDS}
    ${ELEVATION_CONTAINER_FIELDS}
    ${ENTIRE_CONTAINER_DETAIL}
`;
