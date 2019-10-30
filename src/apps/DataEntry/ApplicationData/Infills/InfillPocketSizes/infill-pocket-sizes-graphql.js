import gql from 'graphql-tag';
import F from '../../../../../schemas';

export const query = {
    query: gql`{ ...AllInfillPocketSizes } ${F.MNFG.ALL_INFILL_POCKET_SIZES}`,
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
            ${F.MNFG.INFILL_POCKET_SIZE_FIELDS}
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
            ${F.MNFG.INFILL_POCKET_SIZE_FIELDS}
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
            ${F.MNFG.INFILL_POCKET_SIZE_FIELDS}
        `,
    },
};
