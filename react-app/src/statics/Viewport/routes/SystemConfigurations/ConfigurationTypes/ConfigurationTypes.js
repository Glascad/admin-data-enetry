import React from 'react';
import { CRUDListWrapper } from '../../../../../components';

import * as CRUDProps from './configuration-types-graphql';

import ConfigurationTypeInfo from './ConfigurationTypeInfo';
import PartTypes from './PartTypes/PartTypes';
import Overrides from './Overrides/Overrides';

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
                    updateItem,
                },
                selectedItem,
            }) => (
                    <div>
                        <ConfigurationTypeInfo
                            configurationType={selectedItem}
                            updateConfigurationType={updateItem}
                        />
                        {selectedItem.nodeId ? (
                            <PartTypes
                                configurationType={selectedItem}
                            />
                        ) : null}
                        {selectedItem.nodeId ? (
                            <Overrides
                                configurationType={selectedItem}
                            />
                        ) : null}
                    </div>
                )}
        </CRUDListWrapper>
    );
}
