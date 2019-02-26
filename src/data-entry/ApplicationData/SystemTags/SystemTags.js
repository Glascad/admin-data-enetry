import React from 'react';
import {
    ApolloWrapper,
    ListWrapper,
} from '../../../components';

import * as apolloProps from './system-tags-graphql';

export default function SystemTags() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryStatus: {
                    allSystemTags = [],
                },
                mutations: {
                    createSystemTag,
                    updateSystemTag,
                    deleteSystemTag,
                }
            }) => (
                    <div className="card">
                        <ListWrapper
                            title="System Tags"
                            items={allSystemTags}
                            mapPillProps={({ tag }) => ({
                                title: tag
                            })}
                            onCreate={(_, { input }) => createSystemTag({
                                tag: input,
                            })}
                            onUpdate={({ arguments: { nodeId } }, { input }) => updateSystemTag({
                                nodeId,
                                tag: input,
                            })}
                            onDelete={({ arguments: { nodeId } }) => deleteSystemTag({
                                nodeId,
                            })}
                            deleteModal={{
                                name: "System Tag"
                            }}
                        />
                    </div>
                )}
        </ApolloWrapper>
    );
}
