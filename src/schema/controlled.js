import gql from 'graphql-tag';

export const SYSTEM_TYPES = gql`
    fragment SystemTypes on Query {
        SystemTypes: __type(name: "SystemType") {
            enumValues {
                name
            }
        }
    }
`;

export const DETAIL_TYPES = gql`
    fragment DetailTypes on Query {
        DetailTypes: __type(name: "DetailType") {
            enumValues {
                name
            }
        }
    }
`;

export const CONFIGURATION_TYPES = gql`
    fragment ConfigurationTypes on Query {
        ConfigurationTypes: __type(name: "ConfigurationType") {
            enumValues {
                name
            }
        }
    }
`;

export const PRESENTATION_LEVELS = gql`
    fragment PresentationLevels on Query {
        PresentationLevels: allOrderedPresentationLevels(orderBy: VALUE_ASC) {
            nodes {
                nodeId
                value
                level
            }
        }
    }
`;

// export const SYSTEM_OPTION_NAMES = gql`
//     fragment SystemOptionNames on Query {
//         SystemOptionNames: __type(name: "SystemOptionName") {
//             enumValues {
//                 name
//             }
//         }
//     }
// `;

// export const OPTION_VALUE_NAMES = gql`
//     fragment OptionValueNames on Query {
//         OptionValueNames: __type(name: "OptionValueName") {
//             enumValues {
//                 name
//             }
//         }
//     }
// `;

export const VALID_SYSTEM_OPTIONS = gql`
    fragment ValidSystemOptions on Query {
        ValidSystemOptions: allValidSystemOptions {
            nodes {
                nodeId
                name
                validOptionValuesByOptionName {
                    nodes {
                        nodeId
                        valueName
                    }
                }
            }
        }
    }
`;
