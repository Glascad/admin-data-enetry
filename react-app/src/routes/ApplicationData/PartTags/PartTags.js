import React from 'react';
import {
    ApolloWrapper,
    ListWrapper,
} from '../../../components';

import * as apolloProps from './part-tags-graphql';

export default function PartTags() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    partTags,
                },
                mutations: {
                    createPartTag,
                    updatePartTag,
                    deletePartTag,
                }
            }) => (
                    <ListWrapper
                        title="Part Tags"
                        items={partTags}
                        mapPillProps={({ tag }) => ({
                            title: tag
                        })}
                        onCreate={({ }, { input }) => createPartTag({
                            tag: input,
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updatePartTag({
                            nodeId,
                            tag: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deletePartTag({
                            nodeId,
                        })}
                        deleteModal={{
                            name: "Part Tag"
                        }}
                    />
                )}
        </ApolloWrapper>
    );
}
