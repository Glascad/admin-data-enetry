import React from 'react';

import gql from 'graphql-tag';

import {
    ApolloWrapper,
    ToggleNavigator,
    Ellipsis,
    useMutation,
    useQuery,
    TitleBar,
    Navigator,
} from '../../../components';

import query from './system-graphql/query';
// import mutations from './system-graphql/mutations';
import { updateEntireSystem as updateEntireSystemMutation } from './system-graphql/mutations';

import SystemInfo from './SystemInfo/SystemInfo';
import SystemBuilder from './SystemBuilder/SystemBuilder';

import { parseSearch } from '../../../utils';

const subroutes = {
    SystemInfo,
    SystemBuilder,
};

// this is for rendering the correct name in the sidebar
System.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query System($id: Int!) {
                        systemById(id: $id) {
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
                rawQueryStatus: {
                    loading,
                },
            }) => (
                    loading ?
                        <Ellipsis />
                        :
                        name
                )}
        </ApolloWrapper>
    ),
    shouldRender: !!parseSearch(search).systemId,
    path: "/system",
    subroutes,
});

export default function System({
    location: {
        search,
    },
}) {

    const { systemId } = parseSearch(search);

    const [fetchQuery, queryStatus, fetching] = useQuery({ query, variables: { id: +systemId || 0 } });

    const [updateEntireSystem] = useMutation(updateEntireSystemMutation, fetchQuery);

    return (
        <Navigator
            routes={subroutes}
            routeProps={{
                queryStatus,
                fetching,
                updateEntireSystem,
            }}
        />
    );
}
