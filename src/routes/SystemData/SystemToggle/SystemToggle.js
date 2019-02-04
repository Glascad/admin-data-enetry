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

// THIS IS FOR RENDERING THE CORRECT NAME IN THE SIDEBAR
SystemToggle.navigationOptions = ({
    queryStatus: {
        system: {
            nodeId,
            name = '',
        } = {},
    } = {},
    systemNID,
} = {}) => ({
    name: systemNID === nodeId ?
        name
        :
        "",
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
                            _manufacturer: {
                                name: mnfgName = ""
                            } = {},
                        } = {},
                    }
                } = apollo;

                return (
                    <ToggleNavigator
                        titleBar={{
                            title: systemNID ?
                                `${mnfgName} ${systemName}`.trim()
                                ||
                                'Loading...'
                                :
                                "New System",
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
