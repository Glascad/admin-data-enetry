import gql from 'graphql-tag';

export const SYSTEM_TYPES = gql`
    fragment SystemTypes on Query {
        systemTypes: __type(name: "_SystemType") {
            enumValues {
                name
            }
        }
    }
`;

export const DETAIL_TYPES = gql`
    fragment DetailTypes on Query {
        detailTypes: __type(name: "_DetailType") {
            enumValues {
                name
            }
        }
    }
`;

export const CONFIGURATION_TYPES = gql`
    fragment ConfigurationTypes on Query {
        configurationTypes: __type(name: "_ConfigurationType") {
            enumValues {
                name
            }
        }
    }
`;

export const VALID_OPTIONS = gql`
    fragment ValidOptions on Query {
        validOptions: allValidOptions {
            nodes {
                nodeId
                name
                validOptionValuesByOptionName {
                    nodes {
                        nodeId
                        name
                    }
                }
            }
        }
    }
`;
