import React from 'react';
import { CRUDListWrapper } from '../../../components';

import * as CRUDProps from './part-types-graphql';

export default function PartTypes() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Part Type"
            extractList={({
                allPartTypes: {
                    nodes = [],
                } = {},
            }) => nodes}
            canSelect={false}
            mapPillProps={({ type }) => ({
                title: type,
            })}
            mapCreateVariables={({ }, { input }) => ({
                type: input,
            })}
            extractCreatedNID={({
                createPartType: {
                    partType: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                type: input,
            })}
            extractName={({ type }) => type}
        />
    );
}
