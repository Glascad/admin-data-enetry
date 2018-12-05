import React from 'react';

import { CRUDListWrapper } from '../../../../../../components';

import * as CRUDProps from './overrides-graphql';

export default function Overrides({
    configurationType: {
        nodeId,
        id: configurationTypeId,
        type,
        configurationNameOverridesByConfigurationTypeId: {
            nodes: configurationNameOverrides
        }
    },
}) {
    console.log(arguments);

    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Configuration Name Override"
            parentItem={type}
            extractList={() => configurationNameOverrides}
            defaultPillProps={{
                type: 'tile'
            }}
            mapPillProps={({
                manufacturerByManufacturerId: {
                    manufacturerName,
                },
                nameOverride,
            }) => ({
                title: manufacturerName,
                subtitle: nameOverride,
            })}
            addButtonProps={{
                type: "large"
            }}
            mapCreateVariables={({ }, { }, {
                allManufacturers: {
                    nodes: [{ id: manufacturerId }]
                }
            }) => ({
                manufacturerId,
                nameOverride: "",
            })}
        // mapDeleteVariables={}
        >
            {({ }) => (
                <div>

                </div>
            )}
        </CRUDListWrapper>
    );
}
