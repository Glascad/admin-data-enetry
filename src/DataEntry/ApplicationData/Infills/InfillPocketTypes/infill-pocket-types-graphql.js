import gql from 'graphql-tag';
import F from '../../../../schema';

export const query = {
    query: gql`{ ...AllInfillPocketTypes } ${F.APP_DATA.ALL_INFILL_POCKET_TYPES}`,
};

export const mutations = {
    createInfillPocketType: {
        mutation: gql`
            mutation CreateInfillPocketType($type:String!){
                createInfillPocketType(input:{
                    infillPocketType:{
                        type:$type
                    }
                }){
                    infillPocketType{
                        ...InfillPocketTypeFields
                    }
                }
            }
            ${F.APP_DATA.INFILL_POCKET_TYPE_FIELDS}
        `,
        update(cache, {
            data: {
                createInfillPocketType: {
                    infillPocketType
                }
            }
        }) {
            const { allInfillPocketTypes } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    allInfillPocketTypes: {
                        ...allInfillPocketTypes,
                        nodes: allInfillPocketTypes.nodes.concat(infillPocketType)
                    }
                }
            });
        }
    },
    updateInfillPocketType: {
        mutation: gql`
            mutation UpdateInfillPocketType(
                $nodeId:ID!,
                $type:String,
                $description:String,
                $captured:Boolean
            ){
                updateInfillPocketType(input:{
                    nodeId:$nodeId
                    infillPocketTypePatch:{
                        type:$type
                        description:$description
                        captured:$captured
                    }
                }){
                    infillPocketType{
                        ...InfillPocketTypeFields
                    }
                }
            }
            ${F.APP_DATA.INFILL_POCKET_TYPE_FIELDS}
        `,
    },
    deleteInfillPocketType: {
        mutation: gql`
            mutation DeleteInfillPocketType($nodeId:ID!){
                deleteInfillPocketType(input:{
                    nodeId:$nodeId
                }){
                    infillPocketType{
                        ...InfillPocketTypeFields
                    }
                }
            }
            ${F.APP_DATA.INFILL_POCKET_TYPE_FIELDS}
        `,
        update(cache, {
            data: {
                deleteInfillPocketType: {
                    infillPocketType: {
                        nodeId: deletedNID
                    }
                }
            }
        }) {
            const { allInfillPocketTypes } = cache.readQuery(query);
            cache.writeQuery({
                ...query,
                data: {
                    allInfillPocketTypes: {
                        ...allInfillPocketTypes,
                        nodes: allInfillPocketTypes.nodes.filter(({ nodeId }) => nodeId !== deletedNID)
                    }
                }
            })
        }
    }
};
