import React from 'react';

import { ApolloListWrapper } from '../../../../../components';

import * as apolloProps from './overrides-graphql';

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
        <ApolloListWrapper
            apolloProps={apolloProps}
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
        </ApolloListWrapper>
    );
}
