import React from 'react';

import gql from 'graphql-tag';

import {
    ApolloWrapper,
    ToggleNavigator,
    Ellipsis,
} from '../../../../components';

import query from './system-graphql/query';
import mutations from './system-graphql/mutations';
// import mutations from './system-graphql/mutations';

import { parseSearch } from '../../../../utils';

import SystemDatabase from './SystemDatabase/SystemDatabase';
import SystemDetails from './SystemDetails/SystemDetails';

// THIS IS FOR RENDERING THE CORRECT NAME IN THE SIDEBAR
SingleSystem.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query System($id:Int!){
                        systemById(id:$id){
                            __typename
                            nodeId
                            name
                        }
                    }
                `,
                variables: {
                    id: +parseSearch(search).systemId,
                },
            }}
        >
            {({
                queryStatus: {
                    _system: {
                        name = '',
                    } = {},
                } = {},
            }) => name || <Ellipsis />}
        </ApolloWrapper>
    ),
    shouldRender: !!parseSearch(search).systemId,
    path: "/info",
});

export default function SingleSystem({
    location: {
        search,
    },
}) {

    const { systemId } = parseSearch(search);

    return (
        <ApolloWrapper
            mutations={mutations}
            query={{
                query,
                variables: {
                    id: +systemId || 0,
                },
            }}
        >
            {apollo => {
                const {
                    queryStatus: {
                        _system: {
                            name: systemName = "",
                            _manufacturer: {
                                name: mnfgName = ""
                            } = {},
                        } = {},
                    },
                    rawQueryStatus: {
                        error: {
                            networkError: {
                                result: {
                                    errors = [],
                                } = {},
                            } = {},
                        } = {},
                    }
                } = apollo;

                console.log(apollo);
                errors.forEach(({ message }) => console.log(message));

                return (
                    <ToggleNavigator
                        titleBar={systemId ?
                            {
                                title: mnfgName,
                                selections: [
                                    systemName
                                    ||
                                    <Ellipsis text="Loading" />
                                ],
                            } : {
                                title: "New System",
                            }}
                        routeProps={apollo}
                        routes={{
                            SystemDatabase,
                            SystemDetails,
                        }}
                    />
                );
            }}
        </ApolloWrapper>
    );
}
