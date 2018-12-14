import React from 'react';
import gql from 'graphql-tag';
import {
    Wizard,
} from '../../../components';

import ApolloWrapper3 from '../../../components/ApolloWrapper/ApolloWrapper3';

export default function ManufacturerOptions() {
    return (
        <Wizard
            query={{
                query: gql`{
                        allManufacturers{
                            nodes{
                                nodeId
                                id
                                name
                            }
                        }
                        allSystemTypes{
                            nodes{
                                nodeId
                                id
                                type
                            }
                        }
                    }`,
                mapProps: ({
                    status: {
                        data: {
                            allManufacturers: {
                                nodes: manufacturers = []
                            } = {},
                            allSystemTypes: {
                                nodes: systemTypes = []
                            } = {}
                        } = {}
                    } = {}
                }) => ({
                    manufacturers,
                    systemTypes,
                }),
            }}
            mutations={{
                createManufacturer: {
                    mutation: gql`mutation CreateManufacturer(
                        $name:String!
                    ){
                        createManufacturer(
                            input:{
                                manufacturer:{
                                    name:$name
                                }
                            }
                        ){
                            manufacturer{
                                nodeId
                                id
                                name
                            }
                        }
                    }`,
                },
                createSystemType: {
                    mutation: gql`mutation CreateSystemType(
                        $name:String!
                    ){
                        createSystemType(
                            input:{
                                systemType:{
                                    name:$name
                                }
                            }
                        ){
                            systemType{
                                nodeId
                                id
                                type
                            }
                        }
                    }`
                }
            }}
        >
            {props => (
                console.log(props)
                ||
                "DONE"
            )}
        </Wizard>
    );
}
