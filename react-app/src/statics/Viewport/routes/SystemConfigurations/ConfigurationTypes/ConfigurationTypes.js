import React from 'react';
import { CRUDListWrapper } from '../../../../../components';

import * as CRUDProps from './configuration-types-graphql';

import ConfigurationTypeInfo from './ConfigurationTypeInfo';
import PartTypes from './PartTypes';
import Overrides from './Overrides';

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
                door: false,
                vertical: false,
            })}
            extractCreatedNID={({
                createConfigurationType: {
                    configurationType: {
                        nodeId,
                    },
                },
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        >
            {({
                CRUD: {
                    updateItem: updateConfigurationType,
                },
                selectedItem: configurationType,
            }) => (
                    <div>
                        <ConfigurationTypeInfo
                            configurationType={configurationType}
                            updateConfigurationType={updateConfigurationType}
                        />
                        <PartTypes
                            configurationType={configurationType}
                        />
                        <Overrides
                            configurationType={configurationType}
                        />
                    </div>
                )}
        </CRUDListWrapper>
    );
}
