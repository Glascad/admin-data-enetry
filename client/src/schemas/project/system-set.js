import gql from 'graphql-tag';
import { ENTIRE_SYSTEM } from '../manufacturer';

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
        systemBySystemId {
            ...EntireSystem
        }
    }
    ${SYSTEM_SET_FIELDS}
    ${SYSTEM_SET_OPTION_GROUP_VALUE_FIELDS}
    ${SYSTEM_SET_DETAIL_FIELDS}
    ${SYSTEM_SET_CONFIGURATION_FIELDS}
    ${ENTIRE_SYSTEM}
`;