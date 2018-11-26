import React from 'react';

import { Query } from 'react-apollo';

import query from './query';

import SysTypes from './SysTypes/SysTypes';
import SysTags from './SysTags/SysTags';

export default function SystemTypes() {
    return (
        <Query
            query={query}
        >
            {({
                loading,
                error,
                data: {
                    allSystemTypes: {
                        nodes: systemTypes = [],
                    } = {},
                    allSystemTags: {
                        nodes: systemTags = []
                    } = {}
                } = {},
            }) => (
                    <div>
                        <SysTypes
                            systemTypes={systemTypes}
                        />
                        <SysTags
                            systemTags={systemTags}
                        />
                    </div>
                )}
        </Query>
    );
}
