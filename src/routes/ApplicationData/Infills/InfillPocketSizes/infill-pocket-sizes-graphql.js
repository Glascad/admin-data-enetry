import gql from 'graphql-tag';
import {
    INFILL_POCKET_SIZE_FIELDS,
} from '../../../../graphql/fragments';

export const query = {
    query: gql`{
        allInfillPocketSizes(orderBy:SIZE_ASC){
            nodes{
                ...InfillPocketSizeFields
            }
        }
    } ${INFILL_POCKET_SIZE_FIELDS}`,
};

export const mutations = {
    createInfillPocketSize: {
        mutation: gql`mutation CreateInfillPocketSize(
            $size:Float!
        ){
            createInfillPocketSize(
                input:{
                    infillPocketSize:{
                        size:$size
                    }
                }
            ){
                infillPocketSize{
                    ...InfillPocketSizeFields
                }
            }
        } ${INFILL_POCKET_SIZE_FIELDS}`,
    },

    updateInfillPocketSize: {
        mutation: gql`mutation UpdateInfillPocketSize(
            $nodeId:ID!,
            $size:Float!
        ){
            updateInfillPocketSize(
                input:{
                    nodeId:$nodeId
                    infillPocketSizePatch:{
                        size:$size
                    }
                }
            ){
                infillPocketSize{
                    ...InfillPocketSizeFields
                }
            }
        } ${INFILL_POCKET_SIZE_FIELDS}`,
    },

    deleteInfillPocketSize: {
        mutation: gql`mutation DeleteInfillPocketSize($nodeId:ID!){
            deleteInfillPocketSize(
                input:{
                    nodeId:$nodeId
                }
            ){
                infillPocketSize{
                    ...InfillPocketSizeFields
                }
            }
        } ${INFILL_POCKET_SIZE_FIELDS}`,
    },
};
