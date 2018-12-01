import React from 'react';
import { CRUDListWrapper } from '../../../../../components';

import * as CRUDProps from './configuration-types-graphql';

export default function ConfigurationTypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Configuration Type"
            extractList={({
                allConfigurationTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createConfigurationType: {
                    configurationType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        >
            {}
        </CRUDListWrapper>
    );
}
