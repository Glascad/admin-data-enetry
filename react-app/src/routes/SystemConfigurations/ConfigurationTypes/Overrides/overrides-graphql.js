import gql from 'graphql-tag';
import { query as ct_query } from '../configuration-types-graphql';

export const query = gql`{
    allManufacturers{
        nodes{
            nodeId
            id
            name
        }
    }
}`;

export const create = {
    mutation: gql`mutation CreateConfigurationNameOverride(
        $manufacturerId:Int!,
        $configurationTypeId:Int!,
        $nameOverride:Int!
    ){
        createConfigurationNameOverride(
            input:{
                configurationNameOverride:{
                    manufacturerId:$manufacturerId
                    configurationTypeId:$configurationTypeId
                    nameOverride:$nameOverride
                }
            }
        ){
            configurationNameOverride{
                nodeId
                id
                nameOverride
                manufacturerId
                configurationTypeId
            }
        }
    }`,
    refetchQueries: [{ query: ct_query }]
};

export const update = {
    mutation: gql`mutation UpdateConfigurationNameOverride(
        $nodeId:ID!,
        $manufacturerId:Int,
        $configurationTypeId:Int,
        $nameOverride:Int
    ){
        updateConfigurationNameOverride(
            input:{
                nodeId:$nodeId
                configurationNameOverridePatch:{
                    manufacturerId:$manufacturerId
                    configurationTypeId:$configurationTypeId
                    nameOverride:$nameOverride
                }
            }
        ){
            configurationNameOverride{
                nodeId
                id
                nameOverride
                manufacturerId
                configurationTypeId
            }
        }
    }`,
    refetchQueries: [{ query: ct_query }]
};

export const _delete = {
    mutation: gql`mutation DeleteConfigurationType(
        $nodeId:ID!
    ){
        deleteConfigurationType(
            input:{
                nodeId:$nodeId
            }
        ){
            configurationNameOverride{
                nodeId
                id
                nameOverride
                manufacturerId
                configurationTypeId
            }
        }
    }`,
    refetchQueries: [{ query: ct_query }]
};
