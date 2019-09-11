import gql from 'graphql-tag';

export const SYSTEM_TYPES = gql`
    fragment SystemTypes on Query {
        systemTypes: __type(name: "SystemType") {
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

// export const PRESENTATION_LEVELS = gql`
//     fragment PresentationLevels on Query {
//         PresentationLevels: allOrderedPresentationLevels(orderBy: VALUE_ASC) {
//             nodes {
//                 nodeId
//                 value
//                 level
//             }
//         }
//     }
// `;

// export const SYSTEM_OPTION_NAMES = gql`
//     fragment OptionNames on Query {
//         OptionNames: __type(name: "OptionName") {
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
