import React from 'react';
import { Query } from 'react-apollo';

import SYSTEM_QUERY from './system-query';

import SystemInfo from './SystemInfo/SystemInfo';
import SystemDetailTypes from './SystemDetailTypes/SystemDetailTypes';
import SystemCompatibility from './SystemCompatibility/SystemCompatibility';
import SystemOptions from './SystemOptions/SystemOptions';

export default function System({
    match: {
        params: {
            mnfgNID,
            systemNID,
        },
    }
}) {
    return (
        <Query
            query={SYSTEM_QUERY}
            variables={{ systemNID }}
        >
            {({
                loading,
                error,
                data,
                data: {
                    system: {
                        nodeId,
                        id,
                        name,
                        depth,
                        defaultSightline,
                        shimSize,
                        defaultGlassSize,
                        defaultGlassBite,
                        manufacturerByManufacturerId: manufacturer,
                        systemTagsBySystemId: systemTags,
                        systemTypeBySystemTypeId: systemType,
                        systemTypeDetailTypesBySystemTypeId: detailTypes,
                        invalidSystemConfigurationTypesBySystemId: invalidConfigurationTypes,
                        systemConfigurationOverridesBySystemId: configurationOverrides,
                        systemInfillSizesBySystemId: infillSizes,
                        systemInfillPocketTypesBySystemId: infillPocketTypes,
                        systemInfillPocketSizesBySystemId: infillPocketSizes,
                        systemOptionsBySystemId: options,
                    } = {}
                } = {}
            }) => (
                    <div id="System">
                        {console.log(data)}
                        <SystemInfo
                            {...{
                                nodeId,
                                id,
                                name,
                                depth,
                                defaultSightline,
                                shimSize,
                                defaultGlassSize,
                                defaultGlassBite,
                                manufacturer,
                                systemType,
                                systemTags,
                                infillSizes,
                                infillPocketTypes,
                                infillPocketSizes,
                            }}
                        />
                        <SystemDetailTypes
                            {...{
                                systemType,
                                detailTypes,
                                invalidConfigurationTypes,
                                configurationOverrides,
                            }}
                        />
                        <SystemCompatibility
                            {...{
                                
                            }}
                        />
                        <SystemOptions
                            {...{
                                options
                            }}
                        />
                    </div>
                )}
        </Query>
    );
}
