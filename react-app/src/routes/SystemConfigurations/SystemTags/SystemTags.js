import React from 'react';
import { CRUDListWrapper } from '../../../components';

import * as CRUDProps from './system-tags-graphql';

export default function SystemTags() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="System Tag"
            extractList={({
                allSystemTags: {
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
                createSystemTag: {
                    systemTag: {
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
