import React from 'react';
import { CRUDListWrapper } from '../../../components';

import * as CRUDProps from './part-tags-graphql';

export default function PartTags() {
    return (
        <CRUDListWrapper
            CRUDProps={CRUDProps}
            itemClass="Part Tag"
            extractList={({
                allPartTags: {
                    nodes = [],
                } = {},
            }) => nodes}
            canSelect={false}
            mapPillProps={({ tag }) => ({
                title: tag,
            })}
            mapCreateVariables={({ }, { input }) => ({
                tag: input,
            })}
            extractCreatedNID={({
                createPartTag: {
                    partTag: {
                        nodeId
                    }
                }
            }) => nodeId}
            mapUpdateVariables={({ input }) => ({
                tag: input,
            })}
            extractName={({ tag }) => tag}
        />
    );
}
