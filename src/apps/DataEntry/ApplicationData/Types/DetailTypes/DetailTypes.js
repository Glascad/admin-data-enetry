import React from 'react';
import {
    ApolloWrapper,
    ListWrapper,
    Input,
} from '../../../../../components';

import * as apolloProps from './detail-types-graphql';
import TitleBar from '../../../../../components/ui/TitleBar/TitleBar';

export default function DetailTypes() {
    return (
        <ApolloWrapper
            {...apolloProps}
        >
            {({
                queryResult: {
                    allDetailTypes = [],
                },
                mutations: {
                    createDetailType,
                    updateDetailType,
                    deleteDetailType,
                },
            }) => (
                    <ListWrapper
                        title="Detail Types"
                        items={allDetailTypes}
                        mapPillProps={({ type }) => ({
                            title: type
                        })}
                        onCreate={(_, { input }) => createDetailType({
                            type: input
                        })}
                        onUpdate={({ arguments: { nodeId } }, { input }) => updateDetailType({
                            nodeId,
                            type: input,
                        })}
                        onDelete={({ arguments: { nodeId } }) => deleteDetailType({
                            nodeId
                        })}
                        deleteModal={{
                            name: "Detail Type"
                        }}
                    >
                        {({
                            nodeId,
                            type,
                            vertical,
                            entrance,
                        }) => (
                                <>
                                    <TitleBar
                                        title="Detail Type Settings"
                                        snailTrail={[type]}
                                    />
                                    <Input
                                        label="Vertical"
                                        type="switch"
                                        checked={vertical}
                                        onChange={({ target: { checked } }) => updateDetailType({
                                            nodeId,
                                            vertical: checked,
                                        })}
                                    />
                                    <Input
                                        label="Entrance"
                                        type="switch"
                                        checked={entrance}
                                        onChange={({ target: { checked } }) => updateDetailType({
                                            nodeId,
                                            entrance: checked
                                        })}
                                    />
                                </>
                            )}
                    </ListWrapper>
                )}
        </ApolloWrapper>
    );
}
