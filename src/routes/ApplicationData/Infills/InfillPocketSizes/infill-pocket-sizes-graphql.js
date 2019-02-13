import gql from 'graphql-tag';
import {
    ALL_INFILL_POCKET_SIZES,
    INFILL_POCKET_SIZE_FIELDS,
} from '../../../../graphql/fragments';

export const query = {
    query: gql`{ ...AllInfillPocketSizes } ${ALL_INFILL_POCKET_SIZES}`,
};

export const mutations = {
    createInfillPocketSize: {
        mutation: gql`
            mutation CreateInfillPocketSize(
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
            }
            ${INFILL_POCKET_SIZE_FIELDS}
        `,
    },

    updateInfillPocketSize: {
        mutation: gql`
            mutation UpdateInfillPocketSize(
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
            }
            ${INFILL_POCKET_SIZE_FIELDS}
        `,
    },

    deleteInfillPocketSize: {
        mutation: gql`
            mutation DeleteInfillPocketSize($nodeId:ID!){
                deleteInfillPocketSize(
                    input:{
                        nodeId:$nodeId
                    }
                ){
                    infillPocketSize{
                        ...InfillPocketSizeFields
                    }
                }
            }
            ${INFILL_POCKET_SIZE_FIELDS}
        `,
    },
};
