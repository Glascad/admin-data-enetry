import gql from 'graphql-tag';
import { query } from './configuration-types-query';

export const update_configuration_type_part_type = {
    mutation: gql`mutation UpdateConfigurationTypePartType(
        $deletePartTypeNID:ID,
        $configurationTypeId:ID,
        $partTypeId:ID
    ){
        createConfigurationTypePartType(input:{
            configurationTypePartType:{
                configurationTypeId:$configurationTypeId
                partTypeId:$partTypeId
            }
        }){
            configurationTypePartType{
                nodeId
                configurationTypeId
                partTypeId
            }
        }
        deleteConfigurationTypePartType(input:{
            deleteConfigurationTypePartType:{
                nodeId:$deletePartTypeNID
            }
        }){
            configurationTypePartType{
                nodeId
                configurationTypeId
                partTypeId
            }
        }
    }`,
    update(cache, data){
        console.log(data);
    }
};
