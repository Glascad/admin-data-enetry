import React from 'react';

import {
    ApolloBatcher,
    ToggleNavigator,
} from '../../../components';

import query from './system-graphql/query';
import mutations from './system-graphql/mutations';

import { parseSearch } from '../../../utils';

import SystemDatabase from './SystemDatabase/SystemDatabase';
import SystemDetails from './SystemDetails/SystemDetails';

SystemToggle.navigationOptions = ({
    queryStatus: {
        system: {
            name = '',
        } = {},
    } = {},
} = {}) => ({
    name,
    path: "/info",
});

export default function SystemToggle({
    location: {
        search,
    },
}) {

    const { systemNID } = parseSearch(search);

    return (
        <ApolloBatcher
            mutations={mutations}
            query={{
                ...query,
                variables: {
                    nodeId: systemNID
                },
            }}
        >
            {apollo => {
                const {
                    queryStatus: {
                        system: {
                            name: systemName = "",
                            manufacturer: {
                                name: mnfgName = ""
                            } = {},
                        } = {},
                    }
                } = apollo;

                return (
                    <ToggleNavigator
                        titleBar={{
                            title: `${
                                mnfgName
                                } ${
                                systemName
                                }`.trim()
                                ||
                                'Loading...',
                        }}
                        routeProps={apollo}
                        routes={[
                            SystemDatabase,
                            SystemDetails,
                        ]}
                    />
                );
            }}
        </ApolloBatcher>
    );
}
