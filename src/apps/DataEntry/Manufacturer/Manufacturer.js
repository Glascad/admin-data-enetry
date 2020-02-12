import gql from 'graphql-tag';
import React from 'react';
import { ApolloWrapper, Ellipsis, Navigator, useApolloQuery } from '../../../components';
import F from '../../../schemas';
import { parseSearch } from '../../../utils';
import Parts from './Parts/Parts';
import Systems from './Systems/Systems';

const subroutes = {
    Systems,
    Parts,
};

Manufacturer.navigationOptions = ({
    location: {
        search,
    },
}) => ({
    subroutes,
    path: '/manufacturer',
    requiredURLParams: ['manufacturerId'],
    name: (
        <ApolloWrapper
            query={{
                query: gql`
                    query ManufacturerById($id: Int!) {
                        manufacturerById(id: $id) {
                            __typename
                            nodeId
                            id
                            name
                        }
                    }
                `,
                variables: {
                    id: parseSearch(search).manufacturerId,
                },
            }}
        >
            {({
                queryResult: {
                    _manufacturer: {
                        name = '',
                    } = {},
                },
                rawQueryStatus: {
                    loading,
                },
            }) => loading ?
                    <Ellipsis />
                    :
                    name
            }
        </ApolloWrapper >
    ),
});

const query = gql`query ManufacturerById($id: Int!) {
    manufacturerById(id: $id) {
        ...EntireManufacturer
    }
}
${F.MNFG.ENTIRE_MANUFACTURER}
`;

export default function Manufacturer({
    location: {
        search,
    },
}) {
    const { manufacturerId } = parseSearch(search);
    const { _manufacturer, __raw: { refetch: fetchQuery} } = useApolloQuery(
        query,
        {
            variables: {
                id: manufacturerId,
            },
            // fetchPolicy: "network-only",
        });
    return (
        <Navigator
            routeProps={{ _manufacturer, fetchQuery }}
            routes={subroutes}
        />
    );
}
